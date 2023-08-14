import { ContactForm } from '@components'
import { useContact as _useContact, ContactHookReturn, ContactHookProps } from './Contact.hooks'
import { useState } from 'react'

export type ContactProps = {
  useContact?: (props: ContactHookProps) => ContactHookReturn
}

export const Contact = ({ useContact = _useContact }: ContactProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { onSubmitHandler } = useContact({ setIsLoading })
  return <ContactForm onSubmit={onSubmitHandler} isLoading={isLoading} />
}
export default Contact
