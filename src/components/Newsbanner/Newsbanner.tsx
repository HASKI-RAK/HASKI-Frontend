import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { keyframes} from "@emotion/react"

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
    //TODO: Text anpassen auf Bildschrimgroesse und textlaenge
    return(
        <Box sx={{width:'100%'}}>
            

            <Collapse in={open} sx={{overflow:'hidden'}}>
                <Alert severity="info" sx={{ [`& .MuiAlert-message`]: {
          overflow:'hidden'
        }}}
                action={<IconButton aria-label="close" color="inherit" size="small" onClick={()=>{setOpen(false)}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>
                }
                >
                    <Box sx={{ animation: `${scrolling} 30s linear infinite`, transform: `translateX(100%)`, width: `1600px` }} >
                   
                    Due to unforseen circumstances we regret to inform you that aliens have taken over humanity and we are doomed on another note the animalpark munich just had another cute lion baby 
                    </Box>
                </Alert>
            </Collapse>
        </Box>
    )
}
export default Newsbanner