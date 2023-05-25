import { useState } from 'react'
import { FormDataType } from '@services'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

export type useContactFormHookParams = {
  defaultReportType?: string
  defaultReportTopic?: string
  defaultDescription?: string
}

export type ContactFormHookReturn = {
  readonly reportType: string
  readonly reportTopic: string
  readonly description: string
  readonly setReportType: (reportType: string) => void
  readonly setReportTopic: (reportTopic: string) => void
  readonly setDescription: (description: string) => void
  readonly submit: () => void
}
/**
 * Hook for the ContactForm logic. Handles reporttype, reporttopic and description state which sets the input for the textfields and
 * provides function to submit the form.
 * @param params - The default values for the form.
 * @returns {ContactFormHookReturn} - The form logic.
 * @function submit - Function for submitting the form. It writes the values of the form into the responseBody.
 * The responseBody is the object that will be sent to the backend.
 */
export const useContactForm = (params?: useContactFormHookParams): ContactFormHookReturn => {
  const { t } = useTranslation()

  // ** State **//
  const reportTypes = t('components.ContactForm.types', {
    returnObjects: true
  }) as [{ value: string; label: string }]
  const { defaultReportType = reportTypes.at(-1)?.value ?? '', defaultReportTopic = '', defaultDescription = '' } = params || {}
  const [reportType, setReportType] = useState(defaultReportType)
  const [reportTopic, setReportTopic] = useState(defaultReportTopic)
  const [description, setDescription] = useState(defaultDescription)

  const responseBody: FormDataType = { reportType: '', reportTopic: '', description: '' }

  // ** Logic **//
  const submit = () => {
    responseBody.reportType = reportType
    responseBody.reportTopic = reportTopic
    responseBody.description = description
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
