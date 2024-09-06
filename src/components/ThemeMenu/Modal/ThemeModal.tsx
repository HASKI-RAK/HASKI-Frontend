import React, {memo, useState, useEffect} from 'react'
import {Box, Fab, Modal, Divider, Grid} from '@common/components'
import {Close, Check, ArrowForward, ArrowBack, Brush, DarkMode, LightMode} from '@common/icons'
import {HaskiTheme, DarkTheme, AltTheme} from "@common/utils";
import {ThemePresentation, AboutUs, PrivacyPolicy, Course, Topic, Home} from "@pages";
import {
    ThemeProvider,
    useTheme,
    Radio,
    RadioGroup,
    FormLabel,
    FormControl,
    FormControlLabel,
    Typography,
    useMediaQuery
} from "@mui/material";
import {useThemeContext} from "../../../services/ThemeContext/ThemeContext";
import {BreadcrumbsContainer, Footer, MenuBar, OpenQuestionnaire, PrivacyModal} from "../../index";
import {useTranslation} from "react-i18next";
import {useAuthProvider} from "../../../services/AuthProvider/AuthProvider.hooks";

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
    flexDirection: {xs: 'column', lg: 'row'},
}

const leftColumnStyle = {
    flex: '1',
    top: '0%',
    alignItems: 'flex-start',
};

const leftColumnInner = {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
}

const rightColumnStyleComponent = {
    flex: '4',
    position: 'relative',
    alignItems: 'flex-start',
    overflow: 'auto',
    marginTop: '3%',
}

const scaledPreview = {
    transform: 'scale(0.8)',
    transformOrigin: 'top center',
    pointerEvents: 'none',
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

const ThemeModal = ({ open = false, handleClose}: ThemeModalProps) => {

    const { t } = useTranslation()

    //gets theme from user and provides string
    const activeTheme = useTheme()
    const activeThemeString = activeTheme === DarkTheme ? 'DarkTheme':
        activeTheme === AltTheme ? 'AltTheme':
            'HaskiTheme';

    //presets first selection on currently active theme
    const [selectedTheme, setSelectedTheme] = useState(activeTheme)
    const [selectedThemeString, setSelectedThemeString] = useState(activeThemeString)

    const {updateTheme} = useThemeContext()
    const {isAuth} = useAuthProvider()
    const isSmallScreen = useMediaQuery(activeTheme.breakpoints.down('lg'));

    //handles the selection of a radio button
    const handleThemeModalPreviewChange= (themeName: string) => {
        setSelectedTheme(themeName === 'DarkTheme'? DarkTheme :
            themeName ===  'AltTheme'? AltTheme :
                HaskiTheme
        );
    }

    //Will preset the user stored theme as the one shown in preview and selected on user auth
    useEffect(() => {
        setSelectedTheme(activeTheme)
        setSelectedThemeString(activeThemeString)
    }, [ isAuth]);

    //PreviewPageChangerLogic
    const [pageIndex, setPageIndex] = useState(0)
    const pages = [
        <ThemePresentation key="theme"/>,
        <AboutUs key="about"/>,
        <PrivacyPolicy key="privacy"/>,
        <Course key="course"/>,
        <Topic key="topic"/>,
        <Home key=""/>
    ]

    //will iterate through the pages on use of arrow buttons
    const changePage = (direction : number) => {
        setPageIndex((prevIndex) =>
            (prevIndex + direction + pages.length) % pages.length)
    }

    return (
        <Modal data-testid={'Theme Modal'} open={open} onClose={handleClose}>
            <Box sx={styleBox}>
                {/**Left column/Upper Row - Provides radio buttons for theme changing*/}
                <Box sx={leftColumnStyle}>
                    <FormControl sx={leftColumnInner}>
                        <FormLabel id="demo-radio-buttons-group-label">{t('components.ThemeModal.radioHeader')}</FormLabel>
                        <RadioGroup
                            sx={{
                                flexDirection: { xs: 'row', lg: 'column' },
                                gap: 2
                            }}
                            value={selectedThemeString}
                            onChange={(e) => {setSelectedThemeString(e.target.value); handleThemeModalPreviewChange(e.target.value)}}
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value={'HaskiTheme'} control={<Radio />} label={<Box display="flex" alignItems="center">
                                <Typography>{t('components.ThemeModal.standardTheme')}</Typography>
                                <LightMode sx={{ mr: 1 }} />
                            </Box>} />
                            <FormControlLabel value={'DarkTheme'} control={<Radio />} label={<Box display="flex" alignItems="center">
                                <Typography>{t('components.ThemeModal.darkTheme')}</Typography>
                                <DarkMode sx={{ mr: 1 }} />
                            </Box>} />
                            <FormControlLabel value={'AltTheme'} control={<Radio />} label={<Box display="flex" alignItems="center">
                                <Typography>{t('components.ThemeModal.altTheme')}</Typography>
                                <Brush sx={{ mr: 1 }} />
                            </Box>} />
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Divider
                    orientation={isSmallScreen ? 'horizontal' : 'vertical'}
                    flexItem
                    sx={{
                    width: isSmallScreen ? '100%' : 'auto',
                    height: isSmallScreen ? 'auto' : '100%',
                }}/>

                {/**Right Column / Lower Row - Provides themed preview of radio selection and operating buttons*/}
                <Box sx={rightColumnStyleComponent}>
                    <Fab
                        id="switch-page-right-theme-button"
                        color="primary"
                        data-testid={'ThemeModal-Right-Button'}
                        onClick={() => changePage(1)}
                        style={{
                            position: 'sticky',
                            top: '45%',
                            left: '93.5%'
                        }}>
                        <ArrowForward />
                    </Fab>
                    <Fab
                        id="switch-page-left-theme-button"
                        color="primary"
                        data-testid={'ThemeModal-Left-Button'}
                        onClick={() => changePage(-1)}
                        style={{
                            position: 'sticky',
                            top: '45%',
                            left: '1.5%'
                        }}>
                        <ArrowBack />
                    </Fab>
                    <Fab
                        id="close-theme-button"
                        color="primary"
                        data-testid={'ThemeModal-Close-Button'}
                        onClick={() => handleClose({} as object, 'backdropClick')}
                        style={{
                            position: 'sticky',
                            top: '1%',
                            left: '93.5%'
                        }}>
                        <Close />
                    </Fab>
                    <Fab
                        id="accept-theme-button"
                        color="success"
                        data-testid={'ThemeModal-Accept-Button'}

                        onClick={() => {updateTheme(selectedThemeString);handleClose({} as object, 'backdropClick')}}
                        disabled={activeTheme === selectedTheme}
                    style={{
                            position: 'sticky',
                            top: '90%',
                            left: '93.5%',
                        }}>
                        <Check />
                    </Fab>
                    {/**preview block - Renders selected page sclaed down in chosen theme within right column/lower row*/}
                    <ThemeProvider theme={selectedTheme}>
                        <Box sx = {scaledPreview}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                                <MenuBar />
                                <BreadcrumbsContainer />
                                <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
                                    <Grid item sx={{ flex: 1, overflow: 'auto' }}>
                                        {pages[pageIndex]}
                                    </Grid>
                                </Grid>
                                <Footer />
                            </Box>
                            <PrivacyModal />
                            <OpenQuestionnaire />
                        </Box>
                    </ThemeProvider>
                </Box>
            </Box>
        </Modal>
    )
}
export default memo(ThemeModal)

// eslint-disable-next-line immutable/no-mutation
ThemeModal.setDisplayName = 'ThemeModal'
