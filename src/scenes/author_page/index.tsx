import { Box, Container, Typography } from "@mui/material";
import NavBar from "components/nav_bar/NavBar";
import Lottie from "lottie-react";
import noData from 'animations/no-data.json';

const Authors = () => {
    return (
        <div>
            <NavBar />
            <Container>
                <Box
                    sx={{
                        mt: 10,
                        maxWidth: 480,
                        mx: "auto",
                        display: "flex",
                        maxHeight: 700,
                        textAlign: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}>
                    <Typography variant="h3" sx={{ mb: 1 }}>
                        We are still working on this page!
                    </Typography>

                    <Typography sx={{ color: "text.secondary" }}>
                        We will be back with better user experiences.
                    </Typography>

                    <Box
                        className="shadow-pop-bl"
                        style={{ width: "250px", height: "320px" }}
                        sx={{
                            mx: "auto",
                            my: { xs: 1, sm: 2 },
                        }}>
                        <Lottie animationData={noData} loop />
                    </Box>
                </Box>
            </Container>
        </div>
    )
}
export default Authors;