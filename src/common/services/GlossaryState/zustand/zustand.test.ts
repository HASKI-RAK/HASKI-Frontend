import "@testing-library/jest-dom";
import { useGlossaryStore } from "./zustand";

describe("test useGlossaryStore", () => {
  test("setExpandedList", () => {
    const { setExpandedList } = useGlossaryStore.getState();
    if (setExpandedList !== undefined) {
      setExpandedList(["1", "2", "3", "setExpandedList"]);
      expect(useGlossaryStore.getState().expandedList).toEqual([
        "1",
        "2",
        "3",
        "setExpandedList",
      ]);
    } else {
      fail("setExpandedList is undefined");
    }
  });

  test("setSearchQuery", () => {
    const { setSearchQuery } = useGlossaryStore.getState();
    if (setSearchQuery !== undefined) {
      setSearchQuery("test setSearchQuery");
      expect(useGlossaryStore.getState().searchQuery).toEqual(
        "test setSearchQuery"
      );
    } else {
      fail("setExpandedList is undefined");
    }
  });

  test("setSelectedIndexElement", () => {
    const { setSelectedIndexElement } = useGlossaryStore.getState();
    if (setSelectedIndexElement !== undefined) {
      setSelectedIndexElement("test setSelectedIndexElement");
      expect(useGlossaryStore.getState().selectedIndexElement).toEqual(
        "test setSelectedIndexElement"
      );
    } else {
      fail("setSelectedIndexElement is undefined");
    }
  });

  test("setSelectedTags", () => {
    const { setSelectedTags } = useGlossaryStore.getState();

    if (setSelectedTags !== undefined) {
      setSelectedTags();
      expect(useGlossaryStore.getState().selectedTags).toEqual([]);
      setSelectedTags("1,2,3,setSelectedTags");
      expect(useGlossaryStore.getState().selectedTags).toEqual([
        "1",
        "2",
        "3",
        "setSelectedTags",
      ]);
      setSelectedTags(["1", "2", "3", "setSelectedTags"]);
      expect(useGlossaryStore.getState().selectedTags).toEqual([
        "1",
        "2",
        "3",
        "setSelectedTags",
      ]);
    } else {
      fail("setSelectedTags is undefined");
    }
  });
});
