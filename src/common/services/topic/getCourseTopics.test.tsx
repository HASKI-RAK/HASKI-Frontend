import "@testing-library/jest-dom";
import { getCourseTopics } from "./getCourseTopics";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
        status: 200,
        message: "OK",
    }),
) as jest.Mock;

describe('getLoginStatus', () => {

    it('should return login status', async () => {

        const loginStatus = await getCourseTopics();
        expect(loginStatus.status).toEqual(200);
    });

});