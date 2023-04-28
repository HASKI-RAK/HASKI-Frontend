//  addBear: () => set((state) => ({ bears: state.bears + 1 })),

import create from 'zustand'
import TopicSlice, { createTopicSlice } from '../TopicSlice/TopicSlice'

export const useBoundStore = create<TopicSlice>()((...a) => ({
  ...createTopicSlice(...a)
}))
