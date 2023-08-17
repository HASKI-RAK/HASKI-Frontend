import { Button, Card, CardContent, Typography, Stack } from '@common/components'
import { AuthContext } from '@services'
import log from 'loglevel'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

/**
 * The Course component presents an overview of the course.
 *
 * @returns {JSX.Element} - The Course component.
 *
 * @category Pages
 */
const Course = () => {
  const { t } = useTranslation()
  const authcontext = useContext(AuthContext)
  const navigate = useNavigate()
  const { courseId } = useParams()

  //ToDo: Fetch topics of student
  const topics = [...t('pages.Course.topics', {
    returnObjects: true
  }) as [{ id: string; name: string; description: string }]]

  useEffect(() => {
    log.log('Course')
    const preventEndlessLoading = setTimeout(() => {
      log.log('Course timeout')
      navigate('/login')
    }, 5000)
    if (authcontext.isAuth) clearTimeout(preventEndlessLoading)

    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [authcontext.isAuth])

  return (
    <Stack spacing={2}>
      {topics.map((topic) => {
        return (
          <Card key={topic.id}>
            <CardContent>
              <Typography variant="h5">{topic.name}</Typography>
              <Typography variant="body1">{topic.description}</Typography>
              <Button
                variant="contained"
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
    </Stack>
  )
}

export default Course
