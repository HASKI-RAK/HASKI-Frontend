import { ReactNode, memo, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Divider, Fade, Grid, Typography } from '@common/components'
import { Typewriter } from '@components'
import { useViewport } from '@services'

/**
 * @prop body - The body text that is displayed on the bottom left side.
 * @prop children - The child element that is displayed on the right side.
 * @prop header - The header text that is displayed on the top left side.
 * @interface
 */
type TextCardLeft = {
  body?: string
  children?: ReactNode
  header?: string
  backgroundImageURL?: string
}

/**
 * TextCardLeft component.
 *
 * @param props - Props containing the body and header texts and a child element.
 *
 * @remarks
 * TextCardLeft represents a component that displays a header and a body text on the left side and a child element on the right side.
 * The header text is animated by using a typewriter effect. The body text is animated by using a fade in effect.
 * TextCardLeft can be used as a standalone component on a page.
 *
 * @category Components
 */
const TextCardLeft = (props: TextCardLeft) => {
  // State
  const [startAnimation, setStartAnimation] = useState(false)

  // Hook
  const { isInViewport } = useViewport()

  // Ref
  const ref = useRef<HTMLDivElement>(null)

  // Logic
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
    <div ref={ref} data-testid="textCardLeft">
      <Grid
        container
        justifyContent="center"
        sx={{
          mt: '7.5rem',
          mb: '7.5rem'
        }}>
        <Grid item xs={7} textAlign="center">
          {props.backgroundImageURL && (
            <Box
              sx={{
                marginLeft: '-7.5rem',
                marginTop: '6rem',
                zIndex: '-100',
                opacity: '0.15',
                position: 'absolute',
                width: '15rem'
              }}
              src={props.backgroundImageURL}
              component="img"
            />
          )}
          <Typewriter
            startAnimation={startAnimation}
            delay={50}
            variant="h3"
            align="center"
            sx={{
              minHeight: {
                xs: '17.5rem',
                sm: '14.063rem',
                md: '10.625rem',
                lg: '7.188rem'
              },
              pt: '2.5rem'
            }}>
            {props.header}
          </Typewriter>
          <Fade in={startAnimation} easing="linear" timeout={2500}>
            <Typography align="center" sx={{ pt: '2.5rem', pb: '2.5rem', whiteSpace: 'pre-wrap' }} variant="h5">
              {props.body ?? ''}
            </Typography>
          </Fade>
        </Grid>
        <Divider flexItem orientation="vertical" />
        <Grid container item justifyContent="center" sx={{ pt: '7.5rem', pb: '7.5rem' }} xs={4}>
          {props.children}
        </Grid>
      </Grid>
    </div>
  )
}

export default memo(TextCardLeft)
