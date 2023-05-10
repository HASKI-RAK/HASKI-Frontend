import { SnackbarMessageProps } from '@components'
import { createContext } from 'react'

/**
 * @typedef {Object} SnackbarContextType
 * @property {SnackbarMessageProps[]} snackbarsErrorWarning - The array of error and warning snackbars.
 * @property {SnackbarMessageProps[]} snackbarsSuccessInfo - The array of success and info snackbars.
 * @property {function} setSnackbarsErrorWarning - The function to set the error and warning snackbars.
 * @property {function} setSnackbarsSuccessInfo - The function to set the success and info snackbars.
 * @property {function} addSnackbar - The function to add a single snackbar.
 * @property {function} updateSnackbar - The function to update a single snackbar.
 * @property {function} removeSnackbar - The function to remove a single snackbar.
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
 * SnackbarContext presents a context of SnackbarContextType.
 * It can be used in different components to show snackbar messages.
 * @returns {Context<SnackbarContextType>} - The context of SnackbarContextType.
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
