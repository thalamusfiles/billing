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
  @observable productsUsedInTheMonth = [] as any[];
  @observable costTotal?: number;
  @observable costForecast?: number;
  @observable invoicesbyProduct = [] as any[];
  @observable invoicesbyProductMonths = [] as string[];
  @observable lastInvoiceTotal?: number;

  // Indica que já foi disparado o init
  started = false;

  @action
  init = () => {
    if (!this.started) {
      this.started = true;

      this.loadUsernInfo();
      this.loadProductsUsedInTheMonth();
      this.loadInvoicesByProductByMonth();
      this.loadLastMonthTotalValue();
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
  loadProductsUsedInTheMonth() {
    new UserUsageRelsDataSource().getProductsUsedInTheMonth().then((response) => {
      const responseData = response.data;

      if (responseData) {
        this.productsUsedInTheMonth = responseData.productCosts;
        this.costTotal = responseData.costTotal;
        this.costForecast = responseData.costForecast;
      }
    });
  }

  @action
  loadInvoicesByProductByMonth() {
    new UserInvoiceRelsDataSource().getInvoicesByProductByMonth().then((response) => {
      const responseData = response.data;

      if (responseData) {
        this.invoicesbyProduct = responseData.byProduct;
        this.invoicesbyProductMonths = responseData.months;
      }
    });
  }

  @action
  loadLastMonthTotalValue() {
    new UserInvoiceRelsDataSource().getLastMonthTotalValue().then((response) => {
      const responseData = response.data;

      if (responseData) {
        this.lastInvoiceTotal = responseData.total;
      }
    });
  }
}

export const AccountHomeContext = createContext({} as AccountHomeCtrl);
export const AccountHomeProvider = AccountHomeContext.Provider;
export const useAccountHomeStore = (): AccountHomeCtrl => useContext(AccountHomeContext);
