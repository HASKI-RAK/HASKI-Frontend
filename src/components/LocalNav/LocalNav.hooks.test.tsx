import { renderHook } from '@testing-library/react-hooks';
import { useLearningPath } from './LocalNav.hooks';
import { getCourseTopics, getElementLearningPath } from '@services';

jest.mock('@services');

describe('useLearningPath', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.resetModules();
    });

    test('should set loading to false if getCourseTopics() fails', async () => {
        (getCourseTopics as jest.Mock).mockRejectedValue(new Error('Failed to fetch topics'));

        const { result, waitForNextUpdate } = renderHook(() => useLearningPath());

        expect(result.current.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.loading).toBe(false);
    })

})