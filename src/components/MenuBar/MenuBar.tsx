import { AppBar, Toolbar, Typography, Box, IconButton, Menu, Tooltip, Avatar, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const MenuBar = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();
    return <AppBar position="static">
        <Toolbar disableGutters>
            <Box
                component="img"
                sx={{
                    mt: 2, mb: 2, ml: { xs: 1, md: 2 }, display: { xs: 'none', md: 'flex' },
                    maxHeight: { xs: 20, md: 50 },
                    maxWidth: { xs: 20, md: 50 },
                }}
                alt="HASKI Home"
                src="/LogoPng.png"
            />
            <Box sx={{ flexGrow: 1, textAlign: 'center', display: 'flex' }} >
                {/* , */}
                <Box sx={{ flexGrow: 1, alignItems: 'center', textAlign: 'center', display: { xs: 'none', md: 'flex' } }} >
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            ml: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        HASKI
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', textAlign: 'center', alignItems: 'center' }} >

                        <Typography>Course</Typography>
                        <Typography>Course2</Typography>
                    </Box>
                </Box>

                <Box sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>
        </Toolbar>
    </AppBar>;
}

export default MenuBar;