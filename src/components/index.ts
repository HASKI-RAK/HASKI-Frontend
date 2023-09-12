import { DropdownLanguage } from './DropdownLanguage/DropdownLanguage'
import { TableILS } from './Questionnaire/TableILS'
import { GraphILS } from './Questionnaire/GraphILS'
import { ResultDescriptionILS } from './Questionnaire/ResultDescriptionILS'
import { TableListK } from './Questionnaire/TableListK'
import { GraphListK } from './Questionnaire/GraphListK'
import { ResultDescriptionListK } from './Questionnaire/ResultDescriptionListK'
import { QuestionnaireResultsModal } from './Questionnaire/QuestionnaireResultsModal'
import { Text } from './Text/Text'

import ContactForm from './ContactForm/ContactForm'
import { ImprintContent } from './Imprint/ImprintContent'
import LoginForm from './LoginForm/LoginForm'
import MenuBar from './MenuBar/MenuBar'

import Footer from './Footer/Footer'
import LocalNav from './LocalNav/LocalNav'
import BreadcrumbsContainer from './BreadcrumbsContainer/BreadcrumbsContainer'
import ProjectDescriptionContent from './ProjectDescriptionContent/ProjectDescriptionContent'
import ProjectDescriptionCard from './ProjectDescriptionCard/ProjectDescriptionCard'
import ProjectDescriptionStepper from './ProjectDescriptionStepper/ProjectDescriptionStepper'
import SnackbarMessage, { SnackbarMessageProps, SeverityType } from './SnackbarMessage/SnackbarMessage'
import SnackbarContainer from './SnackbarContainer/SnackbarContainer'
import SnackbarTransition from './SnackbarTransition/SnackbarTransition'
import PrivacyModal from './PrivacyModal/PrivacyModal'
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
  SnackbarMessage,
  SnackbarContainer,
  TableILS,
  GraphILS,
  ResultDescriptionILS,
  TableListK,
  GraphListK,
  ResultDescriptionListK,
  QuestionnaireResultsModal,
  ContactForm,
  ProjectDescriptionContent,
  ProjectDescriptionCard,
  ProjectDescriptionStepper,
  SnackbarTransition,
  ImprintContent,
  PrivacyModal
}
export type { SnackbarMessageProps, SeverityType }
