import { useRef, useEffect } from 'react'
import {
  DefaultDivider as Divider,
  DefaultFade as Fade,
  DefaultGrid as Grid,
  DefaultTypography as Typography
} from '@common/components'
import {
  useProjectDescriptionCard as _useProjectDescriptionCard,
  useProjectDescriptionCardHookParams,
  ProjectDescriptionCardHookReturn
} from './ProjectDescriptionCard.hooks'

/**
 * @typedef {Object} ProjectDescriptionCardProps
 * @property {string} body - The body text that is displayed on the bottom left side.
 * @property {React.ReactNode} children - The child element that is displayed on the right side.
 * @property {string} header - The header text that is displayed on the top left side.
 * @property {function} useProjectDescriptionCard - The hook that is used for the card logic.
 */
type ProjectDescriptionCardProps = {
  body?: string
  children?: React.ReactNode
  header?: string
  useProjectDescriptionCard?: (params?: useProjectDescriptionCardHookParams) => ProjectDescriptionCardHookReturn
}

/**
 * ProjectDescriptionCard presents a component that displays a header and a body text on the left side and a child element on the right side.
 * The header text is animated by using a typewriter effect. The body text is animated by using a fade in effect.
 * ProjectDescriptionCard can be used as a standalone component on a page.
 * @param props - Props containing the body and header texts and a child element.
 * @returns {JSX.Element} - The ProjectDescriptionCard component.
 * @category Components
 */
const ProjectDescriptionCard = ({
  useProjectDescriptionCard = _useProjectDescriptionCard,
  ...props
}: ProjectDescriptionCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { bodyState, headerState, animateBody, animateHeader } = useProjectDescriptionCard()

  const handleScroll = () => {
    if (props.body !== null && typeof props.body === 'string') {
      animateBody(ref, props.body)
    }
    
    if (props.header !== null && typeof props.header === 'string') {
      animateHeader(ref, props.header)
    }
  }

  // Starts animation on component mount and continues already started animation.
  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headerState, bodyState])

  return (
    <div ref={ref} data-testid="projectDescriptionCard">
      <Grid
        container
        justifyContent="center"
        sx={{
          mt: '7.5rem',
          mb: '7.5rem'
        }}>
        <Grid item xs={7}>
          <Typography
            variant="h3"
            align="center"
            sx={{ minHeight: { xs: '17.5rem', sm: '14.063rem', md: '10.625rem', lg: '7.188rem' }, pt: '2.5rem' }}>
            {headerState}
          </Typography>
          <Fade in={!!bodyState} easing="linear" timeout={1000}>
            <Typography align="center" sx={{ pt: '2.5rem', pb: '2.5rem' }} variant="h5">
              {bodyState}
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

export default ProjectDescriptionCard
