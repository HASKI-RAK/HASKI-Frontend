import {useTranslation} from 'react-i18next'
import {ImageAttribute, ProjectDescriptionCard, ProjectDescriptionStepper} from '@components'
import {Avatar, Box, Grid} from '@common/components'
import {memo} from 'react'

/**
 * ProjectDescription page.
 *
 * @remarks
 * ProjectDescription presents a page with a description of the project.
 * It uses the ProjectDescriptionCard and ProjectDescriptionStepper components to present the content.
 *
 * @category Pages
 */
const ProjectDescription = () => {
  // Translation
  const { t } = useTranslation()

  return (
    <>
      <ProjectDescriptionCard
        header={t('pages.ProjectDescription.introductionHeader')}
        body={t('pages.ProjectDescription.introductionBody')}>
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
        header={t('pages.ProjectDescription.approachesHeader')}
        body={
          t<string>('pages.ProjectDescription.approachesBody', {
            returnObjects: true
          }) as string[]
        }
      />
      <ProjectDescriptionCard
        header={t('pages.ProjectDescription.advantagesTeachingHeader')}
        body={t('pages.ProjectDescription.advantagesTeachingBody')}>
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
        header={t('pages.ProjectDescription.advantagesTeachingHeader2')}
        body={t('pages.ProjectDescription.advantagesTeachingBody2')}>
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
        header={t('pages.ProjectDescription.advantagesLearningHeader')}
        body={t('pages.ProjectDescription.advantagesLearningBody')}>
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
        header={t('pages.ProjectDescription.advantagesLearningHeader2')}
        body={t('pages.ProjectDescription.advantagesLearningBody2')}>
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
        header={t('pages.ProjectDescription.goalsHeader')}
        body={
          t<string>('pages.ProjectDescription.goalsBody', {
            returnObjects: true
          }) as string[]
        }
      />
      <Grid container item justifyContent="center" xs={12}>
          <ImageAttribute imageAttributes={
              t('pages.ProjectDescription.imageSourcesDict', {
                returnObjects: true,
          }) as { text: string, url: string }[]}/>
      </Grid>
    </>
  )
}

export default memo(ProjectDescription)
