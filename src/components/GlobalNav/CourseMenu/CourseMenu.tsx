import { memo, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '@services'
import GlobalNavMenu from '../GlobalNavMenu/GlobalNavMenu'
import { CourseMenuHookReturn, useCourseMenu as _useCourseMenu } from './CourseMenu.hooks'

// Type
type CourseMenuProps = {
  useCourseMenu?: () => CourseMenuHookReturn
}

// Component
const CourseMenu = ({ useCourseMenu = _useCourseMenu }: CourseMenuProps) => {
  // Hooks
  const { content, isLoading } = useCourseMenu()
  const { t } = useTranslation()

  // Contexts
  const { isAuth } = useContext(AuthContext)

  return (
    <>
      {isAuth && (
        <GlobalNavMenu
          id="course"
          title={t('appGlobal.courses')}
          content={content}
          isLoading={isLoading}
          tooltip={t('tooltip.courseSelection')}
        />
      )}
    </>
  )
}

export default memo(CourseMenu)
