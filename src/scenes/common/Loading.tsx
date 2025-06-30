import React from "react";
import Lottie from "lottie-react";
import loading from "../../animations/table-loading.json";
import { Box, Container } from "@mui/material";

const Loading = () => (
  <Container
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
    <Box style={{ width: 100 }}>
      <Lottie animationData={loading} loop />
    </Box>
  </Container>
);

export default Loading;
