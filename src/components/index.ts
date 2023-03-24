import { DropdownLanguage } from "./DropdownLanguage/DropdownLanguage";
import { TableILS } from "./Questionnaire/TableILS";
import { GraphILS } from "./Questionnaire/GraphILS";
import { ResultDescriptionILS } from "./Questionnaire/ResultDescriptionILS";
import { TableListK } from "./Questionnaire/TableListK";
import { GraphListK } from "./Questionnaire/GraphListK";
import { ResultDescriptionListK } from "./Questionnaire/ResultDescriptionListK";
import { QuestionnaireResultsModal } from "./Questionnaire/QuestionnaireResultsModal";
import { Text } from "./Text/Text";
import LoginForm from "./LoginForm/LoginForm";
import { SnackbarTest } from "./SnackbarTest/SnackbarTest"
import { CustomSnackbar } from "./CustomSnackbar/CustomSnackbar"
import SnackbarProvider, { useSnackbar } from "./SnackbarProvider/SnackbarProvider"
import Snackbars from "./Snackbars/Snackbars"
/**
 * Unique components. Structure as follows: <componentname>/<componentname.tsx>, <componentname.test.tsx>, ...
 */

export {
    DropdownLanguage,
    Text,
    LoginForm,
    SnackbarTest,
    CustomSnackbar,
    SnackbarProvider,
    useSnackbar,
    Snackbars,
    TableILS,
    GraphILS,
    ResultDescriptionILS,
    TableListK,
    GraphListK,
    ResultDescriptionListK,
    QuestionnaireResultsModal
}
