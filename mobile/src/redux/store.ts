import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import transactionsApi from "./services/transactions";
import categoriesApi from "./services/categories";
import transactionsSlice from "./features/transactions";
import categoriesSlice from "./features/categories";

const store = configureStore({
  reducer: {
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    transactions: transactionsSlice.reducer,
    categories: categoriesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      transactionsApi.middleware,
      categoriesApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
