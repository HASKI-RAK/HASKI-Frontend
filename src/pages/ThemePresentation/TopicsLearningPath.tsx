import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@common/components'
import { useMediaQuery, useTheme } from '@common/hooks'
import { MoreVert, Polyline } from '@common/icons'
import { SkeletonList, StyledLinearProgress } from '@components'
import { Topic } from '@core'

const exampleTopics: Topic[] = [
  {
    contains_le: true,
    created_at: 'Thu, 23 Jan 2025 00:00:00 GMT',
    created_by: 'Admin User',
    id: 2,
    is_topic: true,
    last_updated: null,
    lms_id: 19,
    name: 'Themenbereich 1',
    parent_id: null,
    student_topic: {
      done: false,
      done_at: null,
      id: 4,
      student_id: 2,
      topic_id: 2,
      visits: []
    },
    university: 'HS-KE'
  },
  {
    contains_le: true,
    created_at: 'Thu, 23 Jan 2025 00:00:00 GMT',
    created_by: 'Admin User',
    id: 3,
    is_topic: true,
    last_updated: null,
    lms_id: 21,
    name: 'Themenbereich 2',
    parent_id: null,
    student_topic: {
      done: false,
      done_at: null,
      id: 8,
      student_id: 2,
      topic_id: 3,
      visits: []
    },
    university: 'HS-KE'
  },
  {
    contains_le: true,
    created_at: 'Thu, 23 Jan 2025 00:00:00 GMT',
    created_by: 'Admin User',
    id: 4,
    is_topic: true,
    last_updated: null,
    lms_id: 22,
    name: 'Themenbereich 3',
    parent_id: null,
    student_topic: {
      done: false,
      done_at: null,
      id: 14,
      student_id: 2,
      topic_id: 4,
      visits: []
    },
    university: 'HS-KE'
  }
]

const exampleTopicProgress: [number, number][] = [
  [0, 2],
  [1, 1],
  [1, 3]
]

const TopicsLearningPath = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const studentSelection = ['aco', 'default', 'ga']
  const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        {exampleTopics.map((topic, index) => (
          <Card
            key={topic?.id}
            sx={{
              width: { xs: '10rem', sm: '20rem', md: '40rem', lg: '50rem', xl: '70rem', xxl: '85rem', xxxl: '110rem' },
              mt: '1rem'
            }}>
            <CardContent>
              <Grid container direction="row">
                <IconButton
                  sx={{
                    position: 'relative',
                    ml: {
                      xs: '6rem',
                      sm: '16rem',
                      md: '36rem',
                      lg: '46rem',
                      xl: '66rem',
                      xxl: '81rem',
                      xxxl: '106rem'
                    },
                    color: (theme) => theme.palette.text.primary
                  }}
                  id="topic-menu"
                  data-testid="TopicSettingsButton">
                  <MoreVert />
                </IconButton>
              </Grid>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item md={11}>
                  <Typography variant={isSmOrDown ? 'subtitle1' : 'h5'}>{topic?.name}</Typography>
                </Grid>
              </Grid>
              <Grid container item direction="column" justifyContent="center" alignItems="center">
                <Button
                  id={topic?.name.concat('-button').replaceAll(' ', '-')}
                  sx={{
                    width: {
                      xs: '6.625rem',
                      sm: '9.625rem',
                      md: '12.625rem',
                      lg: '15.625rem',
                      xl: '18.625rem',
                      xxl: '21.625rem',
                      xxxl: '24.625rem'
                    },
                    mt: '1.625rem'
                  }}
                  variant="contained"
                  data-testid={'Topic-Navigate-Button'}
                  color="primary">
                  {t('pages.course.topicButton')}
                </Button>
              </Grid>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems={'center'}
                justifyContent={'center'}
                sx={{ mt: '0.5rem' }}>
                <Typography sx={{ mr: '0.5rem' }}>
                  {studentSelection[index] &&
                    t('components.TopicCard.learningPath') +
                      ': ' +
                      t(`components.TopicCard.${studentSelection[index]}`)}
                </Typography>
              </Grid>
            </CardContent>
            {/* Display topic progress bar */}
            <Grid container item direction="row" justifyContent="flex-end" alignItems="flex-end">
              {exampleTopicProgress ? (
                <StyledLinearProgress learningElementProgressTopics={exampleTopicProgress[index]} />
              ) : (
                // Display loading state if progress is not available yet
                <StyledLinearProgress />
              )}
            </Grid>
            <Menu
              open={false}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              data-testid="TopicSettingsMenu">
              <MenuItem id="algorithm-settings-menu-algorithm-item" data-testid="AlgorithmSettingsItem">
                <Tooltip arrow title="Change Learning Path" placement="left">
                  <Grid container direction={'row'}>
                    <Polyline fontSize="small" />
                    <Typography sx={{ ml: 1 }}>{t('pages.topic.menuItemAlgorithms')}</Typography>
                  </Grid>
                </Tooltip>
              </MenuItem>
            </Menu>
          </Card>
        ))}
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Typography variant={'h4'}>...</Typography>
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item xs sx={{ width: '70%' }}>
          <SkeletonList />
        </Grid>
      </Grid>
    </Box>
  )
}

export default memo(TopicsLearningPath)
