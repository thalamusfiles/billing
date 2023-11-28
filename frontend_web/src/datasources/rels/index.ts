import { AxiosResponse } from 'axios';
import Apis from '../apis';
import Endpoints from '../endpoints';

type UserUsageRelsProductsUsedInTheMonthDto = {
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

interface UserUsageRelsDataSourceI {
  // Retorna a quantidade de serviços utilizados no mes atual.
  getProductsUsedInTheMonth(): Promise<AxiosResponse<UserUsageRelsProductsUsedInTheMonthDto>>;
}

type UserInvoiceRelsInvoicesByProductByMonthDto = {
  months: Array<string>;
  byProduct: Array<{}>;
};

type UserInvoiceRelsLastMonthTotalValue = {
  total: number;
};

interface UserInvoiceRelsDataSourceI {
  // Retorna a quantidade de serviços utilizados e custo por mês.
  getInvoicesByProductByMonth(): Promise<AxiosResponse<UserInvoiceRelsInvoicesByProductByMonthDto>>;
  // Retorna o valor faturado no último mês
  getLastMonthTotalValue(): Promise<AxiosResponse<UserInvoiceRelsLastMonthTotalValue>>;
}

export class UserUsageRelsDataSource implements UserUsageRelsDataSourceI {
  async getProductsUsedInTheMonth(): Promise<AxiosResponse<UserUsageRelsProductsUsedInTheMonthDto>> {
    return await Apis.ApiRels.get(Endpoints.eRelsUserProductsUsedInTheMonth);
  }
}

export class UserInvoiceRelsDataSource implements UserInvoiceRelsDataSourceI {
  async getInvoicesByProductByMonth(): Promise<AxiosResponse<UserInvoiceRelsInvoicesByProductByMonthDto>> {
    return await Apis.ApiRels.get(Endpoints.eRelsUserInvoicesByProductByMonth);
  }

  async getLastMonthTotalValue(): Promise<AxiosResponse<UserInvoiceRelsLastMonthTotalValue>> {
    return await Apis.ApiRels.get(Endpoints.eRelsUserLastMonthTotalValue);
  }
}
