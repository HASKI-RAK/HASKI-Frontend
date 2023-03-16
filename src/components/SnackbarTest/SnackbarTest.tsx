import { DefaultButton as Button } from '@common/components'
import { CustomSnackbar, SnackbarProvider, useSnackbar, Snackbars } from '@components'
import React, { useState, useEffect } from 'react'

export const SnackbarTest = () => {
    const { addSnackbar } = useSnackbar()
    // Online state
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [offlineSnackbarClosedRecently, setOfflineSnackbarClosedRecently] = useState(false)

    useEffect(() => {
        // Update network status
        const handleStatusChange = () => {
            setIsOffline(!navigator.onLine)

            if(navigator.onLine) {
                setOfflineSnackbarClosedRecently(true)
            }
        }

        // Listen to the online status
        window.addEventListener('online', handleStatusChange)

        // Listen to the offline status
        window.addEventListener('offline', handleStatusChange)

        // Specify how to clean up after this effect for performance improvment
        return () => {
          window.removeEventListener('online', handleStatusChange)
          window.removeEventListener('offline', handleStatusChange)
        }
    }, [isOffline])

    return (
        <>
            <Button onClick={() => addSnackbar({severity: "error", message: "hilfe"})}>
                Error
            </Button>
            <Button onClick={() => addSnackbar({severity: "warning", message: "ja moin"})}>
                Warning
            </Button>
            <Button onClick={() => addSnackbar({severity: "info", message: "ja rip"})}>
                Info
            </Button>
        </>
    )
}

/*
    <MuiSnackbar
      open={!!firstToast}
      autoHideDuration={null}
      transitionDuration={0}
      anchorOrigin={{
        vertical: firstToast?.position?.vertical || "bottom",
        horizontal: firstToast?.position?.horizontal || "left"
      }}
      sx={{
        mt: "env(safe-area-inset-top)",
        mb: "env(safe-area-inset-bottom)"
      }}
    >
      <Stack flexDirection="column" gap={1}>
        {toastsPack.map((toast) => (
          <SnackbarToast key={toast.key} toast={toast} />
        ))}
      </Stack>
    </MuiSnackbar>
*/


/*
        <>

            <Button onClick={() => addSnackbar({message: "hilfe", open: true})}>Open</Button>
            <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Stack flexDirection="column" gap={2}>

                </Stack>
            </Snackbar>
            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Stack flexDirection="column" gap={2}>
                    <CustomSnackbar autoHideDuration={3000} messageType="error" open={open} setOpen={setOpen} message="This is a test message"/>
                    <CustomSnackbar autoHideDuration={3000} messageType="error" open={open} setOpen={setOpen} message="Helper"/>
                </Stack>
            </Snackbar>

            <CustomSnackbar messageType="warning" message="You are offline" open={isOffline} setOpen={setIsOffline}/>
            <CustomSnackbar messageType="warning" message="You are online again" autoHideDuration={3000} open={offlineSnackbarClosedRecently} setOpen={setOfflineSnackbarClosedRecently}/>
        </>
*/