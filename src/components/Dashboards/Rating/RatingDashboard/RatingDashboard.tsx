import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Histogram, LineGraph, Rating, SpiderGraph, Table, TableColumnProps } from 'react-rating-charts'
import { FormControlLabel, Grid, Radio, RadioGroup } from '@common/components'
import { useTheme } from '@common/hooks'
import { Typewriter } from '@components'
import { RatingDashboardHookReturn, useRatingDashboard as _useRatingDashboard } from './RatingDashboard.hooks'
import { useTopics } from '../LearningElementRatingDashboard/Topics.hooks'

/**
 *
 */
export type SelectedRatingDashboard = 'StudentRating' | 'LearningElementRating'

/**
 *
 */
type RatingDashboardProps = {
  selectedDashboard: SelectedRatingDashboard
  useRatingDashboard?: () => RatingDashboardHookReturn
}

/** // TODO: 
 *
 * @param param0
 * @returns
 */
const RatingDashboard = ({ selectedDashboard, useRatingDashboard = _useRatingDashboard }: RatingDashboardProps) => {
  // States.
  const [chosenComponent, setChosenComponent] = useState('lineGraph')
  const [transformedSpiderGraphData, setTransformedSpiderGraphData] = useState({})

  // Hooks.
  const { t } = useTranslation()
  const {
    isLoading,
    userRatingValue,
    ratingValue,
    ratingDeviation,
    maxRatingDeviation,
    ratingDeviationTrend,
    ratingValueTrend,
    spiderGraphData,
    lineGraphData,
    histogramData,
  } = useRatingDashboard()
    const { topics } = useTopics()

  // Map the topic ids to the topic names.
  useEffect(() => {
    if (topics.length > 0 && spiderGraphData) {
      const updatedSpiderGraphData = Object.keys(spiderGraphData).reduce((acc, topicId) => {
        const topic = topics.find((topic) => topic.id === parseInt(topicId))
        if (topic && spiderGraphData[topicId] != null) {
          return {
            ...acc,
            [topic.name]: spiderGraphData[topicId]
          }
        }
        return {
          ...acc,
          [topicId]: spiderGraphData[topicId]
        }
      }, {})
      setTransformedSpiderGraphData(updatedSpiderGraphData)
    }
  }, [topics, spiderGraphData])

  // General.
  const theme = useTheme()
  const color = theme.palette.primary.main

  // Rating title and tooltips.
  const title = t(`components.${selectedDashboard}Dashboard.ratingTitle`)
  const ratingTooltips = {
    setDeviationTooltip: useCallback(
      (value: number) => t(`components.${selectedDashboard}Dashboard.ratingDeviationTooltip`, { value: value }),
      []
    ),
    setDeviationTrendTooltip: useCallback(
      (value: number) => t(`components.${selectedDashboard}Dashboard.ratingDeviationTrendTooltip`, { value: value }),
      []
    ),
    setValueTooltip: useCallback(
      (value: number) => t(`components.${selectedDashboard}Dashboard.ratingValueTooltip`, { value: value }),
      []
    ),
    setValueTrendTooltip: useCallback(
      (value: number) => t(`components.${selectedDashboard}Dashboard.ratingValueTrendTooltip`, { value: value }),
      []
    )
  }

  // Spider graph.
  const spiderGraphTitle = t(`components.${selectedDashboard}Dashboard.spiderGraphTitle`)
  const setTooltip = useCallback(
    (concept: string, value: number) =>
      t(`components.${selectedDashboard}Dashboard.spiderGraphTooltip`, { concept: concept, value: value }),
    []
  )

  // Histogram.
  const setUserInfo = useCallback(() => t('components.StudentRatingDashboard.histogramUserInfo'), [])
  const histogramTitles = {
    title: t('components.StudentRatingDashboard.histogramTitle'),
    yAxisTitle: t('components.RatingDashboard.histogramYAxisTitle'),
    xAxisTitle: t('components.RatingDashboard.histogramXAxisTitle')
  }
  const histogramTooltips = {
    setUserInfoTooltip: useCallback(
      (value: string, percentage: string) =>
        t('components.StudentRatingDashboard.histogramUserInfoTooltip', { value: value, percentage: percentage }),
      []
    ),
    setXAxisTooltip: useCallback(() => t('components.RatingDashboard.histogramXAxisTooltip'), []),
    setYAxisTooltip: useCallback(() => t('components.RatingDashboard.histogramYAxisTooltip'), [])
  }

  // Line graph.
  const lineGraphTitle = t(`components.${selectedDashboard}Dashboard.lineGraphTitle`)
  const lineGraphTitles = {
    title: lineGraphTitle,
    xAxisTitle: t('components.RatingDashboard.lineGraphXAxisTitle'),
    yAxisTitle: t('components.RatingDashboard.lineGraphYAxisTitle')
  }
  const lineGraphTooltips = {
    setXAxisTooltip: useCallback(() => t('components.RatingDashboard.lineGraphXAxisTooltip'), []),
    setYAxisTooltip: useCallback(() => t('components.RatingDashboard.lineGraphYAxisTooltip'), []),
    setDataTooltip: useCallback(
      (value: number, deviation: number, timestamp: string) =>
        t(`components.${selectedDashboard}Dashboard.lineGraphDataTooltip`, {
          value: value,
          deviation: deviation,
          timestamp: timestamp
        }),
      []
    ),
    setLowerDeviationTooltip: useCallback(
      (value: number, timestamp: string) =>
        t(`components.${selectedDashboard}Dashboard.lineGraphLowerDeviationTooltip`, {
          value: value,
          timestamp: timestamp
        }),
      []
    ),
    setUpperDeviationTooltip: useCallback(
      (value: number, timestamp: string) =>
        t(`components.${selectedDashboard}Dashboard.lineGraphUpperDeviationTooltip`, {
          value: value,
          timestamp: timestamp
        }),
      []
    )
  }

  // Table.
  const setRGBColor = useCallback((alpha: number) => 'rgba(255, 165, 0, ' + alpha + ')', [])
  const setHeaderTooltip = useCallback(
    (header: string) => t('components.RatingDashboard.tableHeaderTooltip', { header: header }),
    []
  )
  const columns: TableColumnProps[] = [
    {
      header: t('components.RatingDashboard.tableHeaderTimestamp'),
      key: 'timestamp'
    },
    {
      header: t('components.RatingDashboard.tableHeaderValue'),
      key: 'value'
    },
    {
      header: t('components.RatingDashboard.tableHeaderDeviation'),
      key: 'deviation'
    }
  ]

  return (
    <>
      {!isLoading ? (
        <Grid container direction="column" justifyContent="center">
          <Grid container direction="row" alignItems="center" justifyContent="center" alignContent="center">
            <Grid item>
              <Rating
                ratingValue={ratingValue}
                ratingDeviation={ratingDeviation}
                ratingValueTrend={ratingValueTrend}
                ratingDeviationTrend={ratingDeviationTrend}
                maxRatingDeviation={maxRatingDeviation}
                title={title}
                tooltips={ratingTooltips}
              />
            </Grid>
            <Grid item>
              <SpiderGraph
                color={color}
                data={transformedSpiderGraphData}
                minRatingValue={0}
                title={spiderGraphTitle}
                setTooltip={setTooltip}
              />
            </Grid>
          </Grid>
          {selectedDashboard === 'StudentRating' && (
            <Grid container justifyContent="center" mb={5}>
              <Grid item>
                <Histogram
                  color={color}
                  data={histogramData}
                  ratingValue={userRatingValue}
                  minRatingValue={0}
                  setUserInfo={setUserInfo}
                  titles={histogramTitles}
                  tooltips={histogramTooltips}
                />
              </Grid>
            </Grid>
          )}
          <Grid item>
            <Grid container direction="column" alignItems="center" mb={5} gap={2}>
              <Grid item>
                <RadioGroup
                  id="student-rating-radio-group"
                  row
                  onChange={(event) => setChosenComponent(event.target.value)}
                  value={chosenComponent}>
                  <FormControlLabel
                    value="lineGraph"
                    control={<Radio id={'line-graph-radio'} />}
                    label={t('appGlobal.lineGraph')}
                  />
                  <FormControlLabel value="table" control={<Radio id={'table-radio'} />} label={t('appGlobal.table')} />
                </RadioGroup>
              </Grid>
              <Grid item>
                {chosenComponent == 'lineGraph' ? (
                  <LineGraph
                    color={color}
                    data={lineGraphData}
                    minRatingValue={0}
                    titles={lineGraphTitles}
                    tooltips={lineGraphTooltips}
                  />
                ) : (
                  <Table
                    data={lineGraphData}
                    columns={columns}
                    setRGBColor={setRGBColor}
                    title={lineGraphTitle}
                    setHeaderTooltip={setHeaderTooltip}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Typewriter delay={25} variant="h5" sx={{ minHeight: '50em' }} align="center">
          {t(`components.${selectedDashboard}.empty`)}
        </Typewriter>
      )}
    </>
  )
}

export default memo(RatingDashboard)
