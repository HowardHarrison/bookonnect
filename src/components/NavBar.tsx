import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Avatar, Container, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { RootState } from "main";
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";

const menuItems = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Authors", path: "/authors" },
    { name: "About Us", path: "/about-us" },
];

const NavBar = () => {
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const isAuth = Boolean(useSelector((state: RootState) => state.auth.token));
    const user = useSelector((state: RootState) => state.auth.user);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    return (
        <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "#EEEEEE" }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{
                            fontWeight: 600,
                            fontSize: 20,
                            color: "#ff2216",
                            textDecoration: "none",
                        }}
                    >
                        Bookonnect
                    </Typography>

                    {/* Desktop Menu */}
                    {!isMobile ? (
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            {menuItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={RouterLink}
                                    to={item.path}
                                    sx={{
                                        textTransform: "none",
                                        fontSize: 16,
                                        fontWeight: location.pathname === item.path ? 500 : 400,
                                        color: location.pathname === item.path ? "#ff2216" : "inherit",
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}

                            {!isAuth ? (
                                <>
                                    <Button
                                        component={RouterLink}
                                        to="/login"
                                        variant="outlined"
                                        sx={{
                                            textTransform: "none",
                                            color: "#ff2216",
                                            borderColor: "#ff2216",
                                        }}
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        component={RouterLink}
                                        to="/signup"
                                        variant="contained"
                                        sx={{
                                            textTransform: "none",
                                            backgroundColor: "#ff2216",
                                            color: "white",
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <IconButton onClick={handleMenuOpen}>
                                        <Avatar
                                            src={user?.profileImage}
                                            alt={user?.firstName}
                                            sx={{ border: "2px solid #ff2216" }}
                                        />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem disabled>{user?.firstName}</MenuItem>
                                        <MenuItem
                                            onClick={handleMenuClose}
                                            component={RouterLink}
                                            to="/profile"
                                        >
                                            Profile
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                                    </Menu>
                                </>
                            )}
                        </Box>
                    ) : (
                        <>
                            <IconButton onClick={toggleDrawer}>
                                <MenuIcon sx={{ color: "#ff2216", fontSize: 30 }} />
                            </IconButton>
                            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                                <Box
                                    sx={{ width: 250 }}
                                    role="presentation"
                                    onClick={toggleDrawer}
                                    onKeyDown={toggleDrawer}
                                >
                                    <List>
                                        {menuItems.map((item) => (
                                            <ListItem
                                                key={item.path}
                                                component={RouterLink}
                                                to={item.path}
                                                sx={{
                                                    textTransform: "none",
                                                    fontSize: 16,
                                                    fontWeight: location.pathname === item.path ? 500 : 400,
                                                    color: location.pathname === item.path ? "#ff2216" : "inherit",
                                                }}
                                            >
                                                <ListItemText primary={item.name} />
                                            </ListItem>
                                        ))}
                                        {!isAuth ? (
                                            <>
                                                <ListItem
                                                    component={RouterLink}
                                                    to="/login"
                                                >
                                                    <Button
                                                        component={RouterLink}
                                                        to="/login"
                                                        variant="outlined"
                                                        sx={{
                                                            textTransform: "none",
                                                            color: "#ff2216",
                                                            borderColor: "#ff2216",
                                                            width: "80px"
                                                        }}
                                                    >
                                                        Log In
                                                    </Button>
                                                </ListItem>
                                                <ListItem
                                                    component={RouterLink}
                                                    to="/signup"
                                                >
                                                    <Button
                                                        component={RouterLink}
                                                        to="/signup"
                                                        variant="contained"
                                                        sx={{
                                                            textTransform: "none",
                                                            backgroundColor: "#ff2216",
                                                            color: "white",
                                                            width: "80px"
                                                        }}
                                                    >
                                                        Sign Up
                                                    </Button>
                                                </ListItem>
                                            </>
                                        ) : (
                                            <>
                                                <ListItem sx={{
                                                    textTransform: "none",
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                    color: "inherit",
                                                }} component={RouterLink} to="/profile">
                                                    <ListItemText primary="Profile" />
                                                </ListItem>
                                                <ListItem sx={{
                                                    textTransform: "none",
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                    color: "inherit",
                                                }}>
                                                    <ListItemText primary="Logout" />
                                                </ListItem>
                                            </>
                                        )}
                                    </List>
                                </Box>
                            </Drawer>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;