import { Typography, Tooltip } from '@common/components'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import { styled } from '@common/theme'
import { linearProgressClasses } from '@mui/material'
import { useMemo } from 'react'
import { StyledComponent } from '@emotion/styled'

export type CourseHookReturn = {
  readonly calculateTopicProgress: (learningElementProgressTopics: number[][], index: number) => JSX.Element
  readonly BorderLinearProgress: StyledComponent<
    LinearProgressProps & { value: number } & { text: string } & { textposition: string }
  >
}

export const useCourse = (): CourseHookReturn => {
  /*
   Another possibility to show the progress of the course in a circle

   import CircularProgress, {
   CircularProgressProps,
   } from '@mui/material/CircularProgress'
   function CircularProgressWithLabel(
   props: CircularProgressProps & { value: number } & { text: string},
   ) {
   return (
   <Box sx={{ position: 'relative', display: 'inline-flex' }}>
   <CircularProgress variant="determinate" {...props} />
   <Box
   sx={{
   top: 0,
   left: 0,
   bottom: 0,
   right: 0,
   position: 'absolute',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   }}
   >
   <Typography
   variant="caption"
   color="text.primary"
   >{`${(props.text)}`}</Typography>
   </Box>
   </Box>
   )
   }
   */

  const LinearProgressWithLabel = (
    props: LinearProgressProps & { value: number } & { text: string } & { textposition: string }
  ) => {
    return (
      <div>
        <Tooltip title={'Completed learning elements'}>
          <Typography sx={{ ml: props.textposition, mr: '0.5rem' }} variant="body1" color="text.secondary">
            {'Learning progress: ' + props.text}
          </Typography>
        </Tooltip>
        <LinearProgress variant="determinate" {...props} sx={{ ml: '-4rem' }} />
      </div>
    )
  }

  const BorderLinearProgress = styled(LinearProgressWithLabel)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 3
    }
  }))

  const calculateTopicProgress = (learningElementProgressTopics: number[][], index: number) => {
    const percent = calculatePercent(learningElementProgressTopics, index)
    //if the student solved anything show his progress, else show a set minimum (6)
    const value = percent > 1 ? percent : 6
    const color = colorByPercent(percent)

    return (
      <BorderLinearProgress
        value={value}
        text={`${learningElementProgressTopics[index][0]}/${learningElementProgressTopics[index][1]}`}
        color={color}
        textposition={'34rem'}
      />
    )
  }

  const calculatePercent = (learningElementProgressTopics: number[][], index: number) => {
    return (learningElementProgressTopics[index][0] / learningElementProgressTopics[index][1]) * 100
  }

  const colorByPercent = (percent: number) => {
    if (percent === 0) return 'error'
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
