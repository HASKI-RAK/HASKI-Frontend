import { ToggleButton, Box } from '@common/components'

/**
 * @typedef {object} ToggleButtonListProps
 * @property {string[]} [toggleButtonList] - The list of elements to be displayed in the toggle button list
 * @property {string} [selectedElement] - The currently selected element of the toggle button list
 */
type ToggleButtonListProps = {
  toggleButtonList?: string[]
  selectedElement?: string
}

/**
 * ToggleButtonListComponent presents a component that can be used to display a list of toggle buttons with a selectable element.
 * ToggleButtonListComponent can be used as a standalone component on a page.
 * @param params - The props containing the toggleButtonList and the selectedElement of the ToggleButtonList aswell as the props of a ToggleButton.
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

// https://mui.com/material-ui/guides/composition/
// https://stackoverflow.com/questions/57712682/react-functional-component-static-property
/**
 * @returns {JSX.Element} - The ToggleButtonList component
 * @category components
 */
export const ToggleButtonList = Object.assign(ToggleButtonListComponent, {
  muiName: 'ToggleButton'
})
