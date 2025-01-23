import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Theme,
  ThemeProvider,
  Typography,
  useTheme
} from '@mui/material'
import React, { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider, Fab, Grid, Modal } from '@common/components'
import { ArrowBack, ArrowForward, Brush, Check, Close, DarkMode, LightMode } from '@common/icons'
import { AltTheme, DarkTheme, HaskiTheme } from '@common/utils'
import { BreadcrumbsContainer, Footer, MenuBar, OpenQuestionnaire, PrivacyModal } from '@components'
import { AboutUs, Course, Home, PrivacyPolicy, ThemePresentation, Topic } from '@pages'
import { AuthContext, useThemeProvider } from '@services'

const styleBox = {
  position: 'absolute',
  left: '6%',
  right: '6%',
  top: '10%',
  height: '77%',
  maxHeight: '83%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
  display: 'flex',
  flexDirection: 'column'
}

type ThemeModalProps = {
  open?: boolean
  handleClose: (event: object, reason: string) => void
}

/**
 * ThemeModal provides a modal to allow changing the application's theme
 *
 * Leveraging the ThemeContext to apply the theme changes across the application.
 * User selection is dispatched to ThemeContext, which handles the theme update and storing.
 *
 * @returns A modal that allows the choice of a theme and renders a preview of different app pages based on the selection
 * @category Components
 */

const ThemeModal = ({ open = false, handleClose }: ThemeModalProps) => {
  const { t } = useTranslation()

  //gets theme from user and provides string
  const activeTheme = useTheme()
  const activeThemeString =
    activeTheme === DarkTheme ? 'DarkTheme' : activeTheme === AltTheme ? 'AltTheme' : 'HaskiTheme'
  //console.log(activeThemeString)
  //console.log(activeTheme === DarkTheme ? 'DarkTheme' : activeTheme === AltTheme ? 'AltTheme' : 'HaskiTheme')

  //presets first selection on currently active theme
  const [selectedTheme, setSelectedTheme] = useState<Theme>(activeTheme)
  const [selectedThemeString, setSelectedThemeString] = useState(activeThemeString)

  const { updateTheme } = useThemeProvider()
  const { isAuth } = useContext(AuthContext)

  //handles the selection of a radio button
  const handleThemeModalPreviewChange = (themeName: string) => {
    setSelectedThemeString(themeName)
    setSelectedTheme(themeName === 'DarkTheme' ? DarkTheme : themeName === 'AltTheme' ? AltTheme : HaskiTheme)
  }

  //Will preset the user stored theme as the one shown in preview and selected on user auth
  useEffect(() => {
    setSelectedTheme(activeTheme)
    setSelectedThemeString(activeThemeString)
    //console.log(activeThemeString)
  }, [isAuth])

  //PreviewPageChangerLogic
  const [pageIndex, setPageIndex] = useState(0)
  const pages = [
    <ThemePresentation key="theme" />,
    <AboutUs key="about" />,
    <PrivacyPolicy key="privacy" />,
    <Course key="course" />,
    <Topic key="topic" />,
    <Home key="" />
  ]

  //will iterate through the pages on use of arrow buttons
  const changePage = (direction: number) => {
    setPageIndex((prevIndex) => (prevIndex + direction + pages.length) % pages.length)
  }

  return (
    <Modal data-testid={'ThemeModal'} open={open} onClose={handleClose}>
      <Grid sx={styleBox}>
        <Fab
          id="theme-modal-close-button"
          color="primary"
          sx={{
            position: 'sticky',
            top: '1%',
            left: '93.5%'
          }}
          data-testid={'ThemeModal-Close-Button'}
          onClick={() => handleClose({} as object, 'backdropClick')}>
          <Close />
        </Fab>
        <Grid sx={{ flex: '1', alignItems: 'flex-start', height: '25%' }}>
          <FormControl
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}>
            <FormLabel
              id="theme-modal-radio-buttons-label"
              sx={(theme) => ({
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: theme.palette.text.primary,
                '&.Mui-focused': {
                  color: theme.palette.text.primary // Prevent color change when focused
                }
              })}>
              <Typography variant={'h4'}>{t('components.ThemeModal.radioHeader')}</Typography>
            </FormLabel>
            <RadioGroup
              sx={{
                flexDirection: 'row',
                gap: 2
              }}
              value={selectedThemeString}
              onChange={(e) => {
                handleThemeModalPreviewChange(e.target.value)
              }}
              aria-labelledby="theme-modal-radio-buttons"
              name="radio-buttons-group">
              <FormControlLabel
                id="theme-modal-radio-button-haski-theme"
                data-testid={'ThemeModal-radio-button-haski'}
                value={'HaskiTheme'}
                control={<Radio />}
                label={
                  <Grid display="flex" alignItems="center">
                    <Typography>{t('components.ThemeModal.standardTheme')}</Typography>
                    <LightMode sx={{ mr: 1 }} />
                  </Grid>
                }
              />
              <FormControlLabel
                id="theme-modal-radio-button-dark-theme"
                data-testid={'ThemeModal-radio-button-dark'}
                value={'DarkTheme'}
                control={<Radio />}
                label={
                  <Grid display="flex" alignItems="center">
                    <Typography>{t('components.ThemeModal.darkTheme')}</Typography>
                    <DarkMode sx={{ mr: 1 }} />
                  </Grid>
                }
              />
              <FormControlLabel
                id="theme-modal-radio-button-alt-theme"
                data-testid={'ThemeModal-radio-button-alt'}
                value={'AltTheme'}
                control={<Radio />}
                label={
                  <Grid display="flex" alignItems="center">
                    <Typography>{t('components.ThemeModal.altTheme')}</Typography>
                    <Brush sx={{ mr: 1 }} />
                  </Grid>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Divider orientation="horizontal" />

        <Grid
          sx={{
            flex: '4',
            position: 'relative',
            alignItems: 'flex-start',
            overflow: 'auto'
          }}>
          <Fab
            id="theme-modal-switch-page-right"
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              position: 'sticky',
              top: '45%',
              left: '93.5%'
            }}
            data-testid={'ThemeModal-Right-Button'}
            onClick={() => changePage(1)}>
            <ArrowForward />
          </Fab>
          <Fab
            id="theme-modal-switch-page-left"
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              position: 'sticky',
              top: '45%',
              left: '1.5%'
            }}
            data-testid={'ThemeModal-Left-Button'}
            onClick={() => changePage(-1)}>
            <ArrowBack />
          </Fab>
          <Fab
            id="theme-modal-accept-button"
            sx={{
              bgcolor: (theme) => theme.palette.success.main,
              position: 'sticky',
              top: '87.5%',
              left: '93.5%'
            }}
            data-testid={'ThemeModal-Accept-Button'}
            onClick={() => {
              updateTheme(selectedThemeString)
              handleClose({} as object, 'backdropClick')
            }}
            disabled={activeTheme === selectedTheme}>
            <Check />
          </Fab>
          {/**preview block - Renders selected page scaled down in chosen theme within right column/lower row*/}
          <ThemeProvider theme={selectedTheme}>
            <Grid
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                color: (theme) => theme.palette.text.primary,
                border: '2px solid lightgrey',
                borderRadius: '8px',
                padding: '16px',
                transform: 'scale(0.8)',
                transformOrigin: 'top center',
                pointerEvents: 'none'
              }}>
              <Grid sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                <MenuBar />
                <BreadcrumbsContainer />
                <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
                  <Grid item sx={{ flex: 1, overflow: 'auto' }} data-testid={'page-preview-grid'}>
                    {pages[pageIndex]}
                  </Grid>
                </Grid>
                <Footer />
              </Grid>
              <PrivacyModal />
              <OpenQuestionnaire />
            </Grid>
          </ThemeProvider>
        </Grid>
      </Grid>
    </Modal>
  )
}

// eslint-disable-next-line immutable/no-mutation
ThemeModal.setDisplayName = 'ThemeModal'
export default memo(ThemeModal)
