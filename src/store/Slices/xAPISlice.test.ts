import '@testing-library/jest-dom'
import { usePersistedStore } from '../Zustand/Store'

describe('xAPISlice tests', () => {
  test('xAPI object can be get and set', () => {
    const { getXAPI, setXAPI } = usePersistedStore.getState()
    expect(getXAPI()).toBeUndefined()

    const endpoint = 'https://example.com'
    const username = 'user'
    const password = 'password'

    setXAPI(endpoint, username, password)
    expect(getXAPI()).toBeDefined()
  })
})
