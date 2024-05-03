import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import GlobalNavDropdown from '../GlobalNavDropdown/GlobalNavDropdown'

const ProjectInfoDropdown = () => {
  const { t } = useTranslation()
  const content = [
    { name: t('pages.projectdescription'), url: '/projectinformation/projectdescription' },
    { name: t('pages.glossary'), url: '/projectinformation/glossary' },
    { name: t('pages.aboutus'), url: '/projectinformation/aboutus' }
  ].sort((a, b) => a.name.localeCompare(b.name))

  return <GlobalNavDropdown title={t('pages.projectinformation')} content={content} isLoading={false} />
}

export default memo(ProjectInfoDropdown)
