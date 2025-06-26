// src/state/bookApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from 'types/Book';
const BaseUrl = import.meta.env.VITE_BASE_URL as string;

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BaseUrl}` }), // change this when deployed
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
