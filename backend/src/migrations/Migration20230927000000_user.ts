import { Migration } from '@mikro-orm/migrations';

export class Migration20231124133034 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "user" (
        "uuid" uuid not null default uuid_generate_v4(), 
        "created_at" timestamptz(0) not null, 
        "updated_at" timestamptz(0) not null, 
        "name" varchar(255) not null, 
        
        constraint "user_pkey" primary key ("uuid")
        );`,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }
}
