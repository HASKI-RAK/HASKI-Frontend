import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { DropdownLanguage } from "@components";
import {fireEvent, render} from "@testing-library/react";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

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

// tests for mui can be found https://github.com/mui/material-ui/blob/master/packages/mui-material/src

describe("Test the change-language dropdown component", () => {

    test("dropdown can be set to german", () => {

        const {getByRole, getByTestId} = render(<I18nextProvider i18n={i18next}> // actually give translation to your component
            <DropdownLanguage/>
        </I18nextProvider>);

        const selectElement = getByTestId("LanguageDropdown");

        fireEvent.change(selectElement, { target: { value: 'de' } });

        expect(getByRole("button")).toHaveTextContent(/Deutsch/i);
    });

    test("dropdown can be set to english", () => {


        const {getByTestId} = render(<I18nextProvider i18n={i18next}> // actually give translation to your component
            <DropdownLanguage/>
        </I18nextProvider>);

        const selectElement = getByTestId("LanguageDropdown");

        fireEvent.change(selectElement, { target: { value: "en" } });

        expect(localStorageMock.setItem).toHaveBeenCalledWith("i18nextLng", "en");
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