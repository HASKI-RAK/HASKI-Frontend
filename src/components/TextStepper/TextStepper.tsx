import { Button, Fade, Grid, MobileStepper } from '@common/components'
import { useRef, useEffect, useCallback, useState, memo } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@common/icons'
import { useTranslation } from 'react-i18next'
import { Typewriter } from '@components'
import { useViewport } from '@services'

/**
 * @prop children - The child elements that can be stepped through.
 * @prop header - The header text that is permanently displayed above the child elements.
 * @interface
 */
type TextStepperProps = {
  children?: JSX.Element[]
  header?: string
}

/**
 * TextStepper component.
 *
 * @param props - Props containing the header text and child elements.
 *
 * @remarks
 * TextStepper represents a component that displays a header text on top and and multiple steppable child elements on the bottom of the element.
 * The header text is animated by using a typewriter effect. The child elements are animated by using a fade in effect.
 * TextStepper can be used as a standalone component on a page.
 *
 * @category Components
 */
const TextStepper = (props: TextStepperProps) => {
  // States
  const [startAnimation, setStartAnimation] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  // Hooks
  const { isInViewport } = useViewport()
  const { t } = useTranslation()

  // Ref
  const ref = useRef<HTMLDivElement>(null)

  // Logic
  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }, [setActiveStep])

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }, [setActiveStep])

  const handleScroll = useCallback(() => {
    if (isInViewport(ref)) {
      setStartAnimation(true)
    }
  }, [isInViewport, ref, setStartAnimation])

  // Starts animation on component mount and continues already started animation.
  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div ref={ref} data-testid="textStepper">
      <Grid
        container
        justifyContent="center"
        sx={{
          mt: '7.5rem',
          mb: '7.5rem'
        }}>
        <Grid container item justifyContent="center" xs={12} sx={{ maxWidth: { sm: '18.75rem', md: '37.5rem' } }}>
          <Typewriter
            startAnimation={startAnimation}
            delay={50}
            variant="h3"
            align="center"
            sx={{
              width: { sm: '18.75rem', md: '37.5rem' },
              height: { sm: '10.625rem', md: '6.25rem' }
            }}>
            {props.header}
          </Typewriter>
          <Fade in={startAnimation} easing="linear" timeout={2500}>
            <div>{props.children?.[activeStep] /*Fade does not render with fragment as child element*/}</div>
          </Fade>
        </Grid>
        <Grid alignContent="center" container item justifyContent="center" xs={12}>
          <MobileStepper
            variant="dots"
            steps={props.children?.length ?? 0}
            position="static"
            activeStep={activeStep}
            sx={{
              maxWidth: { sm: '18.75rem', md: '25rem' },
              flexGrow: 1,
              border: 0
            }}
            nextButton={
              <Button
                id="next-button"
                size="small"
                onClick={handleNext}
                disabled={activeStep === (props.children && props.children.length - 1)}>
                {t('appGlobal.next')}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button id="back-button" size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                {t('appGlobal.back')}
              </Button>
            }
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default memo(TextStepper)
