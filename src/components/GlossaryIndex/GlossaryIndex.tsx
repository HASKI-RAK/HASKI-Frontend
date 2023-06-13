import { DefaultToggleButtonGroup as ToggleButtonGroup } from '@common/components'
import { ToggleButtonList } from '@components'
import React, { useCallback } from 'react'

export type GlossaryIndexProps = {
  orientation?: 'horizontal' | 'vertical'
  indexElements?: string[]
  selectedIndexElement?: string
  setSelectedIndexElement?: (indexElement: string) => void
}

const GlossaryIndex = (props: GlossaryIndexProps) => {
  const handleChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, newSelectedIndexElement: string) => {
      props.setSelectedIndexElement?.(newSelectedIndexElement)
    },
    [props]
  )

  return (
    <ToggleButtonGroup
      aria-label="glossary index"
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

export default GlossaryIndex
