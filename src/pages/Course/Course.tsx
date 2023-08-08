import {
  DefaultButton as Button,
  DefaultCard as Card,
  DefaultCardContent as CardContent,
  DefaultTypography as Typography,
  DefaultBox as Box,
  DefaultStack as Stack
} from '@common/components'
import { AuthContext } from '@services'
import log from 'loglevel'
import React, {useContext, useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useLearningPathTopic } from '../../components/LocalNav/LocalNav.hooks'
import { SkeletonList } from '@components'

/**
 * The Course component presents an overview of the course.
 *
 * @returns {JSX.Element} - The Course component.
 *
 * @category Pages
 */
export const Course = () => {
  const { t } = useTranslation()
  const authcontext = useContext(AuthContext)
  const navigate = useNavigate()
  const { courseId } = useParams() as { courseId: string }

  const { loading, topics } = useLearningPathTopic(courseId)

  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 5000)
    if (authcontext.isAuth) {
      clearTimeout(preventEndlessLoading)
    }

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [])

  return (
    <Stack spacing={2}>
      {loading ? (
        <Box>
          <Stack spacing={1}><SkeletonList/></Stack>
        </Box>
      ) : (
        <>
          {topics.map((topic) => {
            return (
              <Card key={topic.id}>
                <CardContent>
                  <Typography variant="h5">{topic.name}</Typography>
                  <Typography variant="body1">{topic.lms_id}</Typography>
                  <Button
                    variant="contained"
                    data-testid={'Course-Card-Topic-' + topic.name}
                    color="primary"
                    onClick={() => {
                      navigate('topic/' + topic.id)
                    }}>
                    {t('components.Course.Button.Topic')}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </>
      )}
    </Stack>
  )
}

export default Course
