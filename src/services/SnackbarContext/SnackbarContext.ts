import { createContext } from 'react'

import { SnackbarMessageProps } from '@components'

/**
 * @prop snackbarsErrorWarning - The array of error and warning snackbars.
 * @prop snackbarsSuccessInfo - The array of success and info snackbars.
 * @prop setSnackbarsErrorWarning - The function to set the error and warning snackbars.
 * @prop setSnackbarsSuccessInfo - The function to set the success and info snackbars.
 * @prop addSnackbar - The function to add a single snackbar.
 * @prop updateSnackbar - The function to update a single snackbar.
 * @prop removeSnackbar - The function to remove a single snackbar.
 * @category Services
 * @interface
 */
export type SnackbarContextType = {
  snackbarsErrorWarning: SnackbarMessageProps[]
  snackbarsSuccessInfo: SnackbarMessageProps[]
  setSnackbarsErrorWarning: (newSnackbars: SnackbarMessageProps[]) => void
  setSnackbarsSuccessInfo: (newSnackbars: SnackbarMessageProps[]) => void
  addSnackbar: (newSnackbar: SnackbarMessageProps) => void
  updateSnackbar: (snackbarToUpdate: SnackbarMessageProps) => void
  removeSnackbar: (snackbarToRemove: SnackbarMessageProps) => void
}

/**
 * SnackbarContext context.
 *
 * @remarks
 * SnackbarContext presents a context of SnackbarContextType.
 * It can be used in different components to show snackbar messages.
 *
 * @category Services
 */
export const SnackbarContext = createContext<SnackbarContextType>({
  snackbarsErrorWarning: [],
  snackbarsSuccessInfo: [],
  setSnackbarsErrorWarning: (newSnackbars) => {
    return newSnackbars
  },
  setSnackbarsSuccessInfo: (newSnackbars) => {
    return newSnackbars
  },
  addSnackbar: (newSnackbar) => {
    return newSnackbar
  },
  updateSnackbar: (snackbarToUpdate) => {
    return snackbarToUpdate
  },
  removeSnackbar: (snackbarToRemove) => {
    return snackbarToRemove
  }
})

export default SnackbarContext
