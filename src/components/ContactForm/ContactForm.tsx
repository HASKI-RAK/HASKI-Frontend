import React, { ReactNode, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@common/components'
import { FormDataType } from '@services'
import { ContactFormHookReturn, default as _useContactForm, useContactFormHookParams } from './ContactForm.hooks'

/**
 * @prop descriptionDefaultValue - The default value of the description textfield.
 * @prop onSubmit - The function that will be called when the form is submitted. Default is the submit function from the hook.
 * @prop isLoading - The loading state of the form. Default is false.
 * @prop useContactForm - The hook that contains the form logic and the form state. Dependency injection for testing purposes and extensibility.
 * @interface
 */
export type ContactFormProps = {
  descriptionDefaultValue?: string // TODO: Remove this prop and use the hook instead
  onSubmit?: (content: FormDataType) => void
  isLoading?: boolean
  useContactForm?: (params?: useContactFormHookParams) => ContactFormHookReturn
}
/**
 * ContactForm component.
 *
 * @param props - Props containing the form logic and the form state.
 *
 * @remarks
 * This component is accessed by the contact page. It currently can be accessed from the home page.
 * In the future it will get the id of the contact form user.
 * The contact form enables the user to give a reporttopic and a reporttype to the report, which helps to identify the contents of the report early.
 * The user can also give a description of the report, this is also the only required field.
 * The contents of the form will have to be sent to the backend, which is not implemented yet.
 *
 * @category Components
 */
const ContactForm = ({ useContactForm = _useContactForm, ...props }: ContactFormProps) => {
  const [textfieldError, setTextfieldError] = useState(false)
  const [selectError, setSelectError] = useState(false)
  const { t } = useTranslation()

  // ** Get Functions from Hook ** //
  const { submit, setReportType, setReportTopic, setDescription, description, reportTopic, reportType } =
    useContactForm()

  // ** Override Functions if passed as props ** //
  const { onSubmit = submit, isLoading = false } = props

  const reportTypeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setReportType(event.target.value)
  }

  const reportTopicChangeHandler = (event: SelectChangeEvent<unknown>): void => {
    const { value } = event.target
    if (typeof value === 'string') {
      setReportTopic(value)
    }
  }
  
  const descriptionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setSelectError(!reportTopic)
    setTextfieldError(!description)
    if (reportTopic && description)
      onSubmit({
        report_topic: reportTopic,
        report_type: reportType,
        report_description: description
      })
  }

  const reportTypes = useMemo(() => {
    return t('components.ContactForm.types', {
      returnObjects: true
    }) as [{ value: string; label: string }]
  }, [t])

  const reportTopics = useMemo(() => {
    return t('components.ContactForm.topics', {
      returnObjects: true
    }) as [{ value: string; label: string }]
  }, [t])

  return (
    <Stack justifyContent="center" alignItems="center">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ minWidth: 120 }}>
          <Typography variant="h5" component="h5">
            {t('components.ContactForm.contactform')}
          </Typography>

          <FormControl required>
            <InputLabel id="select_label_contact">{t('components.ContactForm.topic')}</InputLabel>
            <Select
              id="contactform-select"
              name="reporttopic"
              labelId="select_label_contact"
              label={t('components.ContactForm.topic')}
              required
              onChange={reportTopicChangeHandler}
              value={reportTopic}
              error={selectError}>
              {reportTopics.map((topic) => (
                <MenuItem key={topic.value} value={topic.value}>
                  {topic.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{selectError && t('components.ContactForm.errorSelect')}</FormHelperText>
          </FormControl>

          <FormLabel id="radio_contact_label" sx={{ mt: '0.6rem' }}>
            {t('components.ContactForm.reportType')}
          </FormLabel>
          <RadioGroup
            row
            id="contactform-radiogroup"
            name="reporttype"
            value={reportType}
            onChange={reportTypeChangeHandler}>
            {reportTypes.map((report) => (
              <FormControlLabel key={report.value} value={report.value} control={<Radio />} label={report.label} />
            ))}
          </RadioGroup>
          <FormControl>
            <TextField
              id="contactform-textfield"
              data-testid="desc_input"
              name="description"
              type="text"
              required
              label={t('components.ContactForm.briefDescription')}
              rows={5}
              maxRows={15}
              value={description}
              onChange={descriptionChangeHandler}
              error={textfieldError}
              helperText={textfieldError ? t('components.ContactForm.error') : ''}
            />
            <Button
              id="contact-form-button"
              variant="contained"
              color="primary"
              sx={{ alignSelf: 'end', marginTop: '0.6rem' }}
              onClick={handleSubmit}>
              {t('components.ContactForm.submit')}
            </Button>
          </FormControl>
          <Backdrop open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Stack>
      </form>
    </Stack>
  )
}

export default ContactForm
