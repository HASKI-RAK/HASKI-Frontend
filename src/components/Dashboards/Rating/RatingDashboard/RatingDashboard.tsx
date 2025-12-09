import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Histogram, LineGraph, Rating, SpiderGraph, Table, TableColumnProps } from 'react-rating-charts'
import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@common/components'
import { useTheme } from '@common/hooks'
import { Typewriter } from '@components'
import { useCourseTopics } from '@services'
import { RatingDashboardHookReturn, useRatingDashboard as _useRatingDashboard } from './RatingDashboard.hooks'

/**
 * Custom type for the currently selected rating dashboard.
 */
export type SelectedRatingDashboard = 'StudentRating' | 'LearningElementRating'

/**
 * Props for the {@link RatingDashboard} component.
 */
export type RatingDashboardProps = {
  /**
   * The currently selected Dashboard.
   */
  selectedDashboard: SelectedRatingDashboard
  /**
   * Optional hook to retrieve data for the rating dashboard.
   * If not provided, the default hook {@link useRatingDashboard} will be used.
   */
  useRatingDashboard?: () => RatingDashboardHookReturn
}

const RatingDashboard = ({ selectedDashboard, useRatingDashboard = _useRatingDashboard }: RatingDashboardProps) => {
  // Hooks
  const { t } = useTranslation()
  const { topics } = useCourseTopics()
  const theme = useTheme()
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
    histogramData
  } = useRatingDashboard()

  // States
  /**
   * Tracks the currently chosen component (e.g., a line graph) for displaying time-series rating data.
   */
  const [selectedComponent, setSelectedComponent] = useState('lineGraph')
  /**
   * Stores the transformed spider graph data.
   */
  const [transformedSpiderGraphData, setTransformedSpiderGraphData] = useState({})

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

  /**
   * Color used for rating charts, taken from the theme palette.
   */
  const color = theme.palette.primary.main

  // Rating title and tooltips
  /**
   * Translated title for the rating chart of the selected dashboard.
   */
  const ratingTitle = t(`components.${selectedDashboard}Dashboard.ratingTitle`)

  /**
   * Translated tooltips for the rating chart of the selected dashboard.
   */
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

  // Spider graph
  /**
   * Translated title for the spider graph of the selected dashboard.
   */
  const spiderGraphTitle = t(`components.${selectedDashboard}Dashboard.spiderGraphTitle`)

  /**
   * Translated tooltip for the spider graph of the selected dashboard.
   */
  const setTooltip = useCallback(
    (concept: string, value: number) =>
      t(`components.${selectedDashboard}Dashboard.spiderGraphTooltip`, { concept: concept, value: value }),
    []
  )

  // Histogram
  /**
   * Returns the translated user info for the histogram of the student rating dashboard.
   */
  const setUserInfo = useCallback(() => t('components.StudentRatingDashboard.histogramUserInfo'), [])

  /**
   * Translated titles for the histogram of the student rating dashboard.
   */
  const histogramTitles = {
    title: t('components.StudentRatingDashboard.histogramTitle'),
    yAxisTitle: t('components.RatingDashboard.histogramYAxisTitle'),
    xAxisTitle: t('components.RatingDashboard.histogramXAxisTitle')
  }

  /**
   * Translated tooltips for the histogram of the student rating dashboard.
   */
  const histogramTooltips = {
    setUserInfoTooltip: useCallback(
      (value: string, percentage: string) =>
        t('components.StudentRatingDashboard.histogramUserInfoTooltip', { value: value, percentage: percentage }),
      []
    ),
    setXAxisTooltip: useCallback(() => t('components.RatingDashboard.histogramXAxisTooltip'), []),
    setYAxisTooltip: useCallback(() => t('components.RatingDashboard.histogramYAxisTooltip'), [])
  }

  // Line graph and table
  /**
   * Translated title for the table of the selected dashboard.
   */
  const tableTitle = t(`components.${selectedDashboard}Dashboard.lineGraphTitle`)

  /**
   * Translated titles for the line graph of the rating dashboard.
   */
  const lineGraphTitles = {
    title: tableTitle,
    xAxisTitle: t('components.RatingDashboard.lineGraphXAxisTitle'),
    yAxisTitle: t('components.RatingDashboard.lineGraphYAxisTitle')
  }

  /**
   * Translated tooltips for the line graph of the selected dashboard.
   */
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

  // Table
  /**
   * Returns an RGB color string for the table based on the alpha value.
   */
  const setRGBColor = useCallback((alpha: number) => 'rgba(255, 165, 0, ' + alpha + ')', [])

  /**
   * Returns the translated header tooltip for the histogram of the rating dashboard.
   */
  const setHeaderTooltip = useCallback(
    (header: string) => t('components.RatingDashboard.tableHeaderTooltip', { header: header }),
    []
  )

  /**
   * Defines the table columns of the rating dashboard.
   * Each column includes a translated header and a key.
   *
   */
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
                title={ratingTitle}
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
                  onChange={(event) => setSelectedComponent(event.target.value)}
                  value={selectedComponent}>
                  <FormControlLabel
                    value="lineGraph"
                    control={<Radio id={'line-graph-radio'} />}
                    label={t('appGlobal.lineGraph')}
                  />
                  <FormControlLabel value="table" control={<Radio id={'table-radio'} />} label={t('appGlobal.table')} />
                </RadioGroup>
              </Grid>
              <Grid item>
                {selectedComponent == 'lineGraph' ? (
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
                    title={tableTitle}
                    setHeaderTooltip={setHeaderTooltip}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Typewriter delay={25} variant="h5" sx={{ minHeight: '50em' }} align="center">
          {t(`components.${selectedDashboard}Dashboard.empty`)}
        </Typewriter>
      )}
    </>
  )
}

/**
 * Dashboard component for visualizing rating data using various charts.
 *
 * Displays a rating chart, spider graph, histogram (only shown for student ratings),
 * and either a line graph or table.
 *
 * @param props - See {@link RatingDashboardProps}.
 * @returns A rating dashboard with detailed visualizations of rating data.
 *
 * @example
 * ```tsx
 * <RatingDashboard
 *  selectedDashboard="StudentRating"
 *  useRatingDashboard={useRatingDashboard}
 * />
 * ```
 */
export default memo(RatingDashboard)
