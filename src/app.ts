import { Elysia } from "elysia";

import { staticPlugin } from '@elysiajs/static';

import { resolve } from "node:path";

import serverLoggerPlugin from "./plugins/logger";
import uploadFilePlugin from "./plugins/fileUpload";
import nullableTransformPlugin from "./plugins/nullableTransform";

import apiRouter from "../routes/api";
import responce from "./helpers/responce";

const port: number = Bun.env.SERVER_PORT || 8080;

const app: Elysia = new Elysia();


// Плагины
app.use(staticPlugin({
   assets: resolve(Bun.env.SERVER_PUBLIC),
}));

// Собственные плагины
app.use(uploadFilePlugin);
app.use(serverLoggerPlugin);
app.use(nullableTransformPlugin);


// Все пути с префиксами
app.use(apiRouter);


// Хенделинг
app.onError(({ error, code, set }) => {
   switch(code) {
      case "VALIDATION":   
         const errors = error.all.map(err => {
            return {
               field: err.path,
               message: err.schema.error,
            };
         });

      return responce.failureWithErrors({ set, errors });
      case "UNKNOWN": 
      return responce.failureWithReason({ set, reason: "Неизвестная ошибка сервера!", statusCode: 500 });
   };
});

app.listen(port, () => console.log(`Server run at: http://${app.server?.hostname}:${app.server?.port}`));
