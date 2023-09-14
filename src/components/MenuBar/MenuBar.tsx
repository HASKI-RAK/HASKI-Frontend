import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  Tooltip,
  Avatar,
  MenuItem,
  Grid,
  Button,
  Popover,
  Divider,
  ListItemIcon,
  Link
} from '@common/components'

import {
    Analytics,
    Settings,
    Help,
    ArrowDropDown,
    Person,
    Login,
    Logout,
    AssignmentOutlined
} from '@common/icons'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined'

import { useTranslation } from 'react-i18next'
import { AuthContext, SnackbarContext } from '@services'
import { DropdownLanguage, SkeletonList, QuestionnaireResultsModal } from '@components'
import { usePersistedStore, useStore } from '@store'
import { Topic } from '@core'
import log from 'loglevel'

// TODO: Move it into @common/hooks since it is reused in LocalNav

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
  const { courseId } = useParams<string>()
  const { t } = useTranslation()
  const [loadingTopics, setLoadingTopics] = useState(true)
  const [topicsPath, setTopicsPath] = useState<Topic[]>([])
  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const fetchLearningPathTopic = useStore((state) => state.fetchLearningPathTopic)
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenTopicsMenu = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTopics(event.currentTarget)
    fetchUser().then((user) => {
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
  }

  const handleCloseTopicsMenu = () => {
    setAnchorElTopics(null)
  }

  const handleUserLogout = () => {
    handleCloseUserMenu()
    logout()
    navigate('/login')
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
                        <ArrowDropDown sx={{ transform: 'rotate(180deg)' }} />
                      ) : (
                        <ArrowDropDown />
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
                        <Box width={400}>
                          <SkeletonList />
                        </Box>
                      ) : (
                        //For every Topic the LearningPathElement is displayed under it.
                        <>
                          {[...topicsPath].reverse().map((topic) => (
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
                                  }}
                                />
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
            <DropdownLanguage />
          </Box>

          {/** Questionnaire Results */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('tooltip.openQuestionnaireResults')}>
              <IconButton onClick={handleOpenModal}>
                <Analytics data-testid="QuestionnaireResultsIcon" />
              </IconButton>
            </Tooltip>
            <QuestionnaireResultsModal open={modalOpen} handleClose={handleCloseModal} />
          </Box>

          {/** Help button */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('help')}>
              <IconButton
                onClick={() => {
                  window.open('/files/Bedienungsanleitung_von_HASKI_Alpha.pdf', '_blank')
                }}>
                <Help data-testid="HelpIcon" />
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
                <Settings data-testid="SettingsIcon" />
              </IconButton>
            </Tooltip>
          </Box>

          {/** User menu */}
          <Box sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('tooltip.openSettings')}>
              <IconButton onClick={handleOpenUserMenu} data-testid="useravatar">
                <Avatar alt="Remy Sharp">
                  <Person />
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
                data-testid="questionnaireILS"
                key="questionnaireILS"
                onClick={() => {
                  navigate('/questionnaire_ils_long')
                  handleCloseUserMenu()
                }}>
                <ListItemIcon>{isAuth ? <LibraryBooksOutlinedIcon fontSize="small" /> : null}</ListItemIcon>
                <Typography textAlign="center">{isAuth ? 'ILS Questionnaire' : null}</Typography>
              </MenuItem>
              <MenuItem
                data-testid="questionnaireILSshort"
                key="questionnaireILSshort"
                onClick={() => {
                  navigate('/questionnaire_ils_short')
                  handleCloseUserMenu()
                }}>
                <ListItemIcon>{isAuth ? <AssignmentOutlined fontSize="small" /> : null}</ListItemIcon>
                <Typography textAlign="center">{isAuth ? 'ILS Questionnaire shortend' : null}</Typography>
              </MenuItem>
              <MenuItem
                data-testid="questionnaireListk"
                key="questionnaireListk"
                onClick={() => {
                  navigate('/questionnaire_listk')
                  handleCloseUserMenu()
                }}>
                <ListItemIcon>{isAuth ? <PlaylistAddCheckCircleOutlinedIcon fontSize="small" /> : null}</ListItemIcon>
                <Typography textAlign="center">{isAuth ? 'List-K Questionnaire' : null}</Typography>
              </MenuItem>
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
