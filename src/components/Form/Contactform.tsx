import { DefaultButton as Button, DefaultSelect as Select, DefaultTextField as TextField, DefaultRadio as RadioButton } from "@common/components";
import { InputLabel, FormControl, MenuItem, Stack, RadioGroup, FormLabel, FormControlLabel, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";


const defaultContactValues = {
  name:"",
  reporttype: "other",
  reporttopic: "other",
  description: "",
};
export const sendForm = () => {
  return (<div>
    <h5>Form was submitted</h5>

  </div>)
};

export const Text = (id: string) => {
  const { t } = useTranslation();
  return (
    <div>{t(id)}</div>
  )
};

const Contactform = () => {
  
  const [contactValues, setContactValues] = useState(defaultContactValues);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setContactValues({
      ...contactValues,
      [name]: value,
    });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(contactValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} boxShadow={10} sx={{ minWidth: 120, backgroundColor: "white" }}  >
        <Typography variant="h5" component="h5">
          {Text("contactform")}
        </Typography>

        <Stack spacing={2}>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="select_label_contact">{Text("topic")}</InputLabel>
            <Select name="reporttopic" labelId="select_label_contact" label="Topic" value={contactValues.reporttopic} onChange={handleInputChange}>
              <MenuItem value={"le"}>{Text("learningelement")}</MenuItem>
              <MenuItem value={"ui"}>{Text("ui")}</MenuItem>
              <MenuItem value={"design"}>{Text("design")}</MenuItem>
              <MenuItem value={"other"}>{Text("other")}</MenuItem>
              <MenuItem value={5}>{Text("other")}</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel id="radio_contact_label">{Text("reportType")}</FormLabel>
            <RadioGroup row name="reporttype" value={contactValues.reporttype} onChange={handleInputChange}>
              <FormControlLabel value="issue" control={<RadioButton />} label={Text("issue")} />
              <FormControlLabel value="bug" control={<RadioButton />} label={Text("bug")} />
              <FormControlLabel value="feedback" control={<RadioButton />} label={Text("feedback")} />
              <FormControlLabel value="feature" control={<RadioButton />} label={Text("feature")} />
              <FormControlLabel value="other" control={<RadioButton />} label={Text("other")} />
            </RadioGroup>
          </FormControl>
        </Stack>

        <FormControl fullWidth>
          <TextField id="desc_input" name="description" type="text" required label={Text("briefDescription")} multiline rows={5} maxRows={15} value={contactValues.description} onChange={handleInputChange} />
        </FormControl>

        <FormControl fullWidth>
          <Button
            variant="outlined"
            sx={{ alignSelf: "end", width: 250 }}
            //href="/"
            onClick={handleSubmit}
        >
          {Text("submit")}
        </Button>
      </FormControl>
    </Stack>
   </form>
  )
};


export default Contactform;