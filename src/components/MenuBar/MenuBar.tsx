import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useTranslation } from "react-i18next";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const topics = [
  {
    name: ("components.LocalNav.LocalNav.Topics.5"),
    subtopics: [
      "components.LocalNav.LocalNav.Topics.X.1",
      "components.LocalNav.LocalNav.Topics.X.2",
      "components.LocalNav.LocalNav.Topics.X.3",
      "components.LocalNav.LocalNav.Topics.X.4",
      "components.LocalNav.LocalNav.Topics.X.5",
      "components.LocalNav.LocalNav.Topics.X.6",
      "components.LocalNav.LocalNav.Topics.X.7",
      "components.LocalNav.LocalNav.Topics.X.8",
      "components.LocalNav.LocalNav.Topics.X.9",
      "components.LocalNav.LocalNav.Topics.X.10",
    ],
  },
  {
    name: ("components.LocalNav.LocalNav.Topics.4"),
    subtopics: [
      "components.LocalNav.LocalNav.Topics.X.1",
      "components.LocalNav.LocalNav.Topics.X.2",
      "components.LocalNav.LocalNav.Topics.X.3",
      "components.LocalNav.LocalNav.Topics.X.4",
      "components.LocalNav.LocalNav.Topics.X.5",
      "components.LocalNav.LocalNav.Topics.X.6",
      "components.LocalNav.LocalNav.Topics.X.7",
      "components.LocalNav.LocalNav.Topics.X.8",
      "components.LocalNav.LocalNav.Topics.X.9",
      "components.LocalNav.LocalNav.Topics.X.10",
    ],
  },
  {
    name: ("components.LocalNav.LocalNav.Topics.3"),
    subtopics: [
      "components.LocalNav.LocalNav.Topics.X.1",
      "components.LocalNav.LocalNav.Topics.X.2",
      "components.LocalNav.LocalNav.Topics.X.3",
      "components.LocalNav.LocalNav.Topics.X.4",
      "components.LocalNav.LocalNav.Topics.X.5",
      "components.LocalNav.LocalNav.Topics.X.6",
      "components.LocalNav.LocalNav.Topics.X.7",
      "components.LocalNav.LocalNav.Topics.X.8",
      "components.LocalNav.LocalNav.Topics.X.9",
      "components.LocalNav.LocalNav.Topics.X.10",
    ],
  },
  {
    name: ("components.LocalNav.LocalNav.Topics.2"),
    subtopics: [
      "components.LocalNav.LocalNav.Topics.X.1",
      "components.LocalNav.LocalNav.Topics.X.2",
      "components.LocalNav.LocalNav.Topics.X.3",
      "components.LocalNav.LocalNav.Topics.X.4",
      "components.LocalNav.LocalNav.Topics.X.5",
      "components.LocalNav.LocalNav.Topics.X.6",
      "components.LocalNav.LocalNav.Topics.X.7",
      "components.LocalNav.LocalNav.Topics.X.8",
      "components.LocalNav.LocalNav.Topics.X.9",
      "components.LocalNav.LocalNav.Topics.X.10",
    ],
  },
  {
    name: ("components.LocalNav.LocalNav.Topics.1"),
    subtopics: [
      "components.LocalNav.LocalNav.Topics.X.1",
      "components.LocalNav.LocalNav.Topics.X.2",
      "components.LocalNav.LocalNav.Topics.X.3",
      "components.LocalNav.LocalNav.Topics.X.4",
      "components.LocalNav.LocalNav.Topics.X.5",
      "components.LocalNav.LocalNav.Topics.X.6",
      "components.LocalNav.LocalNav.Topics.X.7",
      "components.LocalNav.LocalNav.Topics.X.8",
      "components.LocalNav.LocalNav.Topics.X.9",
      "components.LocalNav.LocalNav.Topics.X.10",
    ],
  },
];

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
  const [anchorElTopics, setAnchorElTopics] = useState<null | HTMLElement>(
    null
  );

  const { t } = useTranslation();

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

  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Box
          component="img"
          sx={{
            mt: 2,
            mb: 2,
            ml: { xs: 1, md: 2 },
            display: { xs: "none", md: "flex" },
            maxHeight: { xs: 20, md: 50 },
            maxWidth: { xs: 20, md: 50 },
          }}
          alt="HASKI Home"
          src="/LogoPng.png"
          onClick={() => navigate("/")}
        />
        <Box sx={{ flexGrow: 1, textAlign: "center", display: "flex" }}>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              textAlign: "center",
              display: { xs: "none", md: "flex" },
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
            <Box sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
              <Tooltip title="Open topics">
                <Button
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenTopicsMenu}
                  color="inherit"
                  endIcon={
                    anchorElTopics ? (
                      <ArrowDropDownIcon sx={{ transform: "rotate(180deg)" }} />
                    ) : (
                      <ArrowDropDownIcon />
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
                <Box sx={{ p: 2 }}>
                  <Grid container direction="column-reverse" spacing={2}>
                    {topics.map((topic) => (
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
                            {topic.subtopics.map((subtopic) => (
                              <Link
                                key={t(subtopic)}
                                underline="hover"
                                variant="body2"
                                component="span"
                                color="inherit"
                                sx={{ m: 1 }}
                                onClick={() => {
                                  navigate(`/topics/${t(topic.name)}/${t(subtopic)}`);
                                  handleCloseTopicsMenu();
                                }}
                              >
                                {t(subtopic)}
                              </Link>
                            ))}
                          </Box>
                        </Grid>
                        {topics.indexOf(topic) !== topics.length - 1 && (
                          <Divider flexItem />
                        )}
                      </>
                    ))}
                  </Grid>
                </Box>
              </Popover>
            </Box>
          </Box>
          {/** Search bar */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* <Searchbar /> */}
          </Box>

          {/** Help button */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t("help")}>
              <IconButton>
                <HelpIcon data-testid="HelpIcon" />
              </IconButton>
            </Tooltip>
          </Box>

          {/** Settings button */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t("tooltip.openGlobalSettings")}>
              <IconButton>
                <SettingsIcon data-testid="SettingsIcon" />
              </IconButton>
            </Tooltip>
          </Box>

          {/** User menu */}
          <Box sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t("tooltip.openSettings")}>
              <IconButton onClick={handleOpenUserMenu} data-testid="useravatar">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem
                  data-testid="usermenuitem"
                  key={setting}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
