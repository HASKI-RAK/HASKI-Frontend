import { Topic } from '@services'
import { useNavigate } from 'react-router-dom'
import { DefaultLink as Link, DefaultSkeleton as Skeleton, DefaultTypography as Typography } from '@common/components'
import React from 'react'
import { useLearningPathElement as _useLearningPathElement } from './LocalNav.hooks'
import { LearningPathElement } from '@core'

export type LazyLoadingLearningPathElementProps = {
  topic: Topic
  courseId: string
  useLearningPathElement?: (
    topic: Topic,
    courseId: string
  ) => {
    loadingElements: boolean
    learningPaths: LearningPathElement
  }
}

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
      {learningPaths.path.map((learningElement) => (
        <Typography variant="body1" key={learningElement.learning_element.name}>
          <Link
            data-testid={learningElement.learning_element.name}
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
    </>
  )
}

export default LazyLoadingLearningPathElement