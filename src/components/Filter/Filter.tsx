import { useCallback, useState } from "react";
import {
  DefaultBox as Box,
  DefaultCheckbox as Checkbox,
  DefaultChip as Chip,
  DefaultFormControl as FormControl,
  DefaultInputLabel as InputLabel,
  DefaultListItemText as ListItemText,
  DefaultMenuItem as MenuItem,
  DefaultOutlinedInput as OutlinedInput,
  DefaultSelect as Select,
  DefaultSelectChangeEvent as SelectChangeEvent,
  DefaultTypography as Typography,
} from "@common/components";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type FilterProps = {
  label?: string;
  options?: string[];
  selectedOptions?: string[];
  setSelectedOptions?: (selectedElements?: string[] | string) => void;
};

const Filter = (props: FilterProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof props.selectedOptions>) => {
      if (props.setSelectedOptions) {
        props.setSelectedOptions(event.target.value);
      }
    },
    []
  );

  const renderValue = useCallback(
    (selected: string[]) => (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {selected.map((value: string) => (
          <Chip key={value} role="chip" label={value} size="small" />
        ))}
      </Box>
    ),
    []
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="filter-label">
        <Typography>{props.label}</Typography>
      </InputLabel>
      <Select
        labelId="filter-label"
        id="filter"
        multiple
        value={props.selectedOptions}
        onClick={() => setOpen(!open)}
        onChange={handleChange}
        input={<OutlinedInput label={props.label} />}
        inputProps={{ "data-testid": "filter" }}
        renderValue={renderValue}
        MenuProps={MenuProps}
      >
        {props.options?.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox
              checked={
                props.selectedOptions &&
                props.selectedOptions.indexOf(option) > -1
              }
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
