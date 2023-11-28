import {Avatar, Button, Fade, Grid, MobileStepper, Typography} from '@common/components'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import {memo, useCallback, useEffect, useRef, useState} from 'react'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import {useTranslation} from 'react-i18next'
import {
    ProjectDescriptionStepperHookReturn,
    useProjectDescriptionStepper as _useProjectDescriptionStepper,
    useProjectDescriptionStepperHookParams
} from './ProjectDescriptionStepper.hooks'

/**
 * @prop body - The body texts that can be stepped through.
 * @prop header - The header text that is permanently displayed above the body texts.
 * @prop withAvatar - If set, an avatar image, e.g. person will be displayed beneath.
 * @prop avatarSrc - Source image file for avatar, if none is set a default avatar will be displayed.
 * @prop avatarName - Line 1 of avatar description (mostly referred as name).
 * @prop avatarDescription - Line 2 of avatar description (mostly referred as title/description).
 * @prop useProjectDescriptionStepper - The hook that is used for the stepper logic.
 * @interface
 */
type ProjectDescriptionStepperProps = {
    body?: string[]
    header?: string
    withAvatar?: boolean
    avatarSrc?: string[]
    avatarName?: string[]
    avatarDescription?: string[]
    useProjectDescriptionStepper?: (
        params?: useProjectDescriptionStepperHookParams
    ) => ProjectDescriptionStepperHookReturn
}

/**
 * ProjectDescriptionStepper component.
 *
 * @param props - Props containing the body and header texts and avatar info as well as a hook for the animation logic.
 *
 * @remarks
 * ProjectDescriptionCard presents a component that displays a header text on top and multiple steppable body texts on the bottom of the element.
 * The header text is animated by using a typewriter effect. The body texts are animated by using a fade in effect.
 * Optionally avatar images and titles can be used, those will be displayed beneath each body individually.
 * ProjectDescriptionCard can be used as a standalone component on a page.
 *
 * @category Components
 */
const ProjectDescriptionStepper = ({
                                       useProjectDescriptionStepper = _useProjectDescriptionStepper,
                                       ...props
                                   }: ProjectDescriptionStepperProps) => {
    const {t} = useTranslation()
    const ref = useRef<HTMLDivElement>(null)
    const [activeStep, setActiveStep] = useState(0)
    const {
        bodyState,
        headerState,
        avatarNameState,
        avatarDescriptionState,
        avatarState,
        animateBody,
        animateHeader,
        animateAvatar,
        animateAvatarName,
        animateAvatarDescription
    } = useProjectDescriptionStepper()

    const handleAvatarAnimation = useCallback((step: number) => {
        if (props.withAvatar) {
            animateAvatar(ref, props.withAvatar)
            if (Array.isArray(props.avatarName) && props.avatarName.length > 0) {
                animateAvatarName(ref, props.avatarName[step]);
            }
            if (Array.isArray(props.avatarDescription) && props.avatarDescription.length > 0) {
                animateAvatarDescription(ref, props.avatarDescription[step]);
            }
        }
    }, [animateAvatarName, animateAvatarDescription, props.avatarName, props.avatarDescription, activeStep]);

    const handleStepChange = useCallback((stepDelta: number) => {
        setActiveStep((prevActiveStep) => prevActiveStep + stepDelta);
        // update avatarName & description texts
        handleAvatarAnimation(activeStep + stepDelta);
    }, [setActiveStep, handleAvatarAnimation]);

    const handleNext = useCallback(() => {
        handleStepChange(1);
    }, [handleStepChange]);

    const handleBack = useCallback(() => {
        handleStepChange(-1);
    }, [handleStepChange]);


    const handleScroll = useCallback(() => {
        if (props.body !== null && typeof props.body === 'object') {
            animateBody(ref, props.body)
        }

        if (props.header != null && typeof props.header === 'string') {
            animateHeader(ref, props.header)
        }

        handleAvatarAnimation(activeStep);
    }, [animateBody, animateHeader, handleAvatarAnimation, props.body, props.header])

    // Starts animation on component mount and continues already started animation.
    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [headerState, bodyState, avatarNameState, avatarDescriptionState, handleScroll])

    return (
        <div ref={ref} data-testid="projectDescriptionStepper">
            <Grid
                container
                justifyContent="center"
                sx={{
                    mt: '1.5rem',
                    mb: '5.5rem'
                }}>
                <Grid container item justifyContent="center" xs={12} sx={{maxWidth: {sm: '18.75rem', md: '37.5rem'}}}>
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{
                            width: {sm: '18.75rem', md: '37.5rem'},
                            height: {sm: '10.625rem', md: '6.25rem'}
                        }}>
                        {headerState}
                    </Typography>
                    <Fade in={!!bodyState[activeStep]} easing="linear" timeout={1000}>
                        <Typography
                            align="center"
                            variant="h5"
                            sx={{
                                pt: '2.5rem',
                                width: {sm: '18.75rem', md: '37.5rem'},
                                height: {sm: '25rem', md: '12.5rem'}
                            }}>
                            {bodyState[activeStep]}
                        </Typography>
                    </Fade>
                </Grid>
                {props.withAvatar && <Grid alignContent="center" container item justifyContent="center" xs={12}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Fade in={avatarState} easing="linear" timeout={750}>
                            <Avatar
                                alt={props.avatarName?.[activeStep] ?? "Default Avatar"}
                                src={props.avatarSrc?.[activeStep] ?? "/ProjectTeamPersonPlaceholder.png"}
                                sx={{
                                    height: {xs: '6.5rem', sm: '6.5rem', md: '10.25rem', lg: '15.0rem'},
                                    width: {xs: '6.5rem', sm: '6.5rem', md: '10.25rem', lg: '15.0rem'},
                                    margin: '0'
                                }}
                            />
                        </Fade>
                        <Typography
                            align="center"
                            variant="h5"
                            sx={{
                                pt: '1.0rem',
                                width: {sm: '18.75rem', md: '37.5rem'},
                                margin: '0'
                            }}>
                            {avatarNameState}
                        </Typography>
                        <Typography
                            align="center"
                            variant="h5"
                            sx={{
                                pt: '0.5rem',
                                pb: '1.5rem',
                                width: {sm: '18.75rem', md: '37.5rem'},
                                margin: '0'
                            }}>
                            {avatarDescriptionState}
                        </Typography>
                    </div>
                </Grid>}
                <Grid alignContent="center" container item justifyContent="center" xs={12}>
                    <MobileStepper
                        variant="dots"
                        steps={props.body?.length ?? 0}
                        position="static"
                        activeStep={activeStep}
                        sx={{
                            maxWidth: {sm: '18.75rem', md: '25rem'},
                            flexGrow: 1,
                            border: 0
                        }}
                        nextButton={
                            <Button
                                id="next-button"
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === (props.body && props.body.length - 1)}>
                                {t('Next')}
                                <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button id="back-button" size="small" onClick={handleBack} disabled={activeStep === 0}>
                                <KeyboardArrowLeft />
                                {t('Back')}
                            </Button> 
                        }
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default memo(ProjectDescriptionStepper)
