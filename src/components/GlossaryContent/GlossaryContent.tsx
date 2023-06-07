import { useGlossaryContent as _useGlossaryContent, GlossaryContentHookReturn } from './GlossaryContent.hooks'
import { GlossaryList, Filter, Searchbar, GlossaryIndex, GlossaryEntryProps } from '@components'
import { useTranslation } from 'react-i18next'
import { useState, useMemo } from 'react'
import {
  DefaultTypography as Typography,
  DefaultBox as Box,
  DefaultGrid as Grid,
  DefaultButton as Button
} from '@common/components'

export type GlossaryContentProps = {
  useGlossaryContent?: () => GlossaryContentHookReturn
}

const GlossaryContent = ({ useGlossaryContent = _useGlossaryContent, ...props }: GlossaryContentProps) => {
  // Translation
  const { t } = useTranslation()

  const glossaryEntries: GlossaryEntryProps[] = t<string>('pages.glossary.elements', {
    returnObjects: true
  }) as GlossaryEntryProps[]

  const tags = t<string>('pages.glossary.tags', {
    returnObjects: true
  }) as string[]

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
  const { collapseAll, expandAll } = useGlossaryContent()

  // States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedIndexElement, setSelectedIndexElement] = useState<string>('')
  const [expandedList, setExpandedList] = useState<string[]>([])

  const setSel = (input?: string | string[]) => {
    if (input === undefined) {
      setSelectedTags([])
    } else if (typeof input === 'string') {
      setSelectedTags(input.split(','))
    } else {
      setSelectedTags(input)
    }
  }

  return (
    <div data-testid="GlossaryContent">
      <Grid container columnSpacing={1} rowSpacing={1}>
        <Grid item xs={12} sm={12} sx={{ mt: '1rem', mb: '1rem' }}>
          <Typography variant="h3">{t('pages.glossary.title')}</Typography>
        </Grid>
        {useMemo(
          () => (
            <Grid item xs={8} sm={6}>
              <Searchbar label={t('pages.glossary.search')} setSearchQuery={setSearchQuery} timeout={100} />
            </Grid>
          ),
          [setSearchQuery]
        )}
        <Grid item xs={4} sm={6}>
          <Filter
            label={t('pages.glossary.filter')}
            options={tags}
            selectedOptions={selectedTags}
            setSelectedOptions={setSel}
          />
        </Grid>
        {useMemo(
          () => (
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
          ),
          [indexElements, selectedIndexElement, setSelectedIndexElement]
        )}
        {useMemo(
          () => (
            <Grid item xs={12} sm={12} sx={{ mt: '0.5rem', mb: '0.5rem' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button variant="outlined" onClick={() => collapseAll(setExpandedList)}>
                  {t('pages.glossary.collapseAll')}
                </Button>
                <Button variant="outlined" onClick={() => expandAll(setExpandedList, glossaryEntries)}>
                  {t('pages.glossary.expandAll')}
                </Button>
              </Box>
            </Grid>
          ),
          [collapseAll, expandAll, setExpandedList, glossaryEntries]
        )}
        {useMemo(
          () => (
            <Grid item xs={12} sm={12}>
              {
                <GlossaryList
                  glossaryEntries={glossaryEntries}
                  expandedList={expandedList}
                  setExpandedList={setExpandedList}
                  searchQuery={searchQuery}
                  selectedIndexElement={selectedIndexElement}
                  selectedTags={selectedTags}
                />
              }
            </Grid>
          ),
          [glossaryEntries, expandedList, setExpandedList, searchQuery, selectedIndexElement, selectedTags]
        )}
      </Grid>
    </div>
  )
}

export default GlossaryContent
