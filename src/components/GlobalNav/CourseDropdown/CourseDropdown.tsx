import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import GlobalNavDropdown from '../GlobalNavDropdown/GlobalNavDropdown'
import { CourseDropdownHookReturn, useCourseDropdown as _useCourseDropdown } from './CourseDropdown.hooks'

type CourseDowndownProps = {
  useCourseDropdown?: () => CourseDropdownHookReturn
}

const CourseDropdown = ({ useCourseDropdown = _useCourseDropdown }: CourseDowndownProps) => {
  const { content, isLoading } = useCourseDropdown()
  const { t } = useTranslation()

  return <GlobalNavDropdown title={t('appGlobal.courses')} content={content} isLoading={isLoading}></GlobalNavDropdown>
}

export default memo(CourseDropdown)
