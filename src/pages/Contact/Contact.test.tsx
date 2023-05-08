import React from "react";
import { Contact } from "@pages";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { render, fireEvent, act } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return { t: (key: string) => {
      if(key == "components.ContactForm.types")
      {
        const reportTypes = [
          { value: "1", label: "issue" },
          { value: "2", label: "Spam" }
        ];
        return reportTypes;
      }
      else if(key == "components.ContactForm.topics")
      {
        return [
          { value: "1", label: "Learningelement" },
          { value: "2", label: "Sexism" }
        ];
      }
      return key; 
    }};
  },
}));

describe("Test Contactpage", () => {
  const submit = jest.fn();
  test("sends onSubmit to Contactform", () => {
    const form = render(<Contact onSubmit={submit}/>);
    
    const submitButton = form.getByText("components.ContactForm.submit");
    const input = form.getByRole("textbox");
    fireEvent.change(input, { target: { value: "text" } });
    fireEvent.mouseDown(form.getByRole("button", { name: /Topic/i }));
    act(() => {
      form.getAllByRole("option")[0].click();
    });
  fireEvent.click(submitButton);
    expect(submit).toBeCalled();
  });
  test("not sending",()=>{
    render(<Contact onSubmit={submit}/>);
    expect (submit).not.toBeCalled();
  });

  test("test default no action submit", () => {
    const form = render(<Contact />);

    const input = form.getByRole("textbox");
    fireEvent.change(input, { target: { value: "text" } });
    fireEvent.mouseDown(form.getByRole("button", { name: /Topic/i }));
    act(() => {
      form.getAllByRole("option")[0].click();
    });

    const submitButton = form.getByText("components.ContactForm.submit");
    fireEvent.click(submitButton);
  });
});