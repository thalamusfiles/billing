import { BeforeUpdate, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BillingBaseEntity } from './Base/BillingBaseEntity';
import { Product } from './Product';
import { ProductCost } from './ProductCost';
import { Invoice } from './Invoice';

@Entity({ schema: 'public', readonly: true })
export class InvoiceProductCost extends BillingBaseEntity {
  @ManyToOne(() => Invoice, { nullable: false })
  invoice?: Invoice;

  @ManyToOne(() => Product, { nullable: false })
  product?: Product;

  @ManyToOne(() => ProductCost, { nullable: false })
  productCost?: ProductCost;

  @Property({ length: 1024, nullable: false })
  description!: string;

  @Property({ type: 'numeric(10, 4)', nullable: false })
  cost!: number;

  @Property({ type: 'int4', nullable: false })
  amountUsed!: number;

  @Property({ type: 'numeric(13, 4)', nullable: false })
  value!: number;

  @BeforeUpdate()
  async doStuffBeforeUpdate() {
    throw new Error('Cost updated blocked. Please, create a new invoice.');
  }
}
