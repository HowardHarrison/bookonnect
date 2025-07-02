import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Stack,
    Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "main"; // Adjust the import to your store setup

interface Review {
    id: string;
    user: {
        name: string;
        avatarUrl?: string;
    };
    text: string;
    createdAt: string;
}

const mockComments: Review[] = [
    {
        id: "1",
        user: { name: "Alice", avatarUrl: "" },
        text: "This book was truly inspiring!",
        createdAt: "2024-06-01",
    },
    {
        id: "2",
        user: { name: "Bob", avatarUrl: "" },
        text: "Loved the storytelling and character development.",
        createdAt: "2024-06-05",
    },
    {
        id: "3",
        user: { name: "Alice", avatarUrl: "" },
        text: "This book was truly inspiring!",
        createdAt: "2024-06-01",
    },
    {
        id: "4",
        user: { name: "Bob", avatarUrl: "" },
        text: "Loved the storytelling and character development.Loved the storytelling and character development.Loved the storytelling and character development.",
        createdAt: "2024-06-05",
    },
];

const CommentSection: React.FC = () => {
    const [comments, setComments] = useState<Review[]>(mockComments);
    const [newComment, setNewComment] = useState("");
    const isAuth = useSelector((state: RootState) => Boolean(state.auth.token));
    const user = useSelector((state: RootState) => state.auth.user);

    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;
        const newEntry: Review = {
            id: Date.now().toString(),
            user: {
                name: user?.firstName || "Anonymous",
                avatarUrl: user?.profileImage || "",
            },
            text: newComment,
            createdAt: new Date().toISOString(),
        };
        setComments([newEntry, ...comments]);
        setNewComment("");
    };

    return (
        <Box mt={1}>
            <Typography variant="h6" gutterBottom>
                My Review
            </Typography>
            <Stack spacing={2} sx={{height:'200px', overflow: 'auto'}}>
                {comments.map((comment) => (
                    <Box key={comment.id}>
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Avatar src={comment.user.avatarUrl} alt={comment.user.name} />
                            <Box>
                                <Typography variant="subtitle2">{comment.user.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {comment.text}
                                </Typography>
                            </Box>
                        </Stack>
                        <Divider sx={{ my: 1 }} />
                    </Box>
                ))}
            </Stack>

            {isAuth && (
            <Box mt={2}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    // variant="outlined"
                    sx={{
                        textTransform: "none",
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#9e9e9e',
                            },
                            '&:hover fieldset': {
                                borderColor: '#7e7e7e',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#7e7e7e',
                            },
                        },
                    }}
                />
                <Box textAlign="right" mt={1}>
                    <Button
                        variant="contained"
                        onClick={handleCommentSubmit}
                        sx={{ textTransform: "none", backgroundColor: "#ff2216", color: 'white' }}
                    >
                        Post Comment
                    </Button>
                </Box>
            </Box>
            )}
        </Box>
    );
};

export default CommentSection;
