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
      timeout: 5000,
      withCredentials: true,
    });
  };
}

const Api = new EasyLogApiConfigure();
Api.initApi();

interface RegisterApiDataSourceI {
  // Retorna a quantidade de serviços utilizados no mes atual.
  findUserActions(useruuid: string): Promise<AxiosResponse<Array<any>>>;
}

export class RegisterApiDataSource implements RegisterApiDataSourceI {
  async findUserActions(useruuid: string): Promise<AxiosResponse<Array<any>>> {
    // TODO filtrar por usuário
    const where = { data: { user: useruuid || '' } };
    return await Api.apiEasyLog.get(easylogConfig.EASYLOGGER_PRODUCT_INDEX, { params: { where } });
  }
}

export default RegisterApiDataSource;
