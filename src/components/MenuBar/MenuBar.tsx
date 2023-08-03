import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  DefaultDivider as Divider,
  DefaultSkeleton as Skeleton,
  DefaultListItemIcon as ListItemIcon,
  DefaultLink as Link
} from '@common/components'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpIcon from '@mui/icons-material/Help'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import PersonIcon from '@mui/icons-material/Person'
import { useTranslation } from 'react-i18next'
import { Login, Logout } from '@mui/icons-material'
import { AuthContext, SnackbarContext, Topic } from '@services'
import { DropdownLanguage } from '@components'
import { usePersistedStore, useStore } from '@store'
import log from 'loglevel'

/**
 *  Local navigation component props.
 *  The "loading" property is a boolean value that indicates whether the data is still being loaded.
 *  The "topics" property is an array of objects that represent the topics related to the current page.
 *  The "learningPaths" property is an array of objects that represent the available learning paths related to the current page.
 */
export type MenuBarProps = {
  courseSelected?: boolean
}

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

const MenuBar = ({ courseSelected = false }: MenuBarProps) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorElTopics, setAnchorElTopics] = useState<null | HTMLElement>(null)
  const { addSnackbar } = useContext(SnackbarContext)
  const { isAuth, logout } = useContext(AuthContext)
  const { courseId } = useParams() as { courseId: string }
  const { t } = useTranslation()
  const [loadingTopics, setLoadingTopics] = useState(true)
  const [topicsPath, setTopicsPath] = useState<Topic[]>([])
  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const fetchLearningPathTopic = useStore((state) => state.fetchLearningPathTopic)
  const reversedTopics: Topic[] = [...topicsPath]
  reversedTopics.sort((a, b) => reversedTopics.indexOf(b) - reversedTopics.indexOf(a))

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenTopicsMenu = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTopics(event.currentTarget)
    fetchUser()
      .then((user) => {
        fetchLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
          .then((TopicResponse) => {
            setTopicsPath(TopicResponse.topics)
            setLoadingTopics(false)
          })
          .catch((error) => {
            // 🍿 snackbar error
            addSnackbar({
              message: error.message,
              severity: 'error',
              autoHideDuration: 5000
            })
            log.error(error.message)
          })
      })
      .catch((error) => {
        // 🍿 snackbar error
        addSnackbar({
          message: error.message,
          severity: 'error',
          autoHideDuration: 5000
        })
        log.error(error.message)
      })
  }

  const handleCloseTopicsMenu = () => {
    setAnchorElTopics(null)
  }

  const handleUserLogout = () => {
    handleCloseUserMenu()
    logout()
    navigate('/login')
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
            {courseSelected && (
              <Box sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
                <Tooltip title="Open topics">
                  <Button
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenTopicsMenu}
                    data-testid="Menubar-TopicButton"
                    color="inherit"
                    endIcon={
                      anchorElTopics ? (
                        <ArrowDropDownIcon sx={{ transform: 'rotate(180deg)' }} />
                      ) : (
                        <ArrowDropDownIcon />
                      )
                    }>
                    {t('components.MenuBar.TopicButton')}
                  </Button>
                </Tooltip>
                <Popover
                  id="menu-appbar"
                  data-testid={'Menubar-TopicPopover'}
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
                      {loadingTopics ? ( // display Skeleton component while loading
                        <Box width={400}>{skeletonItems}</Box>
                      ) : (
                        //For every Topic the LearningPathElement is displayed under it.
                        <>
                          {reversedTopics.map((topic) => (
                            <>
                              <Grid item xs={12} key={t(topic.name)}>
                                <Link
                                  key={topic.name}
                                  data-testid={`Menubar-Topic-${topic.name}`}
                                  underline="hover"
                                  variant="h6"
                                  component="span"
                                  color="inherit"
                                  sx={{ m: 1, cursor: 'pointer' }}
                                  onClick={() => {
                                    navigate(`course/${courseId}/topic/${topic.id}`)
                                    handleCloseTopicsMenu()
                                  }}>
                                  {topic.name}
                                </Link>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'start'
                                  }}></Box>
                              </Grid>
                              {topicsPath.indexOf(topic) !== topicsPath.length && <Divider flexItem />}
                            </>
                          ))}
                        </>
                      )}
                    </Grid>
                  </Box>
                </Popover>
              </Box>
            )}
          </Box>
          {/** Search bar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>{/* <Searchbar /> */}</Box>

          {/** Language dropdown */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('language')}>
              <DropdownLanguage />
            </Tooltip>
          </Box>

          {/** Help button */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('help')}>
              <IconButton
                onClick={() => {
                  window.open('/files/Bedienungsanleitung_von_HASKI_Alpha.pdf', '_blank')
                }}>
                <HelpIcon data-testid="HelpIcon" />
              </IconButton>
            </Tooltip>
          </Box>

          {/** Settings button */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('tooltip.openGlobalSettings')}>
              <IconButton
                onClick={() => {
                  addSnackbar({
                    message: t('components.MenubBar.GlobalSettings.Error'),
                    severity: 'warning',
                    autoHideDuration: 5000
                  })
                }}>
                <SettingsIcon data-testid="SettingsIcon" />
              </IconButton>
            </Tooltip>
          </Box>

          {/** User menu */}
          <Box sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('tooltip.openSettings')}>
              <IconButton onClick={handleOpenUserMenu} data-testid="useravatar">
                <Avatar alt="Remy Sharp">
                  <PersonIcon />
                </Avatar>
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
                key="usermenuitem"
                onClick={() => {
                  isAuth ? handleUserLogout() : navigate('/login')
                  handleCloseUserMenu()
                }}>
                <ListItemIcon>{isAuth ? <Logout fontSize="small" /> : <Login fontSize="small" />}</ListItemIcon>
                <Typography textAlign="center">
                  {isAuth ? t('components.MenuBar.Profile.Logout') : t('components.MenuBar.Profile.Login')}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar
