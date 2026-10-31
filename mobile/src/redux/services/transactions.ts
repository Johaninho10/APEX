import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_API_URL + "/transaction";

const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  tagTypes: ["transactions", "summary"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchTransactions: build.query({
      query: ({
        userId,
        page = 1,
        type,
      }: {
        userId: string;
        page?: number;
        type: "EXPENSE" | "INCOME" | "";
      }) => `/${userId}?page=${page}&type=${type}`,
      providesTags: ["transactions"],
    }),
    getSummary: build.query({
      query: (userId: string) => `/summary/${userId}`,
      providesTags: ["summary"],
    }),
    createTransaction: build.mutation({
      query: ({ userId, body }) => ({
        url: `/${userId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["transactions", "summary"],
    }),
    deleteTransaction: build.mutation({
      query: ({ userId, transactionId }) => ({
        url: `/${userId}/${transactionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactions", "summary"],
    }),
    clearTransactions: build.mutation({
      query: (userId: string) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactions", "summary"]
    }),
  }),
});

export const {
  useFetchTransactionsQuery,
  useGetSummaryQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useClearTransactionsMutation,
} = transactionsApi;

export default transactionsApi;
