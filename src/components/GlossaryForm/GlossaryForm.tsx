import { useTranslation } from "react-i18next"
import { DefaultTypography as Typography, DefaultBox as Box, DefaultGrid as Grid, DefaultButton as Button } from "@common/components"
import { GlossaryList, Filter, Searchbar, GlossaryIndex, GlossaryEntryProps } from "@components"
import { useGlossaryForm as _useGlossaryForm, useGlossaryFormHookParams, GlossaryFormHookReturn } from "./GlossaryForm.hooks"
import AutoStories from '@mui/icons-material/AutoStories'

export const GlossaryForm = ({ useGlossaryForm = _useGlossaryForm, ...props }: GlossaryFormProps) => {
    // Translation
    const  { t } = useTranslation();
    const tags = t<string>('pages.glossary.tags', { returnObjects: true}) as string[]
    const indexElements = [t('pages.glossary.fundamentals')].concat(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"])
    const glossaryEntries : GlossaryEntryProps[] = t<string>('pages.glossary.elements', { returnObjects: true}) as GlossaryEntryProps[]

    // Application logic state
    const { glossaryState, filterByTags, filterByIndexElement, searchByQuery, collapseAll, expandAll } = useGlossaryForm();

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
                    <Searchbar setSearchQuery={glossaryState.setSearchQuery}/>
                </Grid>
                <Grid item xs={4} sm={6}>
                    <Filter tags={tags} selectedTags={glossaryState.selectedTags} setSelectedTags={glossaryState.setSelectedTags}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
                        <GlossaryIndex 
                            orientation="horizontal" 
                            indexElements={indexElements} 
                            selectedIndexElement={glossaryState.selectedIndexElement} 
                            setSelectedIndexElement={glossaryState.setSelectedIndexElement}
                        />
                        <Button variant="outlined" onClick={collapseAll}>
                            {
                                t('pages.glossary.collapseAll')
                            }
                        </Button>
                        <Button variant="outlined" onClick={() => expandAll(glossaryEntries)}>
                            {
                                t('pages.glossary.expandAll')
                            }
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                    {
                        (
                            <GlossaryList 
                                expandedList={glossaryState.expandedList} 
                                setExpandedList={glossaryState.setExpandedList}
                                glossaryEntries={searchByQuery(
                                    filterByTags(glossaryState.selectedTags!, 
                                        filterByIndexElement(glossaryState.selectedIndexElement!, glossaryEntries)))}
                            />
                        )
                    }
                </Grid>
            </Grid>
        </>
    )
}

type GlossaryFormProps = {
    useGlossaryForm?: (params?: useGlossaryFormHookParams) => GlossaryFormHookReturn;
}