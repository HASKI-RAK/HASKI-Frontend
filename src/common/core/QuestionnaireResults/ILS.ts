type ILSReturn = (userId?: number, lmsUserId?: number, studentId?: number) => Promise<ILS>

type ILS = {
  characteristic_id: number
  id: number
  input_dimension: string
  input_value: number
  perception_dimension: string
  perception_value: number
  processing_dimension: string
  processing_value: number
  understanding_dimension: string
  understanding_value: number
}

export default ILS
export type { ILSReturn }
