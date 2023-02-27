import { useTranslation } from "react-i18next"
import {
    DefaultAccordionSummary as AccordionSummary,
    DefaultAccordionDetails as AccordionDetails,
    DefaultAccordion as Accordion,
    DefaultTypography as Typography,
    DefaultBox as Box,
    DefaultGrid as Grid,
    DefaultChip as Chip
} from "@common/components"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const GlossaryEntry = (props: GlossaryEntryProps) => {
    const { t } = useTranslation()

    return(
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="panel1a-header">
                    <Grid container columnSpacing={1}>
                        <Grid item>
                            <Typography component="span" key={props.term} variant="h4">
                                {
                                    props.term
                                }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, pt: 0.5}}>
                                {
                                    props.tags && props.tags.map((tag) => 
                                        <Chip key={tag} label={tag}/>
                                    )
                                }
                            </Box>
                        </Grid>
                    </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container rowSpacing={1}>
                    <Grid item xs={12} sm={12}>
                        <Typography component="span" key={props.definition} variant="h6">
                                {
                                    props.definition
                                }
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            <Typography component="span" key={props.sources} variant="subtitle1" fontWeight="bold">
                                {
                                    props.sources && t('pages.glossary.sources')
                                }
                            </Typography>
                            <Typography component="span" key={props.sources} variant="subtitle1">
                                {
                                    props.sources
                                }
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}

export interface GlossaryEntryProps {
    term?: string
    definition?: string
    sources?: string
    tags?: string[]
    fundamental?: boolean
}