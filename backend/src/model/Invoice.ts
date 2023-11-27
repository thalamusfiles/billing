import { Collection, BeforeUpdate, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { BillingBaseEntity } from './Base/BillingBaseEntity';
import { User } from './User';
import { InvoiceProductCost } from './InvoiceProductCost';

@Entity({ schema: 'public' })
export class Invoice extends BillingBaseEntity {
  @ManyToOne(() => User, { nullable: false })
  drawee?: User;

  @Property({ onCreate: () => new Date(), comment: 'Data inicial utilizado para consultas dos registros dos serviços ' })
  baseStartDate: Date;

  @Property({ onCreate: () => new Date(), comment: 'Data final utilizado para consultas dos registros dos serviços ' })
  baseStartEnd: Date;

  @Property({ type: 'numeric(13, 4)', nullable: false })
  productValue!: number;

  @Property({ type: 'numeric(13, 4)', nullable: false })
  discountValue!: number;

  @Property({ type: 'numeric(13, 4)', nullable: false })
  value!: number;

  @OneToMany(() => InvoiceProductCost, (invoice) => invoice.invoice)
  costs = new Collection<InvoiceProductCost>(this);

  @BeforeUpdate()
  async doStuffBeforeUpdate() {
    throw new Error('Cost updated blocked. Please, create a new cost.');
  }
}
