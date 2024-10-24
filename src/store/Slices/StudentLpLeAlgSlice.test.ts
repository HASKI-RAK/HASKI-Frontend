import '@testing-library/jest-dom'
import { useStore } from '../Zustand/Store'

describe('StudentLpLeAlgSlice', () => {
  test('explicitely setting the algorithm in cache from the frontend', async () => {
    const setStudentLpLeAlg = useStore.getState().setStudentLpLeAlgorithm
    const getStudentLpLeAlgorithm = useStore.getState().getStudentLpLeAlgorithm
    const userId = 1
    const topicId = 1
    const algorithmName = 'testAlgorithm'

    setStudentLpLeAlg(userId, topicId, algorithmName)
    const cachedAlgorithm = await getStudentLpLeAlgorithm(userId, topicId)

    expect(cachedAlgorithm.short_name).toBe('testAlgorithm')
  })
})
