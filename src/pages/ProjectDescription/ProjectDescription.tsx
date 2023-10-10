import { useTranslation } from 'react-i18next'
import { ProjectDescriptionCard, ProjectDescriptionStepper } from '@components'
import { Avatar, Box, Grid, Typography } from '@common/components'
import { memo } from 'react'

/**
 * # Project Description Page
 * Presents a page with a description of the project. It uses the {@link ProjectDescriptionContent} to present the content.
 * @category Pages
 */
export const ProjectDescription = () => {
  return <ProjectDescriptionContent />
}

export default ProjectDescription
