import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'main';
import { Book } from 'types/Book';
import { BaseUrl } from 'types/Index';
import { User } from 'types/User';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseUrl}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, string>({
      query: (userId) => `/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
    }),
    handleSavedBook: builder.mutation<User, { userId?: string; bookId: string }>({
      query: ({ userId, bookId }) => ({
        url: `/${userId}/toggle-book`,
        method: 'PATCH',
        body: { bookId },
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: 'User', id: userId },
      ],
    }),
  }),
});

export const { useGetUserProfileQuery, useHandleSavedBookMutation } = userApi;
