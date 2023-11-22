import { Controller, Get, Request, Logger } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import RegisterApiDataSource from 'src/app/datasources/easylog.datasource';
import { RequestInfo } from 'src/commons/request-info';
import { ProductService } from '../service/product.service';

@Controller('rels/user')
export class UserUsageRelsController {
  private readonly logger = new Logger(UserUsageRelsController.name);

  constructor(private readonly productService: ProductService) {
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
  async servicesUsedInTheMonth(@Request() request?: RequestInfo): Promise<any> {
    this.logger.log('servicesUsedInTheMonth');

    // Coleta
    const response = await new RegisterApiDataSource().findUserActions(request?.user?.iss);

    const data = response.data || [];
    const totalsObj = data.reduce((totals, curr) => {
      const logData = curr.data;
      const productName = logData.product;
      if (!totals[productName]) {
        totals[productName] = 1;
      } else {
        totals[productName]++;
      }

      return totals;
    }, {});

    const productNamesUsed = Object.keys(totalsObj);
    const products = await this.productService.findByNamesWithCost(productNamesUsed);

    return products.map((product) => {
      const amountUse = totalsObj[product.name];
      const productCost = product.costs[0]; // TODO coletar o último custo

      return {
        product_name: product.name,
        product_description: product.description,
        product_cost: productCost.cost,
        ammout_use: amountUse,
        total_cost: productCost.cost * amountUse,
      };
    });
  }
}
