import { DefaultToggleButton as ToggleButton, DefaultBox as Box } from '@common/components'

type ToggleButtonListProps = {
  toggleButtonList?: string[]
  selectedElement?: string
}

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
export const ToggleButtonList = Object.assign(ToggleButtonListComponent, {
  muiName: 'ToggleButton'
})
