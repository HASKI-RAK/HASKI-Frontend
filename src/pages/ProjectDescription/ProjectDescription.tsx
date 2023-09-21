import { useTranslation } from 'react-i18next'
import { ProjectDescriptionCard, ProjectDescriptionStepper } from '@components'
import { Avatar, Box, Grid, Typography } from '@common/components'
import { memo } from 'react'

/**
 * ProjectDescriptionContent presents content for the project description.
 * It can be used as a standalone component on a page.
 * @returns {JSX.Element} The content component of the project description.
 * @category Components
 */
/**
 * ProjectDescription presents a page with a description of the project. It uses the ProjectDescriptionContent component to present the content.
 * @returns {JSX.Element} - The ProjectDescription page.
 * @category Pages
 */
const ProjectDescription = () => {
  // Translation
  const { t } = useTranslation()

  return (
    <>
      <ProjectDescriptionCard
        header={t('components.ProjectDescriptionContent.introductionHeader')}
        body={t('components.ProjectDescriptionContent.introductionBody')}>
        <Box
          component="img"
          sx={{
            maxHeight: { xs: '6.25rem', sm: '9.375rem', md: '15.625rem', lg: '18.75rem' },
            maxWidth: { xs: '6.25rem', sm: '9.375rem', md: '15.625rem', lg: '18.75rem' }
          }}
          src="/LogoPng.png"
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionStepper
        header={t('components.ProjectDescriptionContent.approachesHeader')}
        body={
          t<string>('components.ProjectDescriptionContent.approachesBody', {
            returnObjects: true
          }) as string[]
        }
      />
      <ProjectDescriptionCard
        header={t('components.ProjectDescriptionContent.advantagesTeachingHeader')}
        body={t('components.ProjectDescriptionContent.advantagesTeachingBody')}>
        <Avatar
          alt="Advantages Teaching 1"
          src="/ProjectDescriptionImage01.jpg"
          sx={{
            height: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
            width: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
          }}
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionCard
        header={t('components.ProjectDescriptionContent.advantagesTeachingHeader2')}
        body={t('components.ProjectDescriptionContent.advantagesTeachingBody2')}>
        <Avatar
          alt="Advantages Teaching 2"
          src="/ProjectDescriptionImage02.jpg"
          sx={{
            height: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
            width: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
          }}
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionCard
        header={t('components.ProjectDescriptionContent.advantagesLearningHeader')}
        body={t('components.ProjectDescriptionContent.advantagesLearningBody')}>
        <Avatar
          alt="Advantages Learning 1"
          src="/ProjectDescriptionImage03.jpg"
          sx={{
            height: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
            width: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
          }}
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionCard
        header={t('components.ProjectDescriptionContent.advantagesLearningHeader2')}
        body={t('components.ProjectDescriptionContent.advantagesLearningBody2')}>
        <Avatar
          alt="Advantages Learning 2"
          src="/ProjectDescriptionImage04.jpg"
          sx={{
            height: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
            width: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
          }}
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionStepper
        header={t('components.ProjectDescriptionContent.goalsHeader')}
        body={
          t<string>('components.ProjectDescriptionContent.goalsBody', {
            returnObjects: true
          }) as string[]
        }
      />
      <Grid container item justifyContent="center" xs={12}>
        <Typography sx={{ pt: '1rem', pb: '1rem' }} variant="subtitle1">
          {t('components.ProjectDescriptionContent.imageSources') + t('universityKempten') + ', '}
          <a href="https://de.freepik.com/fotos-kostenlos/close-up-der-studentin-schreiben-auf-laptop-am-tisch_1147740.htm">
            {t('components.ProjectDescriptionContent.imageSource1')}
          </a>
          {', '}
          <a href="https://www.freepik.com/free-photo/cloud-upload-icon-line-connection-circuit-board_1198390.htm">
            {t('components.ProjectDescriptionContent.imageSource2')}
          </a>
        </Typography>
      </Grid>
    </>
  )
}

export default memo(ProjectDescription)
