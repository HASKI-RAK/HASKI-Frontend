import { useCallback, useState } from 'react'
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography
} from '@common/components'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

/**
 * @typedef {Object} FilterProps
 * @property {string} [label] - The label text of the filter.
 * @property {string[]} [options] - The options of the filter for the user to select from.
 * @property {string[]} [selectedOptions] - The options that are currently selected.
 * @property {function} [setSelectedOptions] -  The function to set the selected options.
 */
type FilterProps = {
  label?: string
  options?: string[]
  selectedOptions?: string[]
  setSelectedOptions?: (selectedElements?: string[] | string) => void
}

/**
 * Filter presents a component for the user to select elements from a list of options.
 * It can be used as a standalone component on a page.
 * @param props - Props containing label, options, selectedOptions and setSelectedOptions of the filter.
 * @returns {JSX.Element} - The filter component.
 * @category Components
 */
const Filter = (props: FilterProps) => {
  const [open, setOpen] = useState(false)

  const handleChange = useCallback((event: SelectChangeEvent<typeof props.selectedOptions>) => {
    if (props.setSelectedOptions) {
      props.setSelectedOptions(event.target.value)
    }
  }, [])

  // Renders the selected options as chips.
  const renderValue = useCallback(
    (selected: string[]) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.map((value: string) => (
          <Chip key={value} role="chip" label={value} size="small" />
        ))}
      </Box>
    ),
    []
  )

  return (
    <FormControl fullWidth>
      <InputLabel>
        <Typography>{props.label}</Typography>
      </InputLabel>
      <Select
        multiple
        value={props.selectedOptions}
        onClick={() => setOpen(!open)}
        onChange={handleChange}
        input={<OutlinedInput label={props.label} />}
        inputProps={{ 'data-testid': 'filter' }}
        renderValue={renderValue}
        MenuProps={MenuProps}>
        {props.options &&
          Array.from(props.options).map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={props.selectedOptions && props.selectedOptions.indexOf(option) >= 0} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default Filter
