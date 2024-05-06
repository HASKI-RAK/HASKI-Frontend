import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import GlobalNavMenu from '../GlobalNavMenu/GlobalNavMenu'
import { CourseMenuHookReturn, useCourseMenu as _useCourseMenu } from './CourseMenu.hooks'

type CourseMenuProps = {
  useCourseMenu?: () => CourseMenuHookReturn
}

const CourseMenu = ({ useCourseMenu = _useCourseMenu }: CourseMenuProps) => {
  const { content, isLoading } = useCourseMenu()
  const { t } = useTranslation()

  // Course Selection -> CourseDropdown.courseSelection
  return (
    <GlobalNavMenu
      id="course"
      title={t('appGlobal.courses')}
      content={content}
      isLoading={isLoading}
      tooltip={t('tooltip.courseSelection')}
    />
  )
}

export default memo(CourseMenu)
