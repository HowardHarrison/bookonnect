import { Add, ChatBubbleOutline, FavoriteBorder } from "@mui/icons-material";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import { Book } from "types/Book";
import { BaseUrl } from "types/Index";

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
    return (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} p={2} gap={3} paddingTop={9}>
            {/* Left: Book Cover */}
            <Box flex={1}>
                <Box
                    component="img"
                    src={`${BaseUrl}/assets/${coverImage}`}
                    alt={title}
                    sx={{ width: '100%', borderRadius: 3 }}
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

                    <Typography variant="body1" mt={2}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus sunt iusto voluptas quam exercitationem qui, dicta earum ex ipsa ea, distinctio blanditiis corporis porro labore?
                        {/* {description} */}
                    </Typography>
                </Box>

                {/* Centered & Stretched Action Buttons */}
                <Box
                    flex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        display="flex"
                        width="100%"
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <Box display="flex" justifyContent="center" alignItems="center" flex={1}  sx={{ backgroundColor: '#EEEEEE' }}>
                            <IconButton>
                                <FavoriteBorder />
                            </IconButton>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" flex={1}  sx={{ backgroundColor: '#EEEEEE' }}>
                            <IconButton>
                                <ChatBubbleOutline />
                            </IconButton>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" flex={1}  sx={{ backgroundColor: '#EEEEEE' }}>
                            <IconButton>
                                <Add />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

            </Box>

        </Box>
    )
}
export default BookDetail;