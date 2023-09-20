import { ProjectDescriptionContent } from '@components'
import { memo } from 'react'

/**
 * ProjectDescription presents a page with a description of the project. It uses the ProjectDescriptionContent component to present the content.
 * @returns {JSX.Element} - The ProjectDescription page.
 * @category Pages
 */
const ProjectDescription = () => {
  return <ProjectDescriptionContent />
}

export default memo(ProjectDescription)
