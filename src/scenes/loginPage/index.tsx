import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"

const loginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        sx={{
          backgroundColor: theme.palette.background.alt,
        }}
        p="1rem 6%"
        textAlign="center">
      </Box>
      <Typography fontWeight="bold" fontSize="32px" color="primary">
        Bookonnect
      </Typography>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        sx={{
          backgroundColor: theme.palette.background.alt,
        }}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Bookonnect, the Social Platform for bibilophiles!
        </Typography>
        {/* <Form /> */}
      </Box>
      hello world
    </Box>
  )
}
export default loginPage;