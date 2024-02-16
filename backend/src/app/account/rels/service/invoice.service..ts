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
   * Retorna a quantidade de serviços utilizados e custo por mês.
   * @param query
   * @returns
   */
  async totalCostAndUsageByServiceByMonth(userUuid: string): Promise<Array<{ month: string; product_name: string; value: number }>> {
    this.logger.verbose('totalCostAndUsageByServiceByMonth');

    const months = this.knex
      .select(this.knex.raw(`cast(date_trunc('month', "period") as date) as month`))
      .from(this.knex.raw(`generate_series(
        date_trunc('month',current_date) - '6 months'::interval, 
        date_trunc('month',current_date) - '1 day'::interval , 
        '1 month'::interval) as "period"`));

    const totals = this.knex
      .select(this.knex.raw("cast(date_trunc('month', inv.base_start_date) as date) as month"))
      .select(this.knex.raw("substring(prod.name, 0, position('.' in prod.name)) as product_name"))
      .sum('invcost.value as value')
      //from
      .from(`${this.invTB} as inv`)
      .innerJoin(`${this.invProdCostTB} as invcost`, `inv.uuid`, `invcost.invoice_uuid`)
      .innerJoin(`${this.prodTB} as prod`, `prod.uuid`, `invcost.product_uuid`)
      //where
      .where('inv.drawee_uuid', userUuid || null)
      .andWhere('inv.base_start_date', '>=', this.knex.raw("CURRENT_DATE - '6 months'::interval"))
      .groupBy('month')
      .groupBy('product_name')
      .orderBy('month');

    const productNames = this.knex.distinct('product_name').from('totals');

    const totalsLastMonths = this.knex
      .with('months', months)
      .with('totals', totals)
      .with('productNames', productNames)
      .select('months.month')
      .select('productNames.product_name')
      .select(this.knex.raw('COALESCE(totals.value, 0) as value'))
      .from('months')
      .crossJoin('productNames', '', '')
      .leftJoin('totals', 'months.month', 'totals.month');
    return await totalsLastMonths;
  }

  /**
   * Retorna o valor faturado no último mês
   * @param query
   * @returns
   */
  async lastMonthTotalValue(userUuid: string): Promise<{ value: number }> {
    this.logger.verbose('totalCostAndUsageByServiceByMonth');

    const totals = this.knex
      .sum('inv.value as value')
      //from
      .from(`${this.invTB} as inv`)
      //where
      .where('inv.drawee_uuid', userUuid || null)
      .andWhere(
        this.knex.raw(`cast(date_trunc('month', inv.base_start_date) as date)`),
        '=',
        this.knex.raw("date_trunc('month', CURRENT_DATE - '1 months'::interval)"),
      );

    return await totals.first();
  }
}
