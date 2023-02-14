import { DefaultGrid as Grid } from "@common/components";
import { MenuItem, ListItemText, Checkbox } from "@mui/material";

//Useless file?
export const GlossaryTagGroup = (props: GlossaryTagGroupProps) => {

    return(
        <>
            <div>
                {
                    props.category && (
                        <Grid key={props.category} item xs={0}>
                            <MenuItem key={props.category} value={props.category}>
                                <ListItemText primary={props.category}/>
                            </MenuItem>
                        </Grid>
                    )
                }
            </div>
            <div>
                {
                    props.tags?.map((tag) => (
                        <Grid key={tag} item xs={0}>
                            <MenuItem key={tag} value={tag}>
                                <Checkbox/>
                                <ListItemText primary={tag}/>
                            </MenuItem>
                        </Grid>
                    ))
                }
            </div>
        </>
    );
};

export interface GlossaryTagGroupProps {
    category?: string;
    tags?: Array<string>;
};