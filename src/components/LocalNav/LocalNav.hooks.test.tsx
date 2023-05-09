import { renderHook } from '@testing-library/react-hooks';
import { useLearningPath, getSortedLearningPath } from './LocalNav.hooks';
import { getCourseTopics } from '@services';

jest.mock('@services', () => ({
    getCourseTopics: jest.fn(),
}));

describe('useLearningPath', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should set loading to false when there is an error fetching course topics', async () => {
        (getCourseTopics as jest.Mock).mockResolvedValueOnce({ status: 200, data: { topics: [{ id: 1 }] } });

        const error = new Error('Failed to sort learning path');
        (getSortedLearningPath as jest.Mock).mockResolvedValueOnce = jest.fn().mockRejectedValueOnce(error);


        const { result, waitForNextUpdate } = renderHook(() => useLearningPath());

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();


    });
});
