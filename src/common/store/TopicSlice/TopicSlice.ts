import { TopicLearningElement } from '@core'
import { StateCreator } from 'zustand'

export default interface TopicSlice {
  topicLearningElements: TopicLearningElement[]
  getTopicLearningElements: () => Promise<TopicLearningElement[]>
}

export const createTopicSlice: StateCreator<TopicSlice, [], [], TopicSlice> = (set, get) => ({
  topicLearningElements: [],
  getTopicLearningElements: async (fetch: () => Promise<TopicLearningElement[]>) => {
    return (
      get().topicLearningElements ??
      fetch(args)
        .then((response) => response.json())
        .then((value: TopicLearningElement[]) => {
          set({ topicLearningElements: value })
          return value
        })
    )
  }
})
