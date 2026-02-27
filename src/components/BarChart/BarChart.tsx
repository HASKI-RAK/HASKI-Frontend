import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@common/components'
import { handleError } from '@components'
import { SnackbarContext } from '@services'

type BarChartProps = {
  axisLabels?: string[]
  barValues: number[]
  yAxisLabels: string[]
  barColor: string
}

export const BarChart = ({ axisLabels, barValues, yAxisLabels, barColor }: BarChartProps) => {
  const { t } = useTranslation()
  const [maxValue, setMaxValue] = useState(0)
  const [dataErrorOccurred, setDataErrorOccurred] = useState(false)

  useEffect(() => {
    if (barValues.length !== yAxisLabels.length) {
      setDataErrorOccurred(true)
    } else {
      setDataErrorOccurred(false)
    }
  }, [barValues, yAxisLabels])

  useEffect(() => {
    if (barValues.length > 0) {
      setMaxValue(Math.max(...barValues))
    }
  }, [barValues])

  return (
    <Grid container direction="column" alignItems="right" justifyContent="center" mt="2rem" ml="2rem">
      {dataErrorOccurred ? (
        <Typography color="error">{t('components.barChart.dataError')}</Typography>
      ) : (
        <svg width="20rem" height="25rem">
          {barValues.map((value, index) => {
            const maxBarWidth = 20
            const barWidth = (value / maxValue) * maxBarWidth
            const barHeight = 2
            const gap = 0.5
            return (
              <rect
                key={index}
                x={0}
                y={`${index * (barHeight + gap)}rem`}
                width={`${barWidth}rem`}
                height={`${barHeight}rem`}
                fill={barColor}
              />
            )
          })}
        </svg>
      )}
    </Grid>
  )
}

export default memo(BarChart)
