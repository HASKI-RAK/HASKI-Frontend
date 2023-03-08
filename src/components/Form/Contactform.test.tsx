import renderer, { act } from "react-test-renderer";
import "@testing-library/jest-dom";
import { fireEvent, render,screen } from "@testing-library/react";
import { Contactform } from "./Contactform";
import { mockComponent } from "react-dom/test-utils";

jest.mock('react-i18next', () => ({
    useTranslation: () => {return {t: (key: string) => key };}, }));

test("submits form correctly", () => {
    const mockCallback = jest.fn();
    
    const form=render(<Contactform width="50%" sendtoBackend={()=>mockCallback()}/>);
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
    
    const form=render(<Contactform width="50%" sendtoBackend={()=>mockCallback()}/>);
    const submitButton = form.getByText("components.contactform.submit");

    fireEvent.click(submitButton);
    expect(mockCallback).not.toBeCalled();
});
test("check InputChange function", () => {
    const mockCallback = jest.fn();

    const {getAllByRole,getByRole}=render(<Contactform width="50%" sendtoBackend={()=>mockCallback()}/>);
    fireEvent.mouseDown(getByRole("button", { name: /Topic/i }));
    act(() => {
        getAllByRole('option')[0].click();
    })
    expect(getByRole('button',{name:/Topic/i})).toHaveTextContent(/Learningelement/i);
    
   
});

test("renders correctly and matches snapshot", () => {
  const mockCallback = jest.fn();
  
   const tree = renderer.create(<Contactform width="100%" sendtoBackend={()=>mockCallback()} />).toJSON();
  
  
});
