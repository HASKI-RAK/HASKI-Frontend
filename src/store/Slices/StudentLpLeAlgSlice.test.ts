import '@testing-library/jest-dom'
import { useStore } from '../Zustand/Store'

describe('StudentLpLeAlgSlice', () => {
  test('[HASKI-REQ-0041] explicitely setting the algorithm in cache from the frontend', async () => {
    const { setStudentLpLeAlgorithm } = useStore.getState()
    const { getStudentLpLeAlgorithm } = useStore.getState()
    const userId = 1
    const topicId = 1
    const algorithmName = 'testAlgorithm'

    setStudentLpLeAlgorithm(userId, topicId, algorithmName)
    const cachedAlgorithm = await getStudentLpLeAlgorithm(userId, topicId)

    expect(cachedAlgorithm.short_name).toBe('testAlgorithm')
  })
})
