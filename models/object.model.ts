import { Elysia, t } from "elysia";


import { NormalNumeric } from "./fields.models";

import type { ObjectRequest } from "../types/object.types";

export const objectModel = new Elysia()
.model({
   getObject: t.Object({
      type: t.Optional(
         t.Union(
            [
               t.Literal('sale'),
               t.Literal('rent'),
               t.Literal('sale-business'),
               t.Literal('hidden'),
            ], 
            {
               error: 'Нет такого типа обьекта'
            }
         )
      )
   }),
   // Полностью переделать, получает трансформнутые значения
   createObject: t.Object({
      agentRemuneration: t.Optional(
         t.Numeric(),
      ),
      metro: t.Optional(
         t.String()
      ),
      payback: t.Optional(
         t.String()
      ),

      // info
      infoSquare: t.Optional(
         t.String()
      ),
      infoTypeWindow: t.Optional(
         t.Symbol({
            error: "Тип окон не может быть больше чем одним словом!"
         })
      ),
      infoLayout: t.Optional(
         t.Symbol({
            error: "Планировка не может быть больше чем одним словом!"
         })
      ),
      infoCountEntrance: t.Optional(
         t.String()
      ),
      infoGlazing: t.Optional(
         t.String()
      ),
      infoCeilingHeight: t.Optional(
         t.String()
      ),
      infoFloor: t.Optional(
         t.String()
      ),
      infoTo: t.Optional(
         t.String()
      ),
      infoFrom: t.Optional(
         t.String()
      ),
      infoEnter: t.Optional(
         t.String()
      ),
      infoForce: t.Optional(
         t.String()
      ),
      infoFinishing: t.Optional(
         t.String()
      ),
      infoHood: t.Optional(
         t.Union(
            [
               t.Literal("true"),
               t.Literal("false"),
            ],
            {
               error: "Вытяжка должна быть либо true либо false!"
            }
         ),
      ),

      // price
      priceSquare: t.Optional(
         t.String()
      ),
      priceValue: t.Optional(
         t.String()
      ),
      priceProfitability: t.Optional(
         t.String()
      ),
      priceGlobal: t.Optional(
         t.String()
      ),
      priceRentYear: t.Optional(
         t.String()
      ),
      priceRentMouth: t.Optional(
         t.String()
      ),
      // tentant
      tenantsInfoRentFlowMount: t.Optional(
         t.String()
      ),
      tenantsInfoRentFlowYear: t.Optional(
         t.String()
      ),
      tenantsInfoDateContractRents: t.Optional(
         t.String()
      ),
      tenantsInfoTentants: t.Optional(
         t.String()
      ),
      // panorama
      panoramaLat: t.Optional(
         t.String()
      ),
      panoramaLon: t.Optional(
         t.String()
      ),
      
      title: t.String({
         error: "Заголовок должен быть строкой!",
      }),
      description: t.String({
         error: "Описание должно быть строкой!"
      }),
      address: t.String({
         error: "Адрес обязан быть строкой!"
      }),
      zone: t.Union(
         [
            t.Literal("true"),
            t.Literal("false"),
         ],
         {
            error: "Должно быть либо true либо false!"
         }
      ),
      photos: t.Files({
         minItems: 1,
         maxItems: 30, 
         error: "Фоток не может быть меньше 1 или больше 30!"
      }),
      photosLayout: t.Files({
         minItems: 1,
         maxItems: 30, 
         error: "Фоток не может быть меньше 1 или больше 30!"
      }),
   }),
   addTentantObject: t.Array(
      t.Object({
         tentantId: t.String(),
         indexation: t.Number(),
         contract: t.String(),
         detalization: t.Array(t.String()),
         rentFlow: t.Object({
            mounth: t.Number(),
            year: t.Number(),
         })
      })
   ),
   editObjectParams: t.Object({
      id: t.String({
         error: "id обязательно для редактирования обьекта!",
      }),
   }),
   editObjectBody: t.Partial(
      t.Object(
         {
            // not nested
            title: t.String({ error: "Заголовок должен быть строкой!" }),
            address: t.String({ error: "Адресс должен быть строкой!" }),
            description: t.String({ error: "Описание должно быть строкой!" }),
            metro: t.String({ error: "Метро должен быть строкой!" }),
            agentRemuneration: t.Numeric({ error: "Вознаграждение агента должна быть нумеральбельной строкой" }),
            payback: t.Numeric({ 
               error: "Окупаемость должна быть нумеральбельной строкой",
            }),
            zone: t.BooleanString({ error: "Зона погрузки/разгрузки должна быть booleanLike строкой!" }),

            // info
            infoSquare: t.Numeric({ error: "Площадь может быть только нумероподобным числом!" }),
            infoTypeWindow: t.String({ error: "Тип окна может быть только строкой!" }),
            infoLayout: t.String({ error: "Описание планировки может быть только строкой!" }),
            infoCountEntrance: t.Numeric({ error: "Количество входов может быть только нумероподобным числом!" }),
            infoEnter: t.String({ error: "Вход может быть только строкой!" }),
            infoCeilingHeight: t.Numeric({ error: "Высота потолков может быть только нумероподобным числом!" }),
            infoFinishing: t.String({ error: "Отделка может быть только строкой!" }),
            infoTo: t.Numeric({ error: "От может быть только нумероподобным числом!" }),
            infoFrom: t.Numeric({ error: "До может быть только нумероподобным числом!" }),
            infoFloor: t.Numeric({ error: "Этаж может быть только нумероподобным числом!" }),
            infoForce: t.Numeric({ error: "Эл. мощность может быть только нумероподобным числом!" }),
            infoGlazzing: t.Numeric({ error: "Остекление может быть только нумероподобным числом!" }), 
            infoHood: t.BooleanString({ error: "Вытяжка должна быть booleanLike строкой!" }),
            
            // price
            priceSquare: t.Numeric({ error: "Стоймость за кв метр может быть только нумероподобным числом!" }),
            priceProfitability: t.Numeric({ error: "Доходность может быть только нумероподобным числом!" }),
            priceGlobal: t.Numeric({ error: "Цена может быть только нумероподобным числом!" }),
            priceRentYear: t.Numeric({ error: "Арендная ставка в год может быть только нумероподобным числом!" }),
            priceRentMouth: t.Numeric({ error: "Арендная ставка в месяц может быть только нумероподобным числом!" }),

            // panorama
            panoramaLat: t.Numeric({ error: "Широта может быть только нумероподобным числом!" }), 
            panoramaLon: t.Numeric({ error: "Долгота может быть только нумероподобным числом!" }),

            // only ready bussiness
            globalRentFlowYear: t.Numeric({ error: "Годовой арендный поток может быть только нумероподобным числом!" }),
            globalRentFlowMouth: t.Numeric({ error: "Месячный арендный поток может быть только нумероподобным числом!" }),
            
            // photos
            photos: t.Files({
               minItems: 1,
               maxItems: 30,
               error: "Фото обьекта могут быть от 1 до 30!"
            }),
            photosLayout: t.Files({
               minItems: 1,
               maxItems: 30,
               error: "Фото планировки обьекта могут быть от 1 до 30!"
            }),
         
         },
         {
            error: "Такое поле не предусмотрено!",
            additionalProperties: true,
         }
      )
   ),
   
});
// t.Partial(
//    t.Object(
//       {
//          // public
//          title: t.String({ error: "Заголовок может быть только строкой!" }),
//          address: t.String({ error: "Адрес может быть только строкой!" }),

