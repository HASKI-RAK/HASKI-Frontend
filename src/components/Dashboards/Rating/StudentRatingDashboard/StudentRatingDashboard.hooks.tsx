import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { LearningElementRating, StudentRating, User } from '@core'
import { fetchStudentRatings, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import { RatingDashboardHookReturn } from '../RatingDashboard/RatingDashboard.hooks'

// TODO: DOCU
export const getMaxRatingValue = (ratings: StudentRating[] | LearningElementRating[]) => {
  return Math.max(...ratings.map((rating) => rating.rating_value))
}

// TODO: DOCU
export const getMaxRatingDeviation = (ratings: StudentRating[] | LearningElementRating[]) => {
  return Math.max(...ratings.map((rating) => rating.rating_deviation))
}

// TODO: DOCU
export const getUserRatings = (ratings: StudentRating[], userId: number) => {
  return ratings
    .filter((rating) => rating.student_id === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

// TODO: DOCU
export const getCategorizedRatings = (userRatings: StudentRating[]) => {
  return userRatings.reduce(
    (acc, rating) => ({
      ...acc,
      [rating.topic_id]: [...(acc[rating.topic_id] || []), rating]
    }),
    {} as Record<string, StudentRating[]>
  )
}

// TODO: DOCU
export const getSpiderGraphData = (categorizedRatings: Record<string, StudentRating[]>) => {
  return Object.keys(categorizedRatings).reduce(
    (acc: { [key: string]: number }, key) => ({
      ...acc,
      [key]: categorizedRatings[key][0].rating_value
    }),
    {}
  )
}

// TODO: getTotals()
export const getTotals = (categorizedRatings: Record<string, StudentRating[]>) => {
  return Object.values(categorizedRatings).reduce(
    (acc, ratings) => {
      const [current, previous] = ratings
      return {
        current: {
          ratingValue: acc.current.ratingValue + current.rating_value,
          ratingDeviation: acc.current.ratingDeviation + current.rating_deviation
        },
        previous: previous
          ? {
              ratingValue: acc.previous.ratingValue + previous.rating_value,
              ratingDeviation: acc.previous.ratingDeviation + previous.rating_deviation
            }
          : acc.previous
      }
    },
    {
      current: { ratingValue: 0, ratingDeviation: 0 },
      previous: { ratingValue: 0, ratingDeviation: 0 }
    }
  )
}

// TODO: DOCU
export const getLineGraphData = (userRatings: StudentRating[]) => {
  // Sort the ratings by timestamp ascending.
  const sortedRatings = [...userRatings].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  // Calculate the data for the line graph.
  return sortedRatings.map((rating, idx) => {
    const totalRatingValue = sortedRatings.slice(0, idx + 1).reduce((acc, r) => acc + r.rating_value, 0)
    const totalRatingDeviation = sortedRatings.slice(0, idx + 1).reduce((acc, r) => acc + r.rating_deviation, 0)
    return {
      value: totalRatingValue / (idx + 1),
      deviation: (totalRatingDeviation / (idx + 1)) * 1.96,
      timestamp: new Date(rating.timestamp)
    }
  })
}

// TODO: DOCU
export const getHistogramData = (ratings: StudentRating[]) => {
  // Get the latest of each student-topic pair.
  const latestRatings = ratings.reduce((acc, rating) => {
    const key = `${rating.student_id}-${rating.topic_id}`
    const shouldUpdate = !acc[key] || new Date(rating.timestamp).getTime() > new Date(acc[key].timestamp).getTime()
    return shouldUpdate ? { ...acc, [key]: rating } : acc
  }, {} as { [key: string]: StudentRating })

  // Calculate averages for each student.
  const studentAverages = Object.values(latestRatings).reduce((acc, rating) => {
    const { student_id, rating_value } = rating
    return {
      ...acc,
      [student_id]: acc[student_id]
        ? {
            sum: acc[student_id].sum + rating_value,
            count: acc[student_id].count + 1
          }
        : { sum: rating_value, count: 1 }
    }
  }, {} as { [student_id: number]: { sum: number; count: number } })

  // Calculate the histogram data.
  return Object.values(studentAverages).map(({ sum, count }) => sum / count)
}

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
