type FavoriteElementReturn = (studentId: number) => Promise<FavoriteElement[] | undefined>
type FavoriteResponse = {
  favorites: number
}
/**
 * @prop student_id - The user's ID
 * @interface
 * @category Core
 */
type FavoriteElement = number

export default FavoriteElement
export type { FavoriteElementReturn, FavoriteResponse }
