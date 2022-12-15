import { Skeleton, Grid, Accordion, AccordionSummary, AccordionDetails, ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Glossary = () => {
    return(
        <>
            <div>
                <Typography variant="h3">
                    Glossary
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs = {2}/>
                    <Grid item xs={6}>
                        <Typography variant="h4">
                            Filter
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h4">
                            Searchbar
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <div>

            </div>
        </>
    );
}

// TODO:
// 1. Header als String Variable
// 2. Suchleiste auf Höhe des Headers ganz rechts


// Accordion Komponente unter Components
// Und durch Application Function aufgefüllt
// Skeleton als Komponente
//<Typography> Begriff </Typography>
    

export default Glossary;