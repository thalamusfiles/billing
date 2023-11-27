import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, HttpStatusCode } from 'axios';
import Endpoint from './endpoints';
import { historyPush } from '../commons/route';

class RegisterApisConfigure {
  token = '';
  ApiAuth!: AxiosInstance;
  ApiRels!: AxiosInstance;

  /**
   * Intercepta todas as requisições
   * @param config
   */
  requestInterceptors = (config: any) => {
    if (this.token) config.headers.Authorization = 'Bearer ' + this.token;
    return config;
  };

  onResponseRejectInterceptors = (error: AxiosError) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      historyPush('logout', { open: true, absolute: true });
    }
    return error;
  };

  axiosStart = (config: AxiosRequestConfig): AxiosInstance => {
    const api = axios.create(config);
    api.interceptors.request.use(this.requestInterceptors);
    api.interceptors.response.use(null, this.onResponseRejectInterceptors);
    return api;
  };

  initApis = () => {
    this.ApiAuth = this.axiosStart({
      baseURL: Endpoint.eAuth!,
      timeout: Endpoint.timeout,
      withCredentials: true,
    });
    this.ApiRels = this.axiosStart({
      baseURL: Endpoint.eRels!,
      timeout: Endpoint.timeout,
      withCredentials: true,
    });
  };

  setGlobalAuthorizationToken = (newToken: string): void => {
    this.token = newToken;
  };

  configureConsumer = (baseUrl?: string, basePort?: string): void => {
    Endpoint.configureEndpoint(baseUrl, basePort);
    this.initApis();
  };
}

const Apis = new RegisterApisConfigure();
export default Apis;
