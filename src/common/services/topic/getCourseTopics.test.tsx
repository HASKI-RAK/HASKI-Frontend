import "@testing-library/jest-dom";
import {getCourseTopics} from "./getCourseTopics";

describe('getLoginStatus', () => {

    it('should return login status', async () => {

        const mockResponse = {
            status: 200,
            message: 'OK',
            data: {
                topics: [],
            },
        };
        window.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve(mockResponse.data),
            status: mockResponse.status,
            statusText: mockResponse.message,
        });

        const loginStatus = await getCourseTopics();
        expect(loginStatus.status).toEqual(200);
    });

    it('should return an error response on network error', async () => {
        const mockError = new Error('Network error');
        window.fetch = jest.fn().mockRejectedValue(mockError);

        const response = await getCourseTopics();

        expect(fetch).toHaveBeenCalled();
        expect(response.status).toEqual(500);
        expect(response.message).toEqual('server error');
        expect(response.data.topics).toHaveLength(1);
        expect(response.data.topics[0].name).toEqual('');
    });

});