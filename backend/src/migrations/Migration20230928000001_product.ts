import { Migration } from '@mikro-orm/migrations';

export class Migration20230928000001_product extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "product" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(512) not null, "description" varchar(1024) not null, "deleted_at" timestamptz(0) null, constraint "product_pkey" primary key ("uuid"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "product" cascade;');
  }
}
