import { AxiosResponse } from 'axios';
import Apis from '../apis';
import Endpoints from '../endpoints';

type UserUsageRelsServicesUsedInTheMonthDto = {
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
  getServicesUsedInTheMonth(): Promise<AxiosResponse<UserUsageRelsServicesUsedInTheMonthDto>>;
}

type UserInvoiceRelsInvoicesByServiceByMonthDto = {
  byService: Array<{}>;
};

interface UserInvoiceRelsDataSourceI {
  // Retorna a quantidade de serviços utilizados e custo por mês.
  getInvoicesByServiceByMonth(): Promise<AxiosResponse<UserInvoiceRelsInvoicesByServiceByMonthDto>>;
}

export class UserUsageRelsDataSource implements UserUsageRelsDataSourceI {
  async getServicesUsedInTheMonth(): Promise<AxiosResponse<UserUsageRelsServicesUsedInTheMonthDto>> {
    return await Apis.ApiRels.get(`${Endpoints.eRelsUserServicesUsedInTheMonth}`);
  }
}

export class UserInvoiceRelsDataSource implements UserInvoiceRelsDataSourceI {
  async getInvoicesByServiceByMonth(): Promise<AxiosResponse<UserInvoiceRelsInvoicesByServiceByMonthDto>> {
    return await Apis.ApiRels.get(`${Endpoints.eRelsUserInvoicesByServiceByMonth}`);
  }
}
