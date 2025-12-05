import { ForwardedRef, forwardRef, memo, MouseEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Divider, Menu, MenuItem, Tooltip, Typography } from '@common/components'
import { ArrowDropDown, Lock } from '@common/icons'
import { SkeletonList } from '@components'

export type GlobalNavContent = { name: string; url: string; isDisabled: boolean; availableAt: Date }

export type GlobalNavMenuProps = {
  id?: string
  content?: GlobalNavContent[]
  title?: string
  isLoading?: boolean
  tooltip?: string
}

const GlobalNavMenu = forwardRef(
  (
    { id = 'global-nav', content = [], title, isLoading, tooltip }: GlobalNavMenuProps,
    ref: ForwardedRef<HTMLDivElement | null>,
    ...props
  ) => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)

    const handleOpen = async (event: MouseEvent<HTMLElement>) => {
      setAnchorElement(event.currentTarget)
    }

    // Sets the anchor element to null when closed.
    const handleClose = useCallback(() => {
      setAnchorElement(null)
    }, [setAnchorElement])

    return (
      <>
        <Divider orientation="vertical" flexItem />
        <div {...props} ref={ref}>
          <Box sx={{ flexGrow: 0, ml: 1 }}>
            <Tooltip arrow title={<Typography variant="body2">{tooltip}</Typography>}>
              <Button
                id={id.concat('-menu-button')}
                endIcon={
                  anchorElement ? (
                    <ArrowDropDown sx={{ transform: 'rotate(180deg)', ml: -1 }} />
                  ) : (
                    <ArrowDropDown sx={{ ml: -1 }} />
                  )
                }
                onClick={handleOpen}
                sx={(theme) => ({ whiteSpace: 'pre-wrap', mt: 0.5, color: theme.palette.secondary.contrastText })}
                variant="text">
                {title?.replaceAll(' ', '\n')}
              </Button>
            </Tooltip>
            <Menu
              id={id.concat('-dropdown-menu')}
              anchorEl={anchorElement}
              open={Boolean(anchorElement)}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              sx={{
                alignItems: 'center'
              }}
              onClose={handleClose}>
              {isLoading ? (
                <Box width={400}>
                  <SkeletonList />
                </Box>
              ) : (
                [...content].map((element) => {
                  const isLocked = element.isDisabled && element.availableAt > new Date()
                  return (
                    <MenuItem
                      key={element.name}
                      id={element.name.concat('-link').replaceAll(' ', '-')}
                      onClick={() => {
                        if (isLocked) return
                        navigate(element.url)
                        handleClose()
                      }}
                      disabled={isLocked}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.75,
                        '&.Mui-disabled:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}>
                      <Box component="span" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {element.name}
                      </Box>
                      {isLocked && (
                        <Tooltip
                          title={
                            <Typography variant="body2">
                              {element.name +
                                t('tooltip.availableAt').concat(
                                  element.availableAt.toLocaleDateString('de-DE', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                  }),
                                  ' ',
                                  t('appGlobal.oClock')
                                )}
                            </Typography>
                          }
                          arrow
                          placement="right">
                          <Box
                            component="span"
                            sx={{ display: 'inline-flex', alignItems: 'center', pointerEvents: 'auto' }}>
                            <Lock color="disabled" sx={{ fontSize: 22 }} />
                          </Box>
                        </Tooltip>
                      )}
                    </MenuItem>
                  )
                })
              )}
            </Menu>
          </Box>
        </div>
      </>
    )
  }
)

export default memo(GlobalNavMenu)

// eslint-disable-next-line immutable/no-mutation
GlobalNavMenu.displayName = 'GlobalNavMenu'
