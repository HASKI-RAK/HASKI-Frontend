import { Glossary } from "@pages"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import { AuthContext } from "@services"
import { MemoryRouter } from "react-router-dom"
import { render } from "@testing-library/react"

const navigate = jest.fn()

describe("Test the Glossary page", () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ status: 200 }),
            status: 200,
            message: "OK",
        }),
    ) as jest.Mock

    it("Should render the skeleton", () => {
        const glossary = render(
            <MemoryRouter>
                <AuthContext.Provider value={{ isAuth: false, setIsAuth: jest.fn(), logout: jest.fn() }}>
                    <Glossary />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(glossary.container.querySelectorAll("span").length).toEqual(1);
    })

    it("Should render the glossary page", () => {
        const glossary = render(
            <MemoryRouter>
                <AuthContext.Provider value={{ isAuth: true, setIsAuth: jest.fn(), logout: jest.fn() }}>
                    <Glossary />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(glossary.container.querySelectorAll("span").length).toEqual(1);
    })
    
    test("renders correctly and matches snapshot", () => {
        const tree = renderer.create(<Glossary />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})