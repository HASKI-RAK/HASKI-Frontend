import { ContactForm } from "@components";
import { useContact as _useContact, ContactHookReturn } from "./Contact.hooks";

export type ContactProps = {
  onSubmit?: () => void;
  useContact?: () => ContactHookReturn;
};

export const Contact = ({useContact = _useContact, ...props}: ContactProps) => {
  const { submit } = useContact();
  const {onSubmit=submit}=props;
  return <ContactForm onSubmit={onSubmit}/>;
};
export default Contact;
