import {
  DefaultBox as Box,
  DefaultDivider as Divider,
  DefaultTypography as Typography,
  DefaultAccordionSummary as AccordionSummary,
  DefaultAccordionDetails as AccordionDetails,
  DefaultAccordion as Accordion,
  DefaultSkeleton as Skeleton,
  DefaultStack as Stack
} from '@common/components'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Topic } from '@services'
import { LearningPathElement } from '@core'
import React, {lazy, Suspense, useState} from 'react'
import { useLearningPathTopic as _useLearningPathTopic } from './LocalNav.hooks'
import { useLearningPathElement as _useLearningPathElement } from './LocalNav.hooks'

const LazyLearningPathElementSmth = lazy(() => import('./LazyLearningPathElement'));


/**
 *  Local navigation component props.
 *  The "loading" property is a boolean value that indicates whether the data is still being loaded.
 *  The "topics" property is an array of objects that represent the topics related to the current page.
 *  The "learningPaths" property is an array of objects that represent the available learning paths related to the current page.
 */

type LocalNavProps = {
  useLearningPathTopic?: () => { loading: boolean; topics: Topic[] }
  useLearningPathElement?: (topic: Topic) => {
    loadingElements: boolean
    learningPaths: LearningPathElement
  }
}

const LocalNav = ({
  useLearningPathTopic = _useLearningPathTopic,
  useLearningPathElement = _useLearningPathElement
}: LocalNavProps) => {
  const { t } = useTranslation()
  const { loading, topics } = useLearningPathTopic()

  const skeletonItems = []
  for (let i = 0; i < 3; i++) {
    skeletonItems.push(
      <React.Fragment key={`LocalNav-Skeleton-${i}`}>
        <Skeleton variant="text" width={'100%'} height={55} />
        <Skeleton variant="text" width={'70%'} height={20} />
        <Skeleton variant="text" width={'70%'} height={20} sx={{ left: '50' }} />
      </React.Fragment>
    )
  }
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <Box flexGrow={1}>
      <Typography variant="h5">{t('components.LocalNav.Topics')}</Typography>
      <Divider />
      {loading ? (
        <Box>
          <Stack spacing={1}>{skeletonItems}</Stack>
        </Box>
      ) : (
        <>
          {topics.map((topic, index) => (
            <Accordion
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
              onChange={() => handleAccordionClick(index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
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
                {openAccordion === index ? (
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyLearningPathElementSmth topic={topic} useLearningPathElement={useLearningPathElement} />
                </Suspense>
                ) : null}
                </AccordionDetails>

            </Accordion>
          ))}
        </>
      )}
    </Box>
  )
}




export default LocalNav
