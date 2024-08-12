import { Alert, Box, Collapse, IconButton, Typography } from '@common/components'
import { Close } from '@common/icons'
import { useEffect, memo } from 'react'
import { keyframes } from '@emotion/react'
import { NewsbannerHookReturn, useNewsbanner as _useNewsbanner } from './Newsbanner.hooks'
import { useSessionStore } from '@store'

export type NewsbannerProps = {
  useNewsbanner?: () => NewsbannerHookReturn
}

/**
 * Newsbanner component
 * @remarks
 * Newsbanner shows a banner between the menubar and the breadcrumbs,
 * but only if there are news. The news get fitted by their charakter length.
 * The closed state gets saved in the sessionStorage and removed when the window closes.
 * @category Components
 */

const Newsbanner = ({ useNewsbanner = _useNewsbanner }: NewsbannerProps) => {
  const { checkForNews, isNewsAvailable, newsText } = useNewsbanner()
  const setIsBannerOpen = useSessionStore((state) => state.setIsBannerOpen)
  const isBannerOpen = useSessionStore((state) => state.isBannerOpen)

  useEffect(() => {
    checkForNews()
  }),
    [checkForNews]

  //Animation logic
  const text_len = newsText.length * 10
  const window_width = window.innerWidth
  const text_percent = text_len / window_width

  const scrolling = keyframes`
    from {
        transform: translateX(100%)
    },
    to {
        transform: translateX(-${text_percent * 100}%)
    }
`

  return (
    <>
      {isNewsAvailable && isBannerOpen && (
        <Box sx={{ width: '100%' }}>
          <Collapse in={isNewsAvailable} sx={{ overflow: 'hidden' }}>
            <Alert
              severity="info"
              sx={{
                [`& .MuiAlert-message`]: {
                  overflow: 'hidden'
                }
              }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  id="newsbanner-close-icon-button"
                  data-testid="NewsBannerCloseButton"
                  onClick={() => {
                    setIsBannerOpen(false)
                  }}>
                  <Close fontSize="inherit" />
                </IconButton>
              }>
              <Typography
                sx={{
                  animation: `${scrolling} 30s linear infinite`,
                  transform: `translateX(100%)`,
                  width: window_width
                }}>
                {newsText}
              </Typography>
            </Alert>
          </Collapse>
        </Box>
      )}
    </>
  )
}
export default memo(Newsbanner)
