import { Box, Divider, Typography, Stack, List, ListItem, ListItemText, Grid } from '@common/components'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { LearningPathElement, Topic } from '@core'
import {
  SkeletonList,
  useLearningPathTopic as _useLearningPathTopic,
} from '@components'
import { ListItemButton } from '@mui/material'
import { useTheme, useMediaQuery } from '@common/hooks'

/**
 *  Local navigation component props.
 *  @prop {@link _useLearningPathTopic} - hook to get learning path topics
 *  @prop {@link _useLearningPathElement} - hook to get learning path elements
 */
export type LocalNavProps = {
  useLearningPathTopic?: (courseId: string) => { loading: boolean; topics: Topic[] }
}

/**
 * Local navigation component.
 * @param param - component props. The {@link LocalNavProps#useLearningPathTopic} and {@link LocalNavProps#useLearningPathElement} are optional.
 * @returns
 */
const LocalNav = ({ useLearningPathTopic = _useLearningPathTopic }: LocalNavProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { courseId } = useParams() as { courseId: string }
  const navigate = useNavigate()
  const { loading, topics } = useLearningPathTopic(courseId)
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box flexGrow={1}>
      <Grid sx={{ml:'0.9rem'}}>
      <Typography variant="h5">{t('appGlobal.topics')}</Typography>
      </Grid>
      <Divider />
      {loading ? (
        <Box>
          <Stack spacing={1}>
            <SkeletonList />
          </Stack>
        </Box>
      ) : (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {topics.map((topic) => (
              <ListItem key={topic.id} sx={{ width: '100%', p:0 }}>
                <ListItemButton
                  key={topic.id}
                  sx={{ width: '100%' }}
                  onClick={() => {
                    navigate(`/course/${courseId}/topic/${topic.id}`)
                  }}>
                  <ListItemText
                    primary={topic.name}
                    primaryTypographyProps={
                      isSmOrDown
                        ? { fontSize: 12, fontWeight: 'medium' }
                        : { fontSize: 18, fontWeight: 'medium' }
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  )
}

export default LocalNav
