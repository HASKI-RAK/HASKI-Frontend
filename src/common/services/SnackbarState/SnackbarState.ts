export type SnackbarState = {
    snackbars?: string[]
    setSnackbars?: (newSnackbars : string[]) => void
    addSnackbar?: (newSnackbar: string) => void
    removeSnackbar?: (newSnackbar: string) => void
}