import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "types/Index";

export const reactionApi = createApi({
  reducerPath: 'reactionApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BaseUrl}` }),
  endpoints: (builder) => ({
    toggleReaction: builder.mutation<
      { message: string; reacted: boolean },
      { userId?: string; bookId: string }
    >({
      query: ({ userId, bookId }) => ({
        url: '/reactions',
        method: 'POST',
        body: { userId, bookId },
      }),
    }),

    getReactionStatus: builder.query<
      { reacted: boolean },
      { userId?: string; bookId: string }
    >({
      query: ({ userId, bookId }) =>
        `/reactions/status?userId=${userId}&bookId=${bookId}`,
      transformResponse: (response: { reacted: boolean }) => response,
    }),
  }),
});

export const { useToggleReactionMutation, useGetReactionStatusQuery } = reactionApi;