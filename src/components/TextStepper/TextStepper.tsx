import { Button, Fade, Grid, MobileStepper, Typography } from '@common/components'
import { useRef, useEffect, useCallback, useState, memo } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@common/icons'
import { useTranslation } from 'react-i18next'
import { Typewriter } from '@components'
import { useViewport } from '@services'

/**
 * @prop body - The body texts that can be stepped through.
 * @prop header - The header text that is permanently displayed above the body texts.
 * @interface
 */
type TextStepperProps = {
  body?: string[]
  header?: string
}

/**
 * TextStepper component.
 *
 * @param props - Props containing the body and header texts.
 *
 * @remarks
 * TextStepper presents a component that displays a header text on top and and multiple steppable body texts on the bottom of the element.
 * The header text is animated by using a typewriter effect. The body texts are animated by using a fade in effect.
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
            <Typography
              align="center"
              variant="h5"
              sx={{
                pt: '2.5rem',
                width: { sm: '18.75rem', md: '37.5rem' },
                height: { sm: '25rem', md: '12.5rem' }
              }}>
              {props.body?.[activeStep]}
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
              <Button
                id="next-button"
                size="small"
                onClick={handleNext}
                disabled={activeStep === (props.body && props.body.length - 1)}>
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
