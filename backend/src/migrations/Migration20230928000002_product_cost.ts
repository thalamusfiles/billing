import { Migration } from '@mikro-orm/migrations';

export class Migration20230928000002_product_cost extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "product_cost" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "product_uuid" uuid not null, "name" varchar(512) not null, "cost" numeric(10,0) not null, constraint "product_cost_pkey" primary key ("uuid"));',
    );

    this.addSql(
      'alter table "product_cost" add constraint "product_cost_product_uuid_foreign" foreign key ("product_uuid") references "product" ("uuid") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "product_cost" drop constraint "product_cost_product_uuid_foreign";');

    this.addSql('drop table if exists "product_cost" cascade;');
  }
}
