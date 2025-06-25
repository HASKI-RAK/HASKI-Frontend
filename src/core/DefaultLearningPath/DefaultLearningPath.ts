type DefaultLearningPathResponse = {
  classification: string
  position: number
  id: number
  disabled: boolean
  university: string
}

type DefaultLearningPath = {
  classification: string
  position: number
  disabled: boolean
  university: string
}

export default DefaultLearningPath
export type { DefaultLearningPathResponse }
