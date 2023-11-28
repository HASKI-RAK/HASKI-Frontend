import { useRef, useEffect, useCallback, memo, ReactNode } from 'react'
import MediaQuery from 'react-responsive'
import { Divider, Fade, Grid, Typography } from '@common/components'
import {
  ProjectDescriptionCardHookReturn,
  useProjectDescriptionCard as _useProjectDescriptionCard,
  useProjectDescriptionCardHookParams
} from './ProjectDescriptionCard.hooks'

/**
 * @prop body - The body text that is displayed on the bottom left side.
 * @prop children - The child element that is displayed on the right side.
 * @prop header - The header text that is displayed on the top left side.
 * @prop isLeft - The child element and separator gets displayed on left side instead of right
 * @prop useProjectDescriptionCard - The hook that is used for the card logic.
 * @interface
 */
type ProjectDescriptionCardProps = {
  body?: string
  children?: ReactNode
  header?: string
  isLeft?: boolean
  useProjectDescriptionCard?: (params?: useProjectDescriptionCardHookParams) => ProjectDescriptionCardHookReturn
}

/**
 * ProjectDescriptionCard component.
 *
 * @param props - Props containing the body and header texts and a child element.
 *
 * @remarks
 * ProjectDescriptionCard presents a component that displays a header and a body text on the left side and a child element on the right side (or vice versa if isLeft is true).
 * The header text is animated by using a typewriter effect. The body text is animated by using a fade in effect.
 * ProjectDescriptionCard can be used as a standalone component on a page.
 * When screen size gets too small (less than 700px) the divider will get removed and the child element moved onTop of the body.
 *
 * @category Components
 */
const ProjectDescriptionCard = ({
  useProjectDescriptionCard = _useProjectDescriptionCard,
  ...props
}: ProjectDescriptionCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { bodyState, headerState, animateBody, animateHeader } = useProjectDescriptionCard()

  const handleScroll = useCallback(() => {
    if (props.body !== null && typeof props.body === 'string') {
      animateBody(ref, props.body)
    }

    if (props.header !== null && typeof props.header === 'string') {
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
    <div ref={ref} data-testid="projectDescriptionCard">
      <Grid
        container
        justifyContent="center"
        sx={{
          mt: '1.5rem',
          mb: '5.5rem'
        }}>
        <MediaQuery minWidth={700}>
          {props.isLeft && (
            <Grid container item justifyContent="center" sx={{ pt: '7.5rem', pb: '7.5rem' }} xs={4}>
              {props.children}
            </Grid>
          )}
          {props.isLeft && <Divider flexItem orientation="vertical" />}
        </MediaQuery>
        <Grid item xs={7}>
          <Typography
            variant="h3"
            align="center"
            sx={{ minHeight: { xs: '11.5rem', sm: '14.063rem', md: '10.625rem', lg: '7.188rem' }, pt: '2.5rem' }}>
            {headerState}
          </Typography>
          <MediaQuery maxWidth={700}>
            <div
              style={{
                alignSelf: 'center',
                alignContent: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              {props.children}
            </div>
          </MediaQuery>
          <Fade in={!!bodyState} easing="linear" timeout={1000}>
            <Typography align="center" sx={{ pt: '2.5rem', pb: '2.5rem' }} variant="h5">
              {bodyState}
            </Typography>
          </Fade>
        </Grid>
        <MediaQuery minWidth={700}>
          {!props.isLeft && <Divider flexItem orientation="vertical" />}
          {!props.isLeft && (
            <Grid container item justifyContent="center" sx={{ pt: '7.5rem', pb: '7.5rem' }} xs={4}>
              {props.children}
            </Grid>
          )}
        </MediaQuery>
      </Grid>
    </div>
  )
}

export default memo(ProjectDescriptionCard)
