import { Snackbar, Stack } from '@common/components'
import { SnackbarMessage } from '@components'
import { SnackbarContext, useNetworkStatus } from '@services'
import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * SnackbarContainer component.
 *
 * @remarks
 * SnackbarContainer presents a container rendering the snackbars and their messages.
 * It can't be used as a standalone component and must be somewhere beneath the snackbar provider.
 *
 * @category Components
 */
const SnackbarContainer = () => {
  const { snackbarsErrorWarning, snackbarsSuccessInfo, addSnackbar, updateSnackbar } = useContext(SnackbarContext)

  const { t } = useTranslation()
  const { isOnline } = useNetworkStatus()
  const [recentlyOffline, setRecentlyOffline] = useState(false)

  // Respectively adds a snackbar when internet connection is lost and regained.
  useEffect(() => {
    if (!isOnline) {
      setRecentlyOffline(true)
      addSnackbar({
        severity: 'warning',
        message: t('warning.offline'),
        autoHideDuration: undefined
      })
    }

    if (isOnline && recentlyOffline) {
      setRecentlyOffline(false)
      addSnackbar({
        severity: 'warning',
        message: t('warning.online'),
        autoHideDuration: 3000
      })
      updateSnackbar({
        severity: 'warning',
        message: t('warning.offline'),
        autoHideDuration: 1
      })
    }
  }, [isOnline, addSnackbar, recentlyOffline, t, updateSnackbar])

  return (
    <>
      <Snackbar
        open={!!snackbarsErrorWarning[0]}
        autoHideDuration={null}
        transitionDuration={0}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <Stack flexDirection="column" gap={1}>
          {snackbarsErrorWarning.map((snackbar) => (
            <SnackbarMessage key={snackbar.message} {...snackbar} />
          ))}
        </Stack>
      </Snackbar>
      <Snackbar
        open={!!snackbarsSuccessInfo[0]}
        autoHideDuration={null}
        transitionDuration={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}>
        <Stack flexDirection="column" gap={1}>
          {snackbarsSuccessInfo.map((snackbar) => (
            <SnackbarMessage key={snackbar.message} {...snackbar} />
          ))}
        </Stack>
      </Snackbar>
    </>
  )
}

export default memo(SnackbarContainer)
