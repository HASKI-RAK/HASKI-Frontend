import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    DefaultAppBar as AppBar,
    DefaultToolbar as Toolbar,
    DefaultTypography as Typography,
    DefaultBox as Box,
    DefaultIconButton as IconButton,
    DefaultMenu as Menu,
    DefaultTooltip as Tooltip,
    DefaultAvatar as Avatar,
    DefaultMenuItem as MenuItem,
    DefaultGrid as Grid,
    DefaultButton as Button,
    DefaultPopover as Popover,
    DefaultLink as Link,
    DefaultDivider as Divider,
} from "@common/components";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {useTranslation} from "react-i18next";
import {ListItemIcon} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {AuthContext} from "@services";

const responseTopics = {
    "topics": [
        {
            "id": 1,
            "name": "Allgemeine Informationen",
            "lms_id": 1,
            "is_topic": true,
            "parent_id": 0,
            "contains_le": true,
            "done": false,
            "done_percantage": 0,
            "last_visit": "0",
            "time_spend": 0,
            "is_recommended": true
        },
        {
            "id": 2,
            "name": "Adapter",
            "lms_id": 2,
            "is_topic": true,
            "parent_id": 0,
            "contains_le": true,
            "done": false,
            "done_percantage": 0,
            "last_visit": "0",
            "time_spend": 0,
            "is_recommended": false
        },
        {
            "id": 3,
            "name": "Command, Command with Undo, Command Processor",
            "lms_id": 3,
            "is_topic": true,
            "parent_id": 0,
            "contains_le": true,
            "done": false,
            "done_percantage": 0,
            "last_visit": "0",
            "time_spend": 0,
            "is_recommended": false
        },
        {
            "id": 4,
            "name": "Strategie",
            "lms_id": 4,
            "is_topic": true,
            "parent_id": 0,
            "contains_le": true,
            "done": false,
            "done_percantage": 0,
            "last_visit": "0",
            "time_spend": 0,
            "is_recommended": false
        },
        {
            "id": 5,
            "name": "Zustand",
            "lms_id": 5,
            "is_topic": true,
            "parent_id": 0,
            "contains_le": true,
            "done": false,
            "done_percantage": 0,
            "last_visit": "0",
            "time_spend": 0,
            "is_recommended": false
        },
    ]
};

responseTopics.topics.sort((a, b) => b.id - a.id);

