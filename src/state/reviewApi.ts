import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "types/Index";
import { Review } from "types/Review";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ["Review"],

  endpoints: (builder) => ({
    // ✅ Create or Update Review
    upsertReview: builder.mutation<
      Review,
      { userId?: string; bookId: string; rating: number; comment: string }
    >({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { bookId, userId }) => [
        { type: "Review", id: bookId },
        { type: "Review", id: `user-${userId}-${bookId}` },
      ],
    }),

    // ✅ Get All Reviews for a Book
    getReviewsByBook: builder.query<Review[], string>({
      query: (bookId) => `/reviews/book/${bookId}`,
      providesTags: (result, error, bookId) => [{ type: "Review", id: bookId }],
    }),

    // ✅ Get User's Own Review for a Book
    getUserReview: builder.query<
      Review | null,
      { userId?: string; bookId: string }
    >({
      query: ({ userId, bookId }) => `/reviews/user?userId=${userId}&bookId=${bookId}`,
      providesTags: (result, error, { userId, bookId }) =>
        result ? [{ type: "Review", id: `user-${userId}-${bookId}` }] : [],
    }),

    // ✅ Delete Review
    deleteReview: builder.mutation<
      { message: string },
      { userId?: string; bookId: string }
    >({
      query: ({ userId, bookId }) => ({
        url: `/reviews?userId=${userId}&bookId=${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { bookId, userId }) => [
        { type: "Review", id: bookId },
        { type: "Review", id: `user-${userId}-${bookId}` },
      ],
    }),
  }),
});

export const {
  useUpsertReviewMutation,
  useGetReviewsByBookQuery,
  useGetUserReviewQuery,
  useDeleteReviewMutation,
} = reviewApi;
