import { ArrowBack, AttachFileOutlined, Close, Send, SentimentSatisfiedAlt } from "@mui/icons-material"
import { Avatar, Box, CircularProgress, IconButton, InputBase, Stack, Typography } from "@mui/material"
import { useCallback, useRef, useState } from "react";
import { ChatMessage, FileWithPreview } from "types/Community";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { BaseUrl } from "types/Index";
import { useSelector } from "react-redux";
import { RootState } from "main";
import { fmtDate } from "utils/format-date";

export const ChatWindow = () => {
    const userId = useSelector((state: RootState) => state.auth.user?._id);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState("");
    const [openEmoji, setOpenEmoji] = useState(false);
    const isSending = false;
    const isLoading = false;

    const rowVirtualizer = useVirtualizer({
        count: messages.length,
        getScrollElement: () => parentRef.current,
        estimateSize: useCallback((index) => {
            const msg = messages[index];
            // Check your message data structure to see if it has an image
            const hasImage = msg.attachment;

            // If it has an image, estimate the known fixed size (300px) + padding (e.g., 50px)
            if (hasImage) {
                return 350; // Max expected height for an image message
            }
            // Otherwise, use the estimate for a short text message
            return 50;
        }, [messages]), // Estimate a size, adjust as needed
        overscan: 5,
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        // map into FileWithPreview and create object URLs
        const mapped: FileWithPreview[] = files.map((f) => ({
            file: f,
            preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : "",
        }));
        setSelectedFiles(prev => [...prev, ...mapped]);
    }

    const removeFileAtIndex = (index: number) => {
        setSelectedFiles(prev => {
            const removed = prev[index];
            if (removed.preview) {
                try { URL.revokeObjectURL(removed.preview); } catch (err) { }
            }

            const next = prev.filter((_, i) => i !== index);
            if (next.length === 0 && fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return next;
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onEmojiClick = (emojiData: EmojiClickData, _event: MouseEvent) => {
        setMessage((prev) => prev + emojiData.emoji);
        setOpenEmoji(false);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                {/* Chat Header */}
                <Box
                    sx={{
                        p: 2,
                        borderBottom: "1px solid #e0e0e0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        bgcolor: "#fff",
                    }}
                >
                    <Box>
                        <IconButton onClick={() => { }} sx={{ mr: 1, display: { xs: 'block', md: 'none' } }}>
                            <ArrowBack sx={{ fontWeight: 'bold' }} />
                        </IconButton>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar onClick={() => { }}
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }
                                }}
                            />
                            <Typography onClick={() => { }} variant="subtitle1"
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }
                                }}>User 2</Typography>
                        </Stack>
                    </Box>
                </Box>

                {/* Chat Messages */}
                <Box
                    ref={parentRef}
                    //onScroll={handleScroll}
                    sx={{
                        height: "100%",
                        overflow: "auto",
                        px: 2, // add horizontal padding for nicer breathing room
                        py: 1.5,
                        bgcolor: "#f8f8f8",
                    }}
                >
                    {isLoading ?
                        <Box sx={{ mx: 'auto', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            Loading...<CircularProgress size={'15px'} />
                        </Box>
                        :
                        <Box
                            sx={{
                                height: "100%",
                                overflow: "auto",
                                px: 2, // add horizontal padding for nicer breathing room
                                py: 1.5,
                                bgcolor: "#f8f8f8",
                            }}
                        >
                            <Box
                                sx={{
                                    height: `${rowVirtualizer.getTotalSize()}px`,
                                    position: "relative",
                                    width: "100%",
                                }}
                            >
                                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                    const prevMsg = messages[virtualRow.index - 1];
                                    const msg = messages[virtualRow.index];
                                    const showAvatar = virtualRow.index === 0 || prevMsg.from_id !== msg.from_id;

                                    const isOwnMessage = (msg: any) => msg.from_id === userId;
                                    const isMine = isOwnMessage(msg);
                                    const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
                                    const isVideo = (url: string) => /\.(mp4|webm|mov|mkv|avi)$/i.test(url);

                                    const parseAttachment = (att: string | null) => {
                                        if (!att) return null;

                                        try {
                                            return JSON.parse(att);
                                        } catch (e) {
                                            return null;
                                        }
                                    };
                                    const attachment = msg.attachment ? parseAttachment(msg.attachment) : '';
                                    const fileUrl = attachment ? `${BaseUrl}/${attachment.file_url}` : null;

                                    return (
                                        <Box
                                            key={virtualRow.key}
                                            data-index={virtualRow.index}
                                            ref={rowVirtualizer.measureElement}
                                            sx={{
                                                position: "absolute", // Keep absolute position here
                                                top: 0, // Set top to 0 for absolute positioning
                                                left: 0, // Set left to 0 for absolute positioning
                                                width: "100%",
                                                transform: `translateY(${virtualRow.start}px)`,
                                                // Keep horizontal padding but remove vertical padding, as the height is now measured correctly.
                                                px: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{ width: "100%", py: 1 }}
                                            >
                                                <Box sx={{ display: "flex", justifyContent: isMine ? "flex-end" : "flex-start", alignItems: 'flex-start', gap: 1 }}>
                                                    {/*Avatar won't be shown again if the new message is from the same user. */}
                                                    {!isMine && (
                                                        showAvatar ? (
                                                            <Avatar
                                                                sx={{ width: 34, height: 34, mt: 0.5 }}
                                                                src={""}//ChatData?.data.data.avatar_url
                                                            />
                                                        ) : (
                                                            <Box sx={{ width: 34 }} />
                                                        )
                                                    )}

                                                    {/* This is a message column. */}
                                                    <Box
                                                        sx={{
                                                            maxWidth: { xs: "78%", sm: "65%", md: "55%" },
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: 0.7,
                                                            textAlign: isMine ? 'right' : 'left'
                                                        }}
                                                    >
                                                        {/* The user name will be shown only in the first message. */}
                                                        {showAvatar &&
                                                            <Typography sx={{ fontSize: 14, fontWeight: 600, textAlign: isMine ? 'right' : 'left' }}>
                                                                User
                                                                {/*{isMine ? UserData?.data.name : ChatData?.data.data.name} */}
                                                            </Typography>
                                                        }

                                                        {/* Message box & Media */}
                                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ml: isMine ? 'auto' : '' }}>
                                                            {/* Text */}
                                                            {msg.body &&
                                                                <Box
                                                                    sx={{
                                                                        bgcolor: isMine ? "#E42778" : "white",
                                                                        color: isMine ? 'white' : 'black',
                                                                        p: 1.4,
                                                                        borderRadius: 3,
                                                                        borderTopLeftRadius: isMine ? 3 : 0,
                                                                        borderTopRightRadius: isMine ? 0 : 3,
                                                                        boxShadow: 1,
                                                                        fontSize: 15,
                                                                        wordBreak: "break-word"
                                                                    }}
                                                                >
                                                                    {msg.body}
                                                                    <Typography sx={{ fontSize: 11, color: "gray" }}>
                                                                        {fmtDate(msg.created_at)}
                                                                    </Typography>
                                                                </Box>
                                                            }

                                                            {/* Image & Video */}
                                                            {fileUrl &&
                                                                <Box sx={{ width: 300, height: 300, ml: isMine ? 'auto' : '' }}>
                                                                    {isImage(fileUrl) && (
                                                                        <img
                                                                            src={fileUrl}
                                                                            onLoad={() => rowVirtualizer.measure()}
                                                                            style={{
                                                                                width: "100%",
                                                                                height: "100%",
                                                                                borderRadius: 8,
                                                                                objectFit: "cover"
                                                                            }}
                                                                        />
                                                                    )}

                                                                    {isVideo(fileUrl) && (
                                                                        <video
                                                                            controls
                                                                            onLoadedMetadata={() => rowVirtualizer.measure()}
                                                                            style={{
                                                                                width: "100%",
                                                                                borderRadius: 8,
                                                                            }}
                                                                        >
                                                                            <source src={fileUrl} />
                                                                        </video>
                                                                    )}
                                                                </Box>
                                                            }
                                                        </Box>
                                                    </Box>

                                                    {/* This is for the user's avatar. It won't be shown again if the new message is from the same user.         */}
                                                    {isMine &&
                                                        (
                                                            showAvatar ? (
                                                                <Avatar
                                                                    sx={{ width: 34, height: 34, mt: 0.5 }}
                                                                    src={''} //{UserData?.data.profile_url
                                                                />
                                                            ) : (
                                                                <Box sx={{ width: 34 }} />
                                                            )
                                                        )
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>
                    }
                </Box>

                {/* Input Message Bar */}
                <Box
                    p={2}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    bgcolor="#fff"
                    sx={{
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#aaa',
                            borderRadius: 2,
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#888',
                        },
                    }}
                >
                    {/* file preview list + input */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "0.5fr 12fr 1.5fr",
                            bgcolor: "lightgray",
                            alignItems: "flex-end",
                            width: "100%",
                            maxWidth: "1500px",
                            mx: "auto",
                            height: "auto",
                            p: 1,
                            borderRadius: 8,
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#aaa',
                                borderRadius: 2,
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#888',
                            },
                        }}>
                        <IconButton component="label">
                            <AttachFileOutlined />
                            <input
                                ref={fileInputRef}
                                type="file"
                                hidden
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                            />
                        </IconButton>
                    </Box>

                    <Box>
                        {/* preview selected files */}
                        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                            {selectedFiles.map((file, i) => {
                                // const previewUrl = URL.createObjectURL(file.file);
                                return (
                                    <Box
                                        key={i}
                                        sx={{
                                            position: "relative",
                                            width: 80,
                                            height: 80,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            border: "1px solid #ccc"
                                        }}
                                    >
                                        {file.file.type.startsWith("image/") ?
                                            <img
                                                src={file.preview}
                                                alt={file.file.name}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                            :
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    bgcolor: "#eee",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 12,
                                                    textAlign: "center",
                                                    p: 1
                                                }}
                                            >
                                                {file.file.name}
                                            </Box>
                                        }

                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: "absolute",
                                                top: 2,
                                                right: 2,
                                                bgcolor: "rgba(0,0,0,0.6)",
                                                color: "white",
                                                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                                            }}
                                            onClick={() => removeFileAtIndex(i)}
                                        >
                                            <Close sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </Box>
                                );
                            })}
                        </Box>

                        <InputBase
                            placeholder="Type here"
                            multiline
                            value={message}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    //handleSend();
                                }
                            }}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{
                                flex: 1, color: "gray", px: 1, mb: 0.3, maxHeight: 150, overflowY: "auto", width: "100%", '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#aaa',
                                    borderRadius: 2,
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    backgroundColor: '#888',
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton onClick={() => setOpenEmoji(true)}>
                            <SentimentSatisfiedAlt />
                        </IconButton>
                        <IconButton //message == '' ? selectedFiles.length === 0 ? true : isSending
                            disabled={message == '' ? selectedFiles.length === 0 ? true : isSending : false}
                            sx={{ mb: 0, pt: 1, color: isSending ? "gray" : "#E42778" }}
                            onClick={() => { }}
                        >
                            <Send sx={{ transform: "rotate(315deg)" }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}