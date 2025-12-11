import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { useStore } from '../Zustand/Store'

describe('[HASKI-REQ-0035] CoursesSlice', () => {
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
          university: 'test',
          start_date: 'Thu, 31 Oct 2024 15:05:57 GMT'
        },
        {
          created_at: 'test',
          created_by: 'test',
          id: 2,
          last_updated: 'test',
          lms_id: 2,
          name: 'test',
          university: 'test',
          start_date: 'Thu, 31 Oct 3024 15:05:57 GMT'
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
    expect(useStore.getState()._cache_Courses_record[`${userId}-${lmsUserId}-${studentId}`]).toEqual({
      value: {
        courses: [
          {
            created_at: 'test',
            created_by: 'test',
            id: 1,
            last_updated: 'test',
            lms_id: 1,
            name: 'test',
            university: 'test',
            start_date: 'Thu, 31 Oct 2024 15:05:57 GMT'
          },
          {
            created_at: 'test',
            created_by: 'test',
            id: 2,
            last_updated: 'test',
            lms_id: 2,
            name: 'test',
            university: 'test',
            start_date: 'Thu, 31 Oct 3024 15:05:57 GMT'
          }
        ]
      }
    })
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

    expect(useStore.getState()._cache_Courses_record[`${userId}-${lmsUserId}-${studentId}`]).toEqual({
      value: [{ id: 1, name: 'Math', description: 'Learn math' }]
    })

    const cached = await getCourses(1, 2, 3)

    expect(mockServices.fetchCourses).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(courses)
  })

  it('should trigger a reload even if cache is available', async () => {
    const { getCourses } = useStore.getState()
    const courses = [{ id: 1, name: 'Math', description: 'Learn math' }]
    mockServices.fetchCourses = jest.fn().mockResolvedValue(courses)

    const userId = 1
    const lmsUserId = 2
    const studentId = 3

    await getCourses(userId, lmsUserId, studentId)

    expect(useStore.getState()._cache_Courses_record[`${userId}-${lmsUserId}-${studentId}`]).toEqual({
      value: [{ id: 1, name: 'Math', description: 'Learn math' }]
    })
    const cached = await getCourses(userId, lmsUserId, studentId)
    expect(mockServices.fetchCourses).toHaveBeenCalledTimes(1)
    expect(cached).toEqual(courses)

    const { clearCoursesCache } = useStore.getState()
    clearCoursesCache()
    await getCourses(userId, lmsUserId, studentId)
    expect(mockServices.fetchCourses).toHaveBeenCalledTimes(2)
  })
})
