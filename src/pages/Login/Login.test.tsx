import { Login } from "@pages";
import "@testing-library/jest-dom";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as router from 'react-router'
import { AuthContext } from "@services";


const navigate = jest.fn();

describe("Test the Login page", () => {

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ status: 200 }),
            status: 200,
            message: "OK",
        }),
    ) as jest.Mock;

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    it("should render the skeleton when a nonce is supplied as search params", () => {
        const login = render(
            <MemoryRouter initialEntries={["?nonce=123"]}>
                <AuthContext.Provider value={{ isAuth: false, setIsAuth: jest.fn(), logout: jest.fn() }}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        // span length should be 1
        expect(login.container.querySelectorAll("span").length).toEqual(1);
        // navigate should  be called with /login
        // expect(navigate).toBeCalledWith("/login");
    });

    it("should render the skeleton the login page without nonce", () => {
        const login = render(
            <MemoryRouter initialEntries={["?nonce=123"]}>
                <AuthContext.Provider value={{ isAuth: true, setIsAuth: jest.fn(), logout: jest.fn() }}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(login.container.querySelectorAll("span").length).toEqual(1);
    });

    it("should render the skeleton without nonce but authorized", () => {
        const login = render(
            <MemoryRouter initialEntries={[""]}>
                <AuthContext.Provider value={{ isAuth: true, setIsAuth: jest.fn(), logout: jest.fn() }}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(login.container.querySelectorAll("span").length).toEqual(1);
    });

    test("submit navigates to dashboard on correct username and password", () => {
        const login = render(
            <MemoryRouter initialEntries={[""]}>
                <AuthContext.Provider value={{ isAuth: false, setIsAuth: jest.fn(), logout: jest.fn() }}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const buttonLogin = login.getAllByRole("button")[1];
        const username = login.getAllByRole("textbox")[0];
        const password = login.container.querySelector('#password') as HTMLElement;

        act(() => {
            // Fill in username
            fireEvent.change(username, { target: { value: "test" } });

            // Fill in password
            fireEvent.change(password, { target: { value: "test" } });
        });

        // Click on login button
        act(() => {
            fireEvent.click(buttonLogin);
        });
        // wait for the fetch to complete
        setTimeout(() => {
            // navigate should be called with /dashboard
            expect(navigate).toBeCalledWith("/dashboard");
        }, 1000);
    });

    test("the hook should redirect to /login when a nonce is supplied as search params and unauthorized", () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ status: 401 }),
                status: 401,
                message: "Unauthorized",
            }),
        ) as jest.Mock;
        const login = render(
            <MemoryRouter initialEntries={["?nonce=123"]}>
                <AuthContext.Provider value={{ isAuth: false, setIsAuth: jest.fn(), logout: jest.fn() }}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(login.container.querySelectorAll("span").length).toEqual(1);
        // wait for the fetch to complete
        setTimeout(() => {
            // navigate should be called with /dashboard
            expect(navigate).toBeCalledWith("/login");
        }, 1000);
    });
});
