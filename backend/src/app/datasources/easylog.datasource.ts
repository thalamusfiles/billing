import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import easylogConfig from 'src/config/easylog.config';

class EasyLogApiConfigure {
  apiEasyLog!: AxiosInstance;

  /**
   * Intercepta todas as requisições
   * @param config
   */
  requestInterceptors = (config: any) => {
    //if (this.token) config.headers.Authorization = 'Bearer ' + this.token;
    return config;
  };

  axiosStart = (config: AxiosRequestConfig): AxiosInstance => {
    const api = axios.create(config);
    api.interceptors.request.use(this.requestInterceptors);
    return api;
  };

  initApi = () => {
    this.apiEasyLog = this.axiosStart({
      baseURL: easylogConfig.EASYLOGGER_URLS!,
      timeout: 115000,
      withCredentials: true,
    });
  };
}

const Api = new EasyLogApiConfigure();
Api.initApi();

interface EasyLogApiDataSourceI {
  // Retorna a quantidade de serviços utilizados no mes atual.
  findUserActions(useruuid: string, time?: string): Promise<AxiosResponse<Array<any>>>;
}

export class EasyLogApiDataSource implements EasyLogApiDataSourceI {
  async findUserActions(useruuid: string, time?: string): Promise<AxiosResponse<Array<any>>> {
    const body = { where: { data: { user: useruuid || '' } } } as Record<string, any>;
    if (time) {
      body.where.time = { $gte: time };
    }
    return await Api.apiEasyLog.post(easylogConfig.EASYLOGGER_PRODUCT_INDEX + '/_search', body);
  }
}

export default EasyLogApiDataSource;
