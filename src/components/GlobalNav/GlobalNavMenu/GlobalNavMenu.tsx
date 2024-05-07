import { ForwardedRef, MouseEvent, forwardRef, memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Divider, Menu, MenuItem, Tooltip } from '@common/components'
import { ArrowDropDown } from '@common/icons'
import { SkeletonList } from '@components'

// Type
export type GlobalNavMenuProps = {
  id?: string
  content?: { name: string; url: string }[]
  title?: string
  isLoading?: boolean
  tooltip?: string
}
// Component
const GlobalNavMenu = forwardRef(
  (
    { id = 'global-nav', content = [], title, isLoading, tooltip }: GlobalNavMenuProps,
    ref: ForwardedRef<HTMLDivElement | null>,
    ...props
  ) => {
    // Hooks
    const navigate = useNavigate()

    // States
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)

    // Sets the anchor element when opened.
    const handleOpen = async (event: MouseEvent<HTMLElement>) => {
      setAnchorElement(event.currentTarget)
    }

    // Sets the anchor element to null when closed.
    const handleClose = useCallback(() => {
      setAnchorElement(null)
    }, [setAnchorElement])

    // test id deleten
    return (
      <>
        <Divider orientation="vertical" flexItem />
        <div {...props} ref={ref}>
          <Box sx={{ flexGrow: 0, ml: 1 }}>
            <Tooltip arrow title={tooltip}>
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
                data-testid="Menubar-TopicButton"
                sx={{ whiteSpace: 'pre-wrap', mt: 0.5 }}
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
                alignItems: 'center',
                textAlign: 'center'
              }}
              onClose={handleClose}>
              {isLoading ? (
                <Box width={400}>
                  <SkeletonList />
                </Box>
              ) : (
                [...content].map((element) => (
                  <MenuItem
                    id={element.name.concat('-link').replaceAll(' ', '-')}
                    key={element.name}
                    data-testid={`Menubar-Topic-${element.name}`}
                    color="inherit"
                    onClick={() => {
                      navigate(element.url)
                      handleClose()
                    }}>
                    {element.name}
                  </MenuItem>
                ))
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
