import { Snackbar, Alert, Slide, SlideProps, SnackbarOrigin, Grow, GrowProps, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
// TODO: aufräum
import { useTranslation } from 'react-i18next'
import { useSnackbar, SnackbarProps } from '../SnackbarProvider/SnackbarProvider'
import { useState, useCallback, useEffect } from 'react'
import { open } from 'fs'

const anchorOrigin = (messageType?: MessageType): SnackbarOrigin => {
    switch (messageType) {
        case "error":
        case "warning":
            return { vertical: 'top', horizontal: 'center' }
        case "success":
        case "info":
        default:
            return { vertical: 'bottom', horizontal: 'left' }
    }
}

type TransitionProps = {
    children?: React.ReactElement
    in?: boolean
    severity?: MessageType
    timeout?: number
}

const Transition = (props: TransitionProps) => {
    if (props.children === undefined) {
        return null
    }

    switch (props.severity) {
        case "error":
        case "warning":
            return (
                <Slide in={props.in} timeout={props.timeout}>
                    {props.children}
                </Slide>
            )
        case "success":
        case "info":
        default:
            return (
                <Grow in={props.in} timeout={props.timeout}>
                    {props.children}
                </Grow>
            )
    }
}

// Eigentlich keine Snackbar sondern nur Alerts
export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ customSnackbar }) => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(true)
    const { removeSnackbar } = useSnackbar()

    const close = useCallback(() => {
        setOpen(false)
        setTimeout(() => {
            removeSnackbar(customSnackbar)
        }, 1000)
    }, [customSnackbar.message, removeSnackbar])

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        if (customSnackbar.onClose) {
            customSnackbar.onClose()
        }
        close()
    }

    useEffect(() => {
        if (customSnackbar.autoHideDuration !== 0) {
            setTimeout(() => {
                close()
            }, customSnackbar.autoHideDuration || 6000)
        }
    }, [close, customSnackbar.autoHideDuration])

    const action = (
        <>
            <IconButton
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                size="small"
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    )

    return (
        <>
            {
                customSnackbar.severity && (
                    <Transition severity={customSnackbar.severity} in={open} timeout={300}>
                        {
                            customSnackbar.severity ? (
                                <Alert
                                    onClick={handleClose}
                                    onClose={handleClose}
                                    severity={customSnackbar.severity}
                                >
                                    <Typography>
                                        {
                                            t(customSnackbar.severity) + ": " + customSnackbar.message
                                        }
                                    </Typography>
                                </Alert>
                            ) : (
                                <Snackbar open={open}
                                    onClick={handleClose}
                                    onClose={handleClose}
                                    anchorOrigin={anchorOrigin(customSnackbar.severity)}
                                    message={customSnackbar.message}
                                >
                                    <Typography>{customSnackbar.message}</Typography>
                                </Snackbar  >
                            )
                        }
                    </Transition>
                )
            }
        </>
    )
}

type MessageType = "error" | "success" | "warning" | "info"

/*export interface CustomSnackbarProps {
    autoHideDuration?: number | null
    messageType?: MessageType
    message?: string
    open?: boolean
    setOpen?: (open: boolean) => void
    children?: React.ReactElement;
}*/

type CustomSnackbarProps = {
    customSnackbar: SnackbarProps
}

/*
            <Snackbar
                action={action}
                anchorOrigin={AnchorOrigin(props.messageType)}
                autoHideDuration={props.autoHideDuration}
                message={props.message}
                onClick={handleClose}
                onClose={handleClose}
                open={props.open}
                TransitionComponent={Transition(props.messageType)}
            >
                        </Snackbar>
*/