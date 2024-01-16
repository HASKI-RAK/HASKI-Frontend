import '@testing-library/jest-dom'
//Tests fail with shortened Path
import { usePersistedStore } from '../Zustand/Store'
import { mockServices } from 'jest.setup'

const learningElementStatus = { cmid: 1, state: 0, timecompleted: 0}

describe('LearningPathElementStatusSlice', () => {
  it('should return set data if setLearningPathElementStatus newData is given', async () => {
    const { getLearningPathElementStatus, setLearningPathElementStatus } = usePersistedStore.getState()

    const courseId = '1'
    const studentId = 1
    await getLearningPathElementStatus(courseId, studentId)
    const getDataAfterSet = [
      {"cmid": 1, "state": 0, "timecompleted": "1699967821"},
      {"cmid": 2, "state": 0, "timecompleted": 0},
      {"cmid": 3, "state": 1, "timecompleted": "1699967821"},
      {"cmid": 4, "state": 0, "timecompleted": "1699967821"}
    ]

    const data = {cmid: 2, state: 0, timecompleted: 0}

    setLearningPathElementStatus(courseId, studentId, data).then((result) => {
      expect(result).toEqual(getDataAfterSet)
    })
  })

  it('should return set data if setLearningPathElementStatus newData is given, but can not be found', async () => {
    const { getLearningPathElementStatus, setLearningPathElementStatus } = usePersistedStore.getState()

    const courseId = '1'
    const studentId = 1
    await getLearningPathElementStatus(courseId, studentId)
    const getDataAfterSet = [
      {"cmid": 1, "state": 0, "timecompleted": "1699967821"},
      {"cmid": 2, "state": 1, "timecompleted": "1699967821"},
      {"cmid": 3, "state": 1, "timecompleted": "1699967821"},
      {"cmid": 4, "state": 0, "timecompleted": "1699967821"}
    ]

    const data = {cmid: 5, state: 0, timecompleted: 0}

    setLearningPathElementStatus(courseId, studentId, data).then((result) => {
      expect(result).toEqual(getDataAfterSet)
    })
  })

  it('should fetch LearningPathElementStatusSlice from server and cache it', async () => {
    const { getLearningPathElementStatus } = usePersistedStore.getState()
    mockServices.fetchLearningPathElementStatus = jest.fn().mockResolvedValueOnce(learningElementStatus)

    const courseId = '1'
    const studentId = 1

    const result = await getLearningPathElementStatus(courseId, studentId)

    expect(mockServices.fetchLearningPathElementStatus).toHaveBeenCalledTimes(1)
    expect(result).toEqual(learningElementStatus)
    expect(getLearningPathElementStatus).toBeDefined()
    expect(getLearningPathElementStatus).toBeInstanceOf(Function)
    expect(getLearningPathElementStatus).not.toThrow()
    expect(usePersistedStore.getState()._learningPathElementStatus).toEqual({"1-1":learningElementStatus})
  })


  it('should return cached LearningPathElementStatus if available', async () => {
    const { getLearningPathElementStatus } = usePersistedStore.getState()

    mockServices.fetchLearningPathElementStatus = jest.fn().mockResolvedValueOnce(learningElementStatus)

    const courseId = '1'
    const studentId = 1
    await getLearningPathElementStatus(courseId, studentId)

    expect(usePersistedStore.getState()._learningPathElementStatus).toEqual({"1-1":learningElementStatus})

    expect(mockServices.fetchLearningPathElementStatus).toHaveBeenCalledTimes(1)
    const cached = await getLearningPathElementStatus(courseId, studentId)

    expect(cached).toEqual(learningElementStatus)
  })


  it('should return cached data if setLearningPathElementStatus newData is empty', async () => {
    const { setLearningPathElementStatus } = usePersistedStore.getState()

    const courseId = '1'
    const studentId = 1

    const cached = await setLearningPathElementStatus(courseId, studentId)
    //nothing in cache yet, that is why it is undefined
    expect(cached).toEqual([undefined])
  })
})
