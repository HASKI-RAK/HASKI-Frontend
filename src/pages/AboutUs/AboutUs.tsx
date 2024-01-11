import { Box, Typography } from '@common/components'
import { TextCardLeft, TextCardRight, TextStepper, ImageCollection, CollapsibleList } from '@components'
import { useTranslation } from 'react-i18next'

type AboutUsQuotesProps = {
  quote: string
  name: string
  description: string
}

type CollapsibleListEntryProps = {
  header?: string
  body?: string[]
} // header for list

const AboutUs = () => {
  // Translation
  const { t } = useTranslation()

  const test = t<string>('pages.aboutus.interdisciplinaryBody', {
    returnObjects: true
  }) as CollapsibleListEntryProps[]

  return (
    <>
      <TextCardLeft
        header={t('pages.aboutus.introductionHeader')}
        body={t('pages.aboutus.introductionBody')}
        backgroundImageURL="/LogoPng.png">
        <ImageCollection
          leftImgURL="/images/AboutUsRegensburg.jpg"
          middleImgURL="/images/AboutUsAschaffenburg.jpg"
          rightImgURL="/images/AboutUsKempten.jpg"
        />
      </TextCardLeft>
      <TextStepper header={t('pages.aboutus.quotesHeader')}>
        {(
          t<string>('pages.aboutus.quotesBody', {
            returnObjects: true
          }) as AboutUsQuotesProps[]
        ).map((element) => (
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
            marginTop: '-9rem'
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
            marginTop: '-9rem'
          }}
          src="/images/mapKempten.gif"
          component="img"
        />
      </TextCardRight>
      <CollapsibleList content={test} />
      <div>interdisziplinäres arbeiten</div>
    </>
  )
}

export default AboutUs
