import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { ForwardedRef, forwardRef, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Fab, Tooltip, Typography } from '@common/components'
import { debounce } from '@services'

type DashboardInfoDrawerButtonProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

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
              {isOpen ? (
                <KeyboardDoubleArrowRightIcon fontSize="large" />
              ) : (
                <KeyboardDoubleArrowLeftIcon fontSize="large" />
              )}
            </Fab>
          </Tooltip>
        </Box>
      </div>
    )
  }
)

export default memo(DashboardInfoDrawerButton)
