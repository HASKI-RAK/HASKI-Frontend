import { Dashboard } from "./Dashboard/Dashboard";
import { DropdownLanguage } from "./DropdownLanguage/DropdownLanguage";
import { Text } from "./Text/Text";
import { GlossaryList } from "./GlossaryList/GlossaryList";
import { GlossaryEntry, GlossaryEntryProps } from "./GlossaryEntry/GlossaryEntry";
import { GlossaryFilter } from "./GlossaryFilter/GlossaryFilter"
import { GlossarySearch } from "./GlossarySearch/GlossarySearch";
import { GlossaryIndex } from "./GlossaryIndex/GlossaryIndex";

/**
 * Unique components. Structure as follows: <componentname>/<componentname.tsx>, <componentname.test.tsx>, ...
 */
export { Dashboard, DropdownLanguage, Text, GlossaryList, GlossaryEntry, GlossaryFilter, GlossarySearch, GlossaryIndex}; 
export type { GlossaryEntryProps };