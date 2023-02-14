import { Login } from "@pages";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes, MemoryRouter } from "react-router-dom";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
    }),
) as jest.Mock;

describe("Test the Login page", () => {
    const navigate = jest.fn();
    jest.mock("react-router-dom", () => ({
        ...(jest.requireActual("react-router-dom") as any), // technically it passes without this too, but I'm not sure if its there for other tests to use the real thing so I left it in
        useNavigate: () => navigate,
    }));

    it("should render the skeleton when a nonce is supplied as search params", () => {
        const login = render(
            <MemoryRouter initialEntries={["?nonce=123"]}>
                <Login />
            </MemoryRouter>
        );
        // span length should be 1
        expect(login.container.querySelectorAll("span").length).toEqual(1);
        // navigate should  be called with /login
        // expect(navigate).toBeCalledWith("/login");
    });

    it("should render the skeleton the login page without nonce", () => {
        const login = render(
            <MemoryRouter initialEntries={[""]}>
                <Login />
            </MemoryRouter>
        );
        // login form should be rendered
        const username = login.getAllByRole("textbox")
        expect(username.length).toEqual(1);
    });
});
