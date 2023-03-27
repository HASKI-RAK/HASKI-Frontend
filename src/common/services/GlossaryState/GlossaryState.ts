export type GlossaryState = {
  expandedList?: string[];
  searchQuery?: string;
  selectedIndexElement?: string;
  selectedTags?: string[];
  setExpandedList?: (newExpandedList: string[]) => void;
  setSearchQuery?: (newSearchQuery: string) => void;
  setSelectedIndexElement?: (newSelectedIndexElement: string) => void;
  setSelectedTags?: (newSelectedTags?: string[] | string) => void;
};
