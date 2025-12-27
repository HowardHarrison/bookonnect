import { Box, useMediaQuery, useTheme } from "@mui/material"
import { ContactList } from "./ContactList"
import { ChatWindow } from "./ChatWindow"
import { ProfileSidebar } from "./ProfileSideBar"
import NavBar from "components/nav_bar/NavBar"
import { useParams } from "react-router-dom"

export const CommunityLayout = () => {
    const theme = useTheme();
    const { chatId } = useParams<{ chatId: string }>();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box>
            <NavBar />
            {isMobile ?
                <Box>
                    {chatId ?
                        <Box>
                            <ContactList />
                        </Box> :
                        <Box>
                            <ChatWindow />
                        </Box>
                    }
                </Box>
                :
                <Box sx={{ display: 'grid', pt:'58px', gridTemplateColumns: {md:'280px 1fr', lg:'320px 1fr 300px'}, height: 'calc(100vh - 58px)'}}>
                    {/* Contact List */}
                    <ContactList />
                    {/* Chat Window */}
                    <ChatWindow />
                    {/* Profile Sidebar */}
                    <ProfileSidebar />
                </Box>
            }
        </Box>
    )
}