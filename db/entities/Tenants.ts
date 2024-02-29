import { 
   Property, 
   Entity, 
   OneToOne,
   ManyToOne,
} from "@mikro-orm/core";
import type { Rel } from "@mikro-orm/core"; 

import { BaseEntity } from "./BaseEntity.ts";
import { Objects } from "./Object.ts"; 
import { Images } from "./Images.ts";

import type { Tenant as TenantType } from "../../types/tenant.types";
import { EntityManager } from "@mikro-orm/mongodb";


@Entity()
export class Tenant extends BaseEntity {
   @Property({ nullable: false })
   public name: string;

   @Property({ nullable: false })
   public category: string;

   @OneToOne({
      eager: true,
      entity: () => Images,
      owner: true,
      unique: false,
   }) 
   logo!: Rel<Images>;

   @ManyToOne(() => Objects, {
      mapToPk: true,
      serializedPrimaryKey: true,
      nullable: true,
      default: null,
      unique: false,
   })
   object!: Rel<Objects>

   constructor({
      name, 
      logo,
      category,
   }: TenantType) {
      super();

      this.name = name;
      this.logo = logo;
      this.category = category;
   };
};