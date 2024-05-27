import { useCallback } from 'react'
import { linearProgressClasses } from '@common/components'
import { styled } from '@common/theme'
import { LinearProgressWithLabel } from '@components'

/**
 * @prop learningElementProgressTopics - The learningElementProgressTopics array.
 * @prop index - The index of the topic in the array that should be calculated.
 * @remarks
 * index is the index of the topic in the array that should be calculated
 * learningElementProgressTopics is an array of arrays with the progress of each topic
 * first element of the array is the number of solved learning elements,
 * second element is the number of total learning elements
 * @example: [[1, 1] ,[1,6]]
 * @interface
 */
type BorderLinearProgressProps = {
  learningElementProgressTopics?: number[][]
  index?: number
}

//Bordered Progress Bar
//calculate the progress of a topic and return a progress bar with variable text, color and value
//learningElementProgressTopics is an array of arrays with the progress of each topic
//first element of the array is the number of solved learning elements,
//second element is the number of total learning elements
export const StyledLinearProgress = ({ learningElementProgressTopics, index }: BorderLinearProgressProps) => {
  const calculatePercent = useCallback(() => {
    if (index === undefined || learningElementProgressTopics === undefined) return 10

    if (learningElementProgressTopics[index] === undefined) return -1 // TODO: This line is unreachable

    return (learningElementProgressTopics[index][0] / learningElementProgressTopics[index][1]) * 100
  }, [index, learningElementProgressTopics])

  const percent = calculatePercent()

  //calculate the color of the progress bar
  //gray if error (-1), red if 0%, yellow if <70%, green if >=70%
  const colorByPercent = useCallback(() => {
    if (percent === 0) return 'error'
    else if (percent < 0) return 'info' // TODO: This line is unreachable
    return percent < 70 ? 'warning' : 'success'
  }, [percent])

  const getText = useCallback(() => {
    if (index === undefined || learningElementProgressTopics === undefined) return 'loading...'

    return learningElementProgressTopics[index].length === 0 // ! Throws error, if TODOs above are reached.
      ? 'error..'
      : learningElementProgressTopics[index][0] + '/' + learningElementProgressTopics[index][1]
  }, [index, learningElementProgressTopics])

  const getTextPosition = useCallback(() => {
    if (index === undefined || learningElementProgressTopics === undefined)
      return { xs: '20rem', sm: '5rem', md: '15rem', lg: '25rem', xl: '45rem' }

    return { xs: '20rem', sm: '9rem', md: '20rem', lg: '30rem', xl: '46rem' }
  }, [index, learningElementProgressTopics])

  return (
    <StyledLinearProgressWithLabel
      data-testid="Course-Card-Topic-Progress"
      value={percent > 1 ? percent : 6} //if the student solved anything show his progress, else show a set minimum (6)
      color={index || learningElementProgressTopics ? colorByPercent() : 'info'}
      text={getText()}
      textposition={getTextPosition()}
    />
  )
}

// Styled component
const StyledLinearProgressWithLabel = styled(LinearProgressWithLabel)(({ theme }) => ({
  height: 7,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3
  }
}))
