import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { RootState } from "main";
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";


const menuItems = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Authors", path: "/authors" },
    { name: "About", path: "/about" },
];

const NavBar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const isAuth = Boolean(useSelector((state: RootState) => state.auth.token));
    const user = useSelector((state: RootState) => state.auth.user);


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <AppBar position="static" elevation={0} sx={{ backgroundColor: '#EEEEEE' }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Logo */}
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: 20, color: "#ff2216" }}>
                    Bookonnect
                </Typography>

                {/* Menu Items */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    {menuItems.map((item) => (
                        <Button
                            key={item.path}
                            component={RouterLink}
                            to={item.path}
                            sx={{
                                textTransform: "none",
                                fontSize: 16,
                                fontWeight: location.pathname === item.path ? 500 : 400,
                                color: location.pathname === item.path ? "#ff2216" : "inherit"
                            }}
                        >
                            {item.name}
                        </Button>
                    ))}

                    {/* Auth Section */}
                    {!isAuth ? (
                        <>
                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="outlined"
                                sx={{ textTransform: "none", color: "#ff2216", borderColor: "#ff2216"}}
                            >
                                Log In
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/signup"
                                variant="contained"
                                sx={{ textTransform: "none", backgroundColor: "#ff2216", color: 'white' }}
                            >
                                Sign Up
                            </Button>
                        </>
                    ) : (
                        <>
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar src={user?.profileImage} alt={user?.firstName} sx={{border: "2px solid #ff2216"}}/>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem disabled>{user?.firstName}</MenuItem>
                                <MenuItem onClick={handleMenuClose} component={RouterLink} to="/profile">
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default NavBar;