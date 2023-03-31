import { SnackbarEntry } from "@components";
import { Snackbar, Stack } from "@mui/material"; // TODO
import { useSnackbarContext, useNetworkStatus } from "@services";

/*type SnackbarContainerProps = {
  snackbars;
};*/

const SnackbarContainer: React.FC = () => {
  const { snackbarsErrorWarning, snackbarsSuccessInfo } = useSnackbarContext();
  const networkStatus = useNetworkStatus();

  return (
    <>
      <Snackbar
        open={!!snackbarsErrorWarning[0]}
        autoHideDuration={null}
        transitionDuration={0}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack flexDirection="column" gap={1}>
          {snackbarsErrorWarning.map((snackbar) => (
            <SnackbarEntry key={snackbar.message} snackbar={snackbar} />
          ))}
        </Stack>
      </Snackbar>
      <Snackbar
        open={!!snackbarsSuccessInfo[0]}
        autoHideDuration={null}
        transitionDuration={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack flexDirection="column" gap={1}>
          {snackbarsSuccessInfo.map((snackbar) => (
            <SnackbarEntry key={snackbar.message} snackbar={snackbar} />
          ))}
        </Stack>
      </Snackbar>
    </>
  );
};

export default SnackbarContainer;
