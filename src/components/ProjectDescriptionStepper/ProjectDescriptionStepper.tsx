import React, { useRef, useState, useEffect } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  DefaultButton as Button,
  DefaultFade as Fade,
  DefaultGrid as Grid,
  DefaultMobileStepper as MobileStepper,
  DefaultTypography as Typography,
} from "@common/components";

/**
 * @typedef {Object} ProjectDescriptionStepperProps
 * @param {string[]} body - The body texts that can be stepped through.
 * @param {string} header - The header text that is permanently displayed above the body texts.
 */
type ProjectDescriptionStepperProps = {
  body?: string[];
  header?: string;
};

/**
 * TODO: Comment
 * @param props -
 * @returns {JSX.Element} - The ProjectDescriptionStepper component.
 * @category Components
 */
const ProjectDescriptionStepper = (props: ProjectDescriptionStepperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [headerState, setHeaderState] = useState("");
  const [bodyState, setBodyState] = useState<string[]>([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const animate = () => {
    const topPosition = ref.current?.getBoundingClientRect().top;
    const scrollPosition = window.innerHeight;

    if (topPosition && topPosition < scrollPosition) {
      if (props.header !== headerState) {
        animateHeader();
      }
      if (props.body !== bodyState) {
        animateBody();
      }
    }
  };

  const animateHeader = () => {
    const headerTimeout = setTimeout(() => {
      props.header &&
        setHeaderState(props.header.slice(0, headerState.length + 1));
    }, 50);
    return () => clearTimeout(headerTimeout);
  };

  const animateBody = () => {
    const bodyTimeout =
      props.header?.length &&
      setTimeout(() => {
        setBodyState(props.body!);
      }, props.header?.length * 75);
    return () => clearTimeout(bodyTimeout);
  };

  useEffect(() => {
    // Damit au beim Start läuft he
    animate();

    const handleScroll = () => {
      animate();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerState, bodyState]);

  return (
    <div ref={ref}>
      <Grid
        container
        justifyContent="center"
        sx={{
          mt: "7.5rem",
          mb: "7.5rem",
        }}
      >
        <Grid container item justifyContent="center" xs={12}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              width: { sx: 300, md: 600 },
              height: { sx: 200, md: 100 },
            }}
          >
            {headerState}
          </Typography>
          <Fade in={!!bodyState[activeStep]} easing="linear" timeout={1000}>
            <Typography
              variant="h5"
              align="center"
              sx={{
                pt: "2.5rem",
                width: { sx: 300, md: 600 },
                height: { sx: 400, md: 200 },
              }}
            >
              {bodyState[activeStep]}
            </Typography>
          </Fade>
        </Grid>
        <Grid
          alignContent="center"
          container
          item
          justifyContent="center"
          xs={12}
        >
          <MobileStepper
            variant="dots"
            steps={props.body?.length || 0}
            position="static"
            activeStep={activeStep}
            sx={{
              maxWidth: 400,
              flexGrow: 1,
              border: 0,
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === (props.body && props.body.length - 1)}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectDescriptionStepper;
