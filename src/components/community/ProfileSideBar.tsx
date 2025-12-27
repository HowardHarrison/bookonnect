import { ArrowBack, Close, Notifications, Person, Reply } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, Stack, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react";

export const ProfileSidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [tab, setTab] = useState(0);

    return (
        <Box
            sx={{
                width: `100%`,
                borderLeft: "1px solid #e0e0e0",
                bgcolor: "#fff",
                p: 2,
                overflowY: "auto",
                position: "relative",
            }}>
            {
                isMobile ?
                    <IconButton onClick={() => {}} sx={{}}>
                        <ArrowBack />
                    </IconButton>
                    :
                    <IconButton onClick={() => {}} sx={{}}>
                        <Close sx={{ fontSize: 25 }} />
                    </IconButton>
            }

            <Stack spacing={0.5} alignItems="center" mb={1}>
                <Avatar src={"/profile/profile.jpg"} sx={{ width: 80, height: 80 }} />
                <Typography sx={{ fontSize: { xs: 18, sm: 22 }, fontWeight: "bold", mx: 1 }}>
                    {'user'}
                </Typography>
                <Typography sx={{ fontSize: { xs: 12, sm: 15 }, color: "gray" }}>
                    86k subscribers
                </Typography>
            </Stack>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Box>
                    <IconButton sx={{ bgcolor: "#efeeeeff", width: 40, height: 40 }}>
                        <Person sx={{ width: 25, height: 25 }} />
                    </IconButton>
                    <Typography sx={{ textAlign: "center", fontSize: 14, mt: 0.3 }}>Profile</Typography>
                </Box>
                <Box>
                    <IconButton sx={{ bgcolor: "#efeeeeff", width: 40, height: 40 }}>
                        <Notifications sx={{ width: 25, height: 25 }} />
                    </IconButton>
                    <Typography sx={{ textAlign: "center", fontSize: 14, mt: 0.3 }}>Mute</Typography>
                </Box>
                <Box>
                    <IconButton sx={{ bgcolor: "#efeeeeff", width: 40, height: 40 }}>
                        <Reply sx={{ width: 25, height: 25, transform: "scaleX(-1)" }} />
                    </IconButton>
                    <Typography sx={{ textAlign: "center", fontSize: 14, mt: 0.3 }}>Share</Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Tabs value={tab} onChange={(_e, v) => setTab(v)} variant="fullWidth">
                <Tab label="Media" />
                <Tab label="Files" />
                <Tab label="Links" />
            </Tabs>

        </Box>
    )
}