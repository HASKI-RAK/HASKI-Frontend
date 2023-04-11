import renderer, { act } from "react-test-renderer";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return { t: (key: string) => key };
  },
}));

test("Test default params", () => {

  const form = render(
    <ContactForm />
  );
  const submitButton = form.getByText("components.ContactForm.ContactForm.submit");
  const input = form.getByRole("textbox");
  fireEvent.change(input, { target: { value: "text" } });
  fireEvent.click(submitButton);

  
});

test("submits form correctly", () => {
  const send = jest.fn();
  
  const form = render(
    <ContactForm defaultWidth={""} onsendtoBackend={send}/>
  );
  const submitButton = form.getByText("components.ContactForm.ContactForm.submit");
  const input = form.getByRole("textbox");
  fireEvent.change(input, { target: { value: "text" } });
  fireEvent.click(submitButton);
  
  expect(send).toBeCalled();
  
});

test("submits form incorrectly", () => {
  const send = jest.fn();
  const text = "60%";
  const form = render(
    <ContactForm defaultWidth={text} onsendtoBackend={send}/>
  );
  const submitButton = form.getByText("components.ContactForm.ContactForm.submit");

  fireEvent.click(submitButton);
  expect(typeof text).toBe("string");
  expect (send).not.toBeCalled();
  
  
});
test("check InputChange function", () => {

  const { getAllByRole, getByRole } = render(
    <ContactForm defaultWidth={""} />
  );
  fireEvent.mouseDown(getByRole("button", { name: /Topic/i }));
  act(() => {
    getAllByRole("option")[0].click();
  });
  expect(getByRole("button", { name: /Topic/i })).toHaveTextContent(
    /Learningelement/i
  );
});

test("renders correctly and matches snapshot", () => {

  const tree = renderer
    .create(<ContactForm defaultWidth={""} />)
    .toJSON();
    
});
