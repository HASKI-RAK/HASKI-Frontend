import { useTranslation } from "react-i18next"
import { DefaultTypography as Typography, DefaultBox as Box, DefaultGrid as Grid } from "@common/components"
import { GlossaryList, Filter, Searchbar, GlossaryIndex, GlossaryEntryProps } from "@components"
import { useGlossaryForm as _useGlossaryForm, useGlossaryFormHookParams, GlossaryFormHookReturn } from "./GlossaryForm.hooks"

import AutoStories from '@mui/icons-material/AutoStories' // Hier

export const GlossaryForm = ({ useGlossaryForm = _useGlossaryForm, ...props }: GlossaryFormProps) => {
    // Translation
    const  { t } = useTranslation();
    const tags = t<string>('pages.glossary.tags', { returnObjects: true}) as string[]
    const indexElements = [t('pages.glossary.popular'), t('pages.glossary.fundamentals')].concat(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"])
    const glossaryEntries : GlossaryEntryProps[] = t<string>('pages.glossary.elements', { returnObjects: true}) as GlossaryEntryProps[]

    // Application logic state
    const { selectedTagsState, selectedIndexElementState, searchQueryState, filterByTags, filterByIndexElement, searchByQuery } = useGlossaryForm();

    return (
        <>
            <Grid container columnSpacing={1} rowSpacing={1}>
                <Grid item xs={12} sm={12}>
                    <Box sx={{display: 'flex', gap: 0.5}}>
                        <AutoStories sx={{fontSize: 50}}/>
                        <Typography variant="h3">
                            {
                                t('pages.glossary.title')
                            }
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={8} sm={6}>
                    <Searchbar setSearchQuery={searchQueryState.setSearchQuery}/>
                </Grid>
                <Grid item xs={4} sm={6}>
                    <Filter tags={tags} selectedTags={selectedTagsState.selectedTags} setSelectedTags={selectedTagsState.setSelectedTags}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <GlossaryIndex 
                        orientation="horizontal" 
                        indexElements={indexElements} 
                        selectedIndexElement={selectedIndexElementState.selectedIndexElement} 
                        setSelectedIndexElement={selectedIndexElementState.setSelectedIndexElement}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <GlossaryList glossaryEntries={filterByTags(selectedTagsState.selectedTags!,    
                        filterByIndexElement(selectedIndexElementState.selectedIndexElement!, 
                        searchByQuery(searchQueryState.searchQuery!, glossaryEntries)))} 
                    />
                </Grid>
            </Grid>
        </>
    )
}

type GlossaryFormProps = {
    useGlossaryForm?: (params?: useGlossaryFormHookParams) => GlossaryFormHookReturn;
}