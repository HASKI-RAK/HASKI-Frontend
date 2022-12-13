import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { DropdownLanguage } from "@components";
import {fireEvent, getByRole, getAllByRole, render, within, act} from "@testing-library/react";



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
});