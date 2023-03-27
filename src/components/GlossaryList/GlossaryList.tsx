import { GlossaryEntry, GlossaryEntryProps } from "@components";

type GlossaryListProps = {
  glossaryEntries?: GlossaryEntryProps[];
  expandedList?: string[];
  setExpandedList?: (newExpandedList: string[]) => void;
};

const GlossaryList = (props: GlossaryListProps) => {
  return (
    <>
      {props.glossaryEntries?.map((glossaryEntry) => (
        <GlossaryEntry
          key={glossaryEntry.term}
          expandedList={props.expandedList}
          setExpandedList={props.setExpandedList}
          {...glossaryEntry}
        />
      ))}
    </>
  );
};

export default GlossaryList;
