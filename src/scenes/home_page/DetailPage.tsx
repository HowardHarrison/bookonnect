
import { Widgets } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import BookDetail from "components/BookDetail";
import NavBar from "components/NavBar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "scenes/common/Loading";
import { useGetBookByIdQuery } from "state/bookAPI";
import { Book } from "types/Book";

const DetailPage = () => {
  const { bookID } = useParams();
  const { data: book, isLoading, error, refetch } = useGetBookByIdQuery(bookID!);
  console.log('data', book);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <NavBar />
      {isLoading ?
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh">
          <Loading />
        </Box>
        :
        <Container maxWidth="xl">
          <BookDetail {...book as Book} />
        </Container>
      }
    </div>
  )
}
export default DetailPage;