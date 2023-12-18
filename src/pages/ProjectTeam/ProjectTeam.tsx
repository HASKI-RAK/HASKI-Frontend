import { useTranslation } from 'react-i18next'
import {
  CollapsibleTextMultiList,
  CollapsibleTextList,
  ImageAttribute,
  ImageCollection,
  ProjectDescriptionCard,
  ProjectDescriptionStepper,
  ProjectTeamCompetenciesCard
} from '@components'
import { Avatar, Grid, Box, Fade, Divider, Typography } from '@common/components'
import { memo, useEffect, useCallback, useRef, useState, RefObject } from 'react'
import MediaQuery from 'react-responsive'
//import { useProjectTeam as _useProjectTeam } from './ProjectTeam.hooks'

const background_logo_style = {
    marginLeft:{xl:'23.5%', lg:'23.5%', md:'23.5%', sm:'15%', xs:'15%'},
    marginTop:'9.5rem',
    zIndex:'-100',
    opacity:'0.15',
    position:'absolute',
}

const background_map_style = {
    width:{xl:'50rem', lg:'40rem', md:'33.5rem', sm:'33.5rem', xs:'33.5rem'},
    zIndex:'-100',
    opacity:'0.35',
    position:'absolute',
    overflow:'hidden',
}
/**
 * ProjectTeam page.
 *
 * @remarks
 * ProjectTeam presents a page with an overview of participants, reasons, motivation, methods of the project.
 * It uses the ProjectDescriptionCard, ProjectDescriptionStepper, CollapsibleTextMultiList, ImageCollection components to present the content.
 *
 * @category Pages
 */
const ProjectTeam = () => {
  // Translation
  const { t } = useTranslation()

  const quotesReasons = 
    (t('pages.ProjectTeam.ReasonsBody', {
      returnObjects: true
    }) as { quote: string; img: string; name: string; description: string }[]) ?? []
  let quotesDev =
    (t('pages.ProjectTeam.InitVoicesBody', {
      returnObjects: true
    }) as { quote: string; img: string; name: string; description: string }[]) ?? []
  quotesDev = Array.isArray(quotesDev) ? quotesDev : []
  let quotesStudent =
    (t('pages.ProjectTeam.StudentVoicesBody', {
      returnObjects: true
    }) as { quote: string }[]) ?? []
  quotesStudent = Array.isArray(quotesStudent) ? quotesStudent : []
  let interdisciplinary =
    (t('pages.ProjectTeam.interdisciplinaryBody', {
      returnObjects: true
    }) as {header: string, body:[]}[]) ?? []
  interdisciplinary = Array.isArray(interdisciplinary) ? interdisciplinary : []
  let imageAttributes =
    (t('pages.ProjectTeam.imageSourcesDict', {
      returnObjects: true
    }) as { text: string; url: string }[]) ?? []
  imageAttributes = Array.isArray(imageAttributes) ? imageAttributes : []

  const [animateState, setAnimateState] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const listindex = useRef(0)

  const animate = useCallback((ref: RefObject<HTMLDivElement>) => {
    const topPosition = ref.current?.getBoundingClientRect().top
    const viewportBottom = window.innerHeight
    if (topPosition !== null && typeof topPosition === 'number') {
        if (topPosition <= viewportBottom) {
          setAnimateState(true)
        }
    }
  },[setAnimateState])

  const handleScroll = useCallback(() => {
      animate(ref)
  }, [animate])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [animateState, handleScroll])


 
  return (
    <>
      <MediaQuery minWidth={700}>
        <Fade style={{opacity:'0.15'}} in={true} easing='linear' timeout={5000}>
          <Box sx={{...background_logo_style}} data-testid="BgLogo">
            <img src="/LogoPng.png" width="300" height="300" />
          </Box>
        </Fade>
      </MediaQuery>
      <ProjectDescriptionCard
        header={t('pages.ProjectTeam.introductionHeader')}
        body={t('pages.ProjectTeam.introductionBody')}>
        <ImageCollection
          img1Url={'/ProjectTeam/ProjectTeamAschaffenburg01.jpg'}
          img2Url={'/ProjectTeam/ProjectTeamKempten01.jpg'}
          img3Url={'/ProjectTeam/ProjectTeamRegensburg01.jpg'}
        />
      </ProjectDescriptionCard>
      <ProjectDescriptionStepper
        header={t('pages.ProjectTeam.ReasonsHeader')}
        body={quotesReasons.map((quoteData) => quoteData.quote)}
        withAvatar={true}
        avatarName={quotesReasons.map((quoteData) => quoteData.name)}
        avatarDescription={quotesReasons.map((quoteData) => quoteData.description)}
      />
      <div>
        <div ref={ref}>
          <MediaQuery minWidth={700}>
            <Fade style={{opacity:'0.35'}} in={animateState} easing='linear' timeout={10000}>
              <Box sx={{...background_map_style, left:'-2.5%'}} data-testid="BgMap">
                <img src="/ProjectTeam/mapAschaffenburg.gif" width="100%" />
              </Box>
            </Fade>
          </MediaQuery>
          <ProjectDescriptionCard
            header={t('pages.ProjectTeam.University.AschaffenburgHeader')}
            body={t('pages.ProjectTeam.University.AschaffenburgBody')}
            isLeft={true}>
            <Avatar
              alt={t('pages.ProjectTeam.University.AschaffenburgHeader')}
              src="/ProjectTeamTeamPlaceholder_50.png"
              sx={{
                height: { xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
                width: { xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
              }}
            />
          </ProjectDescriptionCard>
        </div>
        <div>
          <MediaQuery minWidth={700}>
            <Fade style={{opacity: '0.35'}} in={animateState} easing='linear' timeout={5000}>
              <Box sx={{...background_map_style, right:'0%'}} data-testid="BgMap">
                <img src="/ProjectTeam/mapRegensburg.gif" width="100%" />
              </Box>
            </Fade>
          </MediaQuery>
          <ProjectDescriptionCard
            header={t('pages.ProjectTeam.University.RegensburgHeader')}
            body={t('pages.ProjectTeam.University.RegensburgBody')}
            isLeft={false}>
            <Avatar
              alt={t('pages.ProjectTeam.University.RegensburgHeader')}
              src="/ProjectTeamTeamPlaceholder_50.png"
              sx={{
                height: { xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
                width: { xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
              }}
            />
          </ProjectDescriptionCard>
        </div>
        <div>
          <MediaQuery minWidth={700}>
            <Box sx={{...background_map_style, marginTop:'35px', left:'-2.5%'}} data-testid="BgMap">
              <img src="/ProjectTeam/mapKempten.gif" width="100%" />
            </Box>
          </MediaQuery>
          <ProjectDescriptionCard
            header={t('pages.ProjectTeam.University.KemptenHeader')}
            body={t('pages.ProjectTeam.University.KemptenBody')}
            isLeft={true}>
            <Avatar
              alt={t('pages.ProjectTeam.University.KemptenHeader')}
              src="/ProjectTeamTeamPlaceholder_50.png"
              sx={{
                height: { xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
                width: { xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
              }}
            />
          </ProjectDescriptionCard>
        </div>
      </div>
      <ProjectTeamCompetenciesCard header={t('pages.ProjectTeam.interdisciplinaryHeader')}>
        <CollapsibleTextList content={interdisciplinary} animate={animateState} offset={listindex.current++}/>
      </ProjectTeamCompetenciesCard>
      <Grid container item justifyContent="center" xs={12}>
        <ImageAttribute imageAttributes={imageAttributes} />
      </Grid>
    </>
  )
}

export default memo(ProjectTeam)
