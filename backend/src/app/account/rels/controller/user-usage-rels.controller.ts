import { Controller, Get, Request, Logger, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import EasyLogApiDataSource from 'src/app/datasources/easylog.datasource';
import { RequestInfo } from 'src/commons/request-info';
import { ProductService } from '../service/product.service';
import { ProductCostService } from '../service/product-cost.service';
import { ProductsUsedInTheMonthDto, UserAction } from './dtos/user-usage-rels.dto';
import { AccessGuard } from '../../auth/passaport/access.guard';

@UseGuards(AccessGuard)
@Controller('rels/user')
export class UserUsageRelsController {
  private readonly logger = new Logger(UserUsageRelsController.name);

  constructor(
    private readonly productService: ProductService,
    private readonly productCostService: ProductCostService,
  ) {
    this.logger.log('starting');
  }

  /**
   * Retorna a quantidade de serviços utilizados no mes atual.
   * @param body
   * @returns
   */
  @ApiOperation({ tags: ['Rels'], summary: 'Retorna a quantidade de serviços utilizados no mes atual' })
  @Get('productsUsedInTheMonth')
  async productsUsedInTheMonth(@Request() request?: RequestInfo): Promise<ProductsUsedInTheMonthDto> {
    this.logger.log('productsUsedInTheMonth');

    // Coleta
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const response = await new EasyLogApiDataSource().findUserActions(request.user.sub, startMonth.toISOString());

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

    const productCosts = products.map((product) => {
      const amountUse = totalsObj[product.name];
      const productCost = product.costs[0]; // TODO coletar o último custo

      return {
        product_name: product.name,
        product_description: product.description,
        product_cost: productCost.cost,
        ammout_use: amountUse,
        total_cost: this.productCostService.roundFinalCostValue(productCost.cost * amountUse),
      };
    });

    const costTotal = productCosts.reduce((prev, curr) => prev + curr.total_cost, 0);
    const costForecast = this.productCostService.roundFinalCostValue(this.productCostService.calculateCostForecast(costTotal));

    return { productCosts, costTotal, costForecast };
  }

  /**
   * Retorna a quantidade de serviços utilizados no mes atual.
   * @param body
   * @returns
   */
  @ApiOperation({ tags: ['Rels'], summary: 'Retorna o histórico de atividades do usuário' })
  @Get('userActions')
  async userActions(@Request() request?: RequestInfo): Promise<Array<UserAction>> {
    this.logger.log('userActions');

    // Coleta
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const response = await new EasyLogApiDataSource().findUserActions(request.user.sub, startMonth.toISOString());

    return response.data;
  }
}
