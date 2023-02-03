import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { Box, Chip } from "@mui/material"
// import { SelectedTagsState, useSelectedTagsStore } from "src/common/services/SelectedTagState";
import { DefaultGrid as Grid } from "@common/components"
import { ListSubheader } from "@mui/material"

import { useDefaultCallback as useCallback } from '@hooks/*'
import { GlossaryTagGroupProps } from "../GlossaryTagGroup/GlossaryTagGroup"

import tagGroupsM from "./REE.json"


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

export const GlossaryFilter = (/*{
  selectedTagsState = {
    selectedTags: useSelectedTagsStore
  }
}: GlossaryFilterProps*/) => {

    const [selectedTags, setSelectedTags] = React.useState<string[]>([])
    const tagGroups: GlossaryTagGroupProps[] = tagGroupsM as GlossaryTagGroupProps[]

    const handleChange = useCallback((event: SelectChangeEvent<typeof selectedTags>) => {
        const {
            target: { value },
        } = event

        setSelectedTags(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    }, [])

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="glossary-filter-label">Filter by tag</InputLabel>
                <Select
                    labelId="glossary-filter-label"
                    id="glossary-filter"
                    multiple
                    value={selectedTags}
                    onChange={handleChange}
                    input={<OutlinedInput label="Filter by tag" />}
                    renderValue={useCallback((selected: string[]) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value: string) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    ), [])}
                    MenuProps={MenuProps}
                >
                {
                        <MenuItem key="test" value="test">
                            <Checkbox checked={selectedTags.indexOf("test") > -1} />
                            <ListItemText primary={"test"} />
                        </MenuItem>
                }
                </Select>
            </FormControl>
        </div>
    )
}

/*
(
                                    <MenuItem key={tagGroup.category} value={tagGroup.category}>
                                        <Checkbox checked={selectedTags.indexOf(tagGroup.category) > -1} />
                                        <ListItemText primary={tagGroup.category} />
                                    </MenuItem>
                                )
*/

// interface GlossaryFilterProps {
   // selectedTagsState?: SelectedTagsState
// }

//               <GlossaryTagGroup key={tagGroup.category} category={tagGroup.category} tags={tagGroup.tags}/>

/*

*/


/*
{
            tagGroups.map((tagGroup) => (
                tagGroup.category && (
                    <MenuItem key={tagGroup.category} value={tagGroup.category}>
                      <Checkbox checked={selectedTags.indexOf(tagGroup.category) > -1} />
                      <ListItemText primary={tagGroup.category} />
                    </MenuItem>
                  )
            ))
          }
*/

/*
          {
            <Grid container spacing={1}>
              {
                tagGroups.map((tagGroup) =>(
                    <Grid key={tagGroup.category} item xs={0}>
                        {
                            tagGroup.category && (
                            <MenuItem key={tagGroup.category} value={tagGroup.category}>
                                <Checkbox checked={selectedTags.indexOf(tagGroup.category) > -1} />
                                <ListItemText primary={tagGroup.category} />
                            </MenuItem>
                            )
                        }
                    </Grid>
                ))
              }
            </Grid>
          }
*/


//1.0
/*
                    tagGroups.map((tagGroup) => (
                        <>
                            {
                                tagGroup.category && (<ListSubheader key={tagGroup.category}>{tagGroup.category}</ListSubheader>)
                                
                            }
                        {
                            tagGroup.tags?.map((tag) => (
                                <MenuItem key={tag} value={tag}>
                                    <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                                    <ListItemText primary={tag} />
                                </MenuItem>
                            ))
                        }
                        </>
                    ))
*/

//1.2
/*
                    tagGroups.map((tagGroup) => (
                        <MenuItem>
                        </MenuItem>
                        <>
                            <ListSubheader key={tagGroup.category}>
                                {
                                    tagGroup.category
                                }
                            </ListSubheader>
                            <MenuItem>
                                test
                            </MenuItem>
                            {
                                tagGroup.tags?.map((tag) => (
                                    <MenuItem key={tag} value={tag}>
                                        <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                                        <ListItemText primary={tag} />
                                    </MenuItem>
                                ))
                            }
                        </>
                    ))
*/

