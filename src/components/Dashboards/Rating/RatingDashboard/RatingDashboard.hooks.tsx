import { useMemo } from 'react'
import { Topic } from '@core'

/**
 * # LearningElementRatingDashboardHookReturn type
 *
 * Represents the return type of the useLearningElementRatingDashboard hook.
 *
 * @prop ratingValue - The average normalized rating value of all learning elements.
 * @prop ratingDeviation - The average normalized rating deviation of all learning elements.
 * @prop maxRatingDeviation - The maximum normalized rating deviation of all learning elements.
 * @prop ratingValueTrend - The normalized trend of the average rating value of all learning elements.
 * @prop ratingDeviationTrend - The normalized trend of the average rating deviation of all learning elements.
 * @prop spiderGraphData - The data for the spider graph.
 * @prop lineGraphData - The data for the line graph.
 * @prop isLoading - The loading state.
 * @prop topics - A list of topics.
 */
/**
 * # RatingDashboardHookReturn type
 * TODO
 * Represents the return type of the useRatingDashboard hook.
 *
 * @prop userRatingValue - The rating value of the user.
 * @prop ratingValue - The average normalized rating value of the user.
 * @prop ratingDeviation - The average normalized rating deviation of the user.
 * @prop maxRatingDeviation - The maximum normalized rating deviation of the user.
 * @prop ratingValueTrend - The normalized rating value trend of the user.
 * @prop ratingDeviationTrend - The normalized rating deviation trend of the user.
 * @prop spiderGraphData - The data for the spider graph.
 * @prop lineGraphData - The data for the line graph.
 * @prop histogramData - The data for the histogram.
 * @prop isLoading - The loading state of the data.
 * @prop topics - The topics of the user.
 */
export type RatingDashboardHookReturn = {
  userRatingValue: number
  ratingValue: number
  ratingDeviation: number
  maxRatingDeviation: number
  ratingValueTrend: number
  ratingDeviationTrend: number
  spiderGraphData: Record<string, number>
  lineGraphData: {
    value: number
    deviation: number
    timestamp: Date
  }[]
  histogramData: number[]
  isLoading: boolean
  topics: Topic[]
}

/**
 *
 * @returns
 */
export const useRatingDashboard = (): RatingDashboardHookReturn => {
  return useMemo(
    () => ({
      ratingValue: 0,
      ratingDeviation: 0,
      maxRatingDeviation: 0,
      ratingValueTrend: 0,
      ratingDeviationTrend: 0,
      userRatingValue: 0,
      spiderGraphData: {},
      lineGraphData: [
        {
          value: 0,
          deviation: 0,
          timestamp: new Date()
        }
      ],
      histogramData: [],
      isLoading: false,
      topics: []
    }),
    []
  )
}
