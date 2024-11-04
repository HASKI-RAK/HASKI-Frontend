import '@testing-library/jest-dom'
import { useStore } from '../Zustand/Store'

describe('TeacherLpLeAlgSlice', () => {
  test('explicitely setting the algorithm in cache from the frontend', async () => {
    const { setTeacherLpLeAlgorithm } = useStore.getState()
    const { getTeacherLpLeAlgorithm } = useStore.getState()
    const topicId = 1
    const algorithmName = 'testAlgorithm'

    setTeacherLpLeAlgorithm(topicId, algorithmName)
    const cachedAlgorithm = await getTeacherLpLeAlgorithm(topicId)

    expect(cachedAlgorithm.short_name).toBe('testAlgorithm')
  })
})
