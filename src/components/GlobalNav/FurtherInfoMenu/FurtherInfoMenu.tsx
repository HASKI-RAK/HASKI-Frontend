import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import GlobalNavMenu from '../GlobalNavMenu/GlobalNavMenu'

const FurtherInfoMenu = () => {
  const { t } = useTranslation()
  const furtherInfoComponents = [
    { name: t('pages.projectdescription'), url: '/projectdescription' },
    { name: t('pages.glossary'), url: '/glossary' },
    { name: t('pages.aboutus'), url: '/aboutus' }
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <GlobalNavMenu
      id="further-info"
      title={t('components.FurtherInfoMenu.title')}
      content={furtherInfoComponents}
      isLoading={false}
      tooltip={'tooltip.furtherInfoSelection'}
    />
  )
}

export default memo(FurtherInfoMenu)
