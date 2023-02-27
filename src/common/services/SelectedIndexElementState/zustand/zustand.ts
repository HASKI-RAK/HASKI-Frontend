import create from "zustand"
import { SelectedIndexElementState } from "../SelectedIndexElementState"

export const useSelectedIndexElementStore = create<SelectedIndexElementState>()((set) => ({
    selectedIndexElement : '',
    setSelectedIndexElement: (newSelectedIndexElement) => set({selectedIndexElement: newSelectedIndexElement})
}))