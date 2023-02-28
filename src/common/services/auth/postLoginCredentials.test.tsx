import "@testing-library/jest-dom";
import { postLoginCredentials } from "./postLoginCredentials";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
        status: 200,
        message: "OK",
    }),
) as jest.Mock;

describe('getLoginStatus', () => {
    it('should return logout success', async () => {
        const loginStatus = await postLoginCredentials();
        expect(loginStatus.status).toEqual(200);
    });

});