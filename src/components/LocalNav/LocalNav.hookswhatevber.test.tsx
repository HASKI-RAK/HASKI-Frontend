import { renderHook } from '@testing-library/react-hooks'
import { useLearningPath } from './LocalNav.hooks'
import { getCourseTopics, getElementLearningPath, LearningPath, Topic } from '@services'

jest.mock('@services', () => ({
    getCourseTopics: jest.fn(() => Promise.resolve({
        status: 200,
        data: {
            topics: [{
                contains_le: true,
                created_at: '2022-01-01',
                created_by: 'John Doe',
                id: 1,
                is_topic: true,
                last_updated: null,
                lms_id: 123,
                name: 'Topic 1',
                parent_id: null,
                student_topic: {
                    done: false,
                    done_at: null,
                    id: 123,
                    student_id: 456,
                    topic_id: 1,
                    visits: []
                },
                university: 'University 1'
            }]
        }
    })),
    getElementLearningPath: jest.fn(() => Promise.resolve({
        status: 200,
        data: {
            path: [{
                id: 1,
                element_id: 123,
                position: 1,
                score: null
            }]
        }
    }))
}));

describe('useLearningPath', () => {
    it('should fetch course topics and sorted learning path', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useLearningPath());

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.topics).toEqual([{
            contains_le: true,
            created_at: '2022-01-01',
            created_by: 'John Doe',
            id: 1,
            is_topic: true,
            last_updated: null,
            lms_id: 123,
            name: 'Topic 1',
            parent_id: null,
            student_topic: {
                done: false,
                done_at: null,
                id: 123,
                student_id: 456,
                topic_id: 1,
                visits: []
            },
            university: 'University 1'
        }]);
        expect(result.current.learningPath).toEqual([{
            path: [{
                id: 1,
                element_id: 123,
                position: 1,
                score: null
            }]
        }]);
        expect(getCourseTopics).toHaveBeenCalled();
        expect(getElementLearningPath).toHaveBeenCalledWith(1);
    });
});
