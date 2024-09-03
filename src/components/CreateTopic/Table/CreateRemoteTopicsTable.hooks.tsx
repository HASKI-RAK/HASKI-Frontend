import { useCallback, useMemo } from 'react'
import { RemoteTopic } from '@core'

type useCreateRemoteTopicsTableProps = {
  onTopicChange: (selectedTopics: RemoteTopic[]) => void
  selectedTopicsModal: RemoteTopic[]
}

export const useCreateRemoteTopicsTable = ({ onTopicChange, selectedTopicsModal }: useCreateRemoteTopicsTableProps) => {
  const handleTopicChange = useCallback(
    (topic: RemoteTopic, checked: boolean) => {
      const updatedTopics = checked
        ? [...selectedTopicsModal, topic]
        : selectedTopicsModal.filter((t) => t.topic_lms_id !== topic.topic_lms_id)
      onTopicChange(updatedTopics)
    },
    [onTopicChange, selectedTopicsModal]
  )

  return useMemo(
    () => ({
      handleTopicChange
    }),
    [handleTopicChange]
  )
}
