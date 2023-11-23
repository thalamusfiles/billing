import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProductCostService {
  private readonly logger = new Logger(ProductCostService.name);

  constructor() {
    this.logger.log('starting');
  }

  /**
   * Calcula a previsão de custo para o mes atual
   * @param query
   * @returns
   */
  calculateCostForecast(cost: number): number {
    const now = new Date();
    const lastMonthDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const today = now.getDate();
    const lastDay = lastMonthDay.getDate();

    return (cost / today) * lastDay;
  }

  /**
   * Arredonda o valor para duas casas decimais,
   * Utilizar essa função quando for exibir o total a ser pago,
   * não utilizar esta função para contabilizar o custo
   */
  roundFinalCostValue(cost: number): number {
    return Math.round(cost * 100) / 100;
  }
}
