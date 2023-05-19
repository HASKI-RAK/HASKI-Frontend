import { Button, Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

// TODO: Replace this with the actual data from the backend
const topics = [
  {
    id: 1,
    name: 'General',
    description: 'This is the first topic'
  },
  {
    id: 16,
    name: 'Individuelle Anordnung',
    description: 'This is the second topic'
  },
  {
    id: 7,
    name: 'Entwurfsmuster Allgemein',
    description: 'This is the third topic'
  },
  {
    id: 2,
    name: 'Bekannte Entwurfsmuster',
    description: 'This is the forth topic'
  },
  {
    id: 3,
    name: 'Strategie',
    description: 'This is the fifth topic'
  },
  {
    id: 4,
    name: 'Zustand',
    description: 'This is the sixth topic'
  },
  {
    id: 5,
    name: 'Adapter',
    description: 'This is the seventh topic'
  },
  {
    id: 6,
    name: 'Fassade',
    description: 'This is the eighth topic'
  },
  {
    id: 14,
    name: 'Abschluss',
    description: 'This is the ninth topic'
  }
]

const CoursePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { courseId } = useParams()

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
