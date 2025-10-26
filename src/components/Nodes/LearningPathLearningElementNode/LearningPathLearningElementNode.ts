/**
 * @prop lmsId - The id of the learning element inside the LMS.
 * @prop name - The name of the learning element.
 * @prop activityType - The activity type of the learning element.
 * @prop classification - The classification of the learning element.
 * @prop handleSetUrl - The function that sets the url of the learning element.
 * @prop handleSetTitle - The function that sets the title of the learning element.
 * @prop handleSetLmsId - The function that sets the lms id of the learning element.
 * @prop handleOpen - The function that opens the learning element.
 * @prop handleClose - The function that closes the learning element.
 * @prop isDone - Whether the learning element is done or not (1 or 0 / true or false).
 *
 * @remarks
 * represents the props of a {@link LearningPathLearningElementNode}.
 *
 * @category Components
 * @interface
 */
export type LearningPathLearningElementNode = {
  /**
   * The id of the learning element inside the LMS.
   */
  learningElementId: number
  lmsId: number
  name: string
  activityType: string
  classification: string
  handleSetUrl: (url: string) => void
  handleSetTitle: (title: string) => void
  handleSetLmsId: (lmsId: number) => void
  handleSetClassification: (classification: string) => void
  handleOpen: () => void
  handleClose: () => void
  isDone: boolean
  isDisabled: boolean
  isRecommended: boolean
}
