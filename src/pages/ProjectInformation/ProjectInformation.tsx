import { DefaultButton as Button, DefaultTypography as Typography, DefaultBox as Box } from '@common/components'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// TODO: Added unfinished projectinformation page for routing purposes
export const ProjectInformation = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <Box>
        <Button sx={{ mt: '2rem', color: 'black' }} onClick={() => navigate('/projectinformation/projectdescription')}>
          <Typography>{t('pages.projectdescription')}</Typography>
        </Button>
      </Box>
      <Box>
        <Button sx={{ mt: '2rem', color: 'black' }} onClick={() => navigate('/projectinformation/glossary')}>
          <Typography>{t('pages.glossary')}</Typography>
        </Button>
      </Box>
    </>
  )
}

export default ProjectInformation
