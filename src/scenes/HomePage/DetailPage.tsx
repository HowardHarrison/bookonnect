
import { Container } from "@mui/material";
import BookDetail from "components/BookDetail";
import NavBar from "components/NavBar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "state/bookAPI";

const DetailPage = () => {
  const { bookID } = useParams();
  const { data: book, isLoading, error, refetch } = useGetBookByIdQuery(bookID!);
  console.log('data', book);
   useEffect(() => {
      refetch();
    }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error || !book) return <p>Error fetching book.</p>;
    return (
        <div>
            <NavBar />
            <Container maxWidth="xl">
                <BookDetail {...book}/>   
            </Container>
        </div>
    )
}
export default DetailPage;