import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

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
 * @category Hooks
 * @interface
 */
type SnackbarProviderHookReturn = {
  readonly snackbarsErrorWarning: SnackbarMessageProps[]
  readonly snackbarsSuccessInfo: SnackbarMessageProps[]
  readonly setSnackbarsErrorWarning: Dispatch<SetStateAction<SnackbarMessageProps[]>>
  readonly setSnackbarsSuccessInfo: Dispatch<SetStateAction<SnackbarMessageProps[]>>
  readonly addSnackbar: (newSnackbar: SnackbarMessageProps) => void
  readonly updateSnackbar: (snackbarToUpdate: SnackbarMessageProps) => void
  readonly removeSnackbar: (snackbarToRemove: SnackbarMessageProps) => void
}

/**
 * useSnackbarProvider hook.
 *
 * @remarks
 * useSnackbarProvider presents a hook for the snackbar provider.
 * It can be used to inject the snackbar logic into a provider.
 *
 * @returns - The logic to add, update and remove snackbars.
 *
 * @category Services
 * @category Hooks
 */
export const useSnackbarProvider = (): SnackbarProviderHookReturn => {
  const [snackbarsErrorWarning, setSnackbarsErrorWarning] = useState<SnackbarMessageProps[]>([])
  const [snackbarsSuccessInfo, setSnackbarsSuccessInfo] = useState<SnackbarMessageProps[]>([])

  // Adds a snackbar to the array of snackbars. It depends on the severity type which array is used.
  const addSnackbar = useCallback(
    (props: SnackbarMessageProps) => {
      if (props.severity === 'error' || props.severity === 'warning') {
        if (snackbarsErrorWarning.find((snackbar) => snackbar.message === props.message)) {
          return
        }
        const rest = snackbarsErrorWarning.length < 3 ? snackbarsErrorWarning : snackbarsErrorWarning.slice(0, -1)
        setSnackbarsErrorWarning([props, ...rest])
      } else if (props.severity === 'success' || props.severity === 'info') {
        if (snackbarsSuccessInfo.find((snackbar) => snackbar.message === props.message)) {
          return
        }
        const rest = snackbarsSuccessInfo.length < 3 ? snackbarsSuccessInfo : snackbarsSuccessInfo.slice(0, -1)
        setSnackbarsSuccessInfo([props, ...rest])
      }
    },
    [snackbarsErrorWarning, snackbarsSuccessInfo]
  )

  // Updates a snackbar in the array of snackbars. The message is used as a key to change an existing snackbar.
  const updateSnackbar = useCallback((props: SnackbarMessageProps) => {
    if (props.severity === 'error' || props.severity === 'warning') {
      setSnackbarsErrorWarning((previous) =>
        previous.map((snackbar) => (snackbar.message === props.message ? props : snackbar))
      )
    } else if (props.severity === 'success' || props.severity === 'info') {
      setSnackbarsSuccessInfo((previous) =>
        previous.map((snackbar) => (snackbar.message === props.message ? props : snackbar))
      )
    }
  }, [])

  // Removes a snackbar from the array of snackbars.
  const removeSnackbar = useCallback((props: SnackbarMessageProps) => {
    if (props.severity === 'error' || props.severity === 'warning') {
      setSnackbarsErrorWarning((previous) => previous.filter((snackbar) => snackbar.message !== props.message))
    } else if (props.severity === 'success' || props.severity === 'info') {
      setSnackbarsSuccessInfo((previous) => previous.filter((snackbar) => snackbar.message !== props.message))
    }
  }, [])

  return useMemo(
    () => ({
      snackbarsErrorWarning,
      snackbarsSuccessInfo,
      setSnackbarsErrorWarning,
      setSnackbarsSuccessInfo,
      addSnackbar,
      updateSnackbar,
      removeSnackbar
    }),
    [
      snackbarsErrorWarning,
      snackbarsSuccessInfo,
      setSnackbarsErrorWarning,
      setSnackbarsSuccessInfo,
      addSnackbar,
      updateSnackbar,
      removeSnackbar
    ]
  )
}
