import { ToggleButtonGroup } from '@common/components'
import React, { useCallback, memo } from 'react'
import { ToggleButtonList } from '@components'

/**
 * @typedef {object} GlossaryIndexProps
 * @property {'horizontal' | 'vertical'} [orientation] - The orientation of the index component
 * @property {string[]} [indexElements] - The elements to be displayed in the index
 * @property {string} [selectedIndexElement] - The currently selected element
 * @property {function} [setSelectedIndexElement] - The function to set the currently selected element
 */
export type GlossaryIndexProps = {
  orientation?: 'horizontal' | 'vertical'
  indexElements?: string[]
  selectedIndexElement?: string
  setSelectedIndexElement?: (indexElement: string) => void
}

/**
 * GlossaryIndex presents a component where elements are displayed that can be selected to filter the glossary.
 * It can be used as a standalone component on a page.
 * @param props - Props containing the orientation, indexElements of the index aswell as selectedIndexElement and setSelectedIndexElement.
 * @returns {JSX.Element} - The GlossaryIndex component
 * @category Components
 */
const GlossaryIndex = (props: GlossaryIndexProps) => {
  const handleChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newSelectedIndexElement: string) => {
      props.setSelectedIndexElement?.(newSelectedIndexElement)
    },
    [props.setSelectedIndexElement]
  )

  return (
    <ToggleButtonGroup
      exclusive
      onChange={handleChange}
      orientation={props.orientation}
      size="medium"
      value={props.selectedIndexElement}>
      <ToggleButtonList
        toggleButtonList={props.indexElements}
        selectedElement={props.selectedIndexElement}
        data-testid="glossaryIndexButton"
      />
    </ToggleButtonGroup>
  )
}

export default memo(GlossaryIndex)
