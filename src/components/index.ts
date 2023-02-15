import { Dashboard } from "./Dashboard/Dashboard";
import { DropdownLanguage } from "./DropdownLanguage/DropdownLanguage";
import { Text } from "./Text/Text";
import { GlossaryList } from "./GlossaryList/GlossaryList";
import { GlossaryEntry, GlossaryEntryProps } from "./GlossaryEntry/GlossaryEntry";
import { Filter } from "./Filter/Filter"
import { GlossarySearch } from "./GlossarySearch/GlossarySearch";
import { GlossaryIndex } from "./GlossaryIndex/GlossaryIndex";
import { GlossaryForm } from "./GlossaryForm/GlossaryForm";

/**
 * Unique components. Structure as follows: <componentname>/<componentname.tsx>, <componentname.test.tsx>, ...
 */
export { Dashboard, DropdownLanguage, Text, GlossaryList, GlossaryEntry, Filter, GlossarySearch, GlossaryIndex, GlossaryForm }
export type { GlossaryEntryProps }