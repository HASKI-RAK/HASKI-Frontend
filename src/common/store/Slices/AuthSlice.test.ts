import { usePersistedStore } from '../Zustand/Store'

describe('AuthSlice', () => {
    it('should set expire timestamp', () => {
        const { setExpire } = usePersistedStore.getState()
        const timestamp = Date.now()
        setExpire(timestamp)
        expect(setExpire).toBeDefined()
        expect(setExpire).toBeInstanceOf(Function)
        const { expire } = usePersistedStore.getState()
        expect(expire).toBe(timestamp)
    })
})