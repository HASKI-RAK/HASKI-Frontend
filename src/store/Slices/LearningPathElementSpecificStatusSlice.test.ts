import '@testing-library/jest-dom'
//Tests fail with shortened Path
import { useStore } from '../Zustand/Store'
import { mockServices } from 'jest.setup'

const learningPathElementSpecificStatus = [
  { cmid: 1, state: 0, timecompleted: '1699967821' },
  { cmid: 2, state: 1, timecompleted: '1699967821' },
  { cmid: 3, state: 1, timecompleted: '1699967821' },
  { cmid: 4, state: 0, timecompleted: '1699967821' }
]

describe('LearningPathElementSlice', () => {
  mockServices.fetchLearningPathElement.mockReturnValue(learningPathElementSpecificStatus)

  it('should fetch learning path from server and cache it', async () => {
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
