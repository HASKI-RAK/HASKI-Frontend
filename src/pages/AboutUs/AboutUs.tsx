import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography } from '@common/components'
import {
  CollapsibleList,
  CollapsibleListEntryContentProps,
  ImageCollection,
  TextCardLeft,
  TextCardRight,
  TextStepper
} from '@components'

/**
 * @prop quote - The quote to be displayed.
 * @prop name - The name of the quoted person.
 * @prop description - Additional info about the quoted person.
 * @interface
 */
type AboutUsQuotesProps = {
  quote: string
  name: string
  description: string
}

/**
 * AboutUs page.
 *
 * @remarks
 * AboutUs represents a page with information about the team involved in the project and their tasks.
 * It uses TextCardLeft, TextCardRight, TextStepper, ImageCollection and CollapsibleList components to present the content.
 *
 * @category Pages
 */
const AboutUs = () => {
  // Translation
  const { t } = useTranslation()

  const collapsibleListEntries = t<string>('pages.aboutus.interdisciplinaryBody', {
    returnObjects: true
  }) as CollapsibleListEntryContentProps[]

  return (
    <>
      <TextCardLeft
        header={t('pages.aboutus.introductionHeader')}
        body={t('pages.aboutus.introductionBody')}
        backgroundImageURL="/LogoHaski.png">
        <ImageCollection
          leftImgURL="/images/AboutUsRegensburg.jpg"
          middleImgURL="/images/AboutUsAschaffenburg.jpg"
          rightImgURL="/images/AboutUsKempten.jpg"
        />
      </TextCardLeft>
      <TextStepper header={t('pages.aboutus.quotesHeader')}>
        {[
          ...(t<string>('pages.aboutus.quotesBody', {
            returnObjects: true
          }) as AboutUsQuotesProps[])
        ].map((element) => (
          <>
            <Typography
              align="center"
              key={element.quote}
              variant="h5"
              sx={{
                width: { sm: '18.75rem', md: '37.5rem' },
                height: { sm: '25rem', md: '12.5rem' }
              }}>
              {element.quote}
            </Typography>
            <Typography
              align="center"
              variant="h5"
              sx={{
                pt: '1.0rem',
                width: { sm: '18.75rem', md: '37.5rem' },
                margin: '0'
              }}>
              {element.name}
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              sx={{
                width: { sm: '18.75rem', md: '37.5rem' },
                margin: '0'
              }}>
              {element.description}
            </Typography>
          </>
        ))}
      </TextStepper>
      <TextCardRight header="Team OTH Regensburg" body={t('pages.aboutus.membersRegensburgBody')}>
        <Box
          sx={{
            zIndex: '-100',
            opacity: '0.35',
            position: 'absolute',
            width: { xl: '50rem', lg: '40rem', md: '33.5rem', sm: '33.5rem', xs: '33.5rem' },
            left: '2%',
            marginTop: '-9rem'
          }}
          src="/images/mapRegensburg.gif"
          component="img"
        />
      </TextCardRight>
      <TextCardLeft header="Team TH Aschaffenburg" body={t('pages.aboutus.membersAschaffenburgBody')}>
        <Box
          sx={{
            zIndex: '-100',
            opacity: '0.35',
            position: 'absolute',
            width: { xl: '50rem', lg: '40rem', md: '33.5rem', sm: '33.5rem', xs: '33.5rem' },
            right: '2%',
            marginTop: '-8rem'
          }}
          src="/images/mapAschaffenburg.gif"
          component="img"
        />
      </TextCardLeft>
      <TextCardRight header="Team HS Kempten" body={t('pages.aboutus.membersKemptenBody')}>
        <Box
          sx={{
            zIndex: '-100',
            opacity: '0.35',
            position: 'absolute',
            width: { xl: '50rem', lg: '40rem', md: '33.5rem', sm: '33.5rem', xs: '33.5rem' },
            left: '2%',
            marginTop: '-3rem'
          }}
          src="/images/mapKempten.gif"
          component="img"
        />
      </TextCardRight>
      <CollapsibleList content={[...collapsibleListEntries]} header={t('pages.aboutus.interdisciplinaryHeader')} />
      <Grid container item justifyContent="center" xs={12} sx={{ marginTop: '5rem' }}>
        <Typography sx={{ pt: '1rem', pb: '1rem' }} variant="subtitle1">
          {t('appGlobal.imageSources') +
            ' ' +
            t('appGlobal.othRegensburg') +
            ', ' +
            t('appGlobal.aschaffenburgUAS') +
            ', ' +
            t('appGlobal.universityKempten') +
            ', '}
          <a href="https://d-maps.com/carte.php?num_car=6121&lang=de">
            {'https://d-maps.com/carte.php?num_car=6121&lang=de'}
          </a>
        </Typography>
      </Grid>
    </>
  )
}

export default memo(AboutUs)
