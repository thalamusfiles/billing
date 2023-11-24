import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BillingBaseEntity } from './Base/BillingBaseEntity';
import { ProductCost } from './ProductCost';

@Entity({ schema: 'public', readonly: true })
export class Product extends BillingBaseEntity {
  @Property({ nullable: false, length: 512 })
  name!: string;

  @Property({ nullable: false, length: 1024 })
  description!: string;

  @Property({ nullable: true })
  deletedAt?: Date;

  @OneToMany(() => ProductCost, (cost) => cost.product)
  costs = new Collection<ProductCost>(this);
}
