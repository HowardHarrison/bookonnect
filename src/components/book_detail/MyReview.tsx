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
    Divider,
} from "@mui/material";
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import type { ForwardedRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "main";
import {
    useDeleteReviewMutation,
    useGetUserReviewQuery,
    useUpsertReviewMutation,
} from "../../state/reviewApi";
import { Delete, EditDocument, Star } from "@mui/icons-material";
import dayjs from "dayjs";
import { useGetUserProfileQuery } from "state/userApi";
import { BaseUrl } from "types/Index";

interface Props {
    bookId: string;
}

export type MyReviewRef = {
    triggerEdit: () => void;
};

const MyReview = forwardRef((props: Props, ref: ForwardedRef<MyReviewRef>) => {
        const { bookId } = props;
        const isAuth = useSelector((state: RootState) => Boolean(state.auth.token));
        const userId = useSelector((state: RootState) => state.auth.user?._id);
        const { data: user, error, refetch: refetchUserProfile } = useGetUserProfileQuery(userId ?? '', { skip: !userId });
       
        const { data: userReview, refetch } = useGetUserReviewQuery(
            { userId, bookId },
            { skip: !userId }
        );

        const [upsertReview, { isLoading }] = useUpsertReviewMutation();
        const [deleteReview] = useDeleteReviewMutation();

        const [newComment, setNewComment] = useState("");
        const [rating, setRating] = useState<number | null>(0);
        const [isEditing, setIsEditing] = useState(false);
        const textFieldRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (isEditing && textFieldRef.current) {
                textFieldRef.current.focus();
            }
        }, [isEditing]);

        useEffect(() => {
            if (userReview?.comment) {
                setNewComment(userReview.comment);
                setRating(userReview?.rating);
            }
        }, [userReview]);

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

        const handleDeleteReview = async () => {
            try {
                await deleteReview({ userId, bookId }).unwrap();
                refetch();
                setNewComment("");
                setRating(0);
            } catch (error) {
                console.error("Failed to delete review", error);
            }
        };

        useImperativeHandle(ref, () => ({
            triggerEdit: () => {
                if (userReview) {
                    setNewComment(userReview.comment);
                }
                setIsEditing(!isEditing);
                setTimeout(() => {
                    textFieldRef.current?.focus();
                }, 0);
            }
        }));

        return (
            <Box mt={1}>
                <Typography variant="h6" gutterBottom>
                    My Review
                </Typography>

                <Stack spacing={2} sx={{ maxHeight: "200px", overflow: "auto" }}>
                    {userReview ? (
                        <Box key={userReview._id} position="relative">
                            <Tooltip title="Edit Review">
                                <IconButton
                                    onClick={() => {
                                        setIsEditing(!isEditing);
                                    }}
                                    size="small"
                                    sx={{ position: "absolute", top: 0, right: 25 }}
                                >
                                    <EditDocument sx={{ fontSize: '20px', color: "green" }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Review">
                                <IconButton
                                    onClick={() => handleDeleteReview()}
                                    size="small"
                                    sx={{ position: "absolute", top: 0, right: 0 }}
                                >
                                    <Delete sx={{ fontSize: '20px', color: 'red' }} />
                                </IconButton>
                            </Tooltip>
                            <Box key={userReview._id}>
                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    <Avatar
                                        src={user?.profileImage ? `${BaseUrl}/${user?.profileImage}` : ""}
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
                            <Divider sx={{ marginTop: '10px' }} />
                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            You haven't posted a review yet.
                        </Typography>
                    )}
                </Stack>

                {isAuth && isEditing && (
                    <Box mt={1}>
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
                            inputRef={textFieldRef}
                            placeholder="Write a review..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#9e9e9e" },
                                    "&:hover fieldset": { borderColor: "#7e7e7e" },
                                    "&.Mui-focused fieldset": { borderColor: "#7e7e7e" },
                                },
                            }}
                        />
                        <Box textAlign="right" mt={1}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    handleCommentSubmit();
                                    setIsEditing(false); // Hide the editor
                                }}
                                sx={{ textTransform: "none", backgroundColor: "#ff2216", color: "white" }}
                            >
                              {userReview ? 'Update Review' : 'Post Review'}
                            </Button>
                        </Box>
                    </Box>
                )}

            </Box>
        );
    });

export default MyReview;
