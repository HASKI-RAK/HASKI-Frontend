import "@testing-library/jest-dom";
import { getLogout } from "./getLogout";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
        status: 200,
        message: "OK",
    }),
) as jest.Mock;


describe('getLoginStatus', () => {
    it('should return logout success', async () => {
        const loginStatus = await getLogout();
        expect(loginStatus.status).toEqual(200);
    });

});