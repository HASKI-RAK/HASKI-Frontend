export type LearningPathLearningElementNode = {
  lms_id: number
  name: string
  activity_type: string
  classification: string
  is_recommended: boolean
  handleSetUrl: (url: string) => void
  handleSetTitle: (title: string) => void
  handleOpen: () => void
  handleClose: () => void
}
