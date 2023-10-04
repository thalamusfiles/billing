//import { makeObservable } from 'mobx';
import { createContext, useContext } from 'react';

export class LoginCtrl {
  /*constructor() {
    // Modifica classe pra ser observável
    makeObservable(this);
  }*/
}

export const LoginContext = createContext({} as LoginCtrl);
export const LoginProvider = LoginContext.Provider;
export const useLoginStore = (): LoginCtrl => useContext(LoginContext);
