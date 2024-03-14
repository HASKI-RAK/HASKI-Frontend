import { Accordion, Box, Divider, Drawer, Typography, AccordionSummary, AccordionDetails, Stack } from '@common/components'
import { ExpandMore } from '@common/icons'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { LearningPathElement, Topic } from '@core'
import { Suspense, useState, useEffect } from 'react'
import LazyLoadingLearningPathElement from './LazyLoadingLearningPathElement'
import {
  SkeletonList,
  useLearningPathTopic as _useLearningPathTopic,
  useLearningPathElement as _useLearningPathElement
} from '@components'
import { useTheme, useMediaQuery } from '@common/hooks'


/**
 *  Local navigation component props.
 *  @prop {@link _useLearningPathTopic} - hook to get learning path topics
 *  @prop {@link _useLearningPathElement} - hook to get learning path elements
 */
export type LocalNavProps = {
  useLearningPathTopic?: (courseId: string) => { loading: boolean; topics: Topic[] }
  useLearningPathElement?: (
    topic: Topic,
    courseId: string
  ) => {
    loadingElements: boolean
    learningPaths: LearningPathElement | undefined
  }
}

/**
 * Local navigation component.
 * @param param - component props. The {@link LocalNavProps#useLearningPathTopic} and {@link LocalNavProps#useLearningPathElement} are optional.
 * @returns
 */
const LocalNav = ({
  useLearningPathTopic = _useLearningPathTopic,
  useLearningPathElement = _useLearningPathElement
}: LocalNavProps) => {
  const { t } = useTranslation()
  const { courseId } = useParams() as { courseId: string }
  const { loading, topics } = useLearningPathTopic(courseId)

  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
 
  const theme = useTheme();
  const open= useMediaQuery(theme.breakpoints.up('lg'))
  const [scrollable, setScrollable]=useState(false)
  const [footerVisArray, setFooterVisArray] = useState(0)

  useEffect(() => {
    window.onscroll = () => {
      //if scrollY is below 100 change drawer position to absolut
      if(window.scrollY<=100)
      setScrollable(false)

      //if scrollY is above 95 change drawer position to fixed so it moves with scroll
      else if(window.scrollY>=95)
      setScrollable(true)

      const maxScrollArea = window.document.documentElement.scrollHeight - window.document.documentElement.clientHeight
      const footerHeight = 80
      const footerVisible = footerHeight - (maxScrollArea - window.scrollY)

      setFooterVisArray(Math.max(0, footerVisible))
    }
  }, [window.scrollY]) 

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  //if the footer is visible move the drawer up so it doesnt hit the footer
  const footerMargin = 50 - footerVisArray 
  return (
    <Box sx={{width: open ? '25vh' : '0%' }}/**25vh = 250px */>
    <Drawer
      variant="persistent" 
      anchor='left'
      open={open}
      
      sx={{
        width: '100%',
        flexShrink: 1,
        borderRadius:'1rem',
        
        [`& .MuiDrawer-paper`]: {
          height:'100vh',
          boxSizing: 'border-box',
          maxHeight: '70%',
          marginTop:scrollable? footerMargin + 'px' : '150px',
          position: scrollable?'fixed':'absolute'
        }
      }}>
      <Box flexGrow={1} overflow={'auto'}>
        <Typography variant="h5">{t('appGlobal.topics')}</Typography>
        <Divider />
        {loading ? (
          <Box>
            <Stack spacing={1}>
              <SkeletonList />
            </Stack>
          </Box>
        ) : (
          <>
            {topics.map((topic, index) => (
              <Accordion
                id="local-nav-accordion"
                disableGutters
                key={`topic-Accordion-${topic.id}`}
                sx={{
                  borderColor: 'divider',
                  boxShadow: (theme) => `0 1px 0 ${theme.palette.secondary.main}`,
                  border: '1px',
                  '&:last-of-type': {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                  }
                }}
                expanded={openAccordion === index}
                onChange={() => handleAccordionClick(index)}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  data-testid={`topic-AccordionSummary-${topic.id}`}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    backgroundColor: 'white',
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                      transform: 'rotate(-90deg)'
                    }
                  }}>
                  <Typography variant="h6">{topic.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ flexDirection: 'column' }}>
                  {openAccordion === index && (
                    <Suspense fallback={<div>{t('appGlobal.loading')}</div>}>
                      <LazyLoadingLearningPathElement
                        topic={topic}
                        courseId={courseId}
                        useLearningPathElement={useLearningPathElement}
                      />
                    </Suspense>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        )}
      </Box>
    </Drawer>
    </Box>
  )
}

export default LocalNav
