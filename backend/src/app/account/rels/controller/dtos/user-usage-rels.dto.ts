export type ServicesUsedInTheMonthDto = {
  productCosts: Array<{
    product_name: string;
    product_description: string;
    product_cost: number;
    ammout_use: number;
    total_cost: number;
  }>;
  costTotal: number;
  costForecast: number;
};
