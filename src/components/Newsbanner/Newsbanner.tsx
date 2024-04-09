import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
const Newsbanner=()=>{
    const [open, setOpen]=useState(true)
    //fetch von backend, localStorage abfrage ob schon gesehen, date, expirationdate, 
    return(
        <Box sx={{width:'100%'}}>
            <Collapse in={open}>
                <Alert severity="info" action={<IconButton aria-label="close" color="inherit" size="small" onClick={()=>{setOpen(false)}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>
                }
                >
                    Current news
                </Alert>
            </Collapse>
        </Box>
    )
}
export default Newsbanner