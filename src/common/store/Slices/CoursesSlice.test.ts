import '@testing-library/jest-dom'
import { useStore } from '../Zustand/Store'
import { mockServices } from 'jest.setup'

describe('CoursesSlice', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch courses from server and cache them', async () => {
    const { fetchCourses } = useStore.getState()
    const courses = {courses: [{created_at: "test", created_by: "test", id: 1, last_updated: "test", lms_id: 1, name: "test", university: "test"}]}

    const userId = 1
    const lmsUserId = 2
    const studentId = 3

    const result = await fetchCourses(userId, lmsUserId, studentId)

    expect(result).toEqual(courses)
    expect(fetchCourses).toBeDefined()
    expect(fetchCourses).toBeInstanceOf(Function)
    expect(fetchCourses).not.toThrow()
    //expect(mockServices.getCourses).toHaveBeenCalledTimes(1)
    expect(mockServices.getCourses).toHaveBeenCalledWith(1, 2, 3)
    expect(useStore.getState()._cache_Courses_record[`${userId}-${lmsUserId}-${studentId}`]).toEqual(courses)
  })

  it('should return cached courses if available', async () => {
    const { fetchCourses } = useStore.getState()
    const courses = [{ id: 1, name: 'Math', description: 'Learn math' }]
    mockServices.getCourses = jest.fn().mockResolvedValueOnce(courses)

    const userId = 1
    const lmsUserId = 2
    const studentId = 3

    await fetchCourses(userId, lmsUserId, studentId)


    expect(useStore.getState()._cache_Courses_record[`${userId}-${lmsUserId}-${studentId}`]).toEqual(courses)

    const cached = await fetchCourses(1, 2, 3)

    expect(mockServices.getCourses).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(courses)
  })
})
