import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_API_URL + "/transaction";

const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  tagTypes: ["transactions"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchTransactions: build.query({
      query: (userId: string) => `/${userId}`,
    }),
    createTransaction: build.mutation({
      query: ({ userId, body }) => ({
        url: `/${userId}`,
        method: "POST",
        body,
      }),
    }),
    deleteTransaction: build.mutation({
      query: ({ userId, transactionId }) => ({
        url: `/${userId}/${transactionId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;

export default transactionsApi;
