// import { Grid } from "@mui/material";
import Grid from '@mui/material/Grid';
import BookItem from "components/BookItem";
import NavBar from "components/NavBar";
import { Book } from "types/Book";
import { useGetBooksQuery } from "state/bookAPI";
import { Box } from '@mui/material';
const HomePage = () => {
    const { data: books, error, isLoading } = useGetBooksQuery();
     console.log('data', books);
    return (
        <div>
            <NavBar />
            <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          padding: 2,
        }}
      >
        {books?.map((book) => (
          <Box key={book._id || book.id}>
            <BookItem {...book} />
          </Box>
        ))}
      </Box>
        </div>
    )
}
export default HomePage;