import { Add, AddAlarm, AddAlert, AddAPhoto, AddBox, AddBoxOutlined, AddBoxRounded, AddBoxSharp, AddBusiness, AddCard, AddCircle, AddCircleRounded, ChatBubbleOutline, Favorite } from "@mui/icons-material";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { Book } from "types/Book";
import { BaseUrl } from "types/Index";
import { useSelector } from "react-redux";
import { RootState } from "main";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useToggleReactionMutation, useGetReactionStatusQuery } from "state/reactionApi";
import MyReview, { MyReviewRef } from "./MyReview";
import ReviewSection from "./ReviewSection";
import { useGetUserProfileQuery, useHandleSavedBookMutation } from "state/userApi";
import { useGetReviewsByBookQuery } from "state/reviewApi";

// Helper to generate light color from string
function stringToLightColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 90%, 85%)`;
} 

const categoryColorMap: Record<string, string> = {
  Romance: "#ffe0e6",
  Drama: "#e0f7fa",
  Biography: "#fff9c4",
  Translation: "#e1f5fe",
  Action: "#f3e5f5",
  Adventure: "#e8f5e9",
  // fallback default
  Default: "#eeeeee",
};

const BookDetail: React.FC<Book> = ({ _id, title, writer, categories, coverImage, publishDate, description }) => {
    const isAuth = useSelector((state: RootState) => Boolean(state.auth.token));
    const userId = useSelector((state: RootState) => state.auth.user?._id);
    const { data: user, isLoading, error, refetch: refetchUserProfile } = useGetUserProfileQuery(userId ?? '', { skip: !userId });
    const navigate = useNavigate();
    const myReviewRef = useRef<MyReviewRef>(null);

    const [toggleReaction] = useToggleReactionMutation();
    const [handleSavedBook] = useHandleSavedBookMutation();
    const { data, refetch } = useGetReactionStatusQuery({ userId, bookId: _id }, { skip: !userId });
    console.log('reaction status', data);

    const [openDialog, setOpenDialog] = useState(false);
    const [loveReaction, setLoveReaction] = useState(false);
    const [saveBook, setSaveBook] = useState(false);

    useEffect(() => {
        if (data?.reacted !== undefined) {
            setLoveReaction(data.reacted);
        }
    }, [data]);

    useEffect(() => {
        if (user?.savedBooks && _id) {
            const isSaved = user.savedBooks.includes(_id);
            setSaveBook(isSaved);
        }
    }, [user?.savedBooks, _id]);


    const handleLoveReaction = async () => {
        if (!isAuth) {
            setOpenDialog(true);
            return;
        }
        try {
            const res = await toggleReaction({ userId, bookId: _id }).unwrap();
            await refetch();
            setLoveReaction(res.reacted);
        } catch (err) {
            console.error('Failed to toggle reaction', err);
        }
    };

    const handleSaveBook = async () => {
        if (!isAuth) {
            setOpenDialog(true);
            return;
        }
        try {
            await handleSavedBook({ userId, bookId: _id }).unwrap();
            setSaveBook(prev => !prev);
        } catch (err) {
            console.error('Failed to toggle reaction', err);
        }
    }

    const handleComment = async () => {
        if (!isAuth) {
            setOpenDialog(true);
            return;
        }
        myReviewRef.current?.triggerEdit();
    }

    const handleClose = () => setOpenDialog(false);
    const handleLogin = () => navigate('/login');

    return (
        <Box>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'center', md: 'flex-start' }} // Center horizontally on small screens
                p={2}
                gap={3}
                pt={9}>
                {/* Left: Book Cover */}
                <Box flex={1}
                    width="100%"
                    display="flex"
                    justifyContent={{ xs: 'center', md: 'flex-start' }}>
                    <Box
                        component="img"
                        src={`${BaseUrl}/assets/${coverImage}`}
                        alt={title}
                        sx={{
                            width: '100%',
                            maxWidth: '500px',
                            borderRadius: 3,
                            aspectRatio: '1/1.8',
                        }}
                    />
                </Box>

                {/* Right: Details */}
                <Box flex={2} display="flex" flexDirection="column" sx={{width: '100%'}} p={2}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom>
                            by <strong>{writer.name}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Published on {new Date(publishDate).toLocaleDateString()}
                        </Typography>

                        {/* Categories */}
                        <Box display="flex" gap={1} flexWrap="wrap" my={1}>
                            {categories.map((cat) => (
                                <Chip
                                    key={cat._id}
                                    label={cat.name}
                                    size="small"
                                    sx={{
                                        backgroundColor: categoryColorMap[cat.name] || categoryColorMap["Default"],
                                        color: '#333',
                                    }}
                                />
                            ))}
                        </Box>

                        <Typography variant="body1" sx={{ marginY: 2, overflow: 'auto', maxHeight: '200px' }}>
                            {description}
                        </Typography>
                    </Box>

                    {/* Centered & Stretched Action Buttons */}
                    <Box
                        flex={1}
                        sx={{ backgroundColor: '' }}
                    >
                        <Box
                            display="flex"
                            width="100%"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Box display="flex" alignItems="center" gap={1}>
                            <IconButton sx={{ backgroundColor: '#EEEEEE', color: loveReaction ? '#ff2216' : '' }} onClick={handleLoveReaction}>
                                <Favorite />
                            </IconButton>
                            <Typography color="textSecondary" sx={{fontSize: 15}}>
                                {data?.totalReactions ?? 0}
                            </Typography>
                            </Box>
                            <IconButton sx={{ backgroundColor: '#EEEEEE' }} onClick={handleComment}>
                                <ChatBubbleOutline />
                            </IconButton>
                            <IconButton sx={{ backgroundColor: '#EEEEEE', color: saveBook ? '#00ab41' : '' }} onClick={handleSaveBook}>
                                <AddCircle width={20} />
                            </IconButton>
                        </Box>
                        <Box
                            width='100%'
                        >
                            <MyReview ref={myReviewRef} bookId={_id} />
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box>
                <ReviewSection bookId={_id} />
            </Box>
            {/* Dialog Box */}
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>You are not logged in</DialogTitle>
                <DialogContent>
                    Please log in or sign up to use this feature.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            backgroundColor: "#ff2216",
                            color: "white",
                        }}>
                        Cancel
                    </Button>
                    <Button onClick={handleLogin}
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                            color: "#ff2216",
                            borderColor: "#ff2216",
                        }}>
                        Log In
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
export default BookDetail;