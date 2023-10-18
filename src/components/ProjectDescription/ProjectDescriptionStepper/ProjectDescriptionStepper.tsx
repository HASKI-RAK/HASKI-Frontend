import { Button, Fade, Grid, MobileStepper, Typography } from '@common/components'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { useRef, useEffect, useCallback, useState, memo } from 'react'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import { useTranslation } from 'react-i18next'
import {
  useProjectDescriptionStepper as _useProjectDescriptionStepper,
  useProjectDescriptionStepperHookParams,
  ProjectDescriptionStepperHookReturn
} from './ProjectDescriptionStepper.hooks'

/**
 * @props body - The body texts that can be stepped through.
 * @props header - The header text that is permanently displayed above the body texts.
 * @props useProjectDescriptionStepper - The hook that is used for the stepper logic.
 * @interface
 */
type ProjectDescriptionStepperProps = {
  body?: string[]
  header?: string
  useProjectDescriptionStepper?: (
    params?: useProjectDescriptionStepperHookParams
  ) => ProjectDescriptionStepperHookReturn
}

/**
 * ProjectDescriptionStepper component.
 *
 * @param props - Props containing the body and header texts aswell as a hook for the animation logic.
 *
 * @remarks
 * ProjectDescriptionCard presents a component that displays a header text on top and and multiple steppable body texts on the bottom of the element.
 * The header text is animated by using a typewriter effect. The body texts are animated by using a fade in effect.
 * ProjectDescriptionCard can be used as a standalone component on a page.
 *
 * @category Components
 */
const ProjectDescriptionStepper = ({
  useProjectDescriptionStepper = _useProjectDescriptionStepper,
  ...props
}: ProjectDescriptionStepperProps) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const { bodyState, headerState, animateBody, animateHeader } = useProjectDescriptionStepper()

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }, [setActiveStep])

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }, [setActiveStep])

  const handleScroll = useCallback(() => {
    if (props.body !== null && typeof props.body === 'object') {
      animateBody(ref, props.body)
    }

    if (props.header != null && typeof props.header === 'string') {
      animateHeader(ref, props.header)
    }
  }, [animateBody, animateHeader, props.body, props.header])

  // Starts animation on component mount and continues already started animation.
  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headerState, bodyState, handleScroll])

  return (
    <div ref={ref} data-testid="projectDescriptionStepper">
      <Grid
        container
        justifyContent="center"
        sx={{
          mt: '7.5rem',
          mb: '7.5rem'
        }}>
        <Grid container item justifyContent="center" xs={12} sx={{ maxWidth: { sm: '18.75rem', md: '37.5rem' } }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              width: { sm: '18.75rem', md: '37.5rem' },
              height: { sm: '10.625rem', md: '6.25rem' }
            }}>
            {headerState}
          </Typography>
          <Fade in={!!bodyState[activeStep]} easing="linear" timeout={1000}>
            <Typography
              align="center"
              variant="h5"
              sx={{
                pt: '2.5rem',
                width: { sm: '18.75rem', md: '37.5rem' },
                height: { sm: '25rem', md: '12.5rem' }
              }}>
              {bodyState[activeStep]}
            </Typography>
          </Fade>
        </Grid>
        <Grid alignContent="center" container item justifyContent="center" xs={12}>
          <MobileStepper
            variant="dots"
            steps={props.body?.length ?? 0}
            position="static"
            activeStep={activeStep}
            sx={{
              maxWidth: { sm: '18.75rem', md: '25rem' },
              flexGrow: 1,
              border: 0
            }}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === (props.body && props.body.length - 1)}>
                {t('Next')}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
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