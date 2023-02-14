import { useTranslation } from "react-i18next"
import { DefaultTypography as Typography, DefaultGrid as Grid } from "@common/components"
import { GlossaryList, GlossaryFilter, GlossarySearch, GlossaryIndex } from "@components"

export const Glossary = () => {
    const  { t } = useTranslation();

    return(
        <>
            <div>
                <Typography variant="h3">
                    {
                        t('pages.glossary.title')
                    }
                </Typography>
            </div>
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={2}/>
                    <Grid item xs={6}>
                        <GlossaryFilter />
                    </Grid>
                    <Grid item xs={4} sx={{pt:1}}>
                        <GlossarySearch />
                    </Grid>
                </Grid>
                    <GlossaryIndex />
            </div>
            <div>
                <GlossaryList/>
            </div>
        </>
    );
}

export default Glossary;

// TODO:
// 1. Suchleiste so wie bei der Wishlist in Steam?
// 2. URL aktualisieren Home/ProjectDescription/glossary
// 3. Alles react includes aus di entfernen