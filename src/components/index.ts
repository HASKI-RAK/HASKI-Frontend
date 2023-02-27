import { Dashboard } from "./Dashboard/Dashboard";
import { DropdownLanguage } from "./DropdownLanguage/DropdownLanguage";
import { Text } from "./Text/Text";
import { GlossaryList } from "./GlossaryList/GlossaryList";
import { GlossaryEntry, GlossaryEntryProps } from "./GlossaryEntry/GlossaryEntry";
import { Filter } from "./Filter/Filter"
import { Searchbar } from "./Searchbar/Searchbar";
import { GlossaryIndex } from "./GlossaryIndex/GlossaryIndex";
import { GlossaryForm } from "./GlossaryForm/GlossaryForm";
import { ToggleButtonList } from "./ToggleButtonList/ToggleButtonList"

/**
 * Unique components. Structure as follows: <componentname>/<componentname.tsx>, <componentname.test.tsx>, ...
 */
export { Dashboard, DropdownLanguage, Text, GlossaryList, GlossaryEntry, Filter, Searchbar, GlossaryIndex, GlossaryForm, ToggleButtonList }
export type { GlossaryEntryProps }