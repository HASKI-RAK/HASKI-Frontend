import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, ListItem, ListItemButton, ListItemText, Skeleton } from '@common/components'
import { FiberManualRecord } from '@common/icons'
import { Theme } from '@common/theme'
import { Fraction } from '@components'

export type LocalNavItemProps = {
  currentProgress?: number
  isLoading?: boolean
  isSelected?: boolean
  maxProgress?: number
  name?: string
  url?: string
}

/**
 * Topic list item component, displaying a topic with its done learning elements out of total learning elements.
 * @param
 * topic: Topic - The topic to display.
 * index: number - The index of the topic in the topics array.
 * topicProgress: number[][] - The progress of each topic.
 * isProgressLoading: boolean - Whether the progress is loading.
 * courseId: string - The course id.
 * topicId: string - The topic id.
 * @returns
 * A JSX Element with the rendered topic list item.
 */
const LocalNavItem = ({
  currentProgress,
  isLoading = true,
  isSelected,
  maxProgress,
  name = '',
  url = ''
}: LocalNavItemProps) => {
  const navigate = useNavigate()

  return (
    <Grid
      data-testid={`topic-list-item-${name}`}
      container
      sx={{
        width: '100%',
        bgcolor: isSelected ? (theme) => theme.palette.secondary.dark : 'transparent',
        borderRadius: 2,
        border: (theme) =>
          isSelected ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
        transition: 'border-color 0.2s, background-color 0.2s',
        '&:hover': {
          backgroundColor: (theme) => theme.palette.action.hover,
          borderColor: (theme) => theme.palette.primary.light
        }
      }}>
      <ListItem sx={{ width: '100%', p: 0 }}>
        <ListItemButton
          id={name.concat('-localNavButton').replaceAll(' ', '-')}
          sx={{
            width: '100%',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.secondary.dark
            },
            borderRadius: 2
          }}
          onClick={() => {
            navigate(url)
          }}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <FiberManualRecord
              sx={{
                color: isSelected
                  ? (theme: Theme) => theme.palette.primary.main
                  : (theme: Theme) => theme.palette.secondary.dark,
                width: '0.5rem'
              }}
            />
            <Grid item xs={7} sm={7} md={8} lg={8} xl={8} xxl={8} xxxl={8}>
              <ListItemText primary={name} primaryTypographyProps={{ fontSize: 18 }} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={2} xl={2} xxl={2} xxxl={2}>
              {isLoading ? (
                <Skeleton variant="text" width={'70%'} height={20} sx={{ ml: 2 }} />
              ) : currentProgress !== undefined && maxProgress !== undefined ? (
                <ListItemText
                  primary={
                    <Fraction
                      variant="body1"
                      sx={{ fontSize: 16 }}
                      numerator={currentProgress}
                      denominator={maxProgress}
                    />
                  }
                  primaryTypographyProps={{
                    p: 0.25,
                    borderRadius: 3,
                    bgcolor: (theme: Theme) => theme.palette.info.light
                  }}
                  sx={{ textAlign: 'center' }}
                />
              ) : null}
            </Grid>
          </Grid>
        </ListItemButton>
      </ListItem>
    </Grid>
  )
}

export default memo(LocalNavItem)
