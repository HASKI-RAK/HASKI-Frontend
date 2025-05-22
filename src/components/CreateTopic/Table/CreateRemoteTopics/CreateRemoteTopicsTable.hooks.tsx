import { useCallback, useMemo } from 'react'
import { RemoteTopics } from '@core'

type useCreateRemoteTopicsTableProps = {
  onTopicChange: (selectedTopics: RemoteTopics[]) => void
  selectedTopics: RemoteTopics[]
}

export const useCreateRemoteTopicsTable = ({ onTopicChange, selectedTopics }: useCreateRemoteTopicsTableProps) => {
  const handleTopicChange = useCallback(
    (topic: RemoteTopics, checked: boolean) => {
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
