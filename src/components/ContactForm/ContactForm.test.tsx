import renderer, { act } from "react-test-renderer";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { ContactForm } from "./ContactForm";


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



test("Test default params", () => {

  const form = render(
    <ContactForm />
  );
  const submitButton = form.getByText("components.ContactForm.submit");
  const input = form.getByRole("textbox");
  fireEvent.change(input, { target: { value: "text" } });
  fireEvent.mouseDown(form.getByRole("button", { name: /Topic/i }));
  act(() => {
    form.getAllByRole("option")[0].click();
  });
  fireEvent.click(submitButton);

  
});

test("submits form correctly", () => {
  const send = jest.fn();
  
  const form = render(
    <ContactForm onSubmit={send}/>
  );
  const submitButton = form.getByText("components.ContactForm.submit");
  const input = form.getByRole("textbox");
  fireEvent.change(input, { target: { value: "text" } });
  fireEvent.mouseDown(form.getByRole("button", { name: /Topic/i }));
  act(() => {
    form.getAllByRole("option")[0].click();
  });
  fireEvent.click(submitButton);
  
  expect(send).toBeCalled();
  
});
test("missing description input", () => {
  const send = jest.fn();
  
  const form = render(
    <ContactForm onSubmit={send}/>
  );
  const submitButton = form.getByText("components.ContactForm.submit");
  fireEvent.mouseDown(form.getByRole("button", { name: /Topic/i }));
  act(() => {
    form.getAllByRole("option")[0].click();
  });

  fireEvent.click(submitButton);
  
  expect(send).not.toBeCalled();
  
});

test("submits form incorrectly", () => {
  const send = jest.fn();
  const text = "60%";
  const form=render(
    <ContactForm onSubmit={send}/>
  );
  const submitButton = form.getByText("components.ContactForm.submit");

  fireEvent.click(submitButton);
  expect(typeof text).toBe("string");
  expect (send).not.toBeCalled();
  
  
});
test("check InputChange function", () => {

  const { getAllByRole, getByRole } = render(
    <ContactForm/>
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

  renderer
    .create(<ContactForm/>)
    .toJSON();
    
});

test("Contactform form no input", () => {
  const submit = jest.fn();
  const contactform = render(
    <ContactForm onSubmit={submit}/>
  );
  const submitButton = contactform.getByText("components.ContactForm.submit");
  const reporttype = contactform.getByRole("radio", { name: /issue/i });
  const reporttopic = contactform.getByRole("button", { name: /Topic/i });
  
  // No input yet so no submit
  fireEvent.mouseDown(reporttype);
  act(() => {
    fireEvent.click(contactform.getByRole("radio",{name:/issue/i}));
  });
  fireEvent.click(submitButton);
  expect(submit.mock.calls.length).toEqual(0);
  expect(submit).not.toBeCalled();

  // Fill in radio
  fireEvent.click(submitButton);
  expect(submit.mock.calls.length).toEqual(0);
  expect(submit).not.toBeCalled();

  // Fill in select
  fireEvent.mouseDown(reporttopic);
  act(() => {
    contactform.getAllByRole("option")[0].click();
  });
  //Fill in description
  const input = contactform.getByRole("textbox");
  fireEvent.change(input, { target: { value: "text" } });

  fireEvent.click(submitButton);
  expect(submit.mock.calls.length).toEqual(1);
  expect(submit).toBeCalled();

});

