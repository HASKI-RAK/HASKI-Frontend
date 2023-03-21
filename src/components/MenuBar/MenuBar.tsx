import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, Button, Tooltip, Avatar, SvgIcon, Paper } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
    const navigate = useNavigate();
    return <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <img src={"/LogoPng.png"} width="10%" height="10%" onClick={() => navigate("/")} style={{ margin: '5px' }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        ml: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        flexGrow: 1,
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    HASKI
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Course
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button color="inherit" href="/dashboard">Dashboard</Button>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }} open={false}>
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar >;
}

export default MenuBar;