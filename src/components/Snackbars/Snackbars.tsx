import { useSnackbar, CustomSnackbar } from "@components"
import { Snackbar, Stack } from "@mui/material"

export const Snackbars: React.FC = () => {
    const  { snackbarsErrorWarning, snackbarsSuccessInfo } = useSnackbar()
    const firstSnackbarErrorWarning = snackbarsErrorWarning[0]
    const firstSnackbarSuccessInfo = snackbarsSuccessInfo[0]

    return(
        <>
            <Snackbar
                open={!!firstSnackbarErrorWarning}
                autoHideDuration={null}
                transitionDuration={0}
                anchorOrigin={firstSnackbarErrorWarning?.anchorOrigin || { vertical: 'top', horizontal: 'center' }} // Das geht schöner, siehe anchorOrigin in CustomSnackbar
            >
                <Stack flexDirection="column" gap={1}>
                    {snackbarsErrorWarning.map((snackbar) => (
                        <CustomSnackbar key={snackbar.message} customSnackbar={snackbar} />
                    ))}
                </Stack>
            </Snackbar>
            <Snackbar
                open={!!snackbarsSuccessInfo}
                autoHideDuration={null}
                transitionDuration={0}
                anchorOrigin={firstSnackbarSuccessInfo?.anchorOrigin || { vertical: 'bottom', horizontal: 'left' }}
            >
                <Stack flexDirection="column" gap={1}>
                    {snackbarsSuccessInfo.map((snackbar) => (
                        <CustomSnackbar key={snackbar.message} customSnackbar={snackbar} />
                    ))}
                </Stack>
            </Snackbar>
        </>
    )
}