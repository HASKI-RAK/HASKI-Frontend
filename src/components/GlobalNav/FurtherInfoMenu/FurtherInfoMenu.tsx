import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import GlobalNavMenu from '../GlobalNavMenu/GlobalNavMenu'

const FurtherInfoMenu = () => {
  const { t } = useTranslation()
  const furtherInfoComponents = [
    { name: t('pages.projectdescription'), url: '/projectdescription', isDisabled: false, availableAt: new Date() },
    { name: t('pages.glossary'), url: '/glossary', isDisabled: false, availableAt: new Date() },
    { name: t('pages.aboutus'), url: '/aboutus', isDisabled: false, availableAt: new Date() }
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <GlobalNavMenu
      id="further-info"
      title={t('components.FurtherInfoMenu.title')}
      content={furtherInfoComponents}
      isLoading={false}
      tooltip={t('tooltip.furtherInfoSelection')}
    />
  )
}

export default memo(FurtherInfoMenu)
