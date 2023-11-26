import {useTranslation} from 'react-i18next'
import {
    ProjectDescriptionCard,
    ProjectDescriptionStepper,
    CollapsibleTextMultiList,
    ImageCollection,
    ImageAttribute,
    MapPin,
    ProjectTeamCompetenciesCard
} from '@components'
import {Avatar, Box, Grid, Typography} from '@common/components'
import React, {memo} from 'react'
import MediaQuery from 'react-responsive'
import './ProjectTeam.css'

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
    const {t} = useTranslation()

    let quotesReasons = t('pages.ProjectTeam.ReasonsBody', {
        returnObjects: true,
    }) as { quote: string; img: string, name: string, description: string }[] ?? [];
    quotesReasons = Array.isArray(quotesReasons) ? quotesReasons : [];
    let quotesDev = t('pages.ProjectTeam.InitVoicesBody', {
        returnObjects: true,
    }) as { quote: string; img: string, name: string, description: string }[] ?? [];
    quotesDev = Array.isArray(quotesDev) ? quotesDev : [];
    let quotesStudent = t('pages.ProjectTeam.StudentVoicesBody', {
        returnObjects: true,
    }) as { quote: string }[] ?? [];
    quotesStudent = Array.isArray(quotesStudent) ? quotesStudent : [];
    let interdisciplinary = t('pages.ProjectTeam.interdisciplinaryBody', {
        returnObjects: true,
    }) as { header: string; description: string }[] ?? [];
    interdisciplinary = Array.isArray(interdisciplinary) ? interdisciplinary : [];
    const content: { [key: string]: string } = {}; // Add the index signature
    interdisciplinary.forEach((item, index) => {
        const headerKey = item.header;
        content[headerKey] = item.description;
    });
    let imageAttributes = t('pages.ProjectTeam.imageSourcesDict', {
        returnObjects: true,
    }) as { text: string, url: string }[] ?? [];
    imageAttributes = Array.isArray(imageAttributes) ? imageAttributes : [];

    return (
        <>
            <MediaQuery minWidth={700}>
                <div className="bgLogo" data-testid="BgLogo">
                    <img src="/LogoPng.png" width="300" height="300"/>
                </div>
            </MediaQuery>
            <ProjectDescriptionCard
                header={t('pages.ProjectTeam.introductionHeader')}
                body={t('pages.ProjectTeam.introductionBody')}>
                <ImageCollection
                    img1Url={"/ProjectTeam/ProjectTeamAschaffenburg01.jpg"}
                    img2Url={"/ProjectTeam/ProjectTeamKempten01.jpg"}
                    img3Url={"/ProjectTeam/ProjectTeamRegensburg01.jpg"}/>
            </ProjectDescriptionCard>
            <ProjectDescriptionStepper
                header={t('pages.ProjectTeam.ReasonsHeader')}
                body={quotesReasons.map((quoteData) => quoteData.quote)}
                withAvatar={true}
                avatarName={quotesReasons.map((quoteData) => quoteData.name)}
                avatarDescription={quotesReasons.map((quoteData) => quoteData.description)}/>
            <div>
                <div>
                    <MediaQuery minWidth={700}>
                        <div className="bgMap02" data-testid="BgMap">
                            <img src="/ProjectTeam/map02.gif" width="100%"/>
                        </div>
                    </MediaQuery>
                    <ProjectDescriptionCard
                        header={t('pages.ProjectTeam.University.AschaffenburgHeader')}
                        body={t('pages.ProjectTeam.University.AschaffenburgBody')}
                        isLeft={true}>
                        <Avatar
                            alt={t('pages.ProjectTeam.University.AschaffenburgHeader')}
                            src="/ProjectTeamTeamPlaceholder_50.png"
                            sx={{
                                height: {xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem'},
                                width: {xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem'}
                            }}
                        />
                    </ProjectDescriptionCard>
                </div>
                <div>
                    <MediaQuery minWidth={700}>
                        <div className="bgMap01" data-testid="BgMap">
                            <img src="/ProjectTeam/map01.gif" width="100%"/>
                        </div>
                    </MediaQuery>
                    <ProjectDescriptionCard
                        header={t('pages.ProjectTeam.University.RegensburgHeader')}
                        body={t('pages.ProjectTeam.University.RegensburgBody')}
                        isLeft={false}>
                        <Avatar
                            alt={t('pages.ProjectTeam.University.RegensburgHeader')}
                            src="/ProjectTeamTeamPlaceholder_50.png"
                            sx={{
                                height: {xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem'},
                                width: {xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem'}
                            }}
                        />
                    </ProjectDescriptionCard>
                </div>
                <div>
                    <MediaQuery minWidth={700}>
                        <div className="bgMap03" data-testid="BgMap">
                            <img src="/ProjectTeam/map03.gif" width="100%"/>
                        </div>
                    </MediaQuery>
                    <ProjectDescriptionCard
                        header={t('pages.ProjectTeam.University.KemptenHeader')}
                        body={t('pages.ProjectTeam.University.KemptenBody')}
                        isLeft={true}>
                        <Avatar
                            alt={t('pages.ProjectTeam.University.KemptenHeader')}
                            src="/ProjectTeamTeamPlaceholder_50.png"
                            sx={{
                                height: {xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem'},
                                width: {xs: '7rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem'}
                            }}
                        />
                    </ProjectDescriptionCard>
                </div>
            </div>
            <ProjectDescriptionStepper
                header={t('pages.ProjectTeam.InitVoicesHeader')}
                body={quotesDev.map((quoteData) => quoteData.quote)}
                withAvatar={true}
                avatarName={quotesDev.map((quoteData) => quoteData.name)}
                avatarDescription={quotesDev.map((quoteData) => quoteData.description)}/>
            <ProjectTeamCompetenciesCard header={t('pages.ProjectTeam.interdisciplinaryHeader')}>
                <MediaQuery minWidth={700}>
                    <CollapsibleTextMultiList content={content} columns={2}/>
                </MediaQuery>
                <MediaQuery maxWidth={700}>
                    <CollapsibleTextMultiList content={content} columns={1}/>
                </MediaQuery>
            </ProjectTeamCompetenciesCard>
            <ProjectDescriptionStepper
                header={t('pages.ProjectTeam.StudentVoicesHeader')}
                body={quotesStudent.map((quoteData) => quoteData.quote)}
            />
            <Grid container item justifyContent="center" xs={12}>
                <ImageAttribute imageAttributes={imageAttributes}/>
            </Grid>
        </>
    )
}

export default memo(ProjectTeam)