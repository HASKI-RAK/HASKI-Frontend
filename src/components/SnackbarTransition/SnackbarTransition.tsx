import { SeverityType } from "@components";
import { DefaultSlide as Slide, DefaultGrow as Grow } from "@common/components";

type SnackbarTransitionProps = {
  children?: React.ReactElement;
  in?: boolean;
  severity?: SeverityType;
  timeout?: number;
};

const SnackbarTransition = (props: SnackbarTransitionProps) => {
  if (props.children === undefined) {
    return <div data-testid="snackbarTransition" />;
  }

  switch (props.severity) {
    case "error":
    case "warning":
      return (
        <Slide in={props.in} data-testid="snackbarTransition">
          {props.children}
        </Slide>
      );
    case "success":
    case "info":
    default:
      return (
        <Grow in={props.in} data-testid="snackbarTransition">
          {props.children}
        </Grow>
      );
  }
};

export default SnackbarTransition;
