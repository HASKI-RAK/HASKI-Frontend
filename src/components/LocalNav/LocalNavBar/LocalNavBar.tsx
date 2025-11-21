import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Divider, Drawer, Grid, List, Typography } from '@common/components'
import { useLearningPathTopicProgress, useMediaQuery, useTheme } from '@common/hooks'
import { LocalNavItem, SkeletonList } from '@components'
import { LocalNavItemProps } from '../LocalNavItem/LocalNavItem'
import { LocalNavBarHookReturn, useLocalNavbar as _useLocalNavBar } from './LocalNavBar.hooks'

// todo create abstract nav bar hook and overwrite it twice for course and dashboards
type LocalNavBarProps = {
  useLocalNavBar?: () => LocalNavBarHookReturn
}

/**
 * Local navigation component.
 * @param param - component props. The {@link LocalNavProps#useLearningPathTopic} are
 *   optional.
 * @returns
 * A JSX Element with the rendered local navigation.
 */
const LocalNavBar = ({ useLocalNavBar = _useLocalNavBar }: LocalNavBarProps) => {
  //State
  const [drawerHeight, setDrawerHeight] = useState(0)

  //Hooks
  const theme = useTheme()
  const { t } = useTranslation()
  const open = useMediaQuery(theme.breakpoints.up('lg'))
  const { isLoading, localNavItemProps } = useLocalNavBar() // todo isLoaded?

  // todo translation appGlobal.topics -> translation variable

  // Function to resize the drawer height
  const handleResize = () => setDrawerHeight(window.innerHeight - 200)

  //Resizing the window resizes drawer height
  useEffect(() => {
    handleResize() // Set initial drawer height
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Grid container>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: '26.5rem',
          height: drawerHeight,
          [`& .MuiDrawer-paper`]: {
            maxWidth: '26.5rem',
            position: 'relative',
            borderRadius: '0rem',
            border: 0,
            backgroundColor: 'transparent'
          }
        }}>
        <Grid item sx={{ ml: '0.9rem' }}>
          <Typography variant="h5">{t('appGlobal.topics') /* todo */}</Typography>
        </Grid>
        <Divider />
        {isLoading ? (
          <Grid container>
            <Grid item sx={{ width: '24rem' }}>
              <SkeletonList />
            </Grid>
          </Grid>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'transparent', p: 0 }}>
            {localNavItemProps.map((localNavItemProp) => (
              <LocalNavItem key={localNavItemProp.name} {...localNavItemProp} />
            ))}
          </List>
        )}
      </Drawer>
    </Grid>
  )
}

export default memo(LocalNavBar)

// todo padding all sides of the items
// todo items bisschen schmaler machen?
// todo punkt vor dem namen entfernen?
