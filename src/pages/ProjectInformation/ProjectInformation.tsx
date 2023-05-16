import { DefaultButton as Button, DefaultLink as Link, DefaultTypography as Typography } from '@common/components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

// TODO: Added unfinished projectinformation page for routing purposes
const ProjectInformation = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Button sx={{ mt: '2rem' }}>
      <Link
        href={'/projectinformation/projectdescription'}
        onClick={() => navigate('/projectinformation/projectdescription')}>
        <Typography>{t('pages.projectdescription')}</Typography>
      </Link>
    </Button>
  )
}

export default ProjectInformation
