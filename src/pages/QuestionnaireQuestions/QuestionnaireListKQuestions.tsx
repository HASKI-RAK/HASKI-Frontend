import {useContext} from "react";
import { AuthContext } from "@services"
import {Skeleton} from "@mui/material";
import {TableListKQuestions} from "../../components/Questionnaire/QuestionnaireQuestions/TableListKQuestions";

export const QuestionnaireListKQuestions = () => {
    const authcontext = useContext(AuthContext)

    return(
        authcontext.isAuth ? <Skeleton /> : <TableListKQuestions />
    )
}

export default QuestionnaireListKQuestions
