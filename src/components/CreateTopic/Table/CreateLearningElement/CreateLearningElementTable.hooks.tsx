import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { RemoteLearningElement, RemoteTopics } from '@core'

/**
 * @category Hooks
 * @interface
 */

/**
 * Props for the `useCreateLearningElementTable` hook.
 */
type UseCreateLearningElementTableProps = {
  /**
   * Currently selected learning elements grouped by their topic ID.
   */
  selectedLearningElements: { [topicId: number]: RemoteLearningElement[] }

  /**
   * Handler function called whenever the selection of learning elements changes.
   *
   * @param selectedLearningElements - The updated selection state.
   */
  onLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void

  /**
   * List of selected topics, each containing learning elements.
   */
  selectedTopics: RemoteTopics[]

  /**
   * React state dispatcher to manage the "Select All" checkbox status.
   */
  setSelectAllLearningElementsChecked: Dispatch<SetStateAction<boolean>>
}

/**
 * Custom hook to manage selection logic for learning elements within topics,
 * such as selecting individual elements or toggling all at once.
 *
 * This hook centralizes checkbox selection logic, reducing duplication and
 * simplifying UI components.
 *
 * @param props - See {@link UseCreateLearningElementTableProps}
 * @category Hooks
 *
 * @returns Functions for checkbox state management:
 * - `handleLearningElementCheckboxChange`: Handles individual checkbox changes.
 * - `handleToggleAll`: Selects or deselects all learning elements across topics.
 *
 * @example
 * const { handleLearningElementCheckboxChange, handleToggleAll } = useCreateLearningElementTable({
 *   selectedLearningElements,
 *   onLearningElementChange,
 *   selectedTopics,
 *   setSelectAllLearningElementsChecked
 * });
 */
export const useCreateLearningElementTable = ({
  selectedLearningElements,
  onLearningElementChange,
  selectedTopics,
  setSelectAllLearningElementsChecked
}: UseCreateLearningElementTableProps) => {
  /**
   * Handles the change event for individual learning element checkboxes.
   *
   * @param topicId - The ID of the topic containing the learning element.
   * @param element - The learning element whose checkbox changed.
   * @param checked - The new checked state.
   */
  const handleLearningElementCheckboxChange = (topicId: number, element: RemoteLearningElement, checked: boolean) => {
    const updatedSelectedElements = {
      ...selectedLearningElements,
      [topicId]: checked
        ? [...(selectedLearningElements[topicId] || []), element]
        : selectedLearningElements[topicId].filter((el) => el.lms_id !== element.lms_id)
    }

    onLearningElementChange(updatedSelectedElements)
  }

  /**
   * Selects all learning elements across all selected topics.
   */
  const handleSelectAllLearningElements = useCallback(() => {
    const allLearningElements = selectedTopics.reduce(
      (accumulator, topic) => ({
        ...accumulator,
        [topic.topic_lms_id]: topic.lms_learning_elements
      }),
      {} as { [key: number]: RemoteLearningElement[] }
    )

    onLearningElementChange(allLearningElements)
  }, [onLearningElementChange, selectedTopics])

  /**
   * Deselects all learning elements across all selected topics.
   */
  const handleDeselectAllLearningElements = useCallback(() => {
    const clearedElements = selectedTopics.reduce(
      (accumulator, topic) => ({
        ...accumulator,
        [topic.topic_lms_id]: []
      }),
      {} as { [key: number]: RemoteLearningElement[] }
    )

    onLearningElementChange(clearedElements)
  }, [onLearningElementChange, selectedTopics])

  /**
   * Toggles the "Select All" checkbox state and updates learning elements selection accordingly.
   *
   * @param isChecked - Boolean indicating whether all checkboxes should be selected or deselected.
   */
  const handleToggleAll = (isChecked: boolean) => {
    setSelectAllLearningElementsChecked(isChecked)
    if (isChecked) {
      handleSelectAllLearningElements()
    } else {
      handleDeselectAllLearningElements()
    }
  }

  return useMemo(
    () => ({
      handleLearningElementCheckboxChange,
      handleToggleAll
    }),
    [handleLearningElementCheckboxChange, handleToggleAll]
  )
}
