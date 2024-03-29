import { useNavigate } from 'react-router-dom'
import { Link, Skeleton, Typography } from '@common/components'
import { Theme } from '@common/theme'
import { LearningPathElement, Topic } from '@core'
import { useLearningPathElement as _useLearningPathElement } from './LocalNav.hooks'

/**
 * @prop {@link Topic} to be displayed
 * @prop id of the {@link Course} to be displayed
 * @prop Optional function to override the default hook
 */
export type LazyLoadingLearningPathElementProps = {
  topic: Topic
  courseId: string
  useLearningPathElement?: (
    topic: Topic,
    courseId: string
  ) => {
    loadingElements: boolean
    learningPaths: LearningPathElement | undefined
  }
}

/**
 * Lazy loading component to display the {@link LearningPathElement} of a {@link Topic}
 * @param param - The {@link LazyLoadingLearningPathElementProps}
 */
const LazyLoadingLearningPathElement = ({
  topic,
  courseId,
  useLearningPathElement = _useLearningPathElement
}: LazyLoadingLearningPathElementProps) => {
  const { loadingElements, learningPaths } = useLearningPathElement(topic, courseId)
  const navigate = useNavigate()

  if (loadingElements) {
    return (
      <>
        <Skeleton data-testid={`LocalNav-Skeleton-Element`} variant="text" width={'100%'} height={55} />
        <Skeleton variant="text" width={'70%'} height={20} />
        <Skeleton variant="text" width={'70%'} height={20} sx={{ left: '50' }} />
      </>
    )
  }

  return (
    <>
      {learningPaths?.path.map((learningElement) => (
        <Typography variant="body1" key={learningElement.learning_element.name}>
          <Link
            id={learningElement.learning_element.name.concat('-link').replaceAll(' ', '-')}
            data-testid={learningElement.learning_element.name}
            underline="hover"
            variant="body2"
            color="inherit"
            sx={{
              cursor: 'pointer',
              padding: '8px',
              borderRadius: 10,
              '&:hover': { backgroundColor: (theme: Theme) => theme.palette.primary.main }
            }}
            onClick={() => {
              navigate(`/course/${courseId}/topic/${topic.id}`)
            }}>
            {learningElement.position} {learningElement.learning_element.name}
          </Link>
        </Typography>
      ))}
    </>
  )
}

export default LazyLoadingLearningPathElement
