import { DefaultButton as Button, DefaultSelect as Select, DefaultTextField as TextField, DefaultRadio as RadioButton } from "@common/components";
import { InputLabel, FormControl, MenuItem, Stack, RadioGroup, FormLabel, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import { UserState, useUserStore } from "@services/UserStore";


export const Contactform = ({
  userState = {
    user: useUserStore((state) => state.user),
    increaseUserId: useUserStore((state) => state.increaseUserId),
  },
}: ContactformProps) => (
  <>

    <Stack spacing={2} boxShadow={10} sx={{ minWidth: 120, backgroundColor: "grey" }}  >
      <h1>Contact Page</h1>
      <h5>Please fill out the form. Your request will be sent anonymously with just your userid which is: </h5>

      {userState.user?.id}
      <Stack direction="row" spacing={2}>
        <FormControl sx={{ width: "50%" }}>
          <InputLabel id="select_label_contact">Topic</InputLabel>
          <Select labelId="select_label_contact" label="Topic">
            <MenuItem value={1}>Lernelement</MenuItem>
            <MenuItem value={2}>UI</MenuItem>
            <MenuItem value={3}>Design</MenuItem>
            <MenuItem value={4}>Funktionalität</MenuItem>
            <MenuItem value={5}>Sonstiges</MenuItem>

          </Select>
        </FormControl>
        <FormControl>
          <FormLabel id="radio_contact_label">Report Type</FormLabel>
          <RadioGroup row>
            <FormControlLabel value="issue" control={<RadioButton />} label="Issue" />
            <FormControlLabel value="bug" control={<RadioButton />} label="Bug" />
            <FormControlLabel value="feature" control={<RadioButton />} label="Feature" />
            <FormControlLabel value="other" control={<RadioButton />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Stack>
      <FormControl fullWidth>
        <TextField required label="Give a brief description of your issue" multiline rows={5} maxRows={15}>

        </TextField>
      </FormControl>
      <FormControl fullWidth>
        <Button
          variant="outlined"
          sx={{alignSelf: "end", width: 250}}
          //color="primary"
          href="/"
        //onClick={userState.increaseUserId}
        >
          Submit
        </Button>
      </FormControl>
    </Stack>


  </>
);
interface ContactformProps {
  userState?: UserState;
}

export default Contactform;