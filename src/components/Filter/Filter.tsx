import { memo, useCallback, useState } from 'react'
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
 * @prop label - The label text of the filter.
 * @prop options - The options of the filter for the user to select from.
 * @prop selectedOptions - The options that are currently selected.
 * @prop setSelectedOptions - The function to set the selected options.
 * @category Components
 * @interface
 */
type FilterProps = {
  label?: string
  options?: string[]
  selectedOptions?: string[]
  setSelectedOptions?: (selectedElements?: string[] | string) => void
}

/**
 * Filter component.
 *
 * @param props - Props containing label, options, selectedOptions and setSelectedOptions of the filter.
 *
 * @remarks
 * Filter presents a component for the user to select elements from a list of options.
 * It can be used as a standalone component on a page.
 *
 * @category Components
 */
const Filter = (props: FilterProps) => {
  const [open, setOpen] = useState(false)

  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof props.selectedOptions>) => {
      if (props.setSelectedOptions) {
        props.setSelectedOptions(event.target.value)
      }
    },
    [props]
  )

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
    <>
      {props.selectedOptions && (
        <FormControl fullWidth>
          <InputLabel>
            <Typography>{props.label}</Typography>
          </InputLabel>
          <Select
            id="filter-select"
            multiple
            name="selectedOptions"
            value={props.selectedOptions}
            onClick={() => setOpen(!open)}
            onChange={handleChange}
            input={<OutlinedInput label={props.label} />}
            inputProps={{ 'data-testid': 'filter', id: 'selectedOptions' }}
            renderValue={renderValue}
            MenuProps={MenuProps}>
            {props.options?.map((option) => (
              <MenuItem id={option.concat('-menu-item')} key={option} value={option}>
                <Checkbox checked={props.selectedOptions && props.selectedOptions.indexOf(option) >= 0} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  )
}

export default memo(Filter)
