import { action, makeObservable, observable } from 'mobx';
import { createContext, useContext } from 'react';
import { UserInvoiceRelsDataSource, UserUsageRelsDataSource } from '../../../datasources/rels';

export class AccountHomeCtrl {
  constructor() {
    // Modifica classe pra ser observável
    makeObservable(this);
  }

  // Informações do usuário logado
  @observable me = null as any;
  @observable servicesUsedInTheMonth = [] as any[];
  @observable costTotal?: number;
  @observable costForecast?: number;
  @observable invoicesByServiceByMonth = [] as any[];

  // Indica que já foi disparado o init
  started = false;

  @action
  init = () => {
    if (!this.started) {
      this.started = true;

      this.loadUsernInfo();
      this.loadServicesUsedInTheMonth();
      this.loadInvoicesByServiceByMonth();
    }
  };

  @action
  loadUsernInfo = () => {
    /*new MeDataSource().me().then((response) => {
      const responseData = response.data;
      this.me = responseData;
    });*/
  };

  @action
  loadServicesUsedInTheMonth() {
    new UserUsageRelsDataSource().getServicesUsedInTheMonth().then((response) => {
      const responseData = response.data;

      this.servicesUsedInTheMonth = responseData.productCosts;
      this.costTotal = responseData.costTotal;
      this.costForecast = responseData.costForecast;
    });
  }

  @action
  loadInvoicesByServiceByMonth() {
    new UserInvoiceRelsDataSource().getInvoicesByServiceByMonth().then((response) => {
      const responseData = response.data;

      this.invoicesByServiceByMonth = responseData.byService;
    });
  }
}

export const AccountHomeContext = createContext({} as AccountHomeCtrl);
export const AccountHomeProvider = AccountHomeContext.Provider;
export const useAccountHomeStore = (): AccountHomeCtrl => useContext(AccountHomeContext);
