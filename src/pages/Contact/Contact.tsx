import { useState, useContext } from 'react'
import { ContactForm } from '@components'
import { AuthContext } from '@services'
import { ContactHookProps, ContactHookReturn, useContact as _useContact } from './Contact.hooks'

export type ContactProps = {
  /**
   * {@link useContact | Contact hook} to control the submit on the page.
   * @defaultValue {@link _useContact}
   */
  useContact?: (props: ContactHookProps) => ContactHookReturn
}

/**
 * # Contact Page
 * Displays a Contactform for te user to send feedback. Its in the mainframe centred on the screen.
 * @param props - Dependency injects {@link useContact} to control the sumbit on the page. Also displays a lodaing indicator when submitting.
 * @category Pages
 */

export const Contact = ({ useContact = _useContact }: ContactProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { isAuth } = useContext(AuthContext)

  const { onSubmitHandler } = useContact({ setIsLoading })
  return (
    <>
      (isAuth) && (<ContactForm onSubmit={onSubmitHandler} isLoading={isLoading} />)
    </>
  )
}
export default Contact
