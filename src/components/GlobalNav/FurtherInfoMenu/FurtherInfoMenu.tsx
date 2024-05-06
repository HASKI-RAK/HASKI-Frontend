import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import GlobalNavMenu from '../GlobalNavMenu/GlobalNavMenu'

const FurtherInfoMenu = () => {
  const { t } = useTranslation()
  const content = [
    { name: t('pages.projectdescription'), url: '/projectinformation/projectdescription' },
    { name: t('pages.glossary'), url: '/projectinformation/glossary' },
    { name: t('pages.aboutus'), url: '/projectinformation/aboutus' }
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <GlobalNavMenu
      id="further-info"
      title={t('components.FurtherInfoMenu.title')}
      content={content}
      isLoading={false}
      tooltip={'tooltip.furtherInfoSelection'}
    />
  )
}

export default memo(FurtherInfoMenu)
