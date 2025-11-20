import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { usePersistedStore } from '@store'

describe('FavoriteElementSlice getFavoriteElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch learningElementIds and cache them', async () => {
    const { getFavoriteElement } = usePersistedStore.getState()
    const favorites = [1, 2, 3]

    const studentId = 1

    const result = await getFavoriteElement(studentId)

    expect(result).toEqual(favorites)
    expect(getFavoriteElement).toBeDefined()
    expect(getFavoriteElement).toBeInstanceOf(Function)
    expect(mockServices.fetchFavorite).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchFavorite).toHaveBeenCalledWith(1)
    expect(usePersistedStore.getState().favorited).toEqual([1, 2, 3])
  })

  it('should return cached favorites if available', async () => {
    const { getFavoriteElement } = usePersistedStore.getState()
    const favorites = [1, 2, 3]
    mockServices.fetchFavorite = jest.fn().mockResolvedValueOnce(favorites)

    const studentId = 1

    await getFavoriteElement(studentId)

    expect(usePersistedStore.getState().favorited).toEqual([1, 2, 3])

    const cached = await getFavoriteElement(studentId)

    expect(mockServices.fetchFavorite).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(favorites)
  })

  it('should set favorited to empty array if fetchFavorite returns object', async () => {
    mockServices.fetchFavorite = jest.fn().mockResolvedValueOnce({ favorites: [1, 2, 3] })

    const { getFavoriteElement } = usePersistedStore.getState()

    await getFavoriteElement(1)

    expect(usePersistedStore.getState().favorited).toEqual([])
  })

  it('should set an empty favorited array if fetchFavorite throws an error', async () => {
    const { getFavoriteElement } = usePersistedStore.getState()

    //mock a fetch error
    mockServices.fetchFavorite = jest.fn().mockRejectedValueOnce(new Error('Network error'))

    const studentId = 1

    await getFavoriteElement(studentId)

    //should use empty array as fallback
    expect(usePersistedStore.getState().favorited).toEqual([])
  })
})

describe('FavoriteElementSlice setFavoriteElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should add learningElementId to favorites', () => {
    const { setFavoriteElement } = usePersistedStore.getState()

    // Start with empty favorited
    usePersistedStore.setState({ favorited: [] })

    setFavoriteElement(5)
    expect(usePersistedStore.getState().favorited).toEqual([5])
  })
  it('should remove learningElementId from favorites', () => {
    const { setFavoriteElement } = usePersistedStore.getState()

    // Start with favorited containing 23
    usePersistedStore.setState({ favorited: [23] })

    setFavoriteElement(23)
    expect(usePersistedStore.getState().favorited).toEqual([])
  })
  it('should add learningElementId when favorited is initially undefined', () => {
    // Set favorited to undefined explicitly to test the fallback
    usePersistedStore.setState({ favorited: undefined })

    const { setFavoriteElement } = usePersistedStore.getState()

    setFavoriteElement(10)

    expect(usePersistedStore.getState().favorited).toEqual([10])
  })
})
