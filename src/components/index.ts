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
import MenuBar from "./MenuBar/MenuBar";
import Footer from "./Footer/Footer";
import LocalNav from "./LocalNav/LocalNav";
import BreadcrumbsContainer from "./BreadcrumbsContainer/BreadcrumbsContainer";
export { SnackbarTest } from "./SnackbarTest/SnackbarTest";
import SnackbarEntry, {
  SnackbarProps,
  SeverityType,
} from "./SnackbarEntry/SnackbarEntry";
import SnackbarContainer from "./SnackbarContainer/SnackbarContainer";
/**
 * Unique components. Structure as follows: <componentname>/<componentname.tsx>, <componentname.test.tsx>, ...
 */

export {
  BreadcrumbsContainer,
  LocalNav,
  MenuBar,
  Footer,
  DropdownLanguage,
  Text,
  LoginForm,
  SnackbarEntry,
  SnackbarContainer,
  TableILS,
  GraphILS,
  ResultDescriptionILS,
  TableListK,
  GraphListK,
  ResultDescriptionListK,
  QuestionnaireResultsModal,
};
export type { SnackbarProps, SeverityType };
