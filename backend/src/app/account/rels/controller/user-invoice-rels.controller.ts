import { Controller, Get, Request, Logger, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RequestInfo } from 'src/commons/request-info';
import { InvoiceService } from '../service/invoice.service.';
import { AccessGuard } from '../../auth/passaport/access.guard';

@UseGuards(AccessGuard)
@Controller('rels/user')
export class UserInvoiceRelsController {
  private readonly logger = new Logger(UserInvoiceRelsController.name);

  constructor(private readonly invoiceService: InvoiceService) {
    this.logger.log('starting');
  }

  /**
   * Retorna a quantidade de serviços utilizados e custo por mês.
   * @param body
   * @returns
   */
  @ApiOperation({ tags: ['Rels'], summary: 'Retorna a quantidade de serviços utilizados e custo por mês' })
  @Get('invoicesByProductByMonth')
  async invoicesByProductByMonth(@Request() request?: RequestInfo): Promise<any> {
    this.logger.log('invoicesByProduct');

    // Todos os registros
    const all = await this.invoiceService.totalCostAndUsageByServiceByMonth(request.user.sub);

    // Agrupado por produto.
    const byProduct = all.reduce((prev, curr) => {
      if (!prev[curr.product_name]) {
        prev[curr.product_name] = [];
      }
      prev[curr.product_name].push(curr);
      return prev;
    }, {});

    const months = [];
    for (const key in byProduct) {
      const first = byProduct[key];
      for (const total of first) {
        if (!months.includes(total.month)) {
          months.push(total.month);
        }
      }
      break;
    }

    return { all, months, byProduct };
  }

  /**
   * Retorna o valor faturado no último mês
   * @param body
   * @returns
   */
  @ApiOperation({ tags: ['Rels'], summary: 'Retorna o valor faturado no último mês' })
  @Get('lastMonthTotalValue')
  async lastMonthTotalValue(@Request() request?: RequestInfo): Promise<any> {
    this.logger.log('invoicesByProduct');

    // Todos os registros
    const total = await this.invoiceService.lastMonthTotalValue(request.user.sub);

    return { total: total.value };
  }
}
