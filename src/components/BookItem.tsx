import { Card, CardActionArea, CardContent, CardMedia, Typography, Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BookItemProps {
  id: string;
  title: string;
  author: string;
  categories: string[];
  image: string;
}

const BookItem: React.FC<BookItemProps> = ({ id, title, author, categories, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <Card sx={{ borderRadius: 2, m: 1, maxWidth: 250 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
          sx={{ borderRadius: 2, margin: "4px" }}
        />
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            by {author}
          </Typography>
          <Box mt={1} display="flex" gap={0.5} flexWrap="wrap">
            {categories.map((category, index) => (
              <Chip key={index} label={category} size="small" />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookItem;