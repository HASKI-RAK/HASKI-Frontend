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
