import { Elysia } from "elysia";

const router: Elysia = new Elysia({ prefix: '/api/v1' });

import { objectConvertField } from "../src/helpers/converTo";

import { objectModel } from "../models/object.model"; 
import { tenantModel } from "../models/tentan.model"; 

import responce from "../src/helpers/responce";

import { ApiController } from "../controller/apiController";

const controller: ApiController = new ApiController();


// get
router
.use(objectModel)
.get('/tentant', controller.getTentant)
.get('/object', controller.getObjects)
.get('/object/:type', controller.getObjects, {
   params: 'getObject',
})



// post object
router
.post('/object', controller.createNewObject, 
{
   // @ts-ignore
   transform({ body, set }) {
      objectConvertField<unknown>([
         // all
         { convert: 'number', field: 'agentRemuneration' },
         { convert: 'boolean', field: 'zone' },

         // only ready bus
         { convert: 'number', field: 'payback' },

         // info
         { convert: 'number', field: 'infoSquare' },
         { convert: 'number', field: 'infoCeilingHeight' },
         { convert: 'number', field: 'infoTo' },
         { convert: 'number', field: 'infoFrom' },
         { convert: 'number', field: 'infoFloor' },
         { convert: 'number', field: 'infoCountEntrance' },
         { convert: 'number', field: 'infoGlazing' },
         { convert: 'boolean', field: 'infoHood' },

         // price
         { convert: 'number', field: 'priceSquare' },
         { convert: 'number',  field: 'priceValue' },
         { convert: 'number', field: 'priceProfitability' },
         { convert: 'number', field: 'priceGlobal' },
         { convert: 'number', field: 'priceRentYear' },
         { convert: 'number', field: 'priceRentMouth' },

         // tentansInfo 
         { convert: 'number', field: 'tenantsInfoRentFlowMount' }, 
         { convert: 'number', field: 'tenantsInfoRentFlowYear' },
         { convert: 'number', field: 'tenantsInfoDateContractRents' },

         // panorama
         { convert: 'number', field: 'panoramaLat' },
         { convert: 'number', field: 'panoramaLon' },
      ], body);
   },
   beforeHandle({ body, set }) {
      // Выдавать конкретное поле либо infoTo or infoFrom, or [infoTo, infoFrom]
      if(body.infoCeilingHeight !== undefined && (body.infoFrom !== undefined || body.infoTo !== undefined)) 
      return responce.failureWithErrors<any>({
         set,
         errors: [
            {
               field: 'infoTo',
               message: 'Не может быть заполено если заполненно поле ceilingHeight'
            },
            {
               field: 'infoFrom',
               message: 'Не может быть заполено если заполненно поле ceilingHeight'
            }, 
            {
               field: 'infoCellingHeigth',
               message: 'Не может быть заполенно если заполенно to или from'
            }
         ],
      }) 
   },
   type: 'multipart/form-data',
});

// post tentant
router
.use(tenantModel)
.post('/tentant', controller.createNewTentant, {
   body: 'createTentant',
   type: 'multipart/form-data',
});



export default router;