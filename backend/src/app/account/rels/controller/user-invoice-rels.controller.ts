import { Controller, Get, Request, Logger } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RequestInfo } from 'src/commons/request-info';
import { InvoiceService } from '../service/invoice.service.';

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
  @Get('invoicesByServiceByMonth')
  //@UseGuards(IamGuard)
  async invoicesByServiceByMonth(@Request() request?: RequestInfo): Promise<any> {
    this.logger.log('invoicesByService');

    const byService = await this.invoiceService.totalCostAndUsageByServiceByMonth(request?.user?.iss);

    return { byService };
  }
}
