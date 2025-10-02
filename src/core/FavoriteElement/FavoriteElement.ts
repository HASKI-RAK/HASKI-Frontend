type FavoriteElementReturn = (studentId: number) => Promise<FavoriteElement[] | undefined>
type FavoriteResponse = {
  favorites: number
}
/**
 * @prop cmid - The id of the learning element (equals learning_element_id)
 * @prop isFavorite - The favorite status of the learning element (0 = not favorited, 1 = favorited)
 * @interface
 * @category Core
 */
type FavoriteElement = number

export default FavoriteElement
export type { FavoriteElementReturn, FavoriteResponse }
