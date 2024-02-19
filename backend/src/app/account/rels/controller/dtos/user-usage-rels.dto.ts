export type ProductsUsedInTheMonthDto = {
  productCosts?: Array<{
    product_name: string;
    product_description: string;
    product_cost: number;
    ammout_use: number;
    total_cost: number;
  }>;
  costTotal?: number;
  costForecast?: number;
};

export type UserAction = { time: string; data: { product: string; params: Record<string, any> } };
