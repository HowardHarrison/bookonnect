// src/state/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'main';
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
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, string>({
      query: (userId) => `/${userId}`, 
    }),
  }),
});

export const { useGetUserProfileQuery } = userApi;
