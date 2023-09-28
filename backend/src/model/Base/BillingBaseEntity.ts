import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BillingBaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()', nullable: false })
  uuid: string;

  @Property({ onCreate: () => new Date() })
  createdAt: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt: Date;
}