//          metro: t.String({ error: "Метро может быть только строкой!" }),
//          zone: t.Union(
//             [
//                t.Literal('false'),
//                t.Literal('true'),
//             ], 
//             {
//                error: "Зона погрузки/разгрузки может быть только false или true"
//             }
//          ),
//          description: t.String({ error: "Описание может быть только строкой!" }),
//          agentRemuneration: NormalNumeric({ error: "Вознаграждение агентов может только нумероподобным числом!" }),
//          payback: NormalNumeric({ error: "Окупаемость может быть только нумероподоным числом!" }),

//          // info
         // infoSquare: NormalNumeric({ error: "Площадь может быть только нумероподобным числом!" }),
         // infoTypeWindow: t.String({ error: "Тип окна может быть только строкой!" }),
         // infoLayout: t.String({ error: "Описание планировки может быть только строкой!" }),
         // infoCountEntrance: NormalNumeric({ error: "Количество входов может быть только нумероподобным числом!" }),
         // infoEnter: t.String({ error: "Вход может быть только строкой!" }),
         // infoCeilingHeight: NormalNumeric({ error: "Высота потолков может быть только нумероподобным числом!" }),
         // infoFinishing: t.String({ error: "Отделка может быть только строкой!" }),
         // infoTo: NormalNumeric({ error: "От может быть только нумероподобным числом!" }),
         // infoFrom: NormalNumeric({ error: "До может быть только нумероподобным числом!" }),
         // infoFloor: NormalNumeric({ error: "Этаж может быть только нумероподобным числом!" }),
         // infoForce: NormalNumeric({ error: "Эл. мощность может быть только нумероподобным числом!" }),
         // infoGlazzing: NormalNumeric({ error: "Остекление может быть только нумероподобным числом!" }),       
