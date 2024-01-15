import { Avatar, Grid, Typography, Box } from '@common/components'
import { TextCardRight, TextStepper, TextCardLeft } from '@components'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'

/**
 * ProjectDescription page.
 *
 * @remarks
 * ProjectDescription represents a page with a description of the project.
 * It uses the TextCardRight, TextCardLeft and TextStepper components to present the content.
 *
 * @category Pages
 */
const ProjectDescription = () => {
  // Translation
  const { t } = useTranslation()

  return (
    <>
      <TextCardRight
        header={t('pages.projectdescription.introductionHeader')}
        body={t('pages.projectdescription.introductionBody')}>
        <Box
          component="img"
          sx={{
            maxHeight: { xs: '6.25rem', sm: '9.375rem', md: '15.625rem', lg: '18.75rem' },
            maxWidth: { xs: '6.25rem', sm: '9.375rem', md: '15.625rem', lg: '18.75rem' }
          }}
          src="/LogoPng.png"
        />
      </TextCardRight>
      <TextStepper header={t('pages.projectdescription.approachesHeader')}>
        {[
          ...(t<string>('pages.projectdescription.approachesBody', {
            returnObjects: true
          }) as string[])
        ].map((element) => (
          <Typography
            align="center"
            key={element}
            variant="h5"
            sx={{
              pt: '2.5rem',
              width: { sm: '18.75rem', md: '37.5rem' },
              height: { sm: '25rem', md: '12.5rem' }
            }}>
            {element}
          </Typography>
        ))}
      </TextStepper>
      <TextCardLeft
        header={t('pages.projectdescription.advantagesTeachingHeader')}
        body={t('pages.projectdescription.advantagesTeachingBody')}>
        <Avatar
          alt="Advantages Teaching 1"
          src="/ProjectDescriptionImage01.jpg"
          sx={{
            height: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
            width: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
          }}
        />
      </TextCardLeft>
      <TextCardRight
        header={t('pages.projectdescription.advantagesTeachingHeader-2')}
        body={t('pages.projectdescription.advantagesTeachingBody-2')}>
        <Avatar
          alt="Advantages Teaching 2"
          src="/ProjectDescriptionImage02.jpg"
          sx={{
            height: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
            width: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
          }}
        />
      </TextCardRight>
      <TextCardLeft
        header={t('pages.projectdescription.advantagesLearningHeader')}
        body={t('pages.projectdescription.advantagesLearningBody')}>
        <Avatar
          alt="Advantages Learning 1"
          src="/ProjectDescriptionImage03.jpg"
          sx={{
            height: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
            width: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
          }}
        />
      </TextCardLeft>
      <TextCardRight
        header={t('pages.projectdescription.advantagesLearningHeader-2')}
        body={t('pages.projectdescription.advantagesLearningBody-2')}>
        <Avatar
          alt="Advantages Learning 2"
          src="/ProjectDescriptionImage04.jpg"
          sx={{
            height: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
            width: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
          }}
        />
      </TextCardRight>
      <TextStepper header={t('pages.projectdescription.goalsHeader')}>
        {[
          ...(t<string>('pages.projectdescription.goalsBody', {
            returnObjects: true
          }) as string[])
        ].map((element) => (
          <Typography
            align="center"
            key={element}
            variant="h5"
            sx={{
              pt: '2.5rem',
              width: { sm: '18.75rem', md: '37.5rem' },
              height: { sm: '25rem', md: '12.5rem' }
            }}>
            {element}
          </Typography>
        ))}
      </TextStepper>
      <Grid container item justifyContent="center" xs={12}>
        <Typography sx={{ pt: '1rem', pb: '1rem' }} variant="subtitle1">
          {t('appGlobal.imageSources') + ' ' + t('appGlobal.universityKempten') + ', '}
          <a href="https://de.freepik.com/fotos-kostenlos/close-up-der-studentin-schreiben-auf-laptop-am-tisch_1147740.htm">
            {t('pages.projectdescription.imageSource-1')}
          </a>
          {', '}
          <a href="https://www.freepik.com/free-photo/cloud-upload-icon-line-connection-circuit-board_1198390.htm">
            {t('pages.projectdescription.imageSource-2')}
          </a>
        </Typography>
      </Grid>
    </>
  )
}

export default memo(ProjectDescription)
