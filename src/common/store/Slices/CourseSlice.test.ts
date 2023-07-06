import { useStore } from "../Zustand/Store"

describe('CourseSlice', () => {
    it('should set course', () => {
        const { setCourse } = useStore.getState()
        const courseToSet = {} as typeof course
        setCourse(courseToSet)
        expect(setCourse).toBeDefined()
        expect(setCourse).toBeInstanceOf(Function)
        const course = useStore.getState().course
        expect(course).toBe(courseToSet)
    })
})