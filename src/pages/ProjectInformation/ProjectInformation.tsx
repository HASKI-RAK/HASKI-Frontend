import { Button, Typography, Box } from '@common/components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { XapiTest } from '@components'
// TODO: Added unfinished projectinformation page for routing purposes

/**
 * # Project Information Page
 * @remarks
 * Users can inform themselves about the project.
 * @category Pages
 */
export const ProjectInformation = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <Box>
        <Button
          id="project-description-button"
          sx={{ mt: '2rem', color: 'black' }}
          onClick={() => navigate('/projectinformation/projectdescription')}>
          <Typography>{t('pages.projectdescription')}</Typography>
        </Button>
      </Box>
      <Box>
        <Button
          id="glossary-button"
          sx={{ mt: '2rem', color: 'black' }}
          onClick={() => navigate('/projectinformation/glossary')}>
          <Typography>{t('pages.glossary')}</Typography>
        </Button>
      </Box>
      <XapiTest />
    </>
  )
}

export default ProjectInformation
