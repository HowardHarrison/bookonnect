// src/state/bookApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BaseUrl = import.meta.env.VITE_BASE_URL as string;

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BaseUrl}/books` }), // change this when deployed
  endpoints: (builder) => ({
    getBooks: builder.query<any[], void>({
      query: () => '/',
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
