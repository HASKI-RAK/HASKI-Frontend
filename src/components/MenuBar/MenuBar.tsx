import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ImageWrapper,
  ListItemIcon,
  Menu,
  MenuItem,
  TextWrapper,
  Toolbar,
  Tooltip,
  Typography
} from '@common/components'
import { useTheme } from '@common/hooks'
import {
  AssignmentOutlined,
  Brush,
  Help,
  LibraryBooksOutlined,
  Login,
  Logout,
  Person,
  PlaylistAddCheckCircleOutlined,
  Polyline
} from '@common/icons'
import {
  CourseMenu,
  FurtherInfoMenu,
  LanguageMenu,
  QuestionnaireQuestionsModal,
  StatisticsMenu,
  TableILSQuestions,
  TableListKQuestions,
  ThemeModal
} from '@components'
import { AuthContext, RoleContext } from '@services'
import { Theme } from '../../common/theme/DefaultTheme/DefaultTheme'
import CreateDefaultLearningPathModal from '../CreateDefaultLearningPath/Modal/CreateDefaultLearningPathModal'

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
  const { t } = useTranslation()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { isAuth, logout } = useContext(AuthContext)
  const { isCourseCreatorRole } = useContext(RoleContext)
  const activeTheme = useTheme()
  const [modalOpenTheme, setModalOpenTheme] = useState(false)
  const [modalOpenILSShort, setModalOpenILSShort] = useState(false)
  const [modalOpenILSLong, setModalOpenILSLong] = useState(false)
  const [modalOpenListK, setModalOpenListK] = useState(false)
  const [modalOpenDefaultLearningPath, setModalOpenDefaultLearningPath] = useState(false)
  const [successSendILSLong, setSuccessSendILSLong] = useState(false)
  const [successSendILSShort, setSuccessSendILSShort] = useState(false)
  const [successSendListK, setSuccessSendListK] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme>(activeTheme)
  const [selectedThemeString, setSelectedThemeString] = useState(activeTheme.name)

  const handleOpenThemeModal = () => {
    setSelectedTheme(activeTheme)
    setSelectedThemeString(activeTheme.name)
    setModalOpenTheme(true)
    setAnchorElUser(null)
  }

  const handleCloseThemeModal = () => {
    setModalOpenTheme(false)
  }

  const handleOpenILSShortModal = () => {
    setModalOpenILSShort(true)
    setAnchorElUser(null)
  }

  const handleCloseILSShortModal = (event: object, reason: string) => {
    if (!successSendILSShort) {
      if (reason == 'backdropClick')
        if (window.confirm(t('components.Menubar.closeDialog'))) setModalOpenILSShort(false)
    } else {
      window.location.reload()
      setModalOpenILSShort(false)
    }
  }

  const handleOpenILSLongModal = () => {
    setModalOpenILSLong(true)
    setAnchorElUser(null)
  }

  const handleCloseILSLongModal = (event: object, reason: string) => {
    if (!successSendILSLong) {
      if (reason == 'backdropClick') if (window.confirm(t('components.Menubar.closeDialog'))) setModalOpenILSLong(false)
    } else {
      window.location.reload()
      setModalOpenILSLong(false)
    }
  }

  const handleOpenListKModal = () => {
    setModalOpenListK(true)
    setAnchorElUser(null)
  }

  const handleOpenDefaultLearningPath = () => {
    setModalOpenDefaultLearningPath(true)
    setAnchorElUser(null)
  }

  const handleCloseListKModal = (_: object, reason: string) => {
    if (!successSendListK) {
      if (reason == 'backdropClick') if (window.confirm(t('components.Menubar.closeDialog'))) setModalOpenListK(false)
    } else {
      window.location.reload()
      setModalOpenListK(false)
    }
  }

  const handleCloseDefaultLearningPath = () => {
    setModalOpenDefaultLearningPath(false)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
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
        <ImageWrapper
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
          src="/LogoHaski.png"
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
            <TextWrapper
              id="HASKI-text-menu-bar"
              variant="h6"
              noWrap
              component="a"
              sx={(theme) => ({
                mr: 2,
                ml: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: theme.palette.secondary.contrastText,
                textDecoration: 'none'
              })}
              onClick={() => navigate('/')}>
              HASKI
            </TextWrapper>
            <CourseMenu />
            <StatisticsMenu />
            <FurtherInfoMenu />
          </Box>
          {/** Search bar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>{/* <Searchbar /> */}</Box>
          {/** Language menu */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 }, mt: 1 }}>
            <LanguageMenu />
          </Box>
          {/** Theme button */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={<Typography variant={'body2'}>{t('components.ThemeModal.buttonDescription')}</Typography>}>
              <IconButton id="theme-icon-button" onClick={() => handleOpenThemeModal()}>
                <Brush data-testid="BrushIcon" />
              </IconButton>
            </Tooltip>
            <ThemeModal
              open={modalOpenTheme}
              handleClose={() => handleCloseThemeModal()}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              selectedThemeString={selectedThemeString}
              setSelectedThemeString={setSelectedThemeString}
            />
          </Box>

          {/** Help button */}
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={<Typography variant={'body2'}>{t('appGlobal.help')}</Typography>}>
              <IconButton
                id="manual-icon-button"
                onClick={() => {
                  window.open('/files/Tutorial_zur_Bedienung_von_HASKI_Mai2025.pdf', '_blank')
                }}>
                <Help data-testid="HelpIcon" />
              </IconButton>
            </Tooltip>
          </Box>
          {/**
          { Settings button }
          <Box display="flex" sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={t('tooltip.openGlobalSettings')}>
              <IconButton
                id="global-settings-icon-button"
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
*/}
          {/** User menu */}
          <Box sx={{ flexGrow: 0, mr: { xs: 0, md: 2 } }}>
            <Tooltip title={<Typography variant={'body2'}>{t('tooltip.openSettings')}</Typography>}>
              <IconButton id="account-icon-button" onClick={handleOpenUserMenu} data-testid="useravatar">
                <Avatar alt="Remy Sharp">
                  <Person />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="account-menu"
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
              {isAuth && (
                <MenuItem
                  id="ils-long-menu-item"
                  data-testid="questionnaireILS"
                  key="questionnaireILS"
                  onClick={() => handleOpenILSLongModal()}>
                  <ListItemIcon>
                    <LibraryBooksOutlined fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">{t('components.Menubar.questionnaireILS')}</Typography>
                </MenuItem>
              )}
              <QuestionnaireQuestionsModal open={modalOpenILSLong} handleClose={handleCloseILSLongModal}>
                <TableILSQuestions
                  ilsLong={true}
                  successSend={successSendILSLong}
                  setSuccessSend={setSuccessSendILSLong}
                />
              </QuestionnaireQuestionsModal>

              {isAuth && (
                <MenuItem
                  id="ils-short-menu-item"
                  disabled={true}
                  data-testid="questionnaireILSshort"
                  key="questionnaireILSshort"
                  onClick={() => {
                    handleOpenILSShortModal()
                  }}>
                  <ListItemIcon>
                    <AssignmentOutlined fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">{t('components.Menubar.questionnaireILSShortened')}</Typography>
                </MenuItem>
              )}
              <QuestionnaireQuestionsModal open={modalOpenILSShort} handleClose={handleCloseILSShortModal}>
                <TableILSQuestions
                  ilsLong={false}
                  successSend={successSendILSShort}
                  setSuccessSend={setSuccessSendILSShort}
                />
              </QuestionnaireQuestionsModal>

              {isAuth && (
                <MenuItem
                  id="list-k-menu-item"
                  data-testid="questionnaireListk"
                  key="questionnaireListk"
                  onClick={() => handleOpenListKModal()}>
                  <ListItemIcon>
                    <PlaylistAddCheckCircleOutlined fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">{t('components.Menubar.questionnaireListK')}</Typography>
                </MenuItem>
              )}
              <QuestionnaireQuestionsModal open={modalOpenListK} handleClose={handleCloseListKModal}>
                <TableListKQuestions successSend={successSendListK} setSuccessSend={setSuccessSendListK} />
              </QuestionnaireQuestionsModal>

              {isAuth && isCourseCreatorRole && (
                <MenuItem id="default-learningpath-menu-item" onClick={() => handleOpenDefaultLearningPath()}>
                  <ListItemIcon>
                    <Polyline fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">{t('components.Menubar.defaultLearningPath')}</Typography>
                </MenuItem>
              )}
              <CreateDefaultLearningPathModal
                open={modalOpenDefaultLearningPath}
                handleClose={handleCloseDefaultLearningPath}
              />

              <MenuItem
                id="login-logout-menu-item"
                data-testid="usermenuitem"
                key="usermenuitem"
                onClick={() => {
                  isAuth ? handleUserLogout() : navigate('/login')
                  handleCloseUserMenu()
                }}>
                <ListItemIcon>{isAuth ? <Logout fontSize="small" /> : <Login fontSize="small" />}</ListItemIcon>
                <Typography textAlign="center">
                  {isAuth ? t('components.MenuBar.profileLogout') : t('components.MenuBar.profileLogin')}
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
