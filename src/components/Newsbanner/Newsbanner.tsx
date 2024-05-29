import { Alert, Box, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'
import { NewsbannerHookReturn, useNewsbanner as _useNewsbanner } from './Newsbanner.hooks'


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
  const [open, setOpen] = useState(false)
  const [close, setClose] = useState(sessionStorage.getItem('newsCloseState') == "true")
  const [text, setText] = useState('')
  const { checkForNews, hasItem } = useNewsbanner()

  //checks if there are any news
  useEffect(() => {
    checkForNews().then((showNews) => {
      if(hasItem()){
        setOpen(true)
      }
    })
  }, [hasItem])

  //sets Text to be displayed
  useEffect(() => {
    checkForNews().then((showNews) => {
      setText(showNews)
    })
  }, [checkForNews])

  //Animation logic
  const text_len = text.length * 10
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
  //+TODO: Option for reopening news
  // Reopen new news
  return (
    <>
      {open && !close && (
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
                    setClose(true)
                    sessionStorage.setItem('newsCloseState', true ? "true" : "false")
                  }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }>
              <Box
                sx={{ animation: `${scrolling} 30s linear infinite`, transform: `translateX(100%)`, width: window_width }}>
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
