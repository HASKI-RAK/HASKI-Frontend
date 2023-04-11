import renderer, { act } from "react-test-renderer";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Contactform } from "./Contactform";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return { t: (key: string) => key };
  },
}));

test("Test default params", () => {

  const form = render(
    <Contactform />
  );
  const submitButton = form.getByText("components.form.contactform.submit");
  const input = form.getByRole("textbox");
  fireEvent.change(input, { target: { value: "text" } });
  fireEvent.click(submitButton);

  
});

test("submits form correctly", () => {
  const send = jest.fn();
  
  const form = render(
    <Contactform defaultWidth={""} onsendtoBackend={send}/>
  );
  const submitButton = form.getByText("components.form.contactform.submit");
  const input = form.getByRole("textbox");
  fireEvent.change(input, { target: { value: "text" } });
  fireEvent.click(submitButton);
  
  expect(send).toBeCalled();
  
});

test("submits form incorrectly", () => {
  const send = jest.fn();
  const text = "60%";
  const form = render(
    <Contactform defaultWidth={text} onsendtoBackend={send}/>
  );
  const submitButton = form.getByText("components.form.contactform.submit");

  fireEvent.click(submitButton);
  expect(typeof text).toBe("string");
  expect (send).not.toBeCalled();
  
  
});
test("check InputChange function", () => {

  const { getAllByRole, getByRole } = render(
    <Contactform defaultWidth={""} />
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
    .create(<Contactform defaultWidth={""} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});
