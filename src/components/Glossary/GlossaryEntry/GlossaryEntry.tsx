import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Grid, Typography } from '@common/components'
import { ExpandMore } from '@common/icons'

/**
 * @prop term - The term this entry defines.
 * @prop definition - The definition text of the term.
 * @prop sources - The sources of the term and definition texts
 * @prop tags - The tags that assigns the entry to different categories.
 * @prop fundamental - Whether the entry is fundamental or not.
 * @category Components
 * @interface
 */
export type GlossaryEntryProps = {
  term?: string
  definition?: string
  sources?: string
  tags?: string[]
  fundamental?: boolean
}

/**
 * @prop expandedList - The list of terms of the currently expanded entries.
 * @prop setExpandedList - The function to set the currently expanded entries.
 * @prop {@link GlossaryEntryProps} - The props of a single GlossaryEntry.
 * @category Components
 * @interface
 */
export type GlossaryAccordionEntryProps = GlossaryEntryProps & {
  expandedList?: string[]
  setExpandedList?: (newExpandedList: string[]) => void
}

/**
 * GlossaryEntry component.
 *
 * @param props - Props containing the term, definition, sources, tags and fundamental of a single entry as well as expandedList and setExpandedList.
 *
 * @remarks
 * GlossaryEntry presents a component where different information to a technical term is displayed.
 * It can be used as a standalone component on a page.
 *
 * @category Components
 */
const GlossaryEntry = ({ expandedList, setExpandedList, ...props }: GlossaryAccordionEntryProps) => {
  const { t } = useTranslation()

  const handleClick = () => {
    props.term &&
      expandedList &&
      (expandedList.includes(props.term)
        ? setExpandedList?.(expandedList.filter((entry) => entry !== props.term))
        : setExpandedList?.([...expandedList, props.term]))
  }

  return (
    <Accordion
      id={props.term?.concat('-glossary-entry-accordion')}
      expanded={!!expandedList?.find((entry) => entry === props.term)}
      onClick={handleClick}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container columnSpacing={1}>
          <Grid item>
            <Typography component="span" key={props.term} variant="h4" data-testid={'glossaryEntryTerm'}>
              {props.term}
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, pt: 0.5 }}>
              {props.tags?.map((tag) => (
                <Chip key={tag} label={tag} data-testid="glossaryEntryTag" />
              ))}
            </Box>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography component="span" key={props.definition} variant="h6" data-testid="glossaryEntryDefinition">
              {props.definition}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Typography component="span" key={props.sources} variant="subtitle1" fontWeight="bold">
                {props.sources && t('pages.glossary.sources')}
              </Typography>
              <Typography
                component="span"
                key={props.sources + '1'}
                variant="subtitle1"
                data-testid="glossaryEntrySources">
                {props.sources}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(GlossaryEntry)
