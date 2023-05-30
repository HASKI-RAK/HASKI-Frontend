import { useContext } from 'react'
import { AuthContext } from '@services'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  DefaultButton as Button,
  DefaultSkeleton as Skeleton,
  DefaultTypography as Typography,
  DefaultBox as Box
} from '@common/components'

// TODO: Added unfinished projectinformation page for routing purposes
export const ProjectInformation = () => {
  const authcontext = useContext(AuthContext)
  const { t } = useTranslation()
  const navigate = useNavigate()

  return !authcontext.isAuth ? (
    <Skeleton />
  ) : (
    <>
      <Box>
        <Button data-testid="ProjectInformation_Button_1" sx={{ mt: '2rem', color: 'black' }} onClick={() => navigate('/projectinformation/projectdescription')}>
          <Typography  >{t('pages.projectdescription')}  </Typography>
        </Button>
      </Box>
      <Box>
      <Button sx={{ mt: '2rem', color: 'black' }} onClick={() => navigate('/projectinformation/glossary')}>
        <Typography data-testid="ProjectInformation_Button_2">{t('pages.glossary')}</Typography>
      </Button></Box>
    </>
  )
}

export default ProjectInformation
