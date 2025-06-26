import { Card, CardActionArea, CardContent, CardMedia, Typography, Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Categories, Writers } from "types/Book";

interface BookItemProps {
  id: string;
  title: string;
  writer: Writers;
  categories: Categories[];
  coverImage: string;
}

const BaseUrl = import.meta.env.VITE_BASE_URL as string;

const BookItem: React.FC<BookItemProps> = ({ id, title, writer, categories, coverImage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${id}`);
  };
  console.log('categories', categories);

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

  return (
    <Card sx={{ borderRadius: 2, m: 1, minWidth: 260 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="240"
          image={`${BaseUrl}/assets/${coverImage}`}
          alt={title}
          sx={{ borderRadius: 3, padding: "6px" }}
        />
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          <Typography
            variant="body2"
            fontWeight="medium"
            color="text.primary"
            sx={{ mt: 0.5 }}
          >
            by <strong>{writer.name}</strong>
          </Typography>
          <Box mt={1} display="flex" gap={0.5} flexWrap="wrap">
            {categories.map(({ _id, name }, index) => (
              <Chip
                key={_id}
                label={name}
                size="small"
                sx={{
                  backgroundColor:
                    categoryColorMap[name] || categoryColorMap["Default"],
                  color: "#333",
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookItem;