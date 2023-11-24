import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { Invoice } from 'src/model/Invoice';
import { Knex, PostgreSqlConnection } from '@mikro-orm/postgresql';
import { InvoiceProductCost } from 'src/model/InvoiceProductCost';
import { Product } from 'src/model/Product';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);
  private readonly knex: Knex;

  private readonly invTB;
  private readonly invProdCostTB;
  private readonly prodTB;

  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: EntityRepository<Invoice>,
  ) {
    this.logger.log('starting');

    this.knex = (this.invoiceRepository.getEntityManager().getConnection('read') as PostgreSqlConnection).getKnex();

    this.invTB = this.invoiceRepository.getEntityManager().getMetadata().get(Invoice.name).tableName;
    this.invProdCostTB = this.invoiceRepository.getEntityManager().getMetadata().get(InvoiceProductCost.name).tableName;
    this.prodTB = this.invoiceRepository.getEntityManager().getMetadata().get(Product.name).tableName;
  }

  /**
   * Busca por vários registros
   * @param query
   * @returns
   */
  async totalCostAndUsageByServiceByMonth(userUuid: string): Promise<any[]> {
    this.logger.verbose('totalCostAndUsageByServiceByMonth');

    const query = this.knex
      .distinct(this.knex.raw('current_timestamp as base_start_date'))
      .distinct(this.knex.raw("substring(name, 0, position('.' in name)) as product_name"))
      .distinct(this.knex.raw('100 as value'))
      .from('product');

    return await query;

    /*const query = this.knex
      .select('inv.base_start_date')
      .select(this.knex.raw("substring(prod.name, 0, position('.' in prod.name)) as product_name"))
      .sum('invcost.value')
      //from
      .from(`${this.invTB} as inv`)
      .leftJoin(`${this.invProdCostTB} as invcost`, `inv.uuid`, `invcost.invoice_uuid`)
      .leftJoin(`${this.prodTB} as prod`, `prod.uuid`, `invcost.product_uuid`)
      //where
      .where('inv.drawee_uuid', userUuid || null)
      .andWhere('inv.base_start_date', '>=', this.knex.raw("CURRENT_DATE - interval '7 months'"))
      .groupBy('inv.base_start_date')
      .groupBy('invcost.product_uuid')
      .orderBy('inv.base_start_date');
    return await query;*/
  }
}
