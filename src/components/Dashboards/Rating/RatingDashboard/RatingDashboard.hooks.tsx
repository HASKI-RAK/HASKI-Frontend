import { useMemo } from 'react'

/**
 * Return type for the {@link useRatingDashboard} hook.
 */
export type RatingDashboardHookReturn = {
  /**
   * The current rating value of a student.
   */
  userRatingValue: number
  /**
   * The average normalized rating value of a student or learning elements.
   */
  ratingValue: number
  /**
   * The average normalized rating deviation of a student or learning elements.
   */
  ratingDeviation: number
  /**
   * The maximum normalized rating deviation of a student or learning elements.
   */
  maxRatingDeviation: number
  /**
   * The trend of the normalized rating value for a student or learning elements.
   */
  ratingValueTrend: number
  /**
   * The trend of the normalized rating deviation for a student or learning elements.
   */
  ratingDeviationTrend: number
  /**
   * Data for the spider graph, including topic labels and corresponding value.
   */
  spiderGraphData: Record<string, number>
  /**
   * Data for the line graph, including value, deviation, and timestamp.
   */
  lineGraphData: {
    value: number
    deviation: number
    timestamp: Date
  }[]
  /**
   * Rating distribution data for the histogram.
   */
  histogramData: number[]
  /**
   * Whether the data is currently loading.
   */
  isLoading: boolean
}

/**
 * Hook for initializing default rating dashboard data.
 *
 * This hook returns placeholder values for all properties in {@link RatingDashboardHookReturn}.
 *
 * @category Hooks
 *
 * @returns Default values used in the rating dashboard.
 *
 * @example
 * ```tsx
 * const {
 *  isLoading,
 *  userRatingValue,
 *  ratingValue,
 *  ratingDeviation,
 *  maxRatingDeviation,
 *  ratingDeviationTrend,
 *  ratingValueTrend,
 *  spiderGraphData,
 *  lineGraphData,
 *  histogramData
 * } = useRatingDashboard()
 * ```
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
      isLoading: true
    }),
    []
  )
}
