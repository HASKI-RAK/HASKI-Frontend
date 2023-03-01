import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { DropdownLanguage } from "@components";
import {fireEvent, render, act} from "@testing-library/react";




// tests for mui can be found https://github.com/mui/material-ui/blob/master/packages/mui-material/src

describe("Test the change-language dropdown component", () => {

    test("dropdown can be set to german", () => {

        const {getAllByRole,getByRole} = render(<DropdownLanguage/>);

        fireEvent.mouseDown(getByRole('button'));
        act(() => {
            getAllByRole('option')[0].click();
        })

        expect(getByRole('button')).toHaveTextContent(/Deutsch/i);
    });

    test("dropdown can be set to english", () => {


        const {getAllByRole,getByRole} = render(<DropdownLanguage/>);

        fireEvent.mouseDown(getByRole('button'));
        act(() => {
            getAllByRole('option')[1].click();
        })

        expect(getByRole('button')).toHaveTextContent(/English/i);
    });

    test("renders correctly", () => {
        const tree = renderer
        .create(
            <DropdownLanguage/>
        )
         .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("click change throws error ",() => {

        const localStorageMock = {
            getItem: jest.fn().mockImplementation((key) => {
                if(key === "i18nextLng"){
                    return "de";
                }
                return null;
            }),
            setItem: jest.fn().mockImplementation(() => {
                throw new Error("Error")
            }),
        };

        // Replace the real localStorage object with our mock object
        Object.defineProperty(global, "localStorage", {
            value: localStorageMock,
        });

        const localLog = {
            error: jest.fn()
        };

        Object.defineProperty(global, "loglevel", {
            value: localLog,
        });

        const localConsole = {
            error: jest.fn()
        }

        Object.defineProperty(global, "console", {
            value: localConsole,
        });

        const {getByTestId} = render(<DropdownLanguage/>);

        const selectElement = getByTestId("LanguageDropdown");

        fireEvent.change(selectElement, { target: { value: 'en' } });

        expect(localStorageMock.setItem).toHaveBeenCalledWith("i18nextLng", "en");
        expect(localConsole.error).toHaveBeenCalledWith("The language could not be changed. Error Message: Error: Error");
    })
});