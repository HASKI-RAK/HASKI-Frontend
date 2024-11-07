import { useCallback, useMemo } from 'react'
import { CreateAlgorithmTableNameProps } from '@components'

type useCreateAlgorithmTableProps = {
  selectedAlgorithms: { [key: number]: CreateAlgorithmTableNameProps }
  onAlgorithmChange: (selectedAlgorithms: { [key: number]: CreateAlgorithmTableNameProps }) => void
}

export const useCreateAlgorithmTable = ({ selectedAlgorithms, onAlgorithmChange }: useCreateAlgorithmTableProps) => {
  const handleAlgorithmChange = useCallback(
    (topicId: number, topicName: string, newAlgorithm: string) => {
      const updatedAlgorithms = {
        ...selectedAlgorithms,
        [topicId]: { topicName: topicName, algorithmShortName: newAlgorithm }
      }
      onAlgorithmChange(updatedAlgorithms)
    },
    [selectedAlgorithms, onAlgorithmChange]
  )

  return useMemo(
    () => ({
      handleAlgorithmChange
    }),
    [handleAlgorithmChange]
  )
}
