import { useState } from 'react'
import { FormDataType } from '@services'

export type useContactFormHookParams = {
  defaultReportType?: string
  defaultReportTopic?: string
  defaultDescription?: string
}

export type ContactFormHookReturn = {
  readonly reportType: string
  readonly reportTopic: string
  readonly description: string
  readonly responseBody: FormDataType
  readonly setReportType: (reportType: string) => void
  readonly setReportTopic: (reportTopic: string) => void
  readonly setDescription: (description: string) => void
  readonly submit: (content: FormDataType) => void
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
  const { defaultReportType = '', defaultReportTopic = '', defaultDescription = '' } = params || {}
  const [reportType, setReportType] = useState(defaultReportType)
  const [reportTopic, setReportTopic] = useState(defaultReportTopic)
  const [description, setDescription] = useState(defaultDescription)

  const responseBody: FormDataType = { reportType: reportType, reportTopic: reportTopic, description: description }

  // ** Logic **//
  const submit = (content: FormDataType) => {
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
    submit,
    responseBody
  } as const
}
