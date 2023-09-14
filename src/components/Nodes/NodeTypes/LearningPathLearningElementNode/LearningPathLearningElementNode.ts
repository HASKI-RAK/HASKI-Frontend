/**
 * @prop lmsId - The id of the learning element inside the LMS.
 * @prop name - The name of the learning element.
 * @prop activityType - The activity type of the learning element.
 * @prop classification - The classification of the learning element.
 * @prop isRecommended - Whether the learning element is recommended or not.
 * @prop handleSetUrl - The function that sets the url of the learning element.
 * @prop handleSetTitle - The function that sets the title of the learning element.
 * @prop handleOpen - The function that opens the learning element.
 * @prop handleClose - The function that closes the learning element.
 * @interface LearningPathLearningElementNode
 * which represents the props of the {@link LearningPathLearningElementNode}.
 */
export type LearningPathLearningElementNode = {
  /**
   * The id of the learning element inside the LMS.
   */
  lmsId: number
  name: string
  activityType: string
  classification: string
  isRecommended: boolean
  handleSetUrl: (url: string) => void
  handleSetTitle: (title: string) => void
  handleOpen: () => void
  handleClose: () => void
}
