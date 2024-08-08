import React, {FC, memo, useState} from 'react'
import { Box, Fab, Modal, Button, Stack, Divider } from '@common/components'
import {Close, Check, ArrowForward, ArrowBack} from '@common/icons'
import {Theme, HaskiTheme, DarkTheme} from "@common/utils";
import {ThemePresentation, AboutUs, PrivacyPolicy} from "@pages";
import { ThemeProvider } from "@mui/material";
import {useThemeContext} from "../../../services/ThemeContext/ThemeContext";
import {Theme as MuiThemeType} from '@mui/material/styles'

const styleBox = {
    position: 'absolute',
    left: '12%',
    right: '12%',
    top: '10%',
    height: '60%',
    overflow: 'auto',
    maxHeight: '83%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
    display: 'flex',
    flexDirection: 'row',
}

const leftColumnStyle = {
    flex: '1',
    display: 'flex',
    alignItems: 'flex-start',
    paddingRight: '2px', // Optional padding for better spacing
};


const rightColumnStyleComponent: React.CSSProperties = {
    flex: '3',
    display: 'flex',
    alignItems: 'flex-start',
}

type ThemeModalProps = {
    open?: boolean
    handleClose: (event: object, reason: string) => void
}

interface PagePreviewProps {
    themeProp: MuiThemeType
}


const PagePreview: FC<PagePreviewProps> = ({themeProp}) => {

    const [pageIndex, setPageIndex] = useState(0)

    const pages = [
        <ThemePresentation key="theme"/>,
        <AboutUs key="about"/>,
        <PrivacyPolicy key="privacy"/>]
    const changePage = (direction : number) => {
        setPageIndex((prevIndex) =>
            (prevIndex + direction + pages.length) % pages.length)
    }

    return (
        <div>
            <nav>
                <Fab
                    id="switch-page-right-theme-button"
                    color="primary"
                    data-testid={'ThemeModal-Right-Button'}
                    onClick={() => changePage(1)}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '95.5%'
                    }}>
                    <ArrowForward />
                </Fab>
                <Fab
                    id="switch-page-left-theme-button"
                    color="primary"
                    data-testid={'ThemeModal-Left-Button'}
                    onClick={() => changePage(-1)}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '26.5%'
                    }}>
                    <ArrowBack />
                </Fab>
            </nav>
            <ThemeProvider theme={themeProp}>
                <div style={{ pointerEvents: 'none' }}>
                    {pages[pageIndex]}
                </div>
            </ThemeProvider>
        </div>
    )
}

const ThemeModal = ({ open = false, handleClose}: ThemeModalProps) => {

    //const [selectedPage, setSelectedPage] = useState<React.ReactNode>(<ThemePresentation />);
    const [selectedTheme, setSelectedTheme] = useState(Theme);
    const [selectedThemeString, setSelectedThemeString] = useState('theme')
    const {updateTheme} = useThemeContext()

    const ButtonClickPlaceholder = (themeName: string) => {
        setSelectedThemeString(themeName)
        switch (themeName) {
            case 'light':
                setSelectedTheme(Theme);
                break;
            case 'dark':
                setSelectedTheme(DarkTheme);
                break;
            default:
                setSelectedTheme(HaskiTheme);
                break;
        }
    }

    return (
        <Modal data-testid={'Questions Modal'} open={open} onClose={handleClose}>
            <Box sx={styleBox}>
                <Fab
                    id="close-theme-button"
                    color="primary"
                    data-testid={'ThemeModal-Close-Button'}
                    onClick={() => handleClose({} as object, 'backdropClick')}
                    style={{
                        position: 'absolute',
                        top: '1%',
                        left: '95.5%'
                    }}>
                    <Close />
                </Fab>
                <Fab
                    id="accept-theme-button"
                    color="success"
                    data-testid={'ThemeModal-Accept-Button'}
                    /** cast vermeiden s.u.*/
                    onClick={() => {updateTheme(selectedThemeString);handleClose({} as object, 'backdropClick')}}
                    style={{
                        position: 'absolute',
                        top: '1%',
                        left: '90.5%'
                    }}>
                    <Check />
                </Fab>

                <div style={leftColumnStyle}>
                    <Stack spacing={5}  alignItems="center" justifyContent="center" style={{ height: '100%' , width: '100%'}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => ButtonClickPlaceholder('Haski')}>
                            Light-Haski
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => ButtonClickPlaceholder('dark')}>
                            Dark-Haski
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => ButtonClickPlaceholder('light')}>
                            Light-Standard
                        </Button>
                </Stack>
                </div>
                <Divider orientation="vertical" flexItem />
                    <div style={rightColumnStyleComponent}>
                        <PagePreview themeProp={selectedTheme} />
                    </div>
            </Box>
        </Modal>
    )
}

export default memo(ThemeModal)

// eslint-disable-next-line immutable/no-mutation
ThemeModal.setDisplayName = 'ThemeModal'
