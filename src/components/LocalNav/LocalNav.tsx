import { Box, Divider, Typography, Stack, List, ListItem, ListItemText } from '@common/components'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { LearningPathElement, Topic } from '@core'
import { useState } from 'react'
import {
  SkeletonList,
  useLearningPathTopic as _useLearningPathTopic,
  useLearningPathElement as _useLearningPathElement
} from '@components'
import { ListItemButton } from '@mui/material'
import { useMediaQuery, useTheme } from '@common/hooks'

/**
 *  Local navigation component props.
 *  @prop {@link _useLearningPathTopic} - hook to get learning path topics
 *  @prop {@link _useLearningPathElement} - hook to get learning path elements
 */
export type LocalNavProps = {
  useLearningPathTopic?: (courseId: string) => { loading: boolean; topics: Topic[] }
  useLearningPathElement?: (
    topic: Topic,
    courseId: string
  ) => {
    loadingElements: boolean
    learningPaths: LearningPathElement | undefined
  }
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
      <Typography variant="h5">{t('appGlobal.topics')}</Typography>
      <Divider />
      {loading ? (
        <Box>
          <Stack spacing={1}>
            <SkeletonList />
          </Stack>
        </Box>
      ) : (
        <>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {topics.map((topic) => (
              <ListItem key={topic.id}>
                <ListItemButton
                  key={topic.id}
                  onClick={() => {
                    navigate(`/course/${courseId}/topic/${topic.id}`)
                  }}>
                  <ListItemText
                    primary={topic.name}
                    primaryTypographyProps={
                      isSmOrDown
                        ? {
                            fontSize: 12,
                            fontWeight: 'medium'
                          }
                        : {
                            fontSize: 18,
                            fontWeight: 'medium'
                          }
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
