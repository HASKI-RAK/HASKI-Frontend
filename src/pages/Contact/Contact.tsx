import { ContactForm } from '@components'
import { useContact as _useContact, ContactHookReturn } from './Contact.hooks'

export type ContactProps = {
  useContact?: () => ContactHookReturn
}

export const Contact = ({ useContact = _useContact }: ContactProps) => {
  const { onSubmitHandler } = useContact()
  return <ContactForm onSubmit={onSubmitHandler} />
}
export default Contact
