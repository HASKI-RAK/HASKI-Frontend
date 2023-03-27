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
import GlossaryList from "./GlossaryList/GlossaryList";
import GlossaryEntry, {
  GlossaryEntryProps,
} from "./GlossaryEntry/GlossaryEntry";
import Filter from "./Filter/Filter";
import Searchbar from "./Searchbar/Searchbar";
import GlossaryIndex from "./GlossaryIndex/GlossaryIndex";
import GlossaryForm from "./GlossaryForm/GlossaryForm";
import { ToggleButtonList } from "./ToggleButtonList/ToggleButtonList";

/**
 * Unique components. Structure as follows: <componentname>/<componentname.tsx>, <componentname.test.tsx>, ...
 */
export {
  DropdownLanguage,
  Text,
  LoginForm,
  GlossaryList,
  GlossaryEntry,
  Filter,
  Searchbar,
  GlossaryIndex,
  GlossaryForm,
  ToggleButtonList,
  TableILS,
  GraphILS,
  ResultDescriptionILS,
  TableListK,
  GraphListK,
  ResultDescriptionListK,
  QuestionnaireResultsModal,
};
export type { GlossaryEntryProps };
