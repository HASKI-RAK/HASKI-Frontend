import { GlossaryList, Filter, Searchbar, GlossaryIndex, GlossaryEntryProps } from '@components'
import { useGlossary as _useGlossary, GlossaryHookReturn } from './Glossary.hooks'
import { useTranslation } from 'react-i18next'
import { useState, useMemo } from 'react'
import {
  DefaultTypography as Typography,
  DefaultBox as Box,
  DefaultGrid as Grid,
  DefaultButton as Button
} from '@common/components'

type GlossaryProps = {
  useGlossary?: () => GlossaryHookReturn
}

const Glossary = ({ useGlossary = _useGlossary }: GlossaryProps) => {
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
  const { collapseAll, expandAll } = useGlossary()

  // States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedIndexElement, setSelectedIndexElement] = useState<string>('')
  const [expandedList, setExpandedList] = useState<string[]>([])

  // TODO: Refactor
  const setSel = (input?: string | string[]) => {
    if (input === undefined) {
      setSelectedTags([])
    } else if (typeof input === 'string') {
      setSelectedTags(input.split(','))
    } else {
      setSelectedTags(input)
    }
  }

  // TODO: Div verschwindibus
  return (
    <div data-testid="GlossaryContent">
      <Grid container columnSpacing={1} rowSpacing={1}>
        <Grid item xs={12} sm={12} sx={{ mt: '1rem', mb: '1rem' }}>
          <Typography variant="h3">{t('pages.glossary.title')}</Typography>
        </Grid>
        <Grid item xs={8} sm={6}>
          <Searchbar label={t('pages.glossary.search')} setSearchQuery={setSearchQuery} timeout={100} />
        </Grid>
        <Grid item xs={4} sm={6}>
          <Filter
            label={t('pages.glossary.filter')}
            options={tags}
            selectedOptions={selectedTags}
            setSelectedOptions={setSel}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {useMemo(
              () => (
                <GlossaryIndex
                  orientation="horizontal"
                  indexElements={indexElements}
                  selectedIndexElement={selectedIndexElement}
                  setSelectedIndexElement={setSelectedIndexElement}
                />
              ),
              [indexElements, selectedIndexElement, setSelectedIndexElement]
            )}
          </Box>
        </Grid>
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
        <Grid item xs={12} sm={12}>
          <GlossaryList
            glossaryEntries={glossaryEntries}
            expandedList={expandedList}
            setExpandedList={setExpandedList}
            searchQuery={searchQuery}
            selectedIndexElement={selectedIndexElement}
            selectedTags={selectedTags}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Glossary
