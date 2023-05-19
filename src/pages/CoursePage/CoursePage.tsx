import { Button, Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

// TODO: Replace this with the actual data from the backend

const CoursePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { courseId } = useParams()

  const topics = t('pages.CoursePage.topics', {
    returnObjects: true
  }) as [{ id: string; name: string; description: string }]

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
