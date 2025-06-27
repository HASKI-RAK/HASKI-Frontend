import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { User } from '@core'
import { fetchStudentRatings, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import { RatingDashboardHookReturn } from '../RatingDashboard/RatingDashboard.hooks'
import { getCategorizedRatings, getHistogramData, getLineGraphData, getMaxRatingDeviation, getMaxRatingValue, getSpiderGraphData, getTotals, getUserRatings } from './RatingCalculations'

/**
 * # useStudentRatingDashboard hook
 *
 * Fetches the student ratings and calculates the data for student rating dashboard.
 *
 * @returns StudentRatingDashboardHookReturn
 *
 * @remarks
 * This hook is used in the StudentRatingDashboard component as default.
 *
 * @example
 * ```tsx
 * const {
 *  ratingValue,
 * ratingDeviation,
 * maxRatingDeviation,
 * ratingValueTrend,
 * ratingDeviationTrend,
 * spiderGraphData,
 * histogramData
 * lineGraphData,
 * isLoading,
 * } = useStudentRatingDashboard()
 * ```
 */
export const useStudentRatingDashboard = (): RatingDashboardHookReturn => {
  // Hook.
  const { t } = useTranslation()

  // States.
  const [isLoading, setIsLoading] = useState(true)
  const [userRatingValue, setUserRatingValue] = useState(0)
  const [spiderGraphData, setSpiderGraphData] = useState<Record<string, number>>({})
  const [lineGraphData, setLineGraphData] = useState<{ value: number; deviation: number; timestamp: Date }[]>([])
  const [histogramData, setHistogramData] = useState<number[]>([])
  const [ratingStats, setRatingStats] = useState({
    ratingValue: 0,
    ratingDeviation: 0,
    maxRatingDeviation: 0,
    ratingValueTrend: 0,
    ratingDeviationTrend: 0
  })

  // Store.
  const getUser = usePersistedStore((state) => state.getUser)

  // Context.
  const { addSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    // Get the user.
    getUser()
      .then((user: User) => {
        // Fetch all ratings of all students.
        fetchStudentRatings(user.settings.user_id, user.id)
          .then((ratings) => {
            // Get the maximum rating value.
            const maxRatingValue = getMaxRatingValue(ratings)

            // Get the maximum rating deviation.
            const maxRatingDeviation = getMaxRatingDeviation(ratings)

            // Get all ratings of the user.
            const userRatings = getUserRatings(ratings, user.id)

            // Categorize the ratings of the user into topics.
            const categorizedRatings = getCategorizedRatings(userRatings)

            // Set the data for the spider graph.
            setSpiderGraphData(getSpiderGraphData(categorizedRatings))

            // Calculate the average rating value and deviation of the user.
            const totals = getTotals(categorizedRatings)

            // Calculate the rating value trend and rating deviation trend of the user.
            const count = Object.keys(categorizedRatings).length
            const ratingValueTrend = (totals.current.ratingValue - totals.previous.ratingValue) / count
            const ratingDeviationTrend = (totals.current.ratingDeviation - totals.previous.ratingDeviation) / count

            // Set the user rating value.
            setUserRatingValue(totals.current.ratingValue / count)

            // Set the rating stats of the user.
            setRatingStats({
              ratingValue: totals.current.ratingValue / count / maxRatingValue,
              ratingDeviation: totals.current.ratingDeviation / count / maxRatingDeviation,
              ratingValueTrend: ratingValueTrend / maxRatingValue,
              ratingDeviationTrend: ratingDeviationTrend / maxRatingDeviation,
              maxRatingDeviation: 1
            })

            // Set the data for the line graph.
            setLineGraphData(getLineGraphData(userRatings))

            // Set the histogram data.
            setHistogramData(getHistogramData(ratings))
          })
          .catch((error) => {
            addSnackbar({
              message: t('error.fetchStudentRatings'),
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error(t('error.fetchStudentRatings') + ' ' + error)
            setIsLoading(true)
          })
      })
      .catch((error) => {
        addSnackbar({
          message: t('error.fetchUser'),
          severity: 'error',
          autoHideDuration: 3000
        })
        log.error(t('error.fetchUser') + ' ' + error)
        setIsLoading(true)
      })
  }, [])

  useEffect(() => {
    // Only toggle isLoading to false when ratingStats, spiderGraphData, lineGraphData, and histogramData have data.
    if (ratingStats && spiderGraphData && lineGraphData.length > 0 && histogramData) setIsLoading(false)
  }, [lineGraphData])

  return useMemo(
    () => ({
      ...ratingStats,
      userRatingValue,
      spiderGraphData,
      lineGraphData,
      histogramData,
      isLoading
    }),
    [ratingStats, userRatingValue, spiderGraphData, lineGraphData, histogramData, isLoading]
  )
}
