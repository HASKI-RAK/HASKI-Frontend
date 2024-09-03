import { useCallback, useMemo } from 'react'
import { RemoteTopic } from '@core'

type useCreateRemoteTopicsTableProps = {
  onTopicChange: (selectedTopics: RemoteTopic[]) => void
  selectedTopics: RemoteTopic[]
}

export const useCreateRemoteTopicsTable = ({ onTopicChange, selectedTopics }: useCreateRemoteTopicsTableProps) => {
  const handleTopicChange = useCallback(
    (topic: RemoteTopic, checked: boolean) => {
      const updatedTopics = checked
        ? [...selectedTopics, topic]
        : selectedTopics.filter((t) => t.topic_lms_id !== topic.topic_lms_id)
      onTopicChange(updatedTopics)
    },
    [onTopicChange, selectedTopics]
  )

  return useMemo(
    () => ({
      handleTopicChange
    }),
    [handleTopicChange]
  )
}
