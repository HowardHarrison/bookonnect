import { Add, ChatBubbleOutline, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { Book } from "types/Book";
import { BaseUrl } from "types/Index";
import CommentSection from "./CommentSection";
import { useSelector } from "react-redux";
import { RootState } from "main";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Helper to generate light color from string
function stringToLightColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 90%, 85%)`;
}

const BookDetail: React.FC<Book> = ({ _id, title, writer, categories, coverImage, publishDate, description }) => {
    const isAuth = useSelector((state: RootState) => Boolean(state.auth.token));
    const navigate = useNavigate();

    const [openDialog, setOpenDialog] = useState(false);

    const handleProtectedClick = () => {
        if (!isAuth) {
            setOpenDialog(true);
        } else {
            // perform actual action (like toggling favorite)
        }
    };

    const handleClose = () => setOpenDialog(false);
    const handleLogin = () => navigate('/login');
    return (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} p={2} gap={3} paddingTop={9}>
            {/* Left: Book Cover */}
            <Box flex={1}>
                <Box
                    component="img"
                    src={`${BaseUrl}/assets/${coverImage}`}
                    alt={title}
                    sx={{ width: '100%', borderRadius: 3, aspectRatio: '1/1.8' }}
                />
            </Box>

            {/* Right: Details */}
            <Box flex={2} display="flex" flexDirection="column">
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        by {writer.name}
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
                                    backgroundColor: `${stringToLightColor(cat.name)}33`,
                                    color: '#333',
                                }}
                            />
                        ))}
                    </Box>

                    <Typography variant="body1" sx={{ marginY: 2, overflow: 'auto', maxHeight: '200px' }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        {/* {description} */}
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
                        <IconButton sx={{ backgroundColor: '#EEEEEE' }} onClick={handleProtectedClick}>
                            <FavoriteBorder />
                        </IconButton>
                        <IconButton sx={{ backgroundColor: '#EEEEEE' }} onClick={handleProtectedClick}>
                            <ChatBubbleOutline />
                        </IconButton>
                        <IconButton sx={{ backgroundColor: '#EEEEEE' }} onClick={handleProtectedClick}>
                            <Add />
                        </IconButton>
                    </Box>
                    <Box
                        width='100%'
                    >
                        <CommentSection />
                    </Box>
                </Box>
            </Box>

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