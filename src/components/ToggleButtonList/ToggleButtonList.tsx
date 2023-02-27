import {
    DefaultToggleButton as ToggleButton,
    DefaultBox as Box
} from "@common/components"

const ToggleButtonListComponent = ({toggleButtonList, selectedElement, ...props}: ToggleButtonListProps) => {
    return (
        <Box>
            {
                toggleButtonList && toggleButtonList.map((toggleButtonElement: string) => (
                    <ToggleButton {...props} value={toggleButtonElement} selected={toggleButtonElement === selectedElement}>
                        {
                            toggleButtonElement
                        }
                    </ToggleButton>
                ))
            }
        </Box>
    )
}

interface ToggleButtonListProps {
    toggleButtonList?: string[]
    selectedElement?: string
}

// https://mui.com/material-ui/guides/composition/
// https://stackoverflow.com/questions/57712682/react-functional-component-static-property
export const ToggleButtonList = Object.assign(ToggleButtonListComponent, { muiName: "ToggleButton" })