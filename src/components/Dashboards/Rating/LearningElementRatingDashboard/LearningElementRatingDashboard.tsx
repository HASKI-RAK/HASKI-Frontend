import { memo, useEffect, useState } from 'react'
import { LineGraph, Rating, SpiderGraph, Table, TableColumnProps } from 'react-rating-charts'
import { FormControlLabel, Grid, Radio, RadioGroup } from '@common/components'
import {
  StudentRatingDashboardHookReturn,
  useLearningElementRatingDashboard as _useLearningElementRatingDashboard
} from './LearningElementRatingDashboard.hooks'

type StudentRatingDashboardProps = {
  useLearningElementRatingDashboard?: () => StudentRatingDashboardHookReturn
}

const LearningElementRatingDashboard = ({
  useLearningElementRatingDashboard = _useLearningElementRatingDashboard
}: StudentRatingDashboardProps) => {
  // States.
  const [chosenComponent, setChosenComponent] = useState('lineGraph')
  const [transformedSpiderGraphData, setTransformedSpiderGraphData] = useState({})

  // Hook.
  const {
    isLoading,
    ratingValue,
    ratingDeviation,
    maxRatingDeviation,
    ratingDeviationTrend,
    ratingValueTrend,
    spiderGraphData,
    lineGraphData,
    topics
  } = useLearningElementRatingDashboard()

  // Map the topic ids to the topic names.
  useEffect(() => {
    if (topics.length > 0) {
      const updatedSpiderGraphData = { ...spiderGraphData }

      for (const topicId in updatedSpiderGraphData) {
        const topic = topics.find((topic) => topic.id === parseInt(topicId))
        if (topic) {
          updatedSpiderGraphData[topic.name] = updatedSpiderGraphData[topicId]
          delete updatedSpiderGraphData[topicId]
        }
      }

      setTransformedSpiderGraphData(updatedSpiderGraphData)
    }
  }, [topics, spiderGraphData])

  // General.
  const color = 'orange'

  // Rating title and tooltips.
  const title = 'The current average rating of all learning elements' // 'Ihr derzeitiges durchschnittl. Rating' t('components.StudentRatingDashboard.ratingTitle)
  const ratingTooltips = {
    setDeviationTooltip: (value: number) => 'The current average rating deviation is ' + value + '.',
    setDeviationTrendTooltip: (value: number) => 'The trend of the average rating deviation is ' + value + '.',
    setValueTooltip: (value: number) => 'The current average rating value is ' + value + '.',
    setValueTrendTooltip: (value: number) => 'The trend of the average rating value is ' + value + '.'
  }

  // Spider graph.
  const spiderGraphTitle = 'The average learning element rating per topic'
  const setTooltip = (concept: string, value: number) => 'The rating for ' + concept + ' is ' + value + '.'

  // Line graph.
  const lineGraphTitle = 'The progression of the average learning element rating'
  const lineGraphTitles = {
    title: lineGraphTitle,
    xAxisTitle: 'Timestamp',
    yAxisTitle: 'Rating'
  }
  const lineGraphTooltips = {
    setXAxisTooltip: () => 'Shows the timestamps.',
    setYAxisTooltip: () => 'Shows the rating values.',
    setDataTooltip: (value: number, deviation: number, timestamp: string) =>
      'On' + timestamp + ' the rating was ' + value + ' with a deviation of ' + deviation + '.',
    setLowerDeviationTooltip: (value: number, timestamp: string) =>
      'On ' + timestamp + ' the maximum rating was ' + value + '.',
    setUpperDeviationTooltip: (value: number, timestamp: string) =>
      'On ' + timestamp + ' the minimum rating was ' + value + '.'
  }

  // Table.
  const setRGBColor = (alpha: number) => 'rgba(255, 165, 0, ' + alpha + ')'
  const setHeaderTooltip = (header: string) => 'Shows the ' + header + 's of the table.'
  const columns: TableColumnProps[] = [
    {
      header: 'Timestamp',
      key: 'timestamp'
    },
    {
      header: 'Value',
      key: 'value'
    },
    {
      header: 'Deviation',
      key: 'deviation'
    }
  ]

  return (
    <>
      {!isLoading && (
        <Grid container direction="column" justifyContent="center">
          <Grid container direction="row" alignItems="center" justifyContent="center" alignContent="center">
            <Grid item>
              <Rating
                ratingValue={ratingValue}
                ratingDeviation={ratingDeviation * 1.96}
                ratingValueTrend={ratingValueTrend}
                ratingDeviationTrend={ratingDeviationTrend * 1.96}
                maxRatingDeviation={maxRatingDeviation * 1.96}
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
          <Grid item>
            <Grid container direction="column" alignItems="center" mb={5} gap={2}>
              <Grid item>
                <RadioGroup
                  id="learning-element-rating-radio-group"
                  row
                  onChange={(event) => setChosenComponent(event.target.value)}
                  value={chosenComponent}>
                  <FormControlLabel value="lineGraph" control={<Radio />} label="Line graph" />
                  <FormControlLabel value="table" control={<Radio />} label="Table" />
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
                    setHeaderTooltip={setHeaderTooltip}
                    title={lineGraphTitle}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default memo(LearningElementRatingDashboard)
