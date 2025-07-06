

import { useGetBooksQuery } from "state/bookAPI";
import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import BookItem from "components/book_detail/BookItem";
import NavBar from "components/nav_bar/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "main";
const HomePage = () => {
  const { data: books, error, isLoading, refetch } = useGetBooksQuery();
  console.log('books', books);
  console.log('error', error);
  console.log('isLoading', isLoading);
  const token = useSelector((state: RootState) => state.auth.token);
  console.log('token', token);
  
  useEffect(() => {
    refetch();
  }, []);

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
            <Box key={book._id} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <BookItem {...book} />
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  )
}
export default HomePage;