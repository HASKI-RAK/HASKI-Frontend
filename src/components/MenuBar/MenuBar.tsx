import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  DefaultSkeleton as Skeleton
} from '@common/components'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpIcon from '@mui/icons-material/Help'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useTranslation } from 'react-i18next'
import { ListItemIcon } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { AuthContext, Topic, LearningPath } from '@services'
import {useLearningPath as _useLearningPath} from "../LocalNav/LocalNav.hooks";

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
export type MenuBarProps = {
  useLearningPath?: () => { loading: boolean, topics: Topic[], learningPath: LearningPath[] }
}

const MenuBar = ({ useLearningPath = _useLearningPath }: MenuBarProps) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorElTopics, setAnchorElTopics] = useState<null | HTMLElement>(null)
  const authcontext = useContext(AuthContext)
  const { t } = useTranslation()

  //Application logic hooks
  const { loading, topics, learningPath } = useLearningPath()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenTopicsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTopics(event.currentTarget)
  }

  const handleCloseTopicsMenu = () => {
    setAnchorElTopics(null)
  }

  const handleUserLogout = () => {
    handleCloseUserMenu()
    authcontext.logout()
    navigate('/login', { replace: true })
  }

  const skeletonItems = []
  for (let i = 0; i < 3; i++) {
    skeletonItems.push(
      <React.Fragment key={`MenuBar-Topic-Skeleton-${i}`}>
        <Skeleton variant="text" width={'500'} height={55} />
        <Skeleton variant="text" width={'70%'} height={20} />
      </React.Fragment>
    )
  }

  const navigate = useNavigate()
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Box
          component="img"
          sx={{
            mt: 2,
            mb: 2,
            ml: { xs: 1, md: 2 },
            display: { xs: 'none', md: 'flex' },
            maxHeight: { xs: 20, md: 50 },
            maxWidth: { xs: 20, md: 50 },
            borderRadius: '50%',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
          alt="HASKI Home"
          src="/LogoPng.png"
          onClick={() => navigate('/')}
        />
        <Box sx={{ flexGrow: 1, textAlign: 'center', display: 'flex' }}>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: 'center',
              textAlign: 'center',
              display: { xs: 'none', md: 'flex' }
            }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                ml: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
              onClick={() => navigate('/')}>
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
                    anchorElTopics ? <ArrowDropDownIcon sx={{ transform: 'rotate(180deg)' }} /> : <ArrowDropDownIcon />
                  }>
                  {t('components.MenuBar.TopicButton')}
                </Button>
              </Tooltip>
              <Popover
                id="menu-appbar"
                anchorEl={anchorElTopics}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElTopics)}
                onClose={handleCloseTopicsMenu}
                sx={{ minWidth: '500px' }}>
                <Box sx={{ p: 2 }}>
                  <Grid container direction="column-reverse" spacing={2}>
                    {loading ? ( // display Skeleton component while loading
                      <Box width={400}>{skeletonItems}</Box>
                    ) : (
                      <>
                        {topics.map((topic, index) => (
                          <React.Fragment key={`topic-in-Accordion-${topic.name}-topicID-${topic.id}`}>
                            <Grid item xs={12} key={t(topic.name)}>
                              <Typography variant="h6">{t(topic.name)}</Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  flexWrap: 'wrap',
                                  justifyContent: 'start'
                                }}>
                                {learningPath[index].path.map((element) => (
                                  <Link
                                    key={element.learning_element.name}
                                    underline="hover"
                                    variant="body2"
                                    component="span"
                                    color="inherit"
                                    sx={{ m: 1, cursor: 'pointer' }}
                                    onClick={() => {
                                      navigate(`/topics/${topic.name}/${element.learning_element.name}`)
                                      handleCloseTopicsMenu()
                                    }}>
                                    {element.learning_element.name}
                                  </Link>
                                ))}
                              </Box>
                            </Grid>
                            {topics.indexOf(topic) !== topics.length - 1 && <Divider flexItem />}
                          </React.Fragment>
                        ))}
                      </>
                    )}
                  </Grid>
                </Box>
              </Popover>
            </Box>
          </Box>
          {/** Search bar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>{/* <Searchbar /> */}</Box>

          {/** Help button */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('help')}>
              <IconButton>
                <HelpIcon data-testid="HelpIcon" />
              </IconButton>
            </Tooltip>
          </Box>

          {/** Settings button */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('tooltip.openGlobalSettings')}>
              <IconButton>
                <SettingsIcon data-testid="SettingsIcon" />
              </IconButton>
            </Tooltip>
          </Box>

          {/** User menu */}
          <Box sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('tooltip.openSettings')}>
              <IconButton onClick={handleOpenUserMenu} data-testid="useravatar">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem
                data-testid="usermenuitem"
                key={t('components.MenuBar.Profile.Logout')}
                onClick={handleUserLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">{t('components.MenuBar.Profile.Logout')}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar
