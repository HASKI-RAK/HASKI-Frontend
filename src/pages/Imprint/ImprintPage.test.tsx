import {render} from "@testing-library/react";
import {ImprintPage} from "@pages";

describe('MainFrame', () => {
    it('should render the MainFrame', () => {

        const result = render(<ImprintPage />)
        expect(result).toBeTruthy()
    })
})