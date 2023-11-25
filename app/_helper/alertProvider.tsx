import React, { createContext, useContext, useState } from 'react';
import {notification} from 'antd';

interface MyContextType {
  alertFun: (message: string, type:"success"|"error"|"warning") => void;
}



export const Context = createContext<MyContextType | undefined>(undefined);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();
  const defaultMessage = "Default Message"
  const Alert = (message:string,  type:"success"|"error"|"warning") => {
    api[type]({
      message: message || defaultMessage,
      placement:"topRight"
    })
  };
  return (
    <Context.Provider value={{alertFun:Alert}}>
      {contextHolder}
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
