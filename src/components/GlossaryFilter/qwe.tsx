import { DefaultGrid as Grid, DefaultTypography as Typography } from "@common/components";
import { MenuItem, SelectChangeEvent, Checkbox, Select, OutlinedInput, FormControl, InputLabel, ListItemText, List } from "@mui/material";
import React from "react";
import { useDefaultCallback as useCallback } from "@hooks/*"

import tagGroupsM from "./REE.json";

interface TagProps {
    category?: string;
    tags?: Array<string>;
}

export const GlossaryFilter2 = () => {
    const tagGroups: TagProps[] = tagGroupsM as TagProps[];
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = useCallback((event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;

        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }, [])

    return (
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="glossary-filter-label">
                    Filter by tags
                </InputLabel>
                <Select
                    labelId="glossary-filter-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Filter by tags" />}
                    renderValue={useCallback((selected: string[]) => (selected.join(', ')),[])}
                >
                    {
                        <Grid container spacing={1}>
                            {
                                tagGroups.map((tagGroup) => (
                                    <Grid key={tagGroup.category} item xs={0}>
                                        <MenuItem key={tagGroup.category} value={tagGroup.category}>
                                            <ListItemText primary={tagGroup.category} />
                                        </MenuItem>
                                        {
                                            tagGroup.tags?.map((tag) => (
                                                <MenuItem key={tag} value={tag}>
                                                    <Checkbox />
                                                    <ListItemText primary={tag} />
                                                </MenuItem>
                                            ))
                                        }
                                    </Grid>
                                ))
                            }
                        </Grid>
                    }
                </Select>
            </FormControl>
        </>
    );
};
/*
            <Select
            labelId="glossary-filter-label"
            id="glossary-filter"
            multiple
            value={personName}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            >
            <MenuItem>
                Test1
            </MenuItem>
            <MenuItem>
                Test2
            </MenuItem>
        </Select>



                                            <Typography variant="h6">
                                        {
                                            tagGroup.category    
                                        }    
                                    </Typography>



                                    
                                    */

                                    // Testen mit Callback und vermehrtem Rendern