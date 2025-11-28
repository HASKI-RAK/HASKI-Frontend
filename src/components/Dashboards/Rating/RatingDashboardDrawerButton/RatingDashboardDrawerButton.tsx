import { ForwardedRef, forwardRef, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Fab, Tooltip, Typography } from '@common/components'
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@common/icons'
import { debounce } from '@services'

/**
 * Props for the {@link RatingDashboardDrawerButton} component.
 */
type RatingDashboardDrawerButtonProps = {
  /**
   * Whether the drawer is open or not.
   */
  isOpen: boolean
  /**
   * Sets the current open state of the drawer.
   */
  setIsOpen: (isOpen: boolean) => void
}

const RatingDashboardDrawerButton = forwardRef(
  ({ isOpen, setIsOpen }: RatingDashboardDrawerButtonProps, ref: ForwardedRef<HTMLDivElement | null>, ...props) => {
    // Hook
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
                <Typography variant="body2">{t('components.RatingInfoDrawerButton.close')}</Typography>
              ) : (
                <Typography variant="body2">{t('components.RatingInfoDrawerButton.open')}</Typography>
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

/**
 * Button component to open or close the rating dashboard drawer.
 *
 * Displays a floating action button with an icon that changes based on whether the drawer is open.
 *
 * @param props - See {@link RatingDashboardDrawerButton}.
 * @param ref - Optional reference to the parent HTML element.
 * @returns A floating button with a dynamic icon.
 *
 * @example
 * ```tsx
 * <RatingDashboardDrawerButton
 *   isOpen={isOpen}
 *   setIsOpen={setIsOpen}
 * />
 * ```
 */
export default memo(RatingDashboardDrawerButton)

// eslint-disable-next-line immutable/no-mutation
RatingDashboardDrawerButton.displayName = 'RatingDashboardDrawerButton'
