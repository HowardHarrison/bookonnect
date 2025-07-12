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
      { reacted: boolean; totalReactions: number },
      { userId?: string; bookId: string }
    >({
      query: ({ userId, bookId }) => ({
        url: `/reactions/status?userId=${userId}&bookId=${bookId}`,
      }),
      transformResponse: (response: any) => ({
        reacted: response.reacted,
        totalReactions: response.totalReactions,
      }),
    }),
  }),
});

export const { useToggleReactionMutation, useGetReactionStatusQuery } = reactionApi;