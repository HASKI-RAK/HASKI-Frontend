import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, ListItem, ListItemButton, ListItemText, Skeleton } from '@common/components'
import { FiberManualRecord } from '@common/icons'
import { Theme } from '@common/theme'
import { Fraction } from '@components'
import { Topic } from '@core'

type LocalNavItemProps = {
  topic?: Topic
  topicProgress?: number[]
  isProgressLoading?: boolean
  courseId?: string
  topicId?: string
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
const LocalNavItem = ({ topic, topicProgress, isProgressLoading, courseId, topicId }: LocalNavItemProps) => {
  const navigate = useNavigate()

  return (
    <Grid
      key={topic?.id}
      data-testid={`topic-list-item-${topic?.id}`}
      container
      sx={{
        width: '100%',
        bgcolor: topicId && parseInt(topicId) == topic?.id ? 'lightgrey' : 'transparent',
        borderRadius: 2
      }}>
      <ListItem key={topic?.id} sx={{ width: '100%', p: 0 }}>
        <ListItemButton
          key={topic?.id}
          sx={{ width: '100%' }}
          onClick={() => {
            courseId && topic && navigate(`/course/${courseId}/topic/${topic.id}`)
          }}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <FiberManualRecord
              sx={{
                color:
                  topicId && parseInt(topicId) == topic?.id
                    ? (theme: Theme) => theme.palette.primary.main
                    : (theme: Theme) => theme.palette.info.dark,
                width: '0.5rem'
              }}
            />
            <Grid item xs={7} sm={7} md={8} lg={8} xl={8} xxl={8} xxxl={8}>
              <ListItemText primary={topic?.name} primaryTypographyProps={{ fontSize: 18 }} />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={2} xl={2} xxl={2} xxxl={2}>
              {topicProgress && !isProgressLoading ? (
                <ListItemText
                  primary={
                    <Fraction
                      variant="body1"
                      sx={{ fontSize: 16 }}
                      numerator={topicProgress[0]}
                      denominator={topicProgress[1]}
                    />
                  }
                  primaryTypographyProps={{
                    p: 0.25,
                    borderRadius: 3,
                    bgcolor: (theme: Theme) => theme.palette.info.light
                  }}
                  sx={{ textAlign: 'center' }}
                />
              ) : (
                <Skeleton variant="text" width={'70%'} height={20} sx={{ ml: 2 }} />
              )}
            </Grid>
          </Grid>
        </ListItemButton>
      </ListItem>
    </Grid>
  )
}

export default memo(LocalNavItem)
