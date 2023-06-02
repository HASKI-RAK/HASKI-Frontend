import { useContext } from 'react'
import { AuthContext } from '@services'
import { GlossaryContent } from '@components'
import { DefaultSkeleton as Skeleton } from '@common/components'

const Glossary = () => {
  // const authcontext = useContext(AuthContext)
  /*authcontext.isAuth ? <Skeleton /> : */
  return <GlossaryContent />
}

export default Glossary
