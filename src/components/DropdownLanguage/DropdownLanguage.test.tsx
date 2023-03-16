import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { DropdownLanguage } from "@components";
import {fireEvent, render, act} from "@testing-library/react";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";


// tests for mui can be found https://github.com/mui/material-ui/blob/master/packages/mui-material/src

describe("Test the change-language dropdown component", () => {

    test("catch clause in DropdownLanguage component works correctly", () => {

        const localStorageMock_withSetError = {
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
            value: localStorageMock_withSetError,
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

        const { getAllByRole,getByRole } = render(<DropdownLanguage />);

        fireEvent.mouseDown(getByRole('button'));
        act(() => {
            getAllByRole('option')[1].click();
        })

        expect(localStorageMock_withSetError.setItem).toHaveBeenCalledWith("i18nextLng", "en");
        expect(localConsole.error).toHaveBeenCalledWith("The language could not be changed. Error Message: Error: Error");
    });

    test("dropdown can be set to english", () => {

        const localStorageMock = {
            getItem: jest.fn().mockImplementation((key) => {
                if(key === "i18nextLng"){
                    return "de";
                }
                return null;
            }),
            setItem: jest.fn().mockImplementation((key) => {
                return key;
            }),
        };

// Replace the real localStorage object with our mock object
        Object.defineProperty(global, "localStorage", {
            value: localStorageMock,
        });

        const {getByTestId} = render( // actually give translation to your component
            <I18nextProvider i18n={i18next}> // actually give translation to your component
                <DropdownLanguage/>
            </I18nextProvider>
        );

        const selectElement = getByTestId("LanguageDropdown");

        fireEvent.change(selectElement, { target: { value: 'en' } });
    });

    test("dropdown can be set to german", () => {

        const localStorageMock = {
            getItem: jest.fn().mockImplementation((key) => {
                if(key === "i18nextLng"){
                    return "de";
                }
                return null;
            }),
            setItem: jest.fn().mockImplementation((key) => {
                return key;
            }),
        };

// Replace the real localStorage object with our mock object
        Object.defineProperty(global, "localStorage", {
            value: localStorageMock,
        });

        const {getByRole, getByTestId} = render(<I18nextProvider i18n={i18next}> // actually give translation to your component
            <DropdownLanguage/>
        </I18nextProvider>);

        const selectElement = getByTestId("LanguageDropdown");

        fireEvent.change(selectElement, { target: { value: 'de' } });

        expect(getByRole("button")).toHaveTextContent(/Deutsch/i);
    });


    test("renders correctly", () => {
        const tree = renderer
            .create(
                <DropdownLanguage />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});