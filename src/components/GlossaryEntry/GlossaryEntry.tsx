import {
    DefaultAccordionSummary as AccordionSummary,
    DefaultAccordionDetails as AccordionDetails,
    DefaultAccordion as Accordion,
    DefaultTypography as Typography,
    DefaultSkeleton as Skeleton,
    DefaultBox as Box,
    DefaultGrid as Grid
} from "@common/components"

import { useTranslation } from "react-i18next"

export const GlossaryEntry = (props: GlossaryEntryProps) => {
    const { t } = useTranslation()

    return(
        <>
            <div>
                <Accordion>
                    <AccordionSummary id="panel1a-header">
                        <Box sx={{ width: 500 }}>
                            <Typography component="div" key={props.term} variant="h4">
                                {
                                    props.term ?? <Skeleton animation="wave"/>
                                }
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component="div" key={props.definition} variant="h6">
                                {
                                    props.definition ?? (
                                        <>
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation="wave" width="80%" />
                                        </>
                                    )
                                }
                        </Typography>
                        <Typography component="div" key={props.sources} variant="h6">
                            <Grid container spacing={1}>
                                <Grid item xs={0}>
                                    {
                                        t('pages.glossary.sources')
                                    }
                                </Grid>
                                <Grid item xs={11}>
                                    {
                                        props.sources ?? <Skeleton animation="wave" width="40%" />
                                    }
                                </Grid>
                            </Grid>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
}

export interface GlossaryEntryProps {
    term?: string
    definition?: string
    sources?: string
    // tags?: Array<string>;
}