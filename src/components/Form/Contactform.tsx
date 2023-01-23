import { DefaultButton as Button, DefaultSelect as Select, DefaultTextField as TextField, DefaultRadio as RadioButton } from "@common/components";
import { InputLabel, FormControl, MenuItem, Stack, RadioGroup, FormLabel, FormControlLabel } from "@mui/material";
import { UserState, useUserStore } from "@services/UserStore";
import { useTranslation } from "react-i18next";


export const Text=(id: string)=>{
  const {t}=useTranslation();
  return(
    <div>{t(id)}</div>
  )
};

export const Contactform = ({
  userState = {
    user: useUserStore((state) => state.user),
    increaseUserId: useUserStore((state) => state.increaseUserId),
  },
}: ContactformProps) => (
  <>

    <Stack spacing={2} boxShadow={10} sx={{ minWidth: 120, backgroundColor: "white" }}  >
      
      <h5>Please fill out the form. Your request will be sent anonymously with just your userid which is: </h5>
      {Text("contactform")}
      {userState.user?.id}
      <Stack direction="row" spacing={2}>
        <FormControl sx={{ width: "50%" }}>
          <InputLabel id="select_label_contact">{Text("topic")}</InputLabel>
          <Select labelId="select_label_contact" label="Topic">
            <MenuItem value={1}>{Text("learningelement")}</MenuItem>
            <MenuItem value={2}>{Text("ui")}</MenuItem>
            <MenuItem value={3}>{Text("design")}</MenuItem>
            <MenuItem value={4}>{Text("other")}</MenuItem>
            <MenuItem value={5}>{Text("other")}</MenuItem>

          </Select>
        </FormControl>
        <FormControl>
          <FormLabel id="radio_contact_label">{Text("reportType")}</FormLabel>
          <RadioGroup row defaultValue={"other"}>
            <FormControlLabel value="issue" control={<RadioButton />} label={Text("issue")} />
            <FormControlLabel value="bug" control={<RadioButton />} label={Text("bug")} />
            <FormControlLabel value="feature" control={<RadioButton />} label={Text("feature")} />
            <FormControlLabel value="other" control={<RadioButton />} label={Text("other")} />
          </RadioGroup>
        </FormControl>
      </Stack>
      <FormControl fullWidth>
        <TextField required label={Text("briefDescription")} multiline rows={5} maxRows={15}>

        </TextField>
      </FormControl>
      <FormControl fullWidth>
        <Button
          variant="outlined"
          sx={{alignSelf: "end", width: 250}}
          href="/"
        //onClick={userState.increaseUserId}
        >
          {Text("submit")}
        </Button>
      </FormControl>
    </Stack>


  </>
);
interface ContactformProps {
  userState?: UserState;
}

export default Contactform;