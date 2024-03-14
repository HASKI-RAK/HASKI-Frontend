import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { useStore } from '../Zustand/Store'

describe('CoursesSlice', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch courses from server and cache them', async () => {
    const { getCourses } = useStore.getState()
    const courses = {
      courses: [
        {
          created_at: 'test',
          created_by: 'test',
          id: 1,
          last_updated: 'test',
          lms_id: 1,
          name: 'test',
          university: 'test'
        },
        {
          created_at: 'test',
          created_by: 'test',
          id: 2,
          last_updated: 'test',
          lms_id: 2,
          name: 'test',
          university: 'test'
        }
      ]
    }

    const userId = 1
    const lmsUserId = 2
    const studentId = 3

    const result = await getCourses(userId, lmsUserId, studentId)

    expect(result).toEqual(courses)
    expect(getCourses).toBeDefined()
    expect(getCourses).toBeInstanceOf(Function)
    expect(mockServices.fetchCourses).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchCourses).toHaveBeenCalledWith(1, 2, 3)
    expect(useStore.getState()._cache_Courses_record[`${userId}-${lmsUserId}-${studentId}`]).toEqual(courses)
    expect(getCourses).not.toThrow() // counts as function call (getCourses), here it would be Called 2 times instead of 1
  })

  it('should return cached courses if available', async () => {
    const { getCourses } = useStore.getState()
    const courses = [{ id: 1, name: 'Math', description: 'Learn math' }]
    mockServices.fetchCourses = jest.fn().mockResolvedValueOnce(courses)

    const userId = 1
    const lmsUserId = 2
    const studentId = 3

    await getCourses(userId, lmsUserId, studentId)

    expect(useStore.getState()._cache_Courses_record[`${userId}-${lmsUserId}-${studentId}`]).toEqual(courses)

    const cached = await getCourses(1, 2, 3)

    expect(mockServices.fetchCourses).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(courses)
  })
})
