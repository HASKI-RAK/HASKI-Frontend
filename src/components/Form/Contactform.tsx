import {
  DefaultButton as Button,
  DefaultSelect as Select,
  DefaultTextField as TextField,
  DefaultRadio as RadioButton,
} from "@common/components";
import {
  InputLabel,
  FormControl,
  MenuItem,
  Stack,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Typography,
  makeStyles,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";


/**
 * Contactform component.
 *
 * @remarks
 * This component is accessed by the contact page. It currently can be accessed from the home page.
 * In the future it will get the id of the contact form user.
 * The contact form enables the user to give a reporttopic and a reporttype to the report, which helps to identify the contents of the report early.
 * The user can also give a description of the report, this is also the only required field.
 * The contents of the form will have to be sent to the backend, which is not implemented yet.
 *
 * @category Pages
 */

const defaultContactValues = {
  name: "",
  reporttype: "other",
  reporttopic: "other",
  description: "",
};


//groesse anpassen lassen
//passing props to mui styles
type ContactformParameter =  {
  width: string;
  sendtoBackend: () => void;
};

export const Contactform = ( {width, sendtoBackend}: ContactformParameter) => {
  const [contactValues, setContactValues] = useState(defaultContactValues);
  const [textfieldError, setTextfieldError] = useState(false);
  const { t } = useTranslation();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setContactValues({
      ...contactValues,
      [name]: value,
    });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (contactValues.description == "") {
      setTextfieldError(true);
      
    } else {
      
      setTextfieldError(false);
     console.log(contactValues);
     sendtoBackend();
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={2}
      
        sx={{ minWidth: 120, backgroundColor: "white" }}
      >
        <Typography variant="h5" component="h5">
          {t("components.contactform.contactform")}
        </Typography>

        <Stack spacing={2}>
          <FormControl sx={ {width} }>
            <InputLabel id="select_label_contact">{ t("components.contactform.topic")}</InputLabel>
            <Select
              name="reporttopic"
              labelId="select_label_contact"
              label="topic"
              value={contactValues.reporttopic}
              onChange={handleInputChange}
            >
              <MenuItem value={"le"} >{ t("components.contactform.learningelement")}</MenuItem>
              <MenuItem value={"ui"}>{ t("components.contactform.ui")}</MenuItem>
              <MenuItem value={"design"}>{ t("components.contactform.design")}</MenuItem>
              <MenuItem value={"other"}>{ t("components.contactform.other")}</MenuItem>
              <MenuItem value={5}>{ t("components.contactform.other")}</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel id="radio_contact_label">{ t("components.contactform.reportType")}</FormLabel>
            <RadioGroup
              row
              name="reporttype"
              value={contactValues.reporttype}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="issue"
                control={<RadioButton />}
                label={ t("components.contactform.issue")}
                
              />
              <FormControlLabel
                value="bug"
                control={<RadioButton />}
                label={ t("components.contactform.bug")}
              />
              <FormControlLabel
                value="feedback"
                control={<RadioButton />}
                label={ t("components.contactform.feedback")}
              />
              <FormControlLabel
                value="feature"
                control={<RadioButton />}
                label={ t("components.contactform.feature")}
              />
              <FormControlLabel
                value="other"
                control={<RadioButton />}
                label={ t("components.contactform.other")}
              />
            </RadioGroup>
          </FormControl>
        </Stack>

        <FormControl fullWidth >
          <TextField
            id="desc_input"
            data-testid="desc_input"
            name="description"
            type="text"
            required
            label={ t("components.contactform.briefDescription")}
            rows={5}
            maxRows={15}
            value={contactValues.description}
            onChange={handleInputChange}
            error={textfieldError}
            helperText={textfieldError ?  t("components.contactform.error") : ""}
            multiline
          />
        </FormControl>

        <FormControl fullWidth>
          <Button
            variant="outlined"
            sx={{ alignSelf: "end", width: 250 }}
            //href="/"
            onClick={handleSubmit}
          >
            { t("components.contactform.submit")}
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
};

export default Contactform;
