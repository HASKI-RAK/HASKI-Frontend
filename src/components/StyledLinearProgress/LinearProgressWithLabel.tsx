import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { LinearProgress, LinearProgressProps, Tooltip, Typography } from '@common/components'

/**
 * @prop value - The value of the progress bar.
 * @prop text - The text of the progress bar.
 * @prop textposition - The position of the text of the progress bar.
 * @interface
 */
export type LinearProgressWithLabelProps = LinearProgressProps & {
  value: number
  text: string
  textposition: { xs: string; sm: string; md: string; lg: string; xl: string; xxl: string; xxxl: string }
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
const LinearProgressWithLabel = (props: LinearProgressWithLabelProps) => {
  const { t } = useTranslation()
  return (
    <div>
      <Tooltip title={'Completed learning elements'}>
        <Typography sx={{ ml: props.textposition, mr: '0.5rem' }} variant="body1" color="textPrimary">
          {t('components.StyledLinearProgress.linearProgressWithLabel.learningProgress') + ': ' + props.text}
        </Typography>
      </Tooltip>
      <LinearProgress
        variant="determinate"
        {...props}
        sx={{ ml: { xs: '16rem', sm: '0rem', md: '-8rem', lg: '-9rem', xl: '-12rem', xxl: '-28rem', xxxl: '-52rem' } }}
      />
    </div>
  )
}

export default memo(LinearProgressWithLabel)
