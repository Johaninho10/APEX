import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
  },
  reducers: {
    setTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;
export default transactionsSlice;
