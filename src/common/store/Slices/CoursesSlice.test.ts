import '@testing-library/jest-dom'
import { useStore } from '../Zustand/Store'
import { mockServices } from 'jest.setup'
describe('CoursesSlice', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch courses from server and cache them', async () => {
    const { fetchCourses } = useStore.getState()
    const courses = [{ id: 1, name: 'Math', description: 'Learn math' }]
    mockServices.getCourses = jest.fn().mockResolvedValueOnce(courses)

    const result = await fetchCourses(1, 2, 3)

    expect(result).toEqual(courses)
    expect(fetchCourses).toBeDefined()
    expect(fetchCourses).toBeInstanceOf(Function)
    expect(fetchCourses).not.toThrow()
    expect(mockServices.getCourses).toHaveBeenCalledTimes(1)
    expect(mockServices.getCourses).toHaveBeenCalledWith(1, 2, 3)
    expect(useStore.getState()._cache_courses).toEqual(courses)
  })

  it('should return cached courses if available', async () => {
    const { fetchCourses } = useStore.getState()
    const courses = [{ id: 1, name: 'Math', description: 'Learn math' }]
    mockServices.getCourses = jest.fn().mockResolvedValueOnce(courses)

    await fetchCourses(1, 2, 3)

    expect(useStore.getState()._cache_courses).toEqual(courses)

    const cached = await fetchCourses(1, 2, 3)

    expect(mockServices.getCourses).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(courses)
  })
})
