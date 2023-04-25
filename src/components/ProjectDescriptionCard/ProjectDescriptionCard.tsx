import { useRef, useEffect, useState } from "react";
import {
  DefaultDivider as Divider,
  DefaultFade as Fade,
  DefaultGrid as Grid,
  DefaultTypography as Typography,
} from "@common/components";

/**
 * @typedef {Object} ProjectDescriptionCardProps
 * @param {string} body - The body text that is displayed on the bottom left side.
 * @param {React.ReactNode} children - The child element that is displayed on the right side.
 * @param {string} header - The header text that is displayed on the top left side.
 */
type ProjectDescriptionCardProps = {
  body?: string;
  children?: React.ReactNode;
  header?: string;
};
/**
 * ProjectDescriptionCard presents a component that displays a header and a body text on the left side and a child element on the right side.
 * The header text is animated by using a typewriter effect. The body text is animated by using a fade in effect.
 * ProjectDescriptionCard can be used as a standalone component on a page.
 * @param props - Props containing the body and header texts and a child element.
 * @returns {JSX.Element} - The ProjectDescriptionCard component.
 * @category Components
 */
const ProjectDescriptionCard = (props: ProjectDescriptionCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [headerState, setHeaderState] = useState("");
  const [bodyState, setBodyState] = useState("");

  // Checks if top of component is in the viewport and animates header and body texts if states are not equal to props.
  const animate = () => {
    const topPosition = ref.current?.getBoundingClientRect().top;
    const viewportBottom = window.innerHeight;

    if (topPosition && topPosition < viewportBottom) {
      if (props.header !== headerState) {
        animateHeader();
      }
      if (props.body !== bodyState) {
        animateBody();
      }
    }
  };

  // Animates header text by writing one character at a time into the headerState with a short timeout.
  const animateHeader = () => {
    const headerTimeout = setTimeout(() => {
      props.header &&
        setHeaderState(props.header.slice(0, headerState.length + 1));
    }, 50);
    return () => clearTimeout(headerTimeout);
  };

  // Animates body text by setting the bodyState after a short timeout.
  const animateBody = () => {
    const bodyTimeout =
      props.header?.length &&
      setTimeout(() => {
        setBodyState(props.body!);
      }, props.header?.length * 50);
    return () => clearTimeout(bodyTimeout);
  };

  const handleScroll = () => {
    animate();
  };

  useEffect(() => {
    // Starts animation on component mount and continues already started animation.
    animate();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerState, bodyState]);

  return (
    <div ref={ref} data-testid="projectDescriptionCard">
      <Grid
        container
        justifyContent="center"
        sx={{
          mt: "7.5rem",
          mb: "7.5rem",
        }}
      >
        <Grid item xs={7}>
          <Typography variant="h3" align="center" sx={{ pt: "2.5rem" }}>
            {headerState}
          </Typography>
          <Fade in={!!bodyState} easing="linear" timeout={1000}>
            <Typography
              align="center"
              sx={{ pt: "2.5rem", pb: "2.5rem" }}
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
          sx={{ pt: "7.5rem", pb: "7.5rem" }}
          xs={4}
        >
          {props.children}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectDescriptionCard;
