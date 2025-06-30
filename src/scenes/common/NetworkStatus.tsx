import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Lottie from "lottie-react";
import offline from "../../animations/no-internet.json";

const NetworkStatus = ({ children } : any) => {
  const [isOnline, setIsOnline] = useState(true);

  const updateNetworkStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("load", updateNetworkStatus);
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("load", updateNetworkStatus);
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return (
    <>
      {!isOnline ? (
        <Container>
          <Box
            sx={{
              py: 12,
              maxWidth: 480,
              mx: "auto",
              display: "flex",
              minHeight: "100vh",
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              No Internet Connection!
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              Please check your internet connection and try again.
            </Typography>

            <Box
              className="shadow-pop-bl"
              style={{ width: "100%", height: "100%" }}
              sx={{
                mx: "auto",
                height: 260,
                my: { xs: 5, sm: 10 },
              }}>
              <Lottie animationData={offline} loop />
            </Box>
          </Box>
        </Container>
      ) : (
        children
      )}
    </>
  );
};

NetworkStatus.propTypes = {
  children: PropTypes.any,
};

export default NetworkStatus;
