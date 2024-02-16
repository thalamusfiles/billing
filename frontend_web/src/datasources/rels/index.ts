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

export type UserAction = { product: string; params: Record<string, any> };

interface UserUsageRelsDataSourceI {
  // Retorna a quantidade de serviços utilizados no mes atual.
  getProductsUsedInTheMonth(): Promise<AxiosResponse<UserUsageRelsProductsUsedInTheMonthDto>>;
  // Retorna a quantidade de serviços utilizados no mes atual.
  userActions(): Promise<AxiosResponse<Array<UserAction>>>;
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
  async userActions(): Promise<AxiosResponse<Array<UserAction>>> {
    return await Apis.ApiRels.get(Endpoints.eRelsUserUserActions);
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
