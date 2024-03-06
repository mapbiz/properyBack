import { Elysia } from "elysia";

import { staticPlugin } from '@elysiajs/static';
import bearer from "@elysiajs/bearer";
import { cors } from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";

import { resolve } from "node:path";

import serverLoggerPlugin from "./plugins/logger";
import uploadFilePlugin from "./plugins/fileUpload";
import authPlugin from "./plugins/auth.ts";

import apiRouter from "../routes/api.ts";
import responce from "./helpers/responce.ts";

import { uniqBy } from "./helpers/uniq.ts";

const port: number = Bun.env.SERVER_PORT || 8080;

const app: Elysia = new Elysia();

// swagger
if(Bun.env.NODE_ENV === 'development') {
   app.use(swagger({
      path: "/swagger",
      provider: 'swagger-ui',
      autoDarkMode: false,
      documentation: {
         info: {
            title: "api docs",
            version: "0.8.9"
         },
      },
   }))
};

// Хенделинг
app.onError(({ error, code, set, body }) => {
   switch(code) {
      case "NOT_FOUND":
      return responce.failureNotFound({ set, error: { field: "url", message: "Не найдено!" } });
      case "UNKNOWN":
         if(!!error?.error) 
            return responce.failureWithError({ 
               set, 
               error: {
                  field: error.error.path,
                  message: error.error.schema.error,
               }  
            });

         else return responce.failureWithReason({ set, reason: "Неизвестная ошибка!", statusCode: 500, });
      case "VALIDATION":
         if(error.all.findIndex(err => err.schema.anyOf?.length > 0) > -1) return responce.failureWithReason({
            set,
            reason: error.validator.schema.error,
         });

         return responce.failureWithErrors({ 
            set, 
            errors: uniqBy(
               error.all
               .map(err => {
                  return {
                     field: !err?.path ? 'body': err.path,
                     message: err.schema.error,
                  }
               })
               .filter(err => {
                  return !!err.field;
               }),
               'message',
            )
         });
   };

});


// Плагины
app.use(cors({
   origin: Bun.env.CORS_ORIGIN!,
   credentials: true,
   maxAge: Number(Bun.env.CORS_MAX_AGE!),
   allowedHeaders: Bun.env.CORS_ALLOWED_HEADERS!,
}))
app.use(bearer());
app.use(jwt({
   name: "jwt",
   secret: "secret",
}))
app.use(staticPlugin({
   assets: resolve(Bun.env.SERVER_PUBLIC),
}));

// Собственные плагины
app.use(uploadFilePlugin);
app.use(serverLoggerPlugin);
// app.use(authPlugin());


// Все пути с префиксами
app.use(apiRouter);
app.listen(port, () => console.log(`Server run at: http://${app.server?.hostname}:${app.server?.port}`));

export default app;
