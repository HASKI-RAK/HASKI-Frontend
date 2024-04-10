import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
const Newsbanner=()=>{
    const [open, setOpen]=useState(true)
    //fetch von backend, localStorage abfrage ob schon gesehen, date, expirationdate, 
    return(
        <Box sx={{width:'100%'}}>
            <Collapse in={open}>
                <Alert severity="info" sx={{overflow:'auto'}} action={<IconButton aria-label="close" sx={{overflow:'auto'}} color="inherit" size="small" onClick={()=>{setOpen(false)}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>
                }
                >
                    Due to unforseen circumstances we regret to inform you that aliens have taken over humanity and we are doomed on another note the animalpark munich just had another cute lion baby 
                </Alert>
            </Collapse>
        </Box>
    )
}
export default Newsbanner