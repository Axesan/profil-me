import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Menu,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const userLoginSettings = [
  { name: "Profile", path: "/profile" }, // Exemple si tu as une page de profil
  { name: "Edit Profile", path: "/editor" },
  { name: "Dashboard", path: "/dashboard" }, // Exemple pour une future page
  // Exemple, même si le logout pourrait être une fonction
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
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const { logout, token, user } = React.useContext(AuthContext);
  console.log(React.useContext(AuthContext));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Menu Icon for small screens */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
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
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                <ListItem button component={Link} to={"/"}>
                  <ListItemText primary={"Home"} />
                </ListItem>
                <ListItem button component={Link} to={"/login"}>
                  <ListItemText primary={"Login"} />
                </ListItem>
              </List>
            </Box>
          </Drawer>

          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: { xs: "center", md: "left" },
              ml: { md: 2 },
            }}
          >
            Profile Me
          </Typography>

          {/* Navigation Links for larger screens */}
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            {token && (
              <Button component={Link} to={"/editor"} sx={{ color: "white" }}>
                Tableau de bord
              </Button>
            )}
          </Box>

          {/* User Menu */}
          {token && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
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

              <Button onClick={logout} sx={{ color: "white" }}>
                Déconnexion
              </Button>
            </Box>
          )}
          {!token && (
            <>
              <Button component={Link} to={"/login"} sx={{ color: "white" }}>
                Connexion
              </Button>
              <Button component={Link} to={"/sign-up"} sx={{ color: "white" }}>
                S'enregistrer
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
