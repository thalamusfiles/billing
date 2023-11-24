import { BeforeUpdate, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BillingBaseEntity } from './Base/BillingBaseEntity';
import { Product } from './Product';
import { User } from './User';

@Entity({ schema: 'public', readonly: true })
export class ProductCost extends BillingBaseEntity {
  @ManyToOne(() => Product, { nullable: false })
  product?: Product;

  @ManyToOne(() => Product, { nullable: true })
  createdBy: User;

  @Property({ type: 'numeric(10, 4)', nullable: false })
  cost!: number;

  @BeforeUpdate()
  async doStuffBeforeUpdate() {
    throw new Error('Cost updated blocked. Please, create a new invoice.');
  }
}
