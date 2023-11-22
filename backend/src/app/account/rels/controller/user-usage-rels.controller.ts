import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('rels/user')
export class UserUsageRelsController {
  private readonly logger = new Logger(UserUsageRelsController.name);

  constructor() {
    this.logger.log('starting');
  }

  /**
   * Retorna a quantidade de serviços utilizados no mes atual.
   * @param body
   * @returns
   */
  @ApiOperation({ tags: ['Rels'], summary: 'Retorna a quantidade de serviços utilizados no mes atual' })
  @Get('servicesUsedInTheMonth')
  //@UseGuards(IamGuard)
  async servicesUsedInTheMonth(): Promise<any> {
    this.logger.log('servicesUsedInTheMonth');

    return [
      { product_name: '', product_description: '+ IAM', product_cost: 25, ammout_use: 100, total_cost: 2500 },
      { product_name: '', product_description: 'Logins', product_cost: 25, ammout_use: 100, total_cost: 2500 },
      { product_name: '', product_description: '+ Register', product_cost: 25, ammout_use: 100, total_cost: 2500 },
      { product_name: '', product_description: '+ Consulta empresa por documento', product_cost: 25, ammout_use: 100, total_cost: 2500 },
    ];
  }
}
