import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MainFrame from "./MainFrame";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";


describe('MainFrame', () => {

    it('should render the MainFrame', () => {
        const history = createMemoryHistory({ initialEntries: ['/home'] });
        const result = render(

            <Router location={history.location} navigator={history}>
                <MainFrame />
            </Router>
        );
        expect(result).toBeTruthy();
    });
});