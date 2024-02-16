import { action, makeObservable, observable } from 'mobx';
import { createContext, useContext } from 'react';
import { ErrosAsList, getFormExceptionErrosToObject } from '../../../commons/error';
import { notify } from '../../../components/Notification';
import type { ErrorListRecord } from '../../../commons/types/ErrorListRecord';
import { DateTime } from 'luxon';
import { UserAction, UserUsageRelsDataSource } from '../../../datasources/rels';

export class AllLogsCtrl {
  constructor() {
    // Modifica classe pra ser observável
    makeObservable(this);
  }

  // AllLogsCtrl
  @observable page = 1;
  @observable perPage = 250;
  @observable filterBegin = '';
  @observable filterEnd = '';

  @observable waiting: boolean | null = null;
  @observable response: Array<UserAction> = [];
  // Erros
  @observable erroMessages: string[] = [];
  @observable erros: ErrorListRecord = {};

  @action
  handleClear = () => {
    this.filterBegin = DateTime.now().minus({ weeks: 1 }).toFormat('dd/MM/yyyy');
    this.filterEnd = '';
    this.response = [];
  };

  @action
  handleBegin = (e: any) => {
    this.filterBegin = this.parseDateString(e.target.value);
  };

  @action
  handleEnd = (e: any) => {
    this.filterEnd = this.parseDateString(e.target.value);
  };

  private parseDateString = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '').substring(0, 8);
    if (numbers.length === 8) {
      const dateTime = DateTime.fromFormat(numbers, 'ddMMyyyy');
      if (dateTime.isValid) {
        return dateTime.toFormat('dd/MM/yyyy');
      }
    }
    return value;
  };

  private parseDate = (value: string) => {
    value = value.replace(/[^\d]/g, '').substring(0, 8);
    if (value.length === 8) {
      const dateTime = DateTime.fromFormat(value, 'ddMMyyyy');
      if (dateTime.isValid) {
        return dateTime;
      }
    }
    return null;
  };

  @action
  handlePreviewsPage = () => {
    if (this.page) {
      this.page--;
    }
    this.search();
  };

  @action
  handleNextPage = () => {
    this.page++;
    this.search();
  };

  @action
  handleSearch = () => {
    this.page = 1;
    this.search();
  };

  @action
  search = () => {
    if (this.waiting) return;

    this.waiting = true;
    this.erroMessages = [];
    this.erros = {};

    const filters = {
      where: {},
      page: this.page,
      perPage: this.perPage,
    } as any;
    try {
      const begin = this.parseDate(this.filterBegin);
      const end = this.parseDate(this.filterEnd);
      if (begin && end) {
        filters.where.time = { $gte: begin, $lte: end };
      } else if (begin) {
        filters.where.time = { $gte: begin };
      } else if (begin) {
        filters.where.time = { $lte: end };
      }
    } catch (ex) {
      this.notifyExeption(ex);
      this.waiting = false;
      return;
    }

    new UserUsageRelsDataSource()
      .userActions()
      .then((response) => {
        this.waiting = false;
        this.response = response?.data || [];
      })
      .catch((ex) => {
        this.waiting = false;
        this.response = [];

        const data = ex.response?.data;
        [this.erroMessages, this.erros] = getFormExceptionErrosToObject(data, { splitByConstraints: true }) as ErrosAsList;

        this.notifyExeption(ex);
      });
  };

  notifyExeption = (ex: any) => {
    const status = ex.response?.status;
    const message = ex.message;
    if ([400].includes(status)) return;
    if ([404].includes(status)) {
      notify.warn(`${status}: ${message}`);
    } else if ([400, 500].includes(status)) {
      notify.danger(`${status}: ${message}`);
    } else {
      notify.danger(message);
    }
  };
}

export const AllLogsContext = createContext({} as AllLogsCtrl);
export const AllLogsProvider = AllLogsContext.Provider;
export const useAllLogsCtrlStore = (): AllLogsCtrl => useContext(AllLogsContext);
