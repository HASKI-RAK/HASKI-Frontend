import { Button, Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { AuthContext } from '@services'
import log from 'loglevel'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

/**
 * The CoursePage component presents an overview of the course.
 *
 * @returns {JSX.Element} - The CoursePage component.
 *
 * @category Pages
 */
const CoursePage = () => {
  const { t } = useTranslation()
  const authcontext = useContext(AuthContext)
  const navigate = useNavigate()
  const { courseId } = useParams()

  const topics = t('pages.CoursePage.topics', {
    returnObjects: true
  }) as [{ id: string; name: string; description: string }]

  useEffect(() => {
    log.log('CoursePage')
    const preventEndlessLoading = setTimeout(() => {
      log.log('CoursePage timeout')
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
                {t('components.CoursePage.Button.Topic')}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </Stack>
  )
}

export default CoursePage
