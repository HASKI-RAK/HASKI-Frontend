import React from "react";
import { Contact } from "@pages";
import renderer, {act} from "react-test-renderer";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

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

test("renders correctly and matches snapshot", () => {
  const tree = renderer.create(<Contact />).toJSON();
  expect(tree).toMatchSnapshot();
});
test("sends onSubmit to Contactform", () => {
  
  
  const submit = jest.fn();
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

  expect(form).toMatchSnapshot();
});
test("not sending",()=>{
  const submit = jest.fn();
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