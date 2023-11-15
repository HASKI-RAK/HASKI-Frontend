import { useRef, useEffect, useCallback, memo, ReactNode } from 'react'
import { Divider, Fade, Grid, Typography } from '@common/components'
import {
  useProjectDescriptionCard as _useProjectDescriptionCard,
  useProjectDescriptionCardHookParams,
  ProjectDescriptionCardHookReturn
} from './ProjectDescriptionCard.hooks'
import { Typewriter } from '@services'

/**
 * @prop body - The body text that is displayed on the bottom left side.
 * @prop children - The child element that is displayed on the right side.
 * @prop header - The header text that is displayed on the top left side.
 * @prop useProjectDescriptionCard - The hook that is used for the card logic.
 * @interface
 */
type ProjectDescriptionCardProps = {
  body?: string
  children?: ReactNode
  header?: string
  useProjectDescriptionCard?: (params?: useProjectDescriptionCardHookParams) => ProjectDescriptionCardHookReturn
}

/**
 * ProjectDescriptionCard component.
 *
 * @param props - Props containing the body and header texts and a child element.
 *
 * @remarks
 * ProjectDescriptionCard presents a component that displays a header and a body text on the left side and a child element on the right side.
 * The header text is animated by using a typewriter effect. The body text is animated by using a fade in effect.
 * ProjectDescriptionCard can be used as a standalone component on a page.
 *
 * @category Components
 */
const ProjectDescriptionCard = ({
  useProjectDescriptionCard = _useProjectDescriptionCard,
  ...props
}: ProjectDescriptionCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  
  /*
  const { bodyState, headerState, animateBody, animateHeader } = useProjectDescriptionCard()

  const handleScroll = useCallback(() => {
    if (props.body !== null && typeof props.body === 'string') {
      animateBody(ref, props.body)
    }

    if (props.header !== null && typeof props.header === 'string') {
      animateHeader(ref, props.header)
    }
  }, [animateBody, animateHeader, props.body, props.header])
  */

  const { bodyState, animateBody } = useProjectDescriptionCard(); // Remove headerState and animateHeader

  const handleScroll = useCallback(() => {
    if (props.body !== null && typeof props.body === 'string') {
      animateBody(ref, props.body);
    }
  }, [animateBody, props.body]);


  // Starts animation on component mount and continues already started animation.
  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ bodyState, handleScroll])

  return (
    <div ref={ref} data-testid="projectDescriptionCard">
      <Grid
        container
        justifyContent="center"
        sx={{
          mt: '7.5rem',
          mb: '7.5rem',
        }}
      >
        <Grid item xs={7}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              minHeight: {
                xs: '17.5rem',
                sm: '14.063rem',
                md: '10.625rem',
                lg: '7.188rem',
              },
              pt: '2.5rem',
            }}
          >
            <Typewriter text={props.header!} delay={100} />
          </Typography>
          <Fade in={!!bodyState} easing="linear" timeout={1000}>
            <Typography
              align="center"
              sx={{ pt: '2.5rem', pb: '2.5rem' }}
              variant="h5"
            >
              {bodyState}
            </Typography>
          </Fade>
        </Grid>
        <Divider flexItem orientation="vertical" />
        <Grid
          container
          item
          justifyContent="center"
          sx={{ pt: '7.5rem', pb: '7.5rem' }}
          xs={4}
        >
          {props.children}
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(ProjectDescriptionCard)
