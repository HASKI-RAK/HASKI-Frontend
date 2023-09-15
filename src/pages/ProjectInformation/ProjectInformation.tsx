import { Button, Typography } from '@common/components'
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
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <>
      <Button sx={{ mt: '2rem', color: 'black' }} onClick={() => navigate('/projectinformation/projectdescription')}>
        <Typography>{t('pages.projectdescription')}</Typography>
      </Button>
      <XapiTest />
    </>
  )
}

export default ProjectInformation
