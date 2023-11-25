"use client"
import React from 'react';
import { Provider } from 'react-redux';
import store from '@store';
import MyProvider from './alertProvider'
import { SessionProvider } from 'next-auth/react'
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <MyProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </MyProvider>
    </Provider>
  )
}

export default StoreProvider