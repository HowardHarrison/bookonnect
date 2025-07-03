// src/state/bookApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from 'types/Book';
const BaseUrl = import.meta.env.VITE_BASE_URL as string;

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BaseUrl}` }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
    }),
    getBookById: builder.query<Book, string>({
      query: (bookID) => `/books/${encodeURIComponent(bookID)}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = bookApi;
