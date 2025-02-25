import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PolylineIcon from '@mui/icons-material/Polyline'
import { Tooltip } from '@mui/material'
import { memo, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Grid, IconButton, Menu, MenuItem, Typography } from '@common/components'
import { MoreVert } from '@common/icons'
import { AlgorithmSettingsModal, StyledLinearProgress } from '@components'
import { Topic } from '@core'
import { SnackbarContext, deleteTopic } from '@services'
import { useStore } from '@store'
import DeleteEntityModal from '../DeleteEntityModal/DeleteEntityModal'
import { useTopicCard } from './TopicCard.hooks'

// Type
type TopicCardProps = {
  topic?: Topic
  calculatedTopicProgress?: number[]
  isSmOrDown?: boolean
  isCourseCreatorRole?: boolean
}

// Component
const TopicCard = ({ topic, calculatedTopicProgress, isSmOrDown, isCourseCreatorRole }: TopicCardProps) => {
  // Hooks
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const clearLearningPathTopic = useStore((state) => state.clearLearningPathTopicCache)

  const [isDeleteTopicModalOpen, setDeleteTopicModalOpen] = useState(false)
  const [topicName, setTopicName] = useState<string>('')
  const [topicId, setTopicId] = useState<number>(0)
  const [lmsTopicId, setLmsTopicId] = useState<number>(0)

  const {
    studentSelection,
    isAlgorithmSettingsModalOpen,
    menuAnchorEl,
    openMenu,
    handleCloseMenu,
    handleAlgorithmMenuOpen,
    handleAlgorithmModalClose,
    updateSelection
  } = useTopicCard({ topic, learningElementProgressTopics: calculatedTopicProgress })

  const handleOpenDeleteTopicModal = useCallback(
    (topicName: string, topicId: number, lmsTopicId: number) => {
      handleCloseMenu()
      setDeleteTopicModalOpen(true)
      setTopicName(topicName)
      setTopicId(topicId)
      setLmsTopicId(lmsTopicId)
    },
    [handleCloseMenu, setDeleteTopicModalOpen, setTopicName]
  )

  const handleAcceptDeleteTopicModal = useCallback(
    (topicId: number, lmsTopicId: number) => {
      deleteTopic(topicId, lmsTopicId).then(() => {
        addSnackbar({
          message: t('components.TopicCard.deleteTopicSuccessful'),
          severity: 'success',
          autoHideDuration: 5000
        })
        clearLearningPathTopic()
        setDeleteTopicModalOpen(false)
      })
    },
    [setDeleteTopicModalOpen]
  )

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
            {studentSelection &&
              t('components.TopicCard.learningPath') + ': ' + t(`components.TopicCard.${studentSelection}`)}
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
          id="algorithm-settings-menu-algorithm-item"
          data-testid="AlgorithmSettingsItem">
          <Tooltip arrow title="Change Learning Path" placement="left">
            <Grid container direction={'row'}>
              <PolylineIcon fontSize="small" />
              <Typography sx={{ ml: 1 }}>{t('pages.topic.menuItemAlgorithms')}</Typography>
            </Grid>
          </Tooltip>
        </MenuItem>
        {isCourseCreatorRole && (
          <MenuItem
            onClick={() => handleOpenDeleteTopicModal(topic?.name || '', topic?.id || 0, topic?.lms_id || 0)}
            id="algorithm-settings-menu-delete-item"
            data-testid="DeleteTopicItem">
            <Tooltip arrow title={t('components.TopicCard.deleteTooltip')} placement="left">
              <Grid container direction={'row'}>
                <DeleteForeverIcon fontSize="small" />
                <Typography sx={{ ml: 1 }}>{t('appGlobal.delete')}</Typography>
              </Grid>
            </Tooltip>
          </MenuItem>
        )}
      </Menu>
      <DeleteEntityModal
        open={isDeleteTopicModalOpen}
        setDeleteEntityModalOpen={setDeleteTopicModalOpen}
        entityName={topicName}
        entityId={topicId}
        entityLmsId={lmsTopicId}
        onConfirm={handleAcceptDeleteTopicModal}
        entityType={t('components.ContactForm.topic')}
      />
    </Card>
  )
}

export default memo(TopicCard)
