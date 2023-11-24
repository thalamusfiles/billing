import { Entity, Property } from '@mikro-orm/core';
import { BillingBaseEntity } from './Base/BillingBaseEntity';

@Entity({ schema: 'public', readonly: true })
export class User extends BillingBaseEntity {
  @Property()
  name: string;
}
