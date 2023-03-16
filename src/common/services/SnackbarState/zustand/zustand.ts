import create from "zustand"
import { SnackbarState } from "../SnackbarState"

const useSnackbarStore = create<SnackbarState>()((set) => ({
    snackbars: [],
    setSnackbars: (newSnackbars) =>
        set(() => ({
            snackbars: newSnackbars,
        })),
    addSnackbar: (newSnackbar) =>
        set((state) => ({
            snackbars: [...state.snackbars!, newSnackbar],
        })),
    removeSnackbar: (newSnackbar) =>
        set((state) => ({
            snackbars: state.snackbars!.filter((snackbar) => snackbar !== newSnackbar),
        })),
}))

export { useSnackbarStore }