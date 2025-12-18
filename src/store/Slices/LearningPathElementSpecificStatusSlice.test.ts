import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { useStore } from '../Zustand/Store'

const learningPathElementSpecificStatus = [
  { cmid: 1, state: 0, timecompleted: '1699967821' },
  { cmid: 2, state: 1, timecompleted: '1699967821' },
  { cmid: 3, state: 1, timecompleted: '1699967821' },
  { cmid: 4, state: 0, timecompleted: '1699967821' }
]

describe('LearningPathElementSlice', () => {
  mockServices.fetchLearningPathElement.mockReturnValue(learningPathElementSpecificStatus)

  it('[HASKI-REQ-0071] should fetch learning path from server and cache it', async () => {
    const { getLearningPathElementSpecificStatus } = useStore.getState()

    const courseId = '1'
    const studentId = 2
    const learningElementId = 3

    const result = await getLearningPathElementSpecificStatus(courseId, studentId, learningElementId)

    expect(result).toEqual(learningPathElementSpecificStatus)
    expect(getLearningPathElementSpecificStatus).toBeDefined()
    expect(getLearningPathElementSpecificStatus).toBeInstanceOf(Function)
    expect(mockServices.fetchLearningPathElementSpecificStatus).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchLearningPathElementSpecificStatus).toHaveBeenCalledWith(
      courseId,
      studentId,
      learningElementId
    )
  })
})
