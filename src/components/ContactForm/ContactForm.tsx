import {
  DefaultButton as Button,
  DefaultSelect as Select,
  DefaultTextField as TextField,
  DefaultRadio as RadioButton,
  DefaultTypography as Typography,
  DefaultRadioGroup as RadioGroup,
  DefaultStack as Stack,
  DefaultMenuItem as MenuItem,
  DefaultInputLabel as InputLabel,
  DefaultFormControl as FormControl,
  DefaultFormLabel as FormLabel,
  DefaultFormControlLabel as FormControlLabel,
  DefaultSelectChangeEvent as SelectChangeEvent,
} from "@common/components";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import {
  useContactForm as _useContactForm,
  useContactFormHookParams,
  ContactFormHookReturn,
} from "./ContactForm.hooks";
/**
 * ContactForm component.
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

export type ContactFormProps = {
  defaultWidth?: string;
  onsendtoBackend?: () => void;
  useContactForm?: (params?: useContactFormHookParams) => ContactFormHookReturn;
};

export const ContactForm = ({
  useContactForm = _useContactForm, 
  ...props
}: ContactFormProps) => {
  const [contactValues, setContactValues] = useState(defaultContactValues);
  const [textfieldError, setTextfieldError] = useState(false);
  const { t } = useTranslation();

  // ** Get Functions from Hook ** //
  const { sendtoBackend, width } = useContactForm();
 

  // ** Override Functions if passed as props ** //
  const {defaultWidth=width, 
    onsendtoBackend=sendtoBackend} = props;

  
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | SelectChangeEvent<string>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactValues({
      ...contactValues,
      [name]: value,
    });
  };
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    if (!contactValues.description) {
      setTextfieldError(true);
    } else {
      setTextfieldError(false);
      console.log(contactValues);
      onsendtoBackend();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ minWidth: 120 }}>
        <Typography variant="h5" component="h5">
          {t("components.ContactForm.ContactForm.contactform")}
        </Typography>

        <Stack spacing={2}>
          <FormControl sx={{ defaultWidth }}>
            <InputLabel id="select_label_contact">
              {t("components.ContactForm.ContactForm.topic")}
            </InputLabel>
            <Select
              name="reporttopic"
              labelId="select_label_contact"
              label="topic"
              value={contactValues.reporttopic}
              onChange={handleInputChange}
            >
              <MenuItem value={"le"}>
                {t("components.ContactForm.ContactForm.learningelement")}
              </MenuItem>
              <MenuItem value={"ui"}>
                {t("components.ContactForm.ContactForm.ui")}
              </MenuItem>
              <MenuItem value={"design"}>
                {t("components.ContactForm.ContactForm.design")}
              </MenuItem>
              <MenuItem value={"other"}>
                {t("components.ContactForm.ContactForm.other")}
              </MenuItem>
              <MenuItem value={5}>
                {t("components.ContactForm.ContactForm.other")}
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel id="radio_contact_label">
              {t("components.ContactForm.ContactForm.reportType")}
            </FormLabel>
            <RadioGroup
              row
              name="reporttype"
              value={contactValues.reporttype}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="issue"
                control={<RadioButton />}
                label={t("components.ContactForm.ContactForm.issue")}
              />
              <FormControlLabel
                value="bug"
                control={<RadioButton />}
                label={t("components.ContactForm.ContactForm.bug")}
              />
              <FormControlLabel
                value="feedback"
                control={<RadioButton />}
                label={t("components.ContactForm.ContactForm.feedback")}
              />
              <FormControlLabel
                value="feature"
                control={<RadioButton />}
                label={t("components.ContactForm.ContactForm.feature")}
              />
              <FormControlLabel
                value="other"
                control={<RadioButton />}
                label={t("components.ContactForm.ContactForm.other")}
              />
            </RadioGroup>
          </FormControl>
        </Stack>

        <FormControl fullWidth>
          <TextField
            id="desc_input"
            data-testid="desc_input"
            name="description"
            type="text"
            required
            label={t("components.ContactForm.ContactForm.briefDescription")}
            rows={5}
            maxRows={15}
            value={contactValues.description}
            onChange={handleInputChange}
            error={textfieldError}
            helperText={
              textfieldError ? t("components.ContactForm.ContactForm.error") : ""
            }
          />
        </FormControl>

        <FormControl fullWidth>
          <Button
            variant="outlined"
            sx={{ alignSelf: "end", width: 250 }}
            //href="/"
            onClick={handleSubmit}
          >
            {t("components.ContactForm.ContactForm.submit")}
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
};

export default ContactForm;
