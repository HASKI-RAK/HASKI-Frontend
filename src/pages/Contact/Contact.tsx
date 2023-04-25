import { ContactForm } from "@components";
import { useContact as _useContact, ContactHookReturn } from "./Contact.hooks";

type ContactProps = {
  useContact?: () => ContactHookReturn;
};

export const Contact = ({useContact = _useContact}: ContactProps) => {
  const { onSubmit } = useContact();
  return <ContactForm onSubmit={onSubmit}/>;
};
export default Contact;
