import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Accordion, AccordionSummary, AccordionDetails, Box, Divider, Drawer, Stack, Typography, Grid, List, ListItem, ListItemButton, ListItemText, Skeleton } from '@common/components'
import { FiberManualRecord, ExpandMore } from '@common/icons'
import {
  SkeletonList,
  useLearningPathTopic as _useLearningPathTopic,
  Fraction
} from '@components'
import LazyLoadingLearningPathElement from './LazyLoadingLearningPathElement'
import { LearningPathElement, Topic } from '@core'
import React from 'react'
import { Suspense, useState, useEffect } from 'react'
import { useLearningPathTopicProgress } from './../../pages/Course/Course.hook'
import { Theme } from '@common/theme'
import { useTheme, useMediaQuery } from '@common/hooks'

/**
 *  Local navigation component props.
 *  @prop {@link _useLearningPathTopic} - hook to get learning path topics
 */
export type LocalNavProps = {
  useLearningPathTopic?: (courseId: string) => { loading: boolean; topics: Topic[] }
}

/**
 * Local navigation component.
 * @param param - component props. The {@link LocalNavProps#useLearningPathTopic} and {@link LocalNavProps#useLearningPathElement} are
 *   optional.
 * @returns
 */
const LocalNav = ({ useLearningPathTopic = _useLearningPathTopic }: LocalNavProps) => {
  const { t } = useTranslation()
  const { courseId, topicId } = useParams() as { courseId: string; topicId: string }
  const navigate = useNavigate()

  const { topics, loading: topicLoading } = useLearningPathTopic(courseId)
  const { calculatedTopicProgress, loading: progressLoading } = useLearningPathTopicProgress(courseId, topics)

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
    <Box flexGrow={1} sx={{ minWidth: '20rem' }}>
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
      <Grid sx={{ ml: '0.9rem' }}>
        <Typography variant="h5">{t('appGlobal.topics')}</Typography>
      </Grid>
      <Divider />
      {topicLoading ? (
        <Box>
          <Stack spacing={1}>
            <SkeletonList />
          </Stack>
        </Box>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
          {topics.map((topic, index) => (
            <Box
              key={topic.id}
              data-testid={`topic-list-item-${topic.id}`}
              sx={{
                width: '100%',
                bgcolor: parseInt(topicId) == topic.id ? 'lightgrey' : 'background.paper',
                borderRadius: 2
              }}>
              <ListItem key={topic.id} sx={{ width: '100%', p: 0 }} color={'black'}>
                <ListItemButton
                  key={topic.id}
                  sx={{ width: '100%' }}
                  onClick={() => {
                    navigate(`/course/${courseId}/topic/${topic.id}`)
                  }}>
                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <FiberManualRecord
                      sx={{
                        color:
                          parseInt(topicId) == topic.id
                            ? (theme: Theme) => theme.palette.primary.main
                            : (theme: Theme) => theme.palette.info.dark,
                        width: '0.5rem'
                      }}
                    />
                    <Grid item xs={7} sm={7} md={8} lg={8} xl={8}>
                      <ListItemText primary={topic.name} primaryTypographyProps={{ fontSize: 18 }} />
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={2} xl={2}>
                      {calculatedTopicProgress[index] && !progressLoading ? (
                        <ListItemText
                          primary={
                            <Fraction
                              numerator={calculatedTopicProgress[index][0]}
                              denominator={calculatedTopicProgress[index][1]}
                            />
                          }
                          primaryTypographyProps={{
                            p: 0.25,
                            borderRadius: 3,
                            bgcolor: (theme: Theme) => theme.palette.info.light
                          }}
                          sx={{ textAlign: 'center' }}
                        />
                      ) : (
                        <Skeleton variant="text" width={'70%'} height={20} sx={{ ml: 2 }} />
                      )}
                    </Grid>
                  </Grid>
                </ListItemButton>
              </ListItem>
            </Box>
            /*<Accordion
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
             </Accordion>*/
          ))}
        </List>
      )}
    </Box>
  )
}

export default LocalNav
