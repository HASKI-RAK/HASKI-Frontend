import { ToggleButton, Box } from '@common/components'
import { memo } from 'react'

/**
 * @prop toggleButtonList - The list of elements to be displayed in the toggle button list
 * @prop selectedElement - The currently selected element of the toggle button list
 * @interface
 */
type ToggleButtonListProps = {
  toggleButtonList?: string[]
  selectedElement?: string
}

/**
 * ToggleButtonListComponent component.
 *
 * @param props - The props containing the toggleButtonList and the selectedElement of the ToggleButtonList aswell as the props of a ToggleButton.
 *
 * @remarks
 * ToggleButtonListComponent presents a component that can be used to display a list of toggle buttons with a selectable element.
 * ToggleButtonListComponent can be used as a standalone component on a page.
 *
 * @category Components
 */
const ToggleButtonListComponent = ({ toggleButtonList, selectedElement, ...props }: ToggleButtonListProps) => {
  return (
    <Box>
      {toggleButtonList?.map((toggleButtonElement: string) => (
        <ToggleButton
          {...props}
          key={toggleButtonElement}
          value={toggleButtonElement}
          selected={toggleButtonElement === selectedElement}>
          {toggleButtonElement}
        </ToggleButton>
      ))}
    </Box>
  )
}

/**
 * ToggleButtonList component.
 *
 * @param props - Props containing a ToggleButtonListComponent component and the muiName.
 *
 * @remarks
 * https://mui.com/material-ui/guides/composition/
 * https://stackoverflow.com/questions/57712682/react-functional-component-static-property
 *
 * @category Components
 */
export const ToggleButtonList = memo(
  Object.assign(ToggleButtonListComponent, {
    muiName: 'ToggleButton'
  })
)
