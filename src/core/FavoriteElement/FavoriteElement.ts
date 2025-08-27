/**
 * @prop courseId - The id of the course
 * @prop studentId - The id of the student
 * @prop learningElementId - The id of the learning element
 * @interface
 * @category Core
 */
type FavoriteElementReturn = (studentId?: number) => Promise<number[]>

/**
 * @prop cmid - The id of the learning element (equals learning_element_id)
 * @prop isFavorite - The favorite status of the learning element (0 = not favorited, 1 = favorited)
 * @interface
 * @category Core
 */
type FavoriteElement = {
  cmid: number
  isFavorite: boolean
}

export default FavoriteElement
export type { FavoriteElementReturn }
