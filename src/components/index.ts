import { Dashboard } from "./Dashboard/Dashboard";
import { DropdownLanguage } from "./DropdownLanguage/DropdownLanguage";
import { Text } from "./Text/Text";
//import { Contactform } from "./Form/Contactform";
/**
 * Unique components. Structure as follows: <componentname>/<componentname.tsx>, <componentname.test.tsx>, ...
 */
//export default {Dashboard, Contactform};
export default Dashboard;
export { default as Contactform } from './Form/Contactform';
export {Dashboard, DropdownLanguage, Text};
