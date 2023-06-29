import { useContext } from 'react'
import { AuthContext } from '@services'
import { TableILSQuestions } from '../../components/Questionnaire/QuestionnaireQuestions/Table/TableILSQuestions'
import { Skeleton } from '@mui/material'

export const QuestionnaireILSQuestionsShort = () => {
  const authcontext = useContext(AuthContext)

  return authcontext.isAuth ? <Skeleton /> : <TableILSQuestions ilsLong={false} />
}

export default QuestionnaireILSQuestionsShort
