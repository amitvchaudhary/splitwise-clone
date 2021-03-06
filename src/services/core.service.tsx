import { akitaDevtools, persistState, resetStores } from "@datorama/akita";
import React, { createContext, useContext, useRef } from "react";
import SimpleCrypto from "simple-crypto-js";
import { globalQuery, globalStore } from "../stores/global";
import { userStore } from "../stores/user/user.store";
import { Toast } from 'primereact/toast';
import { groupStore } from "../stores/group/group.store";
import { expenseStore } from "../stores/expense/expense.store";

let operationsAllowed: any = {};
const CoreServiceContext = createContext(operationsAllowed);

export const CoreServiceProvider = (props: any) => {
  let persistStorage: any;
  let simpleCrypto: SimpleCrypto;
  const APP_SECRET_KEY = "RpGMFiMmugLdHzPekwcNUGP71PRfGFUR2t9sPGwXw38rxk2f";
  const toast: any = useRef(null);
  
  const setupApplication = () => {
    setupCryptography();
    setupStateManagement();
  };

  const tearDownApplication = () => {
    resetStateManagement();
  };

  const setupCryptography = () => {
    simpleCrypto = new SimpleCrypto(APP_SECRET_KEY);
  };

  const setupStateManagement = () => {
    // if (process && process.env.NODE_ENV !== "production") {
      akitaDevtools();
    // }

    persistStorage = persistState({
      include: ["global", "user", "group", "expense"],
    //   preStorageUpdate(storeName, state) {
    //     // This function is called before storing data into local storgage.
    //     if (simpleCrypto) {
    //       return simpleCrypto.encrypt(state);
    //     }
    //     return state;
    //   },
    //   preStoreUpdate(storeName, state) {
    //     // This function is called before storing data in in-memory storage.
    //     // E.g, what you see in Redux tab in browser.
    //     if (simpleCrypto) {
    //       return simpleCrypto.decrypt(state);
    //     }
    //     return state;
    //   },
    });

    globalStore.update({isLight: false});
    userStore.update([]);
    groupStore.update([]);
    expenseStore.update([]);
  };

  const resetStateManagement = () => {
    resetStores();

    if (persistStorage) {
      // It is important to execute this transaction as async operation because we need to wait for 'resetStores' to complete the process.
      setTimeout(() => {
        persistStorage.clearStore();
      }, 0);
    }
  };

  const showError = (message: string) => {
    toast.current.show({severity: "error", summary: "Error", detail: message});  
  }

  const showWarning = (message: string) => {
    toast.current.show({severity: "warn", summary: "Warning", detail: message});  
  }

  const showInfo = (message: string) => {
    toast.current.show({severity: "info", summary: "Info", detail: message});  
  }

  const showSuccess = (message: string) => {
    toast.current.show({severity: "success", summary: "Success", detail: message});  
  }

  const toggleTheme = () => {
    globalStore.update(state => ({
      isLight: !state.isLight
    }));
  }

  const selectTheme = () => {
    return globalQuery.select(state => state.isLight);
  }

  operationsAllowed = {
    setupApplication,
    tearDownApplication,
    showError,
    showWarning,
    showInfo,
    showSuccess,
    toggleTheme,
    selectTheme
  };

  return (
    <CoreServiceContext.Provider value={operationsAllowed}>
      <Toast ref={toast} baseZIndex={99999999}/>
      {props.children}
    </CoreServiceContext.Provider>
  );
};

export const useCoreService = () => {
  return useContext(CoreServiceContext);
};
