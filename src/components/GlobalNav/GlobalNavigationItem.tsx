import { MouseEvent, memo, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Divider, Menu, MenuItem, Tooltip } from '@common/components'
import { ArrowDropDown } from '@common/icons'
import { SkeletonList } from '@components'
import { AuthContext } from '@services'
import {
  GlobalNavigationItemReturn,
  useGlobalNavigationItem as _useGlobalNavigationItem
} from './GlobalNavigationItem.hooks'

export type GlobalNavigationItemProps = {
  title: string
  useGlobalNavigationItem?: () => GlobalNavigationItemReturn
}

// Component
const GlobalNavigationItem = ({
  title,
  useGlobalNavigationItem = _useGlobalNavigationItem
}: GlobalNavigationItemProps) => {
  // Hooks
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { content, isLoading } = useGlobalNavigationItem()

  // States
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)

  // Contexts
  const { isAuth } = useContext(AuthContext)

  // Logic
  const handleOpen = async (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget)
  }

  // Close
  const handleClose = useCallback(() => {
    setAnchorElement(null)
  }, [setAnchorElement])

  // "Select a course"
  // page title
  // Isauth needed
  //  tooltip
  return (
    <>
      {isAuth && (
        <>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ flexGrow: 0, ml: 1 }}>
            <Tooltip title={t('appGlobal.courseSelection')}>
              <Button
                id="course-button"
                endIcon={
                  anchorElement ? (
                    <ArrowDropDown sx={{ transform: 'rotate(180deg)', ml: -1 }} />
                  ) : (
                    <ArrowDropDown sx={{ ml: -1 }} />
                  )
                }
                onClick={handleOpen}
                data-testid="Menubar-TopicButton"
                variant="text">
                {title}
              </Button>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorElement}
              open={Boolean(anchorElement)}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              sx={{
                alignItems: 'center',
                textAlign: 'center'
              }}
              onClose={handleClose}>
              {isLoading ? ( // display Skeleton component while loading
                <Box width={400}>
                  <SkeletonList />
                </Box>
              ) : (
                <>
                  {[...content].reverse().map((course) => (
                    <MenuItem
                      id={course.name.concat('-link').replaceAll(' ', '-')}
                      key={course.name}
                      data-testid={`Menubar-Topic-${course.name}`}
                      color="inherit"
                      onClick={() => {
                        navigate(course.url)
                        handleClose()
                      }}>
                      {course.name}
                    </MenuItem>
                  ))}
                </>
              )}
            </Menu>
          </Box>
        </>
      )}
    </>
  )
}

export default memo(GlobalNavigationItem)
