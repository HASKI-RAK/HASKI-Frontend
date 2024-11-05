import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Grid, IconButton, Menu, MenuItem, Typography } from '@common/components'
import { MoreVert } from '@common/icons'
import { AlgorithmSettingsModal, StyledLinearProgress } from '@components'
import { Topic } from '@core'
import { useTopicCard } from './TopicCard.hooks'

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

  const {
    teacherSelection,
    studentSelection,
    isAlgorithmSettingsModalOpen,
    menuAnchorEl,
    openMenu,
    handleCloseMenu,
    handleAlgorithmMenuOpen,
    handleAlgorithmModalClose,
    updateSelection
  } = useTopicCard({ topic, learningElementProgressTopics: calculatedTopicProgress })

  return (
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
              ml: { xs: '6rem', sm: '16rem', md: '36rem', lg: '46rem', xl: '66rem', xxl: '81rem', xxxl: '106rem' }
            }}
            onClick={openMenu}
            id="topic-menu"
            data-topicid={topic?.id}
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
            color="primary"
            onClick={() => {
              navigate('topic/' + topic?.id)
            }}>
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
            {(studentSelection || teacherSelection) &&
              t('components.TopicCard.learningPath') +
                t(`components.TopicCard.${studentSelection ?? teacherSelection}`)}
          </Typography>
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
      <AlgorithmSettingsModal
        isOpen={isAlgorithmSettingsModalOpen}
        handleClose={handleAlgorithmModalClose}
        changeObserver={updateSelection}
        topicId={topic?.id}
        teacherAlgorithm={teacherSelection}
        studentAlgorithm={studentSelection}
      />
      <Menu
        id="topic-card-menu"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        data-testid="TopicSettingsMenu">
        <MenuItem
          onClick={handleAlgorithmMenuOpen}
          id="algorithm-settings-menu-item"
          data-testid="AlgorithmSettingsItem">
          {t('pages.home.menuItemAlgorithms')}
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default memo(TopicCard)
