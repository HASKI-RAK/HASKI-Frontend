import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Grid, Typography } from '@common/components'
import { CheckBox } from '@common/icons'
import { StyledLinearProgress } from '@components'
import { Topic } from '@core'

// Type
type TopicCardProps = {
  topic?: Topic
  calculatedTopicProgress?: number[]
  isSmOrDown?: boolean
}

// Component
const TopicCard = ({ topic, calculatedTopicProgress, isSmOrDown }: TopicCardProps) => {
  // Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Card
      key={topic?.id}
      sx={{ width: { xs: '10rem', sm: '20rem', md: '40rem', lg: '50rem', xl: '70rem' }, mt: '1rem' }}>
      <CardContent>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item md={1}>
            {/*if topic is done 100%, a checkbox is displayed*/}
            {calculatedTopicProgress && calculatedTopicProgress[0] / calculatedTopicProgress[1] == 1 && (
              <CheckBox
                sx={{
                  mt: '-0.8rem',
                  ml: { xs: '7rem', sm: '17rem', md: '37rem', lg: '47rem', xl: '67rem' },
                  fontSize: 29
                }}
                color={'success'}
              />
            )}
          </Grid>
          <Grid item md={11}>
            <Typography variant={isSmOrDown ? 'subtitle1' : 'h5'}>{topic?.name}</Typography>
          </Grid>
        </Grid>
        <Grid container item direction="column" justifyContent="center" alignItems="center">
          <Button
            id={topic?.name.concat('-button').replaceAll(' ', '-')}
            sx={{
              width: { xs: '6.625rem', sm: '9.625rem', md: '12.625rem', lg: '15.625rem', xl: '18.625rem' },
              mt: '1.625rem'
            }}
            variant="contained"
            data-testid={'Course-Card-Topic-' + topic?.name}
            color="primary"
            onClick={() => {
              navigate('topic/' + topic?.id)
            }}>
            {t('pages.course.topicButton')}
          </Button>
        </Grid>
      </CardContent>
      {/* Display topic progress bar */}
      <Grid container item direction="row" justifyContent="flex-end" alignItems="flex-end">
        {calculatedTopicProgress ? (
          <StyledLinearProgress learningElementProgressTopics={calculatedTopicProgress} />
        ) : (
          // Display loading state if progress is not available yet
          <StyledLinearProgress />
        )}
      </Grid>
    </Card>
  )
}

export default memo(TopicCard)
