import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
  },
});

export const {setCategories} = categoriesSlice.actions
export default categoriesSlice