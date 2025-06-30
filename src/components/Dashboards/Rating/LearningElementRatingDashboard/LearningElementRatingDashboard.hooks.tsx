import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { LearningElementRating, LearningElementRatingResponse, StudentRating } from '@core'
import { fetchLearningElementRatings, SnackbarContext } from '@services'
import { RatingDashboardHookReturn } from '../RatingDashboard/RatingDashboard.hooks'

// TODO: DOCU
export const getMaxRatingValue = (ratings: StudentRating[] | LearningElementRating[]) => {
  return Math.max(...ratings.map((rating) => rating.rating_value))
}

// TODO: DOCU
export const getMaxRatingDeviation = (ratings: StudentRating[] | LearningElementRating[]) => {
  return Math.max(...ratings.map((rating) => rating.rating_deviation))
}

const getTopicAverages = (learningElementRatingResponse: LearningElementRatingResponse) => {
          // Group ratings by learning element and topic, keeping only the latest and second latest ratings.
        const groupedRatings = learningElementRatingResponse.reduce((acc, rating) => {
          const key = `${rating.learning_element_id}-${rating.topic_id}`
          const updatedRatings = acc[key]
            ? [...acc[key], rating]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 2) // Keep only the two latest ratings
            : [rating]
          return {
            ...acc,
            [key]: updatedRatings
          }
        }, {} as { [key: string]: LearningElementRating[] })

        // Calculate averages for the latest and second latest ratings.
        const topicMap = Object.values(groupedRatings).reduce((acc, ratingsList) => {
          const latestRating = ratingsList[0]
          const secondLatestRating = ratingsList[1]
          return {
            ...acc,
            [latestRating.topic_id]: {
              latest: [...(acc[latestRating.topic_id]?.latest || []), latestRating],
              secondLatest: secondLatestRating
                ? [...(acc[latestRating.topic_id]?.secondLatest || []), secondLatestRating]
                : acc[latestRating.topic_id]?.secondLatest || []
            }
          }
        }, {} as { [topicId: number]: { latest: LearningElementRating[]; secondLatest: LearningElementRating[] } })

                // Calculate the average rating for each topic.
        return Object.keys(topicMap).map((topicId) => {
          const topicData = topicMap[parseInt(topicId)]

          // Calculate the sum of the latest ratings.
          const latestRatingsSum = topicData.latest.reduce(
            (acc, rating) => ({
              ratingSum: acc.ratingSum + rating.rating_value,
              deviationSum: acc.deviationSum + rating.rating_deviation
            }),
            { ratingSum: 0, deviationSum: 0 }
          )

          // Calculate the sum of the second latest ratings.
          const secondLatestRatingsSum = topicData.secondLatest.reduce(
            (acc, rating) => ({
              ratingSum: acc.ratingSum + rating.rating_value,
              deviationSum: acc.deviationSum + rating.rating_deviation
            }),
            { ratingSum: 0, deviationSum: 0 }
          )

          // Calculate the average rating values and deviations.
          const latestAvgRating = latestRatingsSum.ratingSum / topicData.latest.length
          const latestAvgDeviation = latestRatingsSum.deviationSum / topicData.latest.length

          const secondLatestAvgRating = topicData.secondLatest.length
            ? secondLatestRatingsSum.ratingSum / topicData.secondLatest.length
            : 0

          const secondLatestAvgDeviation = topicData.secondLatest.length
            ? secondLatestRatingsSum.deviationSum / topicData.secondLatest.length
            : 0

          return {
            topicId: parseInt(topicId),
            latestAvgRating,
            latestAvgDeviation,
            secondLatestAvgRating,
            secondLatestAvgDeviation
          }
        })
}

const getSpiderData = (topicAverages: {
    topicId: number;
    latestAvgRating: number;
    latestAvgDeviation: number;
    secondLatestAvgRating: number;
    secondLatestAvgDeviation: number;
}[]) => {
          return topicAverages.reduce((acc, { topicId, latestAvgRating }) => {
          return {
            ...acc,
            [topicId]: latestAvgRating
          }
        }, {} as Record<string, number>)
}


/**
 * # useLearningElementRatingDashboard hook
 *
 * Fetches the learning element ratings and calculates the data for the learning element rating dashboard.
 *
 * @returns LearningElementRatingDashboardHookReturn
 *
 * @remarks
 * This hook is used in the LearningElementRatingDashboard component as default.
 *
 * @example
 * ```tsx
 * const {
 * ratingValue,
 * ratingDeviation,
 * maxRatingDeviation,
 * ratingValueTrend,
 * ratingDeviationTrend,
 * spiderGraphData,
 * lineGraphData,
 * isLoading,
 * } = useLearningElementRatingDashboard()
 * ```
 */
export const useLearningElementRatingDashboard = (): RatingDashboardHookReturn => {
  // Hooks
  const { t } = useTranslation()

  // States.
  const [isLoading, setIsLoading] = useState(true)
  const [spiderGraphData, setSpiderGraphData] = useState<Record<string, number>>({})
  const [lineGraphData, setLineGraphData] = useState<{ value: number; deviation: number; timestamp: Date }[]>([])
  const [ratingStats, setRatingStats] = useState({
    ratingValue: 0,
    ratingDeviation: 0,
    maxRatingDeviation: 0,
    ratingValueTrend: 0,
    ratingDeviationTrend: 0
  })

  // Context.
  const { addSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    // Fetch all learning element ratings.
    fetchLearningElementRatings()
      .then((learningElementRatingResponse: LearningElementRatingResponse) => {
        // Get the max rating value.
        const maxRatingValue = getMaxRatingValue(learningElementRatingResponse)
        
        // Get the max rating deviation.
        const maxRatingDeviation = getMaxRatingDeviation(learningElementRatingResponse)

        // Calculate the average rating for each topic.
        const topicAverages = getTopicAverages(learningElementRatingResponse)

        // Set data for spider graph.
        const spiderData = getSpiderData(topicAverages)
        setSpiderGraphData(spiderData)

        // Calculate the overall averages.
        const overallAverages = topicAverages.reduce(
          (acc, topic) => ({
            latestRatingSum: acc.latestRatingSum + topic.latestAvgRating,
            latestDeviationSum: acc.latestDeviationSum + topic.latestAvgDeviation,
            secondLatestRatingSum: acc.secondLatestRatingSum + topic.secondLatestAvgRating,
            secondLatestDeviationSum: acc.secondLatestDeviationSum + topic.secondLatestAvgDeviation
          }),
          { latestRatingSum: 0, latestDeviationSum: 0, secondLatestRatingSum: 0, secondLatestDeviationSum: 0 }
        )

        // Set the rating stats.
        const totalTopics = topicAverages.length
        setRatingStats({
          ratingValue: overallAverages.latestRatingSum / totalTopics / maxRatingValue,
          ratingDeviation: overallAverages.latestDeviationSum / totalTopics / maxRatingDeviation,
          ratingValueTrend:
            (overallAverages.latestRatingSum / totalTopics - overallAverages.secondLatestRatingSum / totalTopics) /
            maxRatingValue,
          ratingDeviationTrend:
            (overallAverages.latestDeviationSum / totalTopics -
              overallAverages.secondLatestDeviationSum / totalTopics) /
            maxRatingDeviation,
          maxRatingDeviation: 1
        })

        // TODO: getLineGraphData()
        // Sort the ratings by timestamp ascending.
        const sortedRatings = learningElementRatingResponse.sort((a, b) => {
          const aTime = new Date(a.timestamp).getTime()
          const bTime = new Date(b.timestamp).getTime()
          return aTime - bTime
        })

        // Get all the different timestamps.
        const timestamps = Array.from(new Set(sortedRatings.map((r) => new Date(r.timestamp).getTime())))
          .map((t) => new Date(t))
          .sort((a, b) => a.getTime() - b.getTime())

        const lineGraphData: { value: number; deviation: number; timestamp: Date }[] = []

        // Calculate the average rating for each timestamp.
        timestamps.forEach((timestamp) => {
          const relevantRatings = sortedRatings.filter((r) => new Date(r.timestamp).getTime() <= timestamp.getTime())
          const topicMap = relevantRatings.reduce(
            (acc, rating) => ({
              ...acc,
              [rating.topic_id]: acc[rating.topic_id]
                ? {
                    sum: acc[rating.topic_id].sum + rating.rating_value,
                    count: acc[rating.topic_id].count + 1,
                    deviationSum: acc[rating.topic_id].deviationSum + rating.rating_deviation
                  }
                : {
                    sum: rating.rating_value,
                    count: 1,
                    deviationSum: rating.rating_deviation
                  }
            }),
            {} as { [topicId: number]: { sum: number; count: number; deviationSum: number } }
          )

          const topicAverages = Object.values(topicMap).map((topic) => ({
            avgRating: topic.sum / topic.count,
            avgDeviation: topic.deviationSum / topic.count
          }))

          const generalAvgRating = topicAverages.reduce((acc, topic) => acc + topic.avgRating, 0) / topicAverages.length
          const generalAvgDeviation =
            topicAverages.reduce((acc, topic) => acc + topic.avgDeviation, 0) / topicAverages.length

          lineGraphData.push({
            value: generalAvgRating,
            deviation: generalAvgDeviation * 1.96,
            timestamp
          })
        })

        // Set the data for the line graph.
        setLineGraphData(lineGraphData)

        // Set loading to false
        if (ratingStats && spiderGraphData && lineGraphData.length > 0) setIsLoading(false)
      })
      .catch((error) => {
        addSnackbar({
          message: t('error.fetchLearningElementRatings'),
          severity: 'error',
          autoHideDuration: 3000
        })
        log.error(t('error.fetchLearningElementRatings') + ' ' + error)
        setIsLoading(true)
      })
  }, [])

  return useMemo(
    () => ({
      ...ratingStats,
      userRatingValue: 0,
      histogramData: [],
      spiderGraphData,
      lineGraphData,
      isLoading
    }),
    [ratingStats, spiderGraphData, lineGraphData, isLoading]
  )
}
