import { Dispatch, memo, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Typography } from '@common/components'
import { Filter, GlossaryEntryProps, GlossaryIndex, GlossaryList, Searchbar } from '@components'
import { GlossaryHookReturn, useGlossary as _useGlossary } from './Glossary.hooks'

/**
 * @prop useGlossary - The hook that is used for the Glossary page logic.
 * @interface
 */
type GlossaryProps = {
  useGlossary?: () => GlossaryHookReturn
}

/**
 * getSelectedTagsWrapper function.
 *
 * @param setSelectedTags - Function to set the currently selected tags.
 *
 * @remarks
 * getSelectedTagsWrapper presents a function that can be used to get a function that sets the currently selected tags.
 *
 * @returns - Function thats maps an undefined, string or string array input to a string array and sets it as currently selected tags.
 *
 * @category Logic
 */
export const getSelectedTagsWrapper = (setSelectedTags: Dispatch<SetStateAction<string[]>>) => {
  const setSelectedTagsWrapper = (input?: string | string[]) => {
    if (input === undefined) {
      setSelectedTags([])
    } else if (typeof input === 'string') {
      setSelectedTags(input.split(','))
    } else {
      setSelectedTags(input)
    }
  }

  return setSelectedTagsWrapper
}

/**
 * Glossary page.
 *
 * @param props - Props containing the logic to collapse and expand the every glossary entry.
 *
 * @remarks
 * Glossary presents a page with a list of important terms of the haski project.
 * It uses the GlossaryList component to present the content and several other components, like a Filter, Searchbar and GlossaryIndex to filter or search for specific entries.
 * It is also possible to collapse and expand individual entries or all at once to gain further information to every term.
 *
 * @category Pages
 */
const Glossary = ({ useGlossary = _useGlossary }: GlossaryProps) => {
  // Translation
  const { t } = useTranslation()

  // Deconstructing array of glossary entries into array to prevent testing errors.
  const glossaryEntries: GlossaryEntryProps[] = [
    ...(t<string>('pages.glossary.elements', {
      returnObjects: true
    }) as GlossaryEntryProps[])
  ]

  // Sorts the glossary entries alphabetically by term.
  const sortedGlossaryEntries = [...glossaryEntries].sort((a, b) =>
    (a.term?.toLowerCase() ?? '').localeCompare(b.term?.toLowerCase() ?? '')
  )

  // Deconstructing array of tags into array to prevent testing errors.
  const tags = [
    ...(t<string>('pages.glossary.tags', {
      returnObjects: true
    }) as string[])
  ]

  const indexElements = [t('pages.glossary.fundamentals')].concat([
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ])

  // Logic from hook
  const { collapseAll, expandAll } = useGlossary()

  // States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedIndexElement, setSelectedIndexElement] = useState<string>('')
  const [expandedList, setExpandedList] = useState<string[]>([])

  return (
    <Grid container columnSpacing={1} rowSpacing={1}>
      <Grid item xs={12} sm={12} sx={{ mt: '1rem', mb: '1rem' }}>
        <Typography variant="h3">{t('pages.glossary')}</Typography>
      </Grid>
      <Grid item xs={8} sm={6}>
        <Searchbar label={t('pages.glossary.search')} setSearchQuery={setSearchQuery} timeout={250} />
      </Grid>
      <Grid item xs={4} sm={6}>
        <Filter
          label={t('pages.glossary.filter')}
          options={tags}
          selectedOptions={selectedTags}
          setSelectedOptions={getSelectedTagsWrapper(setSelectedTags)}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <GlossaryIndex
            orientation="horizontal"
            indexElements={indexElements}
            selectedIndexElement={selectedIndexElement}
            setSelectedIndexElement={setSelectedIndexElement}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ mt: '0.5rem', mb: '0.5rem' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Button id="collapse-all-button" variant="outlined" onClick={() => collapseAll(setExpandedList)}>
            {t('pages.glossary.collapseAll')}
          </Button>
          <Button
            id="expand-all-button"
            variant="outlined"
            onClick={() => expandAll(setExpandedList, sortedGlossaryEntries)}>
            {t('pages.glossary.expandAll')}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12}>
        <GlossaryList
          glossaryEntries={sortedGlossaryEntries}
          expandedList={expandedList}
          setExpandedList={setExpandedList}
          searchQuery={searchQuery}
          selectedIndexElement={selectedIndexElement}
          selectedTags={selectedTags}
        />
      </Grid>
    </Grid>
  )
}

export default memo(Glossary)
