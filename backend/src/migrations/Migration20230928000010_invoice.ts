import { Migration } from '@mikro-orm/migrations';

export class Migration20231124133034 extends Migration {
  async up(): Promise<void> {
    //table invoice
    this.addSql(
      `create table "invoice" (
        "uuid" uuid not null default uuid_generate_v4(), 
        "created_at" timestamptz(0) not null, 
        "updated_at" timestamptz(0) not null, 
        "drawee_uuid" uuid not null, 
        "base_start_date" timestamptz(0) not null, 
        "base_start_end" timestamptz(0) not null, 
        "product_value" numeric(10,0) not null, 
        "discount_value" numeric(10,0) not null, 
        "value" numeric(10,0) not null, 
        
        constraint "invoice_pkey" primary key ("uuid"));`,
    );
    this.addSql('comment on column "invoice"."base_start_date" is \'Data inicial utilizado para consultas dos registros dos serviços \';');
    this.addSql('comment on column "invoice"."base_start_end" is \'Data final utilizado para consultas dos registros dos serviços \';');

    //table invoice_product_cost
    this.addSql(
      `create table "invoice_product_cost" (
        "uuid" uuid not null default uuid_generate_v4(), 
        "created_at" timestamptz(0) not null, 
        "updated_at" timestamptz(0) not null, 
        "invoice_uuid" uuid not null, 
        "product_uuid" uuid not null, 
        "product_cost_uuid" uuid not null, 
        "description" varchar(1024) not null, 
        "cost" numeric(10,0) not null, 
        "amount_used" int not null, 
        "value" numeric(10,0) not null, 
        
        constraint "invoice_product_cost_pkey" primary key ("uuid"));`,
    );

    this.addSql(
      'alter table "invoice" add constraint "invoice_drawee_uuid_foreign" foreign key ("drawee_uuid") references "user" ("uuid") on update cascade;',
    );

    this.addSql(
      'alter table "invoice_product_cost" add constraint "invoice_product_cost_invoice_uuid_foreign" foreign key ("invoice_uuid") references "invoice" ("uuid") on update cascade;',
    );
    this.addSql(
      'alter table "invoice_product_cost" add constraint "invoice_product_cost_product_uuid_foreign" foreign key ("product_uuid") references "product" ("uuid") on update cascade;',
    );
    this.addSql(
      'alter table "invoice_product_cost" add constraint "invoice_product_cost_product_cost_uuid_foreign" foreign key ("product_cost_uuid") references "product_cost" ("uuid") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "invoice" drop constraint "invoice_drawee_uuid_foreign";');

    this.addSql('alter table "invoice_product_cost" drop constraint "invoice_product_cost_invoice_uuid_foreign";');

    this.addSql('drop table if exists "invoice" cascade;');

    this.addSql('drop table if exists "invoice_product_cost" cascade;');
  }
}
