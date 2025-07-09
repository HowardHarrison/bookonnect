import { GitHub, LinkedIn, Person, } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import NavBar from "components/nav_bar/NavBar";
import { BaseUrl } from "types/Index";

const AboutUs = () => {
    return (
        <div>
            <NavBar />
            <Container>
                <Box sx={{ mt: 10, px: 3, maxWidth: 800, mx: 'auto', textAlign: 'center', width: 500 }}>
                    <Typography variant="h3" gutterBottom>
                        About Me
                    </Typography>

                    <Box 
                        sx={{
                            backgroundColor: '#f9fbff',
                            padding: 2,
                            borderRadius: 2,
                            boxShadow:5
                        }}>
                        <Box
                            sx={{
                                width: 180,
                                height: 180,
                                borderRadius: '50%',
                                backgroundImage: `url(${BaseUrl}/assets/thurein3.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                marginX: 'auto'
                            }}
                        />
                        <Typography variant="h3" sx={{ fontWeight: 500, mt: 1 }}>
                            Thurein Win Htun
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'medium', mt: 1 }}>
                            Software Developer
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                            Hello! I’m a software developer passionate about building clean, scalable, and user-friendly web applications.
                            This project is built with React, TypeScript, Node.js, and MongoDB. This is one of my projects to give best web exploring experiences to the users.
                        </Typography>

                        <Box sx={{ mt: 3 }}>
                            <IconButton
                                href="https://github.com/HowardHarrison"
                                target="_blank"
                                rel="noopener"
                                aria-label="GitHub"
                            >
                                <GitHub fontSize="large" />
                            </IconButton>
                            <IconButton
                                href="https://www.linkedin.com/in/thurein-win-htun-98235a221/"
                                target="_blank"
                                rel="noopener"
                                aria-label="LinkedIn"
                            >
                                <LinkedIn fontSize="large" />
                            </IconButton>
                            <IconButton
                                href="https://thurein-dev-portfolio.vercel.app/"
                                target="_blank"
                                rel="noopener"
                                aria-label="Portfolio"
                            >
                                <Person fontSize="large" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}
export default AboutUs;