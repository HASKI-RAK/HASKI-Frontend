import { ForwardedRef, forwardRef, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Fab, Tooltip, Typography } from '@common/components'
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@common/icons'
import { debounce } from '@services'

// TODO: DOKU
// TODO: RENAME
type DashboardInfoDrawerButtonProps = { 
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

// TODO: DOKU
// TODO: RENAME
const DashboardInfoDrawerButton = forwardRef(
  ({ isOpen, setIsOpen }: DashboardInfoDrawerButtonProps, ref: ForwardedRef<HTMLDivElement | null>, ...props) => {
    const { t } = useTranslation()

    return (
      <div {...props} ref={ref}>
        <Box
          sx={{
            position: 'absolute',
            mr: 2,
            right: isOpen ? '22.5rem' : 0,
            zIndex: 2000,
            transition: 'right 0.2s ease'
          }}>
          <Tooltip
            arrow
            title={
              isOpen ? (
                <Typography variant="body2">{t('components.DashboardInfoDrawerButton.close')}</Typography>
              ) : (
                <Typography variant="body2">{t('components.DashboardInfoDrawerButton.open')}</Typography>
              )
            }
            PopperProps={{ disablePortal: true }}>
            <Fab size="small" onClick={() => debounce(() => setIsOpen(!isOpen), 50)}>
              {isOpen ? <KeyboardDoubleArrowRight fontSize="large" /> : <KeyboardDoubleArrowLeft fontSize="large" />}
            </Fab>
          </Tooltip>
        </Box>
      </div>
    )
  }
)

// eslint-disable-next-line immutable/no-mutation
DashboardInfoDrawerButton.displayName = 'DashboardInfoDrawerButton'
export default memo(DashboardInfoDrawerButton)
