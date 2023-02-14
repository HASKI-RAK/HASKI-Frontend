import { useCallback } from 'react'
import { SelectedTagsState, useSelectedTagsStore } from "@services/SelectedTagState";
import { useTranslation } from "react-i18next"

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
    DefaultTypography as Typography
} from "@common/components"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export const GlossaryFilter = ({
    selectedTagsState = {
        selectedTags: useSelectedTagsStore((state) => state.selectedTags),
        setSelectedTags: useSelectedTagsStore((state) => state.setSelectedTags)
    }
}: GlossaryFilterProps) => {
    const { t } = useTranslation()
    const tags: string[] = t<string>('pages.glossary.tags', { returnObjects: true}) as string[]

    const handleChange = useCallback((event: SelectChangeEvent<typeof selectedTagsState.selectedTags>) => {
        const {
            target: { value },
        } = event

        selectedTagsState.setSelectedTags!((typeof value === 'string') ? value.split(',') : value!)
    }, [])

    return (
        <>
            <FormControl sx={{ m: 1, width: 600 }}>
                <InputLabel id="glossary-filter-label">
                    <Typography>
                        Filter by tag
                    </Typography>
                </InputLabel>
                <Select
                    labelId="glossary-filter-label"
                    id="glossary-filter"
                    multiple
                    value={selectedTagsState.selectedTags}
                    onChange={handleChange}
                    input={<OutlinedInput label="Filter by tag" />}
                    renderValue={useCallback((selected: string[]) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value: string) => (
                                <Chip key={value} label={value} size="small"/>
                            ))}
                        </Box>
                    ), [])}
                    MenuProps={MenuProps}
                >
                    {
                        tags.map((tag) => (
                            <MenuItem key={tag} value={tag}>
                                <Checkbox checked={selectedTagsState.selectedTags!.indexOf(tag) > -1} />
                                <ListItemText primary={tag} />
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </>
    )
}

interface GlossaryFilterProps {
    selectedTagsState?: SelectedTagsState;
}