import React, { memo, useCallback } from 'react'

import { ToggleButtonGroup } from '@common/components'
import { ToggleButtonList } from '@components'

/**
 * @prop orientation - The orientation of the index component
 * @prop indexElements - The elements to be displayed in the index
 * @prop selectedIndexElement - The currently selected element
 * @prop setSelectedIndexElement - The function to set the currently selected element
 * @interface
 */
export type GlossaryIndexProps = {
  orientation?: 'horizontal' | 'vertical'
  indexElements?: string[]
  selectedIndexElement?: string
  setSelectedIndexElement?: (indexElement: string) => void
}

/**
 * GlossaryIndex component.
 *
 * @param props - Props containing the orientation, indexElements of the index aswell as selectedIndexElement and setSelectedIndexElement.
 *
 * @remarks
 * GlossaryIndex presents a component where elements are displayed that can be selected to filter the glossary.
 * It can be used as a standalone component on a page.
 *
 * @category Components
 */
const GlossaryIndex = (props: GlossaryIndexProps) => {
  const handleChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newSelectedIndexElement: string) => {
      props.setSelectedIndexElement?.(newSelectedIndexElement)
    },
    [props.setSelectedIndexElement]
  )

  return (
    <ToggleButtonGroup
      id="glossary-index-toggle-button-group"
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
