import "@testing-library/jest-dom";
import { getElementLearningPath } from "./getElementLearningPath";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
        status: 200,
        message: "OK",
    }),
) as jest.Mock;

describe('getLoginStatus', () => {
    it('should return login status', async () => {

        const topicIndex = 1;
        const loginStatus = await getElementLearningPath(topicIndex);
        expect(loginStatus.status).toEqual(200);
    });

});