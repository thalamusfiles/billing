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

export class UserUsageRelsDataSource implements UserUsageRelsDataSourceI {
  async getServicesUsedInTheMonth(): Promise<AxiosResponse<UserUsageRelsServicesUsedInTheMonthDto>> {
    return await Apis.ApiRels.get(`${Endpoints.eRelsUserServicesUsedInTheMonth}`);
  }
}