//          infoHood: t.Union(
//             [
//                t.Literal('false'),
//                t.Literal('true'),
//             ], 
//             {
//                error: "Вытяжка может быть только false или true"
//             }
//          ),
         // // price
         // priceSquare: NormalNumeric({ error: "Стоймость за кв метр может быть только нумероподобным числом!" }),
         // priceProfitability: NormalNumeric({ error: "Доходность может быть только нумероподобным числом!" }),
         // priceGlobal: NormalNumeric({ error: "Цена может быть только нумероподобным числом!" }),
         // priceRentYear: NormalNumeric({ error: "Арендная ставка в год может быть только нумероподобным числом!" }),
         // priceRentMouth: NormalNumeric({ error: "Арендная ставка в месяц может быть только нумероподобным числом!" }),

//          // panorama 
         // panoramaLat: NormalNumeric({ error: "Широта может быть только нумероподобным числом!" }),
         // panoramaLon: NormalNumeric({ error: "Долгота может быть только нумероподобным числом!" }),

         // // only ready bussiness
         // globalRentFlowYear: NormalNumeric({ error: "Годовой арендный поток может быть только нумероподобным числом!" }),
         // globalRentFlowMouth: NormalNumeric({ error: "Месячный арендный поток может быть только нумероподобным числом!" }),

         // // photos
         // photos: 
         // //t.Optional(
         //    t.Files({
         //       minItems: 0,
         //       maxItems: 30,
         //       error: "Фото обьекта могут быть от 1 до 30!"
         //    }),
         // //),
         // photosLayout: 
         // //t.Optional( 
         //    t.Files({
         //       minItems: 0,
         //       maxItems: 30,
         //       error: "Фото планировки обьекта могут быть от 1 до 30!"
         //    }),
         // //),
//       },
//       {
//          error: "Такого поля не может быть!",
//          title: "Редактирование обьектов",
//       }
//    ),
// )

// t.Required(
//    t.Object(
//       {
//          // public
//          title: t.Optional(
//             t.String({ error: "Заголовок может быть только строкой!" })
//          ),
//          address: t.Optional(
//             t.String({ error: "Адрес может быть только строкой!" }),
//          ),
//          metro: t.Optional(
//             t.String({ error: "Метро может быть только строкой!" })
//          ),
//          zone: t.Optional(
//             t.Union(
//                [
//                   t.Literal('false'),
//                   t.Literal('true'),
//                ], 
//                {
//                   error: "Зона погрузки/разгрузки может быть только false или true"
//                }
//             ),
//          ),
//          description: t.Optional(
//             t.String({ error: "Описание может быть только строкой!" })
//          ),
//          agentRemuneration: t.Optional(
//             t.Numeric({ error: "Вознаграждение агентов может только нумероподобным числом!" })
//          ),
//          payback: t.Optional(
//             t.Numeric({ error: "Окупаемость может быть только нумероподоным числом!" })
//          ),

