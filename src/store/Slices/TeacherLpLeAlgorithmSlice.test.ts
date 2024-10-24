import '@testing-library/jest-dom'
import { useStore } from '../Zustand/Store'

describe('TeacherLpLeAlgSlice', () => {
  test('explicitely setting the algorithm in cache from the frontend', async () => {
    const setTeacherLpLeAlg = useStore.getState().setTeacherLpLeAlgorithm
    const getTeacherLpLeAlgorithm = useStore.getState().getTeacherLpLeAlgorithm
    const topicId = 1
    const algorithmName = 'testAlgorithm'

    setTeacherLpLeAlg(topicId, algorithmName)
    const cachedAlgorithm = await getTeacherLpLeAlgorithm(topicId)

    expect(cachedAlgorithm.short_name).toBe('testAlgorithm')
  })
})
