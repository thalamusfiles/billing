import { Migration } from '@mikro-orm/migrations';
import productsNames from '../config/billing.products';

export class Migration20231231000002_create_products extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.AddressFindStates}', '${productsNames.AddressFindStates}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.AddressFindCitiesByState}', '${productsNames.AddressFindCitiesByState}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.EstabFindByZipcode}', '${productsNames.EstabFindByZipcode}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.EstabFindByZipcodeRandom}', '${productsNames.EstabFindByZipcodeRandom}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.EstabFindByBusinessType}', '${productsNames.EstabFindByBusinessType}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.EstabFindByBusinessTypeRandom}', '${productsNames.EstabFindByBusinessTypeRandom}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.ContactFind}', '${productsNames.ContactFind}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.ContactFindRandom}', '${productsNames.ContactFindRandom}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.PersonFindLegalByDocument}', '${productsNames.PersonFindLegalByDocument}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.PersonFindLegalByRandom}', '${productsNames.PersonFindLegalByRandom}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.PersonFindNaturalByDocument}', '${productsNames.PersonFindNaturalByDocument}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.PersonFindNaturalByRandom}', '${productsNames.PersonFindNaturalByRandom}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.TypeKeyValueFindBRCNAES}', '${productsNames.TypeKeyValueFindBRCNAES}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.RelEstabTotalByMonthAndState}', '${productsNames.RelEstabTotalByMonthAndState}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.RelEstabTotalByMonthAndStateCrosstab}', '${productsNames.RelEstabTotalByMonthAndStateCrosstab}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.RelEstabTotalByMonthAndNature}', '${productsNames.RelEstabTotalByMonthAndNature}');`,
    );
    this.addSql(
      `insert into "product" ("created_at", "updated_at", "name", "description") values (CURRENT_DATE, CURRENT_DATE, '${productsNames.RelEstabTotalByMonthAndMainActivity}', '${productsNames.RelEstabTotalByMonthAndMainActivity}');`,
    );

    // Registra um valor (zero) de custa para os custos
    this.addSql(`
    insert into "product_cost" ("created_at", "updated_at", "product_uuid", "cost")
      select CURRENT_DATE, CURRENT_DATE, "product".uuid, 0
      from "product"
      left join "product_cost" pc on pc.product_uuid = "product".uuid
      where pc.product_uuid is null;
    `);
  }

  async down(): Promise<void> {
    this.addSql(`delete from "product" where "name" = '${productsNames.AddressFindStates}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.AddressFindCitiesByState}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.EstabFindByZipcode}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.EstabFindByZipcodeRandom}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.EstabFindByBusinessType}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.EstabFindByBusinessTypeRandom}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.ContactFind}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.ContactFindRandom}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.PersonFindLegalByDocument}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.PersonFindLegalByRandom}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.PersonFindNaturalByDocument}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.PersonFindNaturalByRandom}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.TypeKeyValueFindBRCNAES}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.RelEstabTotalByMonthAndState}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.RelEstabTotalByMonthAndStateCrosstab}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.RelEstabTotalByMonthAndNature}'`);
    this.addSql(`delete from "product" where "name" = '${productsNames.RelEstabTotalByMonthAndMainActivity}'`);
  }
}