//          // info
//          infoSquare: t.Optional(
//             t.Numeric({ error: "Площадь может быть только нумероподобным числом!" })
//          ),
//          infoTypeWindow: t.Optional(
//             t.String({ error: "Тип окна может быть только строкой!" })
//          ),
//          infoLayout: t.Optional(
//             t.String({ error: "Описание планировки может быть только строкой!" })
//          ),
//          infoCountEntrance: t.Optional(
//             t.Numeric({ error: "Количество входов может быть только нумероподобным числом!" })
//          ),
//          infoEnter: t.Optional(
//             t.String({ error: "Вход может быть только строкой!" })
//          ),
//          infoCeilingHeight: t.Optional(
//             t.Numeric({ error: "Высота потолков может быть только нумероподобным числом!" })
//          ),
//          infoFinishing: t.Optional(
//             t.String({ error: "Отделка может быть только строкой!" })
//          ),
//          infoTo: t.Optional(
//             t.Numeric({ error: "От может быть только нумероподобным числом!" })
//          ),
//          infoFrom: t.Optional(
//             t.Numeric({ error: "До может быть только нумероподобным числом!" })
//          ),
//          infoFloor: t.Optional(
//             t.Numeric({ error: "Этаж может быть только нумероподобным числом!" })
//          ),
//          infoForce: t.Optional(
//             t.Numeric({ error: "Эл. мощность может быть только нумероподобным числом!" })
//          ),
//          infoGlazzing: t.Optional(
//             t.Numeric({ error: "Остекление может быть только нумероподобным числом!" })
//          ),            
//          infoHood: t.Optional(
//             t.Union(
//                [
//                   t.Literal('false'),
//                   t.Literal('true'),
//                ], 
//                {
//                   error: "Вытяжка может быть только false или true"
//                }
//             )
//          ),

//          // price
//          priceSquare: t.Optional(
//             t.Numeric({ error: "Стоймость за кв метр может быть только нумероподобным числом!" })
//          ),
//          priceProfitability: t.Optional(
//             t.Numeric({ error: "Доходность может быть только нумероподобным числом!" })
//          ),
//          priceGlobal: t.Optional(
//             t.Numeric({ error: "Цена может быть только нумероподобным числом!" })
//          ),
//          priceRentYear: t.Optional(
//             t.Numeric({ error: "Арендная ставка в год может быть только нумероподобным числом!" })
//          ),
//          priceRentMouth: t.Optional(
//             t.Numeric({ error: "Арендная ставка в месяц может быть только нумероподобным числом!" })
//          ),

//          // panorama 
//          panoramaLat: t.Optional(
//             t.Numeric({ error: "Широта может быть только нумероподобным числом!" })
//          ),
//          panoramaLon: t.Optional(
//             t.Numeric({ error: "Долгота может быть только нумероподобным числом!" })
//          ),

//          // only ready bussiness
//          globalRentFlowYear: t.Optional(
//             t.Numeric({ error: "Годовой арендный поток может быть только нумероподобным числом!" })
//          ),
//          globalRentFlowMouth: t.Optional(
//             t.Numeric({ error: "Месячный арендный поток может быть только нумероподобным числом!" })
//          ),

//          // photos
//          photos: 
//          //t.Optional(
//             t.Files({
//                minItems: 0,
//                maxItems: 30,
//                error: "Фото обьекта могут быть от 1 до 30!"
//             }),
//          //),
//          photosLayout: 
//          //t.Optional( 
//             t.Files({
//                minItems: 0,
//                maxItems: 30,
//                error: "Фото планировки обьекта могут быть от 1 до 30!"
//             }),
//          //),
//       },
//       {
//          error: "Такого поля не может быть!",
//          title: "Редактирование обьектов",
//       }
//    ),  
// )
