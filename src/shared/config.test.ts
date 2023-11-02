import { setConfig, getConfig } from './config'

describe('setConfig', () => {
  it('should use appConfig correctly', () => {
    const mockConfig = { BACKEND: 'backendurl' } // replace this with your actual Config structure
    setConfig(mockConfig)
    expect(getConfig()).toEqual(mockConfig)
  })
})
