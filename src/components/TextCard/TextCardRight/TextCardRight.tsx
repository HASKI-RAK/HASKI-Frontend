import { useRef, useEffect, useCallback, memo, ReactNode, useState } from 'react'
import { Box, Divider, Fade, Grid, Typography } from '@common/components'
import { Typewriter } from '@components'
import { useViewport } from '@services'

/**
 * @prop body - The body text that is displayed on the bottom right side.
 * @prop children - The child element that is displayed on the left side.
 * @prop header - The header text that is displayed on the top right side.
 * @interface
 */
type TextCardRight = {
  body?: string
  children?: ReactNode
  header?: string
  backgroundImageURL?: string
}

/**
 * TextCardRight component.
 *
 * @param props - Props containing the body and header texts and a child element.
 *
 * @remarks
 * TextCardRight represents a component that displays a header and a body text on the right side and a child element on the left side.
 * The header text is animated by using a typewriter effect. The body text is animated by using a fade in effect.
 * TextCardRight can be used as a standalone component on a page.
 *
 * @category Components
 */
const TextCardRight = (props: TextCardRight) => {
  // State
  const [startAnimation, setStartAnimation] = useState(false)

  // Hook
  const { isInViewport } = useViewport()

  //Ref
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
    <div ref={ref} data-testid="textCardRight">
      <Grid
        container
        justifyContent="center"
        sx={{
          mt: '7.5rem',
          mb: '7.5rem'
        }}>
        <Grid container item justifyContent="center" sx={{ pt: '7.5rem', pb: '7.5rem' }} xs={4}>
          {props.children}
        </Grid>
        <Divider flexItem orientation="vertical" />
        <Grid item xs={7} textAlign="center">
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
            <Typography align="center" sx={{ pt: '2.5rem', pb: '2.5rem' }} variant="h5">
              {props.body ?? ''}
            </Typography>
          </Fade>
          {props.backgroundImageURL && (
            <Box
              sx={{
                marginLeft: '-7.5rem',
                marginTop: '-16.5rem',
                zIndex: '-100',
                opacity: '0.15',
                position: 'absolute',
                width: '15rem'
              }}
              src={props.backgroundImageURL}
              component="img"
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default memo(TextCardRight)
