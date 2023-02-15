import { useTranslation } from "react-i18next"
import { DefaultTypography as Typography, DefaultGrid as Grid } from "@common/components"
import { GlossaryList, Filter, GlossarySearch, GlossaryIndex } from "@components"
import { useGlossaryForm as _useGlossaryForm, useGlossaryFormHookParams, GlossaryFormHookReturn } from "./GlossaryForm.hooks"

export const GlossaryForm = ({ useGlossaryForm = _useGlossaryForm, ...props }: GlossaryFormProps) => {
    // Translation
    const  { t } = useTranslation();
    const tags = t<string>('pages.glossary.tags', { returnObjects: true}) as string[]
    
    // Application logic state
    const { selectedTagsState } = useGlossaryForm();

    return (
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
                        <Filter tags={tags} selectedTags={selectedTagsState.selectedTags} setSelectedTags={selectedTagsState.setSelectedTags}/>
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
    )
}

type GlossaryFormProps = {
    useGlossaryForm?: (params?: useGlossaryFormHookParams) => GlossaryFormHookReturn;
}