import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_API_URL! + "/category";


const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchCategories: build.query({
      query: () => "/",
    }),
  }),
});

export const { useFetchCategoriesQuery } = categoriesApi;
export default categoriesApi;
