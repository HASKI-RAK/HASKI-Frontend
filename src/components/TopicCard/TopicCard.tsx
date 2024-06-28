import { memo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Grid, Typography, IconButton, Menu, MenuItem } from '@common/components'
import { CheckBox, MoreVert } from '@common/icons'
import { StyledLinearProgress, AlgorithmSettingsModal } from '@components'
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

  const [isAlgorithmSettingsModalOpen, setIsAlgorithmSettingsModalOpen] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = useCallback(() => {
    setMenuAnchorEl(null)
  }, [setMenuAnchorEl])
  const handleAlgorithmMenuOpen = useCallback(() => {
    handleCloseMenu()
    setIsAlgorithmSettingsModalOpen(true)
  }, [handleCloseMenu, setIsAlgorithmSettingsModalOpen])
  const handleAlgorithmModalClose = useCallback(() => {
    setIsAlgorithmSettingsModalOpen(false)
  }, [setIsAlgorithmSettingsModalOpen])

  return (
    <Card
      key={topic?.id}
      sx={{
        width: { xs: '10rem', sm: '20rem', md: '40rem', lg: '50rem', xl: '70rem', xxl: '85rem', xxxl: '110rem' },
        mt: '1rem'
      }}>
      <CardContent>
      <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
                    <IconButton
                      sx={{ position: 'relative', left: '0', top: '0' }}
                      onClick={openMenu}
                      data-topicid={topic?.id}
                      data-testid="TopicSettingsButton">
                      <MoreVert />
                    </IconButton>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item md={1}>
            {/*if topic is done 100%, a checkbox is displayed*/}
            {calculatedTopicProgress && calculatedTopicProgress[0] / calculatedTopicProgress[1] == 1 && (
              <CheckBox
                sx={{
                  mt: '-0.8rem',
                  ml: { xs: '7rem', sm: '17rem', md: '37rem', lg: '47rem', xl: '67rem', xxl: '82rem', xxxl: '107rem' },
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
          {/*TODO: change hardcoded name to fetched algorithm name*/}
          <Typography>
            {t('pages.course.cardText')}
            {t('pages.course.fixed')}
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
                  getIDs={{ courseID: null, topicID: topic?.id ?? null }}
                />
      <Menu
        id="menu"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        data-testid="TopicSettingsMenu">
        <MenuItem onClick={handleAlgorithmMenuOpen} data-testid="AlgorithmSettingsItem">
          {t('pages.home.menuItemAlgorithms')}
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default memo(TopicCard)
