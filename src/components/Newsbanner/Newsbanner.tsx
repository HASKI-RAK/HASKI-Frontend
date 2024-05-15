import { Alert, Box, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useCallback, useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'
import { NewsbannerHookReturn, useNewsbanner as _useNewsbanner } from './Newsbanner.hooks'

const scrolling = keyframes`
    from {
        transform: translateX(100%)
    },
    to {
        transform: translateX(-100%)
    }
`
export type NewsbannerProps = {
  useNewsbanner?: () => NewsbannerHookReturn
}

/**
 * Newsbanner component
 * @remarks
 * Newsbanner shows a banner between the menubar and the breadcrumbs,
 * but only if there are news.
 * @category Components
 */

const Newsbanner = ({ useNewsbanner = _useNewsbanner }: NewsbannerProps) => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const { checkForNews, hasItem } = useNewsbanner()

  useEffect(() => {
    checkForNews().then((showNews) => {
      if(hasItem()){
        setOpen(true)
      }
    })
  }, [hasItem])

  useEffect(() => {
    checkForNews().then((showNews) => {
      setText(showNews)
    })
  }, [checkForNews])

  //fetch von backend, localStorage abfrage ob schon gesehen, date, expirationdate,
  //TODO: Text anpassen auf Bildschrimgroesse und textlaenge
  return (
    <>
      {open && (
        <Box sx={{ width: '100%' }}>
          <Collapse in={open} sx={{ overflow: 'hidden' }}>
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
                  onClick={() => {
                    setOpen(false)
                  }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }>
              <Box
                sx={{ animation: `${scrolling} 30s linear infinite`, transform: `translateX(100%)`, width: '960px' }}>
                {text}
              </Box>
            </Alert>
          </Collapse>
        </Box>
      )}
    </>
  )
}
export default Newsbanner
