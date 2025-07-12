import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import RegisterForm from "./RegisterForm";


const SignupPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box paddingY="20px">
      <Typography fontWeight="bold" fontSize="32px" color="#ff2216" textAlign="center" marginY="10px">
        Bookonnect
      </Typography>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        sx={{
          backgroundColor: theme.palette.background.alt,
        }}
        p="1rem"
        m="1rem auto"
        borderRadius="1.5rem"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem", textAlign: "center" }}>
          Welcome to Bookonnect, the Social Platform for bibilophiles!
        </Typography>
        <RegisterForm />
      </Box>
    </Box>
  )
}
export default SignupPage;