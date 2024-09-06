import { useEffect, useState } from 'react'
import { Histogram, LineGraph, Rating, SpiderGraph, Table, TableColumnProps } from 'react-rating-charts'
import { FormControlLabel, Grid, Radio, RadioGroup } from '@common/components'
import { StudentRating, User } from '@core'
import { usePersistedStore } from '@store'
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
  const {
    studentRatings,
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
  const getUser = usePersistedStore((state) => state.getUser)
  const [transformedSpiderGraphData, setTransformedSpiderGraphData] = useState({});

  useEffect(() => {
    if (topics.length > 0) {
      const updatedSpiderGraphData = { ...spiderGraphData }; // Copy the spiderGraphData locally

      for (const topicId in updatedSpiderGraphData) {
        const topic = topics.find((topic) => topic.id === parseInt(topicId));
        if (topic) {
          updatedSpiderGraphData[topic.name] = updatedSpiderGraphData[topicId];
          delete updatedSpiderGraphData[topicId];
        }
      }

      // Store the transformed data in local state
      setTransformedSpiderGraphData(updatedSpiderGraphData);
    }
  }, [topics, spiderGraphData]);

  getUser().then((user: User) => {
    // Get newest ratings of user_id for each topic
    const newestRatingsOfStudentOnEveryTopic = studentRatings?.reduce((acc, rating) => {
      if (rating.student_id == user.id) {
        if (!acc[rating.topic_id] || acc[rating.topic_id].timestamp < rating.timestamp) {
          acc[rating.topic_id] = rating
        }
      }
      return acc
    }, {} as Record<number, StudentRating>)

    // console.log(newestRatingsOfStudentOnEveryTopic)
  })
  // Get average rating value over all topics

  /**
   const averageRatingValue = 0
   const averageRatingDeviation = 0
   const maxRatingValue = 0
   const maxRatingDeviation = 0
   const ratingValueTrend = 0
   */

  // Für Histogram
  const newestRatingOfEveryStudent = studentRatings?.reduce((acc, rating) => {
    if (!acc[rating.student_id] || acc[rating.student_id].timestamp < rating.timestamp) {
      acc[rating.student_id] = rating
    }
    return acc
  }, {} as Record<number, StudentRating>)

  const title = '1232'
  const s = () => 'aaaaa'
  const [choosenComponent, setChoosenChomponent] = useState('lineGraph')

  // Table.
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
                tooltips={{
                  setDeviationTooltip: s,
                  setDeviationTrendTooltip: s,
                  setValueTooltip: s,
                  setValueTrendTooltip: s
                }}
              />
            </Grid>
            <Grid item>
              <SpiderGraph data={transformedSpiderGraphData} minRatingValue={0} title={title} />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" mb={5}>
            <Grid item>
              <Histogram data={histogramData} ratingValue={ratingValue} minRatingValue={0} />
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center" mb={5}>
              <Grid item>
                <RadioGroup
                  id=""
                  row
                  onChange={(event) => setChoosenChomponent(event.target.value)}
                  value={choosenComponent}>
                  <FormControlLabel value="lineGraph" control={<Radio />} label="Line graph" />
                  <FormControlLabel value="table" control={<Radio />} label="Table" />
                </RadioGroup>
              </Grid>
              <Grid item>
                {choosenComponent == 'lineGraph' ? (
                  <LineGraph data={lineGraphData} minRatingValue={0} />
                ) : (
                  <Table data={lineGraphData} columns={columns} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default StudentRatingDashboard
