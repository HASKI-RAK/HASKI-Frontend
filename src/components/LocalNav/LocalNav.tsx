import {
  Accordion,
  Box,
  Divider,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Link,
  Skeleton,
  Stack
} from '@common/components'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Topic, LearningPath } from '@services'
import React from 'react'
import { useLearningPath as _useLearningPath } from './LocalNav.hooks'

/**
 *  Local navigation component props.
 *  The "loading" property is a boolean value that indicates whether the data is still being loaded.
 *  The "topics" property is an array of objects that represent the topics related to the current page.
 *  The "learningPaths" property is an array of objects that represent the available learning paths related to the current page.
 */
export type LocalNavProps = {
  useLearningPath?: () => { loading: boolean; topics: Topic[]; learningPaths: LearningPath[] }
}

/**
 * Local navigation component for the main frame.
 * @remarks
 * @param {LocalNavProps} props  - Local navigation component props via dependency injection.
 *
 * @category Components
 */
const LocalNav = ({ useLearningPath = _useLearningPath }: LocalNavProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { loading, topics, learningPaths } = useLearningPath()

  // Skeleton component items, currently 3 items are looking the best in the Loading-state
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

  return (
    <Box flexGrow={1}>
      <Typography variant="h5">{t('components.LocalNav.Topics')}</Typography>
      <Divider />
      {loading ? ( // display Skeleton component while loading is true
        <Box>
          <Stack spacing={1}>{skeletonItems}</Stack>
        </Box>
      ) : (
        // display actual content once loading is false
        //For every Topic, get LearningPath and display it inside an Accordion
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
              }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                    transform: 'rotate(-90deg)'
                  }
                }}>
                <Typography variant="h6">{topic.name}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ flexDirection: 'column' }}>
                {learningPaths[index]?.path.map((learningElement) => (
                  <Typography variant="body1" key={learningElement.learning_element.name}>
                    <Link
                      underline="hover"
                      variant="body2"
                      color="inherit"
                      sx={{
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: 10,
                        '&:hover': { backgroundColor: (theme) => theme.palette.primary.main }
                      }}
                      onClick={() => {
                        navigate(`/topics/${topic.name}/${learningElement.learning_element.name}`)
                      }}>
                      {learningElement.position} {learningElement.learning_element.name}
                    </Link>
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </Box>
  )
}

export default LocalNav
