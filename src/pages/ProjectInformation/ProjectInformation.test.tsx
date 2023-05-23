import "@testing-library/jest-dom"
import { AuthContext } from "@services"
import { MemoryRouter } from "react-router-dom"
import { fireEvent, render, screen } from "@testing-library/react"


import ProjectInformation from "./ProjectInformation"
import { debug } from "console";

describe("Test the Project Information ", () => {

    it("Should render the skeleton", () => {
        const projectInformation = render(
            <MemoryRouter>
                <AuthContext.Provider value={{ isAuth: false, setIsAuth: jest.fn(), logout: jest.fn() }}>
                    <ProjectInformation />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(projectInformation.container.querySelectorAll("span").length).toEqual(1);
    })

    it("Should render the project information page", () => {
        const projectInformation = render(
            <MemoryRouter>
                <AuthContext.Provider value={{ isAuth: true, setIsAuth: jest.fn(), logout: jest.fn() }}>
                    <ProjectInformation />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(projectInformation.container.querySelectorAll("span").length).toEqual(1);
    })

    
    it("Should click the Button", () => {
        const projectInformation = render(
            <MemoryRouter>
                <AuthContext.Provider value={{ isAuth: false, setIsAuth: jest.fn(), logout: jest.fn() }}>
                    <ProjectInformation />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        const button = projectInformation.getByRole("button");
        fireEvent.click(button);
        debug(button);
        
        screen.debug();
        expect(button).toHaveBeenCalledTimes(1);
    })
    
});