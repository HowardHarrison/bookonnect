import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Stack,
    Rating,
    Tooltip,
    IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "main";
import {
    useDeleteReviewMutation,
    useGetUserReviewQuery,
    useUpsertReviewMutation,
} from "../state/reviewApi";
import { Delete, Star } from "@mui/icons-material";
import { Review } from "types/Review";
import dayjs from "dayjs";

interface Props {
    bookId: string;
}

const MyReview: React.FC<Props> = ({ bookId }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const userId = user?._id;
    const isAuth = Boolean(userId);

    const { data: userReview, refetch } = useGetUserReviewQuery(
        { userId, bookId },
        { skip: !userId }
    );

    const [upsertReview, { isLoading }] = useUpsertReviewMutation();
    const [deleteReview] = useDeleteReviewMutation();

    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState<number | null>(0);

    console.log('rating', userReview?.rating);

    // useEffect(() => {
    //     if (userReview?.comment) {
    //         setNewComment(userReview.comment);
    //     }
    // }, [userReview]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            await upsertReview({
                userId,
                bookId,
                comment: newComment.trim(),
                rating: rating ?? 0, // You can allow dynamic rating later
            }).unwrap();
            refetch(); // refresh user's review
        } catch (error) {
            console.error("Failed to submit review:", error);
        }
        setNewComment("");
        setRating(0);
    };

    // const handleCommentSubmit = () => {
    //     if (!newComment.trim()) return;
    //     const newEntry: Review = {
    //         id: Date.now().toString(),
    //         user: {
    //             name: user?.firstName || "Anonymous",
    //             avatarUrl: user?.profileImage || "",
    //         },
    //         text: newComment,
    //         createdAt: new Date().toISOString(),
    //         rating: rating ?? 0, // optional, depending on schema
    //     };
    //     setComments([newEntry, ...comments]);
    //     setNewComment("");
    //     setRating(0); // ✅ Clear rating
    // };

    const handleDeleteReview = async () => {
        try {
            await deleteReview({ userId, bookId }).unwrap();
            refetch();
        } catch (error) {
            console.error("Failed to delete review", error);
        }
    };

    return (
        <Box mt={1}>
            <Typography variant="h6" gutterBottom>
                My Review
            </Typography>

            <Stack spacing={2} sx={{ maxHeight: "200px", overflow: "auto" }}>
                {userReview ? (
                    <Box key={userReview.id} position="relative">
                        <Tooltip title="Delete Review">
                            <IconButton
                                onClick={() => handleDeleteReview()}
                                size="small"
                                sx={{ position: "absolute", top: 0, right: 0 }}
                            >
                                <Delete sx={{ fontSize: '16', color: 'red' }} />
                            </IconButton>
                        </Tooltip>
                        <Box key={userReview.id}>
                            <Stack direction="row" spacing={2} alignItems="flex-start">
                                <Avatar
                                    src={user?.profileImage || ""}
                                    alt={user?.firstName || "Anonymous"}
                                />
                                <Box>
                                    <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        {user?.firstName || "Anonymous"}
                                        <Box sx={{ display: "flex" }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    sx={{
                                                        fontSize: 16,
                                                        color: userReview?.rating > i ? "#FFD700" : "#C0C0C0",
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {dayjs(userReview.updatedAt || userReview.createdAt).format("MMM D, YYYY h:mm A")}
                                        {userReview.updatedAt && userReview.updatedAt !== userReview.createdAt && " (edited)"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {userReview.comment}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        You haven't posted a review yet.
                    </Typography>
                )}
            </Stack>

            {isAuth && (
                <Box mt={2}>
                    <Rating
                        name="review-rating"
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Write a review..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#9e9e9e' },
                                '&:hover fieldset': { borderColor: '#7e7e7e' },
                                '&.Mui-focused fieldset': { borderColor: '#7e7e7e' },
                            },
                        }}
                    />
                    <Box textAlign="right" mt={1}>
                        <Button
                            variant="contained"
                            onClick={handleCommentSubmit}
                            sx={{ textTransform: "none", backgroundColor: "#ff2216", color: 'white' }}
                        >
                            {userReview ? "Update Review" : "Post Review"}
                        </Button>
                    </Box>
                </Box>
            )}

        </Box>
    );
};

export default MyReview;
