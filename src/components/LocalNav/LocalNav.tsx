import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

/**
 * Local navigation component for the main frame.
 * @remarks
 * It contains the topics menu as a way to navigate through the application.
 *
 * @category Components
 */
const LocalNav = () => {
  return (
    <Box flexGrow={1}>
      <Typography variant="h5">Themenbereiche</Typography>
      <Divider />
      {/** TODO 📑 add real topics */}
      <Typography variant="h6">1. Übersicht</Typography>
      <Typography variant="h6">2. Entwurfsmuster</Typography>
    </Box>
  );
};

export default LocalNav;
