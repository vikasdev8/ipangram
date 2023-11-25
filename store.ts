import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApis } from '@app/_RTK_Query/authentication_query';

const store = configureStore({
  reducer: {
    [authApis.reducerPath]: authApis.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApis.middleware),
})

setupListeners(store.dispatch)

export default store