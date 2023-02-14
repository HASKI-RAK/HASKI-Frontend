import "@testing-library/jest-dom";
import { AuthProvider } from "@services";
import { act, render, renderHook, waitFor } from "@testing-library/react";
import { useAuthProvider } from "./AuthProvider.hooks";


global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
    }),
) as jest.Mock;

describe("Test AuthProvider", () => {

    it("should include the standard useAuthrovider values", () => {

        const result = render(
            <AuthProvider>
                <>Test</>
            </AuthProvider>
        );
        waitFor(() => {
            expect(result.getByText("Test")).toBeInTheDocument();
        });

    });

    test("functionality of AuthProvider hook", async () => {
        const { result } = await renderHook(() => useAuthProvider());
        expect(result.current).toMatchObject({
            isAuth: false,
            setIsAuth: expect.any(Function),
            logout: expect.any(Function)
        });

        // test side effects
        act(() => {
            result.current.setIsAuth(true);
        });
        expect(result.current.isAuth).toBe(true);

        await act(() => {
            result.current.logout();
        });
        expect(result.current.isAuth).toBe(false);
    });

    it("should set isauth to false when backend returns other than 200", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ status: 400 }),
            }),
        ) as jest.Mock;

        const { result } = await renderHook(() => useAuthProvider());
        expect(result.current).toMatchObject({
            isAuth: false,
            setIsAuth: expect.any(Function),
            logout: expect.any(Function)
        });

        expect(result.current.isAuth).toBe(false);
    });
});
