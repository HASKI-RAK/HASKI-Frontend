import "@testing-library/jest-dom";
import { AuthContext, AuthContextType } from "./AuthContext";
import { render } from "@testing-library/react";
import { debug } from "jest-preview";
import { useContext } from "react";

describe("Test Authcontext", () => {
    // render custom component
    it("should render", () => {

        const TestComponent = () => {
            const context = useContext(AuthContext);
            const changeIsAuth = () => {
                context.setIsAuth(!context.isAuth);
                console.log(context.isAuth);
            }
            return (
                context.isAuth ?
                    <button onClick={changeIsAuth}>Test</button> :
                    <button onClick={changeIsAuth}>Test2</button>
            )
        }
        let isAuth = true;
        const providedContext = {
            isAuth: isAuth, setIsAuth: (value: boolean) => {
                isAuth = value;
            }, logout: () => { }
        } as AuthContextType;
        const renderResult = render(
            <AuthContext.Provider value={providedContext}>
                <TestComponent />
            </AuthContext.Provider >);
        debug()
        expect(renderResult.getByText("Test")).toBeInTheDocument();
        renderResult.getByText("Test").click();
        expect(renderResult.getByText("Test2")).toBeInTheDocument();

    });
});
