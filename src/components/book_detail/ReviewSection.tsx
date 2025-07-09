import { Box, Typography, Stack, Avatar, Divider } from "@mui/material";
import { useGetReviewsByBookQuery } from "../../state/reviewApi";
import { Star } from "@mui/icons-material";
import dayjs from "dayjs";
import { useEffect } from "react";

type ReviewSectionProps = {
    bookId: string;
};

const ReviewSection = ({ bookId }: ReviewSectionProps) => {
    const { data: reviews = [], isLoading, error, refetch, } = useGetReviewsByBookQuery(bookId, {
        selectFromResult: (result) => ({
            ...result,
            data: result.data?.map((review) => ({
                ...review,
                userId: {
                    _id: review.userId._id,
                    firstName: review.userId.firstName,
                    profileImage: review.userId.profileImage,
                },
            })) || [],
        }),
    });

    if (isLoading) return <Typography>Loading reviews...</Typography>;
    if (error) return <Typography color="error">Failed to load reviews</Typography>;
    if (!reviews.length) return <Typography>No reviews yet.</Typography>;

    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom>
                All Reviews
            </Typography>

            <Stack spacing={3}>
                {reviews.map((review) => (
                    <Box key={review._id}>
                        <Stack direction="row" spacing={2}>
                            <Avatar src={review.userId?.profileImage || ""} alt={review.userId?.firstName || "User"} />
                            <Box>
                                <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {review.userId?.firstName || "Anonymous"}
                                    <Box sx={{ display: "flex" }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                sx={{
                                                    fontSize: 16,
                                                    color: review.rating > i ? "#FFD700" : "#C0C0C0",
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {dayjs(review.updatedAt || review.createdAt).format("MMM D, YYYY h:mm A")}
                                    {review.updatedAt && review.updatedAt !== review.createdAt && " (edited)"}
                                </Typography>
                                <Typography variant="body2" mt={0.5}>
                                    {review.comment}
                                </Typography>
                            </Box>
                        </Stack>
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default ReviewSection;
