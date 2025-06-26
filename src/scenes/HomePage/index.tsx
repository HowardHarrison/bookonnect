// import { Grid } from "@mui/material";
import Grid from '@mui/material/Grid';
import BookItem from "components/BookItem";
import NavBar from "components/NavBar";
import { useGetBooksQuery } from "state/bookAPI";
import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
const HomePage = () => {
  const { data: books, error, isLoading, refetch } = useGetBooksQuery();
  useEffect(() => {
    refetch(); 
  }, []);
  useEffect(() => {
    console.log("Fetched books from API:", books);
  }, [books]);
  return (
    <div>
      <NavBar />
      <Container maxWidth="xl">
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
          paddingTop: 9,
        }}
      >
        {books?.map((book) => (
          <Box key={book.id} sx={{display:"flex", justifyContent:"center", alignItems: "center"}}>
            <BookItem {...book} />
          </Box>
        ))}
      </Box>
      </Container>
    </div>
  )
}
export default HomePage;