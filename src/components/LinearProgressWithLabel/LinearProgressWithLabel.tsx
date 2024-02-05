import { Typography, Tooltip, LinearProgress, LinearProgressProps, linearProgressClasses } from '@common/components'
import { styled } from '@common/theme'
import { useMemo } from 'react'
import { StyledComponent } from '@emotion/styled'

/**
 * @typedef LinearProgressWithLabelReturn
 * @property {function} calculateTopicProgress - The calculateTopicProgress function.
 * index is the index of the topic in the array that should be calculated
 * learningElementProgressTopics is an array of arrays with the progress of each topic
 * first element of the array is the number of solved learning elements,
 * second element is the number of total learning elements
 * example: [[1, 1] ,[1,6]]
 * @property {function} BorderLinearProgress - The BorderLinearProgress function.
 *
 * @returns An object with the functions calculateTopicProgress and BorderLinearProgress.
 */
export type LinearProgressWithLabelReturn = {
  readonly calculateTopicProgress: (learningElementProgressTopics: number[][], index: number) => JSX.Element
  readonly BorderLinearProgress: StyledComponent<
    LinearProgressProps & { value: number } & { text: string } & {
      textposition: { xs: string; sm: string; md: string; lg: string; xl: string }
    }
  >
}

/**
 * # LinearProgressWithLabel
 * @returns An object with the functions calculateTopicProgress and BorderLinearProgress.
 * @remarks
 * Uses the {@link calculatePercent} function to calculate the progress of a topic.
 * Uses the {@link colorByPercent} function to calculate the color of the progress bar.
 * Uses the {@link calculateTopicProgress} function to calculate the progress of a topic.
 * Uses the {@link BorderLinearProgress} styled component to style the progress bar.
 * @example progress variation
 * circular Progress
 * ```
 *
 *    Another possibility to show the progress of the course in a circle
 *
 *    import CircularProgress, {
 *    CircularProgressProps,
 *    } from '@mui/material/CircularProgress'
 *    function CircularProgressWithLabel(
 *    props: CircularProgressProps & { value: number } & { text: string},
 *    ) {
 *    return (
 *    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
 *    <CircularProgress variant="determinate" {...props} />
 *    <Box
 *    sx={{
 *    top: 0,
 *    left: 0,
 *    bottom: 0,
 *    right: 0,
 *    position: 'absolute',
 *    display: 'flex',
 *    alignItems: 'center',
 *    justifyContent: 'center',
 *    }}
 *    >
 *    <Typography
 *    variant="caption"
 *    color="text.primary"
 *    >{`${(props.text)}`}</Typography>
 *    </Box>
 *    </Box>
 *    )
 *    }
 * ```
 */
export const LinearProgressWithLabel = (): LinearProgressWithLabelReturn => {
  //Linear Progress Bar with label
  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number } & { text: string } & {
      textposition: { xs: string; sm: string; md: string; lg: string; xl: string }
    }
  ) => {
    return (
      <>
        <Tooltip title={'Completed learning elements'}>
          <Typography sx={{ ml: props.textposition, mr: '0.5rem' }} variant="body1" color="text.secondary">
            {'Learning progress: ' + props.text}
          </Typography>
        </Tooltip>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{ ml: { xs: '16rem', sm: '0rem', md: '-7rem', lg: '-7rem', xl: '-11rem' } }}
        />
      </>
    )
  }

  //styled Linear Progress Bar
  const BorderLinearProgress = styled(LinearProgressWithLabel)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 3
    }
  }))

  //calculate the progress of a topic and return a progress bar with variable text, color and value
  //learningElementProgressTopics is an array of arrays with the progress of each topic
  //first element of the array is the number of solved learning elements,
  //second element is the number of total learning elements
  const calculateTopicProgress = (learningElementProgressTopics: number[][], index: number) => {
    const percent = calculatePercent(learningElementProgressTopics, index)
    //if the student solved anything show his progress, else show a set minimum (6)
    const value = percent > 1 ? percent : 6
    const color = colorByPercent(percent)

    return (
      <BorderLinearProgress
        data-testid={'Course-Card-Topic-Progress'}
        value={value}
        text={`${
          learningElementProgressTopics[index].length === 0
            ? 'error..'
            : learningElementProgressTopics[index][0] + '/' + learningElementProgressTopics[index][1]
        }`}
        color={color}
        textposition={{ xs: '20rem', sm: '9rem', md: '20rem', lg: '30rem', xl: '46rem' }}
      />
    )
  }

  const calculatePercent = (learningElementProgressTopics: number[][], index: number) => {
    if (learningElementProgressTopics[index].length === 0) return -1
    return (learningElementProgressTopics[index][0] / learningElementProgressTopics[index][1]) * 100
  }

  //calculate the color of the progress bar
  //gray if error (-1), red if 0%, yellow if <70%, green if >=70%
  const colorByPercent = (percent: number) => {
    if (percent === 0) return 'error'
    else if (percent < 0) return 'info'
    return percent < 70 ? 'warning' : 'success'
  }

  return useMemo(
    () => ({
      calculateTopicProgress,
      BorderLinearProgress
    }),
    []
  )
}
