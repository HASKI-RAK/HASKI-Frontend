import { memo, useEffect, useState } from 'react'
import { Histogram, LineGraph, Rating, SpiderGraph, Table, TableColumnProps } from 'react-rating-charts'
import { FormControlLabel, Grid, Radio, RadioGroup } from '@common/components'
import {
  StudentRatingDashboardHookReturn,
  useStudentRatingDashboard as _useStudentRatingDashboard
} from './StudentRatingDashboard.hooks'

type StudentRatingDashboardProps = {
  useStudentRatingDashboard?: () => StudentRatingDashboardHookReturn
}

const StudentRatingDashboard = ({
  useStudentRatingDashboard = _useStudentRatingDashboard
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
    histogramData,
    topics
  } = useStudentRatingDashboard()

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
  const title = 'Your current average rating' // 'Ihr derzeitiges durchschnittl. Rating' t('components.StudentRatingDashboard.ratingTitle)
  const ratingTooltips = {
    setDeviationTooltip: (value: number) => 'Your current average rating deviation is ' + value + '.',
    setDeviationTrendTooltip: (value: number) => 'The trend of your average rating deviation is ' + value + '.',
    setValueTooltip: (value: number) => 'Your current average rating value is ' + value + '.',
    setValueTrendTooltip: (value: number) => 'The trend of your average rating value is ' + value + '.'
  }

  // Spider graph.
  const spiderGraphTitle = 'Your average rating per topic'
  const setTooltip = (concept: string, value: number) => 'Your rating for ' + concept + ' is ' + value + '.'

  // Histogram.
  const setUserInfo = (value: string, percentage: string) => 'Your rating'
  const histogramTitles = {
    title: 'The rating distribution of all students',
    yAxisTitle: 'Number of students',
    xAxisTitle: 'Rating'
  }
  const histogramTooltips = {
    setUserInfoTooltip: (value: string, percentage: string) =>
      'You are above ' + percentage + '% of all students with a rating of ' + value + '.',
    setXAxisTooltip: (minValue: number | string, maxValue: number | string) => 'Shows the rating values.',
    setYAxisTooltip: (minValue: number | string, maxValue: number | string) => 'Shows the number of students.'
  }

  // Line graph.
  const lineGraphTitle = 'The progression of your average rating'
  const lineGraphTitles = {
    title: lineGraphTitle,
    xAxisTitle: 'Timestamp',
    yAxisTitle: 'Rating'
  }
  const lineGraphTooltips = {
    setXAxisTooltip: () => 'Shows the timestamps.',
    setYAxisTooltip: () => 'Shows the rating values.',
    setDataTooltip: (value: number, deviation: number, timestamp: string) =>
      'On' + timestamp + ' your rating was ' + value + ' with a deviation of ' + deviation + '.',
    setLowerDeviationTooltip: (value: number, timestamp: string) =>
      'On ' + timestamp + ' your maximum rating was ' + value + '.',
    setUpperDeviationTooltip: (value: number, timestamp: string) =>
      'On ' + timestamp + ' your minimum rating was ' + value + '.'
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
          <Grid container justifyContent="center" mb={5}>
            <Grid item>
              <Histogram
                color={color}
                data={histogramData}
                ratingValue={ratingValue}
                minRatingValue={0}
                setUserInfo={setUserInfo}
                titles={histogramTitles}
                tooltips={histogramTooltips}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center" mb={5} gap={2}>
              <Grid item>
                <RadioGroup
                  id="student-rating-radio-group"
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
                    title={lineGraphTitle}
                    setHeaderTooltip={setHeaderTooltip}
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

export default memo(StudentRatingDashboard)
