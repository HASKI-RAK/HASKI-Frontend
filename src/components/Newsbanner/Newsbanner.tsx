import { Alert, Box, Collapse, IconButton, makeStyles } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import {css, keyframes} from "@emotion/react"

const animatedItem = css `{
        animation: $scrolling 3s linear infinite
    }`;

const scrolling = keyframes`
    from {
        transform: translateX(100%)
    },
    to {
        transform: translateX(-100%)
    }
`;

const Newsbanner=()=>{
    const [open, setOpen]=useState(true)
    //fetch von backend, localStorage abfrage ob schon gesehen, date, expirationdate, 
    return(
        <Box sx={{width:'100%'}}>
            

            <Collapse in={open}>
                <Alert severity="info"  action={<IconButton aria-label="close" sx={{overflow:'auto'}} color="inherit" size="small" onClick={()=>{setOpen(false)}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>
                }
                >
                    <Box sx={{overflow:'hidden', animation: `${scrolling} 30s linear infinite`, transform: `translateX(100%)`, width: `1600px` }} >
                    Due to unforseen circumstances we regret to inform you that aliens have taken over humanity and we are doomed on another note the animalpark munich just had another cute lion baby 
                    </Box>
                </Alert>
            </Collapse>
        </Box>
    )
}
export default Newsbanner