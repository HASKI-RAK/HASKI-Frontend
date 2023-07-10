/**
 * @interface LearningPathLearningElementNode
 * @property {number} lmsId - The id of the learning element inside the LMS.
 * @property {string} name - The name of the learning element.
 * @property {string} activityType - The activity type of the learning element.
 * @property {string} classification - The classification of the learning element.
 * @property {boolean} isRecommended - Whether the learning element is recommended or not.
 * @property {function} handleSetUrl - The function that sets the url of the learning element.
 * @property {function} handleSetTitle - The function that sets the title of the learning element.
 * @property {function} handleOpen - The function that opens the learning element.
 * @property {function} handleClose - The function that closes the learning element.
 */
export type LearningPathLearningElementNode = {
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
