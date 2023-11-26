import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
    ProjectTeamCompetenciesCardHookReturn,
    useProjectTeamCompetenciesCard as _useProjectTeamCompetenciesCard,
    useProjectTeamCompetenciesCardHookParams
} from "../../ProjectTeam/ProjectTeamCompetenciesCard/ProjectTeamCompetenciesCard.hooks";
import {useTranslation} from "react-i18next";
import {Typography} from "@common/components";

/**
 * @props header - The header text that is permanently displayed above the body texts.
 * @props children - child react element to be displayed beneath header.
 * @props useProjectTeamCompetenciesCard - The hook that is used for the stepper logic.
 * @interface
 */
type ProjectTeamCompetenciesCardProps = {
    header?: string
    children: React.ReactNode
    useProjectTeamCompetenciesCard?: (
        params?: useProjectTeamCompetenciesCardHookParams
    ) => ProjectTeamCompetenciesCardHookReturn
}

/**
 * ProjectTeamCompetenciesCard component.
 *
 * @param props - Props containing the header text and child react element (for this use-case CollapsibleTextMultiList).
 *
 * @category Components
 */
const ProjectTeamCompetenciesCard = ({
                                         useProjectTeamCompetenciesCard = _useProjectTeamCompetenciesCard,
                                         ...props
                                     }: ProjectTeamCompetenciesCardProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const {headerState, animateHeader} = useProjectTeamCompetenciesCard()

    const handleScroll = useCallback(() => {
        if (props.header !== null && typeof props.header === 'string') {
            animateHeader(ref, props.header)
        }
    }, [animateHeader, props.header])

    // Starts animation on component mount and continues already started animation.
    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [headerState, handleScroll])

    return (
        <div ref={ref} data-testid="projectTeamCompetenciesCard">
            <Typography
                variant="h3"
                align="center">
                {headerState}
            </Typography>
            <div style={{width: '70%', margin: '0 auto', marginBottom: '9rem'}}>
                {props.children}
            </div>
        </div>
    )
}

export default memo(ProjectTeamCompetenciesCard)