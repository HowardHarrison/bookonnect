import { Close, MoreVert, Search } from "@mui/icons-material";
import { Avatar, Box, IconButton, InputBase, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useState } from "react";
import { ContactListType } from "types/Community";
import { formatTime } from "utils/format-date";

const DummyContactList: ContactListType = {
    status: 200,
    message: 'Data fetched successfully.',
    data: [
        {
            id: 1,
            user_name: 'Daniel Dennis',
            profile_url: '',
            last_sender: 'Daniel',
            last_message: 'It was lovely',
            last_message_at: '',
            unseen_count: 0,
        },
        {
            id: 2,
            user_name: 'George Warshiton',
            profile_url: '',
            last_sender: 'George',
            last_message: 'It was lovely to meet you.',
            last_message_at: '',
            unseen_count: 3,
        },
        {
            id: 3,
            user_name: 'Abraham Lincoln',
            profile_url: '',
            last_sender: 'Abraham',
            last_message: 'It was so amazing. Thank you for your efforts.',
            last_message_at: '',
            unseen_count: 2,
        },
        {
            id: 1,
            user_name: 'Alfred Nobel',
            profile_url: '',
            last_sender: 'Alfred',
            last_message: 'It was cool',
            last_message_at: '',
            unseen_count: 1,
        },
        {
            id: 1,
            user_name: 'Elon Musk',
            profile_url: '',
            last_sender: 'Elon',
            last_message: 'It was nice.',
            last_message_at: '',
            unseen_count: 0,
        },
    ]
}

export const ContactList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    return (
        <Box
            sx={{
                width: { xs: '100%' },
                backgroundColor: "#f5f5f5",
                position: "relative",
            }}
        >
            {/* Header */}
            <Box sx={{ position: 'sticky', height: '80px', mb: 1 }}>
                <Typography sx={{ fontSize: { xs: 18, sm: 22 }, fontWeight: 'bold', m: 1, pl: 1 }}>Community</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#d9d9d9ff',
                            borderRadius: '50px',
                            px: 1,
                            py: 0.5,
                            mx: 'auto',
                            mb: 1,
                            width: { xs: '90%' },
                            maxWidth: '600px'
                        }}
                    >
                        <InputBase
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search users or channels..."
                            size="small"
                            fullWidth
                            sx={{ flex: 1, color: 'gray', mt: 0.2 }}
                        />
                        {searchTerm.length > 0 &&
                            <Close onClick={() => setSearchTerm('')}
                                sx={{
                                    color: 'gray',
                                    mb: 0.2,
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                            />}
                        <Search onClick={() => handleSearchChange}
                            sx={{
                                color: 'gray',
                                mr: 1,
                                '&:hover': {
                                    cursor: 'pointer',
                                },
                            }} />
                    </Box>
                </Box>
            </Box>

            {/* Contact List */}
            <Box
                sx={{
                    height: "calc(100vh - 154px)",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": { width: "8px" },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#aaa",
                        borderRadius: 2,
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#888",
                    },
                }}
            >
                <List>
                    {searchTerm === '' && DummyContactList?.data.map((contact, index) => {
                        const isSelected = false;
                        return (
                            <ListItemButton
                                key={index}
                                sx={{
                                    m: 0.5,
                                    borderRadius: 3,
                                    bgcolor: isSelected ? "#e0e7ff" : "transparent",
                                }}
                            >
                                {/* Avatar */}
                                <ListItemAvatar>
                                    <Avatar
                                        src={contact.profile_url ?? ""}
                                    />
                                </ListItemAvatar>

                                {/* Contact Name + Last Message */}
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: isSelected ? "bold" : 500,
                                                }}
                                            >
                                                {contact.user_name}
                                            </Typography>

                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                {contact.last_message_at && (
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{ fontSize: "11px" }}
                                                    >
                                                        {formatTime(contact.last_message_at)}
                                                    </Typography>
                                                )}
                                                <IconButton
                                                    size="small"
                                                >
                                                    <MoreVert fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    }
                                    secondary={
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                gap: 1,

                                            }}
                                        >
                                            {/* Last message preview */}
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    flexGrow: 1,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: "70%",
                                                }}
                                            >
                                                {contact.last_message
                                                    ? contact.last_message
                                                    : "No messages yet"}
                                            </Typography>

                                            <Box sx={{ textAlign: "right" }}>
                                                {/* unseen badge */}
                                                {contact.unseen_count ? (
                                                    <Box
                                                        sx={{
                                                            mt: 0.5,
                                                            bgcolor: "#1976d2",
                                                            color: "white",
                                                            px: 1,
                                                            py: "2px",
                                                            borderRadius: "12px",
                                                            fontSize: "11px",
                                                            fontWeight: "bold",
                                                            display: "inline-block",
                                                        }}
                                                    >
                                                        {contact.unseen_count}
                                                    </Box>
                                                ) : null}
                                            </Box>
                                        </Box>
                                    }
                                />
                            </ListItemButton>
                        )
                    })}
                </List>
            </Box>
        </Box>
    )
}