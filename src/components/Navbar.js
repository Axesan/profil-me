import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Menu, Tooltip, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const pages = [
    { name: 'Home', path: '/' },
    { name: 'Editor', path: '/editor' },
];
const userLoginSettings = [
    { name: 'Profile', path: '/profile' }, // Exemple si tu as une page de profil
    { name: 'Edit Profile', path: '/editor' },
    { name: 'Dashboard', path: '/dashboard' }, // Exemple pour une future page
    { name: 'Logout', path: '/logout' }, // Exemple, même si le logout pourrait être une fonction
];

export default function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* Menu Icon for small screens */}
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* Drawer for small screens */}
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                    >
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <List>
                                {pages.map((page) => (
                                    <ListItem
                                        button
                                        key={page.name}
                                        component={Link}
                                        to={page.path}
                                    >
                                        <ListItemText primary={page.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>

                    {/* Logo */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            textAlign: { xs: 'center', md: 'left' },
                            ml: { md: 2 },
                        }}
                    >
                        Profile Me
                    </Typography>

                    {/* Navigation Links for larger screens */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                component={Link}
                                to={page.path}
                                sx={{ color: 'white' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {userLoginSettings.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    component={Link}
                                    to={setting.path}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