const responseLearningElements = [
    {
        "position": 2,
        "learning_element": {
            "id": 1,
            "lms_id": 14,
            "activity_type": "h5pactiviy",
            "classification": "SE",
            "name": "Selbsteinschätzungstest",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 1,
        "learning_element": {
            "id": 2,
            "lms_id": 63,
            "activity_type": "h5pactiviy",
            "classification": "KÜ",
            "name": "Kurzübersicht",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 3,
        "learning_element": {
            "id": 3,
            "lms_id": 62,
            "activity_type": "h5pactiviy",
            "classification": "BE",
            "name": "Beispiel",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 5,
        "learning_element": {
            "id": 4,
            "lms_id": 15,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 1 Leicht",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 6,
        "learning_element": {
            "id": 5,
            "lms_id": 68,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 2 Leicht",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 7,
        "learning_element": {
            "id": 6,
            "lms_id": 66,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 1 Mittel",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 8,
        "learning_element": {
            "id": 7,
            "lms_id": 69,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 2 Mittel",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 9,
        "learning_element": {
            "id": 8,
            "lms_id": 67,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 1 Schwer",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 10,
        "learning_element": {
            "id": 9,
            "lms_id": 20,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 2 Schwer",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 4,
        "learning_element": {
            "id": 10,
            "lms_id": 71,
            "activity_type": "h5pactiviy",
            "classification": "ZF",
            "name": "Zusammenfassung",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    }
];

responseLearningElements.sort((a, b) => a.position - b.position);

/**
 * The MenuBar component is the top bar of the application.
 *
 * @remarks
 * It contains the logo, the user menu and the topics menu.
 * A search bar is planned to be added in the future.
 * It does not contain any logic yet, since the data is not yet available.
 *
 * @category Components
 */
const MenuBar = () => {
    // UX Logic
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElTopics, setAnchorElTopics] = useState<null | HTMLElement>(null);
    const authcontext = useContext(AuthContext);

    const {t} = useTranslation();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenTopicsMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElTopics(event.currentTarget);
    };

    const handleCloseTopicsMenu = () => {
        setAnchorElTopics(null);
    };

    const handleUserLogout = () => {
        authcontext.logout();
        navigate("/login", { replace: true });
    };

    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Box
                    component="img"
                    sx={{
                        mt: 2,
                        mb: 2,
                        ml: {xs: 1, md: 2},
                        display: {xs: "none", md: "flex"},
                        maxHeight: {xs: 20, md: 50},
                        maxWidth: {xs: 20, md: 50},
                        borderRadius: "50%",
                        backgroundColor: "white",
                        cursor: "pointer",
                    }}
                    alt="HASKI Home"
                    src="/LogoPng.png"
                    onClick={() => navigate("/")}

                />
                <Box sx={{flexGrow: 1, textAlign: "center", display: "flex"}}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            alignItems: "center",
                            textAlign: "center",
                            display: {xs: "none", md: "flex"},
                        }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                ml: 2,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                            onClick={() => navigate("/")}
                        >
                            HASKI
                        </Typography>
                        <Box sx={{flexGrow: 0, mr: {xs: 0, md: 2}}}>
                            <Tooltip title="Open topics">
                                <Button
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenTopicsMenu}
                                    color="inherit"
                                    endIcon={
                                        anchorElTopics ? (
                                            <ArrowDropDownIcon sx={{transform: "rotate(180deg)"}}/>
                                        ) : (
                                            <ArrowDropDownIcon/>
                                        )
                                    }
                                >
                                    {t("components.MenuBar.MenuBar.Button")}
                                </Button>
                            </Tooltip>
                            <Popover
                                id="menu-appbar"
                                anchorEl={anchorElTopics}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElTopics)}
                                onClose={handleCloseTopicsMenu}
                            >
                                <Box sx={{p: 2}}>
                                    <Grid container direction="column-reverse" spacing={2}>
                                        {responseTopics.topics.map((topic) => (
                                            <>
                                                <Grid item xs={12} key={t(topic.name)}>
                                                    <Typography variant="h6">{t(topic.name)}</Typography>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            flexWrap: "wrap",
                                                            justifyContent: "start",
                                                        }}
                                                    >
                                                        {responseLearningElements.map((element) => (
                                                            <Link
                                                                key={element.learning_element.name}
                                                                underline="hover"
                                                                variant="body2"
                                                                component="span"
                                                                color="inherit"
                                                                sx={{m: 1, cursor: "pointer"}}
                                                                onClick={() => {
                                                                    navigate(`/topics/${t(topic.name)}/${t(element.learning_element.name)}`);
                                                                    handleCloseTopicsMenu();
                                                                }}
                                                            >
                                                                {element.learning_element.name}
                                                            </Link>
                                                        ))}
                                                    </Box>
                                                </Grid>
                                                {responseTopics.topics.indexOf(topic) !== responseTopics.topics.length - 1 && (
                                                    <Divider flexItem/>
                                                )}
                                            </>
                                        ))}
                                    </Grid>
                                </Box>
                            </Popover>
                        </Box>
                    </Box>
                    {/** Search bar */}
                    <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
                        {/* <Searchbar /> */}
                    </Box>

                    {/** Help button */}
                    <Box display="flex" sx={{flexGrow: 0, mr: {xs: 0, md: 2}}}>
                        <Tooltip title={t("help")}>
                            <IconButton>
                                <HelpIcon data-testid="HelpIcon"/>
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/** Settings button */}
                    <Box display="flex" sx={{flexGrow: 0, mr: {xs: 0, md: 2}}}>
                        <Tooltip title={t("tooltip.openGlobalSettings")}>
                            <IconButton>
                                <SettingsIcon data-testid="SettingsIcon"/>
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/** User menu */}
                    <Box sx={{flexGrow: 0, mr: {xs: 0, md: 2}}}>
                        <Tooltip title={t("tooltip.openSettings")}>
                            <IconButton onClick={handleOpenUserMenu} data-testid="useravatar">
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: "45px"}}
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
                            <MenuItem
                                data-testid="usermenuitem"
                                key={t("components.MenuBar.MenuBar.Profile.Logout")}
                                onClick={handleUserLogout}
                            >
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                <Typography textAlign="center">{t("components.MenuBar.MenuBar.Profile.Logout")}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;
