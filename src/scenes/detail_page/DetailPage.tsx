
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
  const { data: book, isLoading, error, refetch } = useGetBookByIdQuery(bookID!, {
  skip: !bookID,
});
  console.log('book', book);
  console.log('bookID',bookID ,"typeof:", typeof bookID);
console.log("Sanitized bookID:", JSON.stringify(bookID));
  console.log('error', error);
  useEffect(() => {
  if (bookID) {
    console.log("Trying to fetch book:", bookID);
  }
}, [bookID]);
  // useEffect(() => {
  //   refetch();
  // }, []);
//   useEffect(() => {
//   fetch("http://localhost:3001/books/685636ba9ddf61d16dbc8826")
//     .then(res => res.json())
//     .then(data => console.log("Manual fetch:", data))
//     .catch(err => console.error("Manual fetch error:", err));
// }, []);

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