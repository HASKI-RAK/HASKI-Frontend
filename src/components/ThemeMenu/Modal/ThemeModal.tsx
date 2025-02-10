import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Typography
} from '@common/components'
import { useTheme } from '@common/hooks'
import { ArrowBack, ArrowForward, Brush, Check, Close, DarkMode, LightMode } from '@common/icons'
import { Theme, ThemeProvider } from '@common/theme'
import { AltTheme, DarkTheme, HaskiTheme } from '@common/utils'
import { BreadcrumbsContainer, Footer, MenuBar } from '@components'
import { Glossary, Home, LearningElementLearningPath, PrivacyPolicy, TopicsLearningPath } from '@pages'
import { useThemeProvider } from '@services'

type ThemeModalProps = {
  open?: boolean
  handleClose: (event: object, reason: string) => void
  selectedTheme: Theme
  setSelectedTheme: (theme: Theme) => void
  selectedThemeString: string
  setSelectedThemeString: (theme: string) => void
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

const ThemeModal = ({
  open = false,
  handleClose,
  selectedTheme,
  setSelectedTheme,
  selectedThemeString,
  setSelectedThemeString
}: ThemeModalProps) => {
  const { t } = useTranslation()
  const activeTheme = useTheme()

  const themeMap: Record<string, Theme> = {
    HaskiTheme: HaskiTheme,
    DarkTheme: DarkTheme,
    AltTheme: AltTheme
  }

  //gets theme from user and provides string

  const { updateTheme } = useThemeProvider()

  //handles the selection of a radio button
  const handleThemeModalPreviewChange = (themeString: string) => {
    const theme = themeMap[themeString]
    setSelectedThemeString(themeString)
    setSelectedTheme(theme)
  }

  //PreviewPageChangerLogic
  const [activeStep, setActiveStep] = useState(0)
  const pages = [
    <PrivacyPolicy key="privacy" />,
    <Home key="" />,
    <LearningElementLearningPath key="lelearningpath" />,
    <TopicsLearningPath key="topicslearningpath" />,
    <Glossary key="glossary" />
  ]

  //will iterate through the pages on use of arrow buttons
  const changePage = (direction: number) => {
    setActiveStep((prevIndex) => (prevIndex + direction + pages.length) % pages.length)
  }

  return (
    <Modal data-testid={'ThemeModal'} open={open} onClose={handleClose}>
      <Grid
        sx={{
          position: 'absolute',
          left: '6%',
          right: '6%',
          top: '10%',
          height: '77%',
          maxHeight: '83%',
          bgcolor: (theme) => theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: 24,
          p: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Grid sx={{ flex: '1', alignItems: 'flex-start', height: '25%' }}>
          <Fab
            id="theme-modal-close-button"
            color="primary"
            sx={{
              position: 'sticky',
              top: '3%',
              left: '93.5%'
            }}
            data-testid={'ThemeModal-Close-Button'}
            onClick={() => handleClose({} as object, 'backdropClick')}>
            <Close />
          </Fab>
        </Grid>
        <Grid sx={{ flex: '1', alignItems: 'flex-start', height: '25%' }}>
          <FormControl
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}>
            <FormLabel
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
              onChange={(event, value) => {
                handleThemeModalPreviewChange(value)
              }}
              aria-labelledby="theme-modal-radio-buttons">
              <FormControlLabel
                id="theme-modal-radio-button-haski-theme"
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

        <Divider orientation="horizontal" sx={{ mt: 1 }} />

        <Grid
          sx={{
            position: 'relative',
            flexDirection: 'column',
            overflow: 'auto'
          }}>
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
                border: '2px solid lightgrey',
                borderRadius: '8px',
                padding: '16px',
                transform: 'scale(0.8)',
                transformOrigin: 'top center',
                pointerEvents: 'none',
                ml: 2
              }}>
              <MenuBar />
              <BreadcrumbsContainer />
              {pages[activeStep]}
              <Footer />
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
