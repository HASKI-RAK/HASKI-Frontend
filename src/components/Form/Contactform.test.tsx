import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Contactform } from "./Contactform";

jest.mock('react-i18next', () => ({
    useTranslation: () => {return {t: (key: string) => key };}, }));

test("submits form correctly", () => {
    const mockCallback = jest.fn();
    
    const form=render(<Contactform sendtoBackend={()=>mockCallback()}/>);
    const submitButton = form.getByText("components.contactform.submit");
    const input = form.getByRole("textbox");
    
    //fireEvent.select(form.getByLabelText("contactform.topic"), { target: { value: "other" } });
    //fireEvent.change(form.getByLabelText("components.contactform.briefDescription"), { target: { value: "text" } });
    fireEvent.change(input, { target: { value: "text" } });
    fireEvent.click(submitButton);
    expect(mockCallback).toBeCalled();
});

test("submits form incorrectly", () => {
    const mockCallback = jest.fn();
    
    const form=render(<Contactform sendtoBackend={()=>mockCallback()}/>);
    const submitButton = form.getByText("components.contactform.submit");

    fireEvent.click(submitButton);
    expect(mockCallback).not.toBeCalled();
});

test("renders correctly and matches snapshot", () => {
  const mockCallback = jest.fn();
  
   const tree = renderer.create(<Contactform width="100%" sendtoBackend={()=>mockCallback()} />).toJSON();
  
  expect(tree).toMatchSnapshot();
});
