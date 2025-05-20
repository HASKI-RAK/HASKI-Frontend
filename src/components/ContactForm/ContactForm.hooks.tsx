import { FormDataType, SnackbarContext } from '@services'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * @property - The default report type of the form.
 * @property - The default report topic of the form.
 * @property - The default description of the form.
 * @category Hooks
 */
export type useContactFormHookParams = {
  defaultReportType?: string
  defaultReportTopic?: string
  defaultDescription?: string
}
/**
 * @prop reportType - The report type of the form.
 * @prop reportTopic - The report topic of the form.
 * @prop description - The description of the form.
 * @prop setReportType - Function to set the report type.
 * @prop setReportTopic - Function to set the report topic.
 * @prop setDescription - Function to set the description.
 * @prop submit - Function to submit the form.
 * @category Hooks
 */

export type ContactFormHookReturn = {
  readonly reportType: string
  readonly reportTopic: string
  readonly description: string
  readonly setReportType: (reportType: string) => void
  readonly setReportTopic: (reportTopic: string) => void
  readonly setDescription: (description: string) => void
  readonly submit: (content: FormDataType) => void
}
/**
 * Hook for the ContactForm logic. Handles reporttype, reporttopic and description state which sets the input for the textfields and
 * provides function to submit the form.
 * @param params - Default values for the form. They are optional and have a default value in case they are not provided.
 * @returns - Logic like state and submit function.
 * @category Hooks
 */
const useContactForm = (params?: useContactFormHookParams): ContactFormHookReturn => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  // ** State **//
  const {
    defaultReportType = '', //TODO: TEST reportTypes.at(-1)?.value ??
    defaultReportTopic = '',
    defaultDescription = ''
  } = params ?? {}
  const [reportType, setReportType] = useState(defaultReportType)
  const [reportTopic, setReportTopic] = useState(defaultReportTopic)
  const [description, setDescription] = useState(defaultDescription)

  // ** Logic **//
  const submit = (content: FormDataType) => {
    addSnackbar({
      message: t('components.ContactForm.submitError') + ': ' + content.report_description,
      severity: 'error'
    })
  }

  return {
    reportType,
    reportTopic,
    description,
    setReportType,
    setReportTopic,
    setDescription,
    submit
  } as const
}
/**
 * @module hooks
 */
export default useContactForm
