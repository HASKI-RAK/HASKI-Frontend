import "@testing-library/jest-dom";
import { AuthContext, AuthContextType } from "./AuthContext";
import { render, renderHook } from "@testing-library/react";
import { useContext } from "react";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
    }),
) as jest.Mock;

describe("Test Authcontext", () => {
    // render custom component
    const TestComponent = () => {
        const context = useContext(AuthContext);
        const changeIsAuth = () => {
            context.setIsAuth(!context.isAuth);
        }
        return (
            <>
                context.isAuth ?
                <button onClick={changeIsAuth}>Test</button> :
                <button onClick={changeIsAuth}>Test2</button>
                <button onClick={context.logout}>Logout</button>
            </>


        )
    }
    const providedContext = {
        isAuth: false, setIsAuth: function (active: boolean) { this.isAuth = active }, logout: jest.fn()
    } as AuthContextType;
    it("should render unauthorized", () => {

        const renderResult = render(
            <AuthContext.Provider value={providedContext}>
                <TestComponent />
            </AuthContext.Provider >);
        expect(renderResult.getByText("Test2")).toBeInTheDocument();

    });

    it("should render authorized", () => {
        const renderResult = render(
            <AuthContext.Provider value={{ ...providedContext, isAuth: true }}>
                <TestComponent />
            </AuthContext.Provider >);
        expect(renderResult.getByText("Test")).toBeInTheDocument();
    });

    it("should return the default props of AuthContext", () => {
        const context = renderHook(() => useContext(AuthContext));
        expect(context.result.current).toMatchObject({
            isAuth: false,
            setIsAuth: expect.any(Function),
            logout: expect.any(Function)
        });
    });

    test("should change isAuth to true", () => {
        const context = renderHook(() => useContext(AuthContext));
        context.result.current.setIsAuth(true);
        expect(context.result.current.isAuth).toBe(true);
    });

    test("should change isAuth to false", () => {
        const context = renderHook(() => useContext(AuthContext));
        context.result.current.setIsAuth(false);
        expect(context.result.current.isAuth).toBe(false);
    });

    test("should call logout", () => {
        const renderResult = render(
            <AuthContext.Provider value={providedContext}>
                <TestComponent />
            </AuthContext.Provider >);
        renderResult.getByText("Logout").click();
        expect(providedContext.logout).toBeCalled();
    });

    it("should call default logout", () => {
        const context = renderHook(() => useContext(AuthContext));
        context.result.current.logout();
    });

});
