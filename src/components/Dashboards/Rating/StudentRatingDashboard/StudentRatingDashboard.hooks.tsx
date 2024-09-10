import log from 'loglevel'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StudentRating, Topic, User } from '@core'
import { SnackbarContext, fetchStudentRatings } from '@services'
import { usePersistedStore, useStore } from '@store'

/**
 * # StudentRatingDashboardHookReturn type
 *
 * Represents the return type of the useStudentRatingDashboard hook.
 *
 * @prop ratingValue - The average rating value of the user.
 * @prop ratingDeviation - The average rating deviation of the user.
 * @prop maxRatingDeviation - The maximum rating deviation of the user.
 * @prop ratingValueTrend - The rating value trend of the user.
 * @prop ratingDeviationTrend - The rating deviation trend of the user.
 * @prop spiderGraphData - The data for the spider graph.
 * @prop lineGraphData - The data for the line graph.
 * @prop histogramData - The data for the histogram.
 * @prop isLoading - The loading state of the data.
 * @prop topics - The topics of the user.
 */
export type StudentRatingDashboardHookReturn = {
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
 * topics
 * } = useStudentRatingDashboard()
 * ```
 */
export const useStudentRatingDashboard = (): StudentRatingDashboardHookReturn => {
  // Hook.
  const { t } = useTranslation()

  // States.
  const [isLoading, setIsLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])
  const [ratingStats, setRatingStats] = useState({
    ratingValue: 0,
    ratingDeviation: 0,
    maxRatingDeviation: 0,
    ratingValueTrend: 0,
    ratingDeviationTrend: 0
  })
  const [spiderGraphData, setSpiderGraphData] = useState<Record<string, number>>({})
  const [lineGraphData, setLineGraphData] = useState<{ value: number; deviation: number; timestamp: Date }[]>([])
  const [histogramData, setHistogramData] = useState<number[]>([])

  // Store.
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  // Context.
  const { addSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    getUser()
      .then((user: User) => {
        // Get courses of the user.
        getCourses(user.settings.user_id, user.lms_user_id, user.id)
          .then((courseResponse) => {
            // Get all topics of the course.
            const courseTopicsPromises = courseResponse.courses.map((course) =>
              getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, course.id.toString())
            )
            Promise.all(courseTopicsPromises)
              .then((courseTopicsResponses) => {
                // Set all the topics.
                const topics = courseTopicsResponses.flatMap((resp) => resp.topics)
                setTopics(topics)
              })
              .catch((error) => {
                addSnackbar({
                  message: t('error.fetchLearningPathTopic'),
                  severity: 'error',
                  autoHideDuration: 3000
                })
                log.error(t('error.fetchLearningPathTopic') + ' ' + error)
              })
          })
          .catch((error) => {
            addSnackbar({
              message: t('error.fetchCourses'),
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error(t('error.fetchCourses') + ' ' + error)
          })

        // Fetch all ratings of all students.
        fetchStudentRatings()
          .then((ratings) => {
            // Get all ratings of the user.
            const userRatings = ratings.filter((rating) => rating.student_id === user.id)

            // Categorize the ratings of the user into topics.
            const categorizedRatings = userRatings.reduce(
              (acc, rating) => ({
                ...acc,
                [rating.topic_id]: [...(acc[rating.topic_id] || []), rating]
              }),
              {} as Record<string, StudentRating[]>
            )

            // Set the data for the spider graph.
            setSpiderGraphData(
              Object.keys(categorizedRatings).reduce(
                (acc: { [key: string]: number }, key) => ({
                  ...acc,
                  [key]: categorizedRatings[key][0].rating_value
                }),
                {}
              )
            )

            // Calculate the average rating value and deviation of the user.
            const totals = Object.values(categorizedRatings).reduce(
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

            // Calculate the rating value trend and rating deviation trend of the user.
            const count = Object.keys(categorizedRatings).length
            const ratingValueTrend = (totals.current.ratingValue - totals.previous.ratingValue) / count
            const ratingDeviationTrend = (totals.current.ratingDeviation - totals.previous.ratingDeviation) / count

            // Set the rating stats of the user.
            setRatingStats({
              ratingValue: totals.current.ratingValue / count,
              ratingDeviation: totals.current.ratingDeviation / count,
              ratingValueTrend,
              ratingDeviationTrend,
              maxRatingDeviation: Math.max(
                ...Object.values(categorizedRatings)
                  .flat()
                  .map((r) => r.rating_deviation)
              )
            })

            // Sort the ratings by timestamp ascending.
            const sortedRatings = [...userRatings].sort(
              (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            )

            // Set the data for the line graph.
            setLineGraphData(
              sortedRatings.map((rating, idx) => {
                const totalRatingValue = sortedRatings.slice(0, idx + 1).reduce((acc, r) => acc + r.rating_value, 0)
                const totalRatingDeviation = sortedRatings
                  .slice(0, idx + 1)
                  .reduce((acc, r) => acc + r.rating_deviation, 0)
                return {
                  value: totalRatingValue / (idx + 1),
                  deviation: (totalRatingDeviation / (idx + 1)) * 1.96,
                  timestamp: new Date(rating.timestamp)
                }
              })
            )

            // Calculate the histogram data.
            // Get the latest of each student-topic pair.
            const latestRatings = ratings.reduce((acc, rating) => {
              const key = `${rating.student_id}-${rating.topic_id}`
              const shouldUpdate =
                !acc[key] || new Date(rating.timestamp).getTime() > new Date(acc[key].timestamp).getTime()
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

            // Set the histogram data.
            setHistogramData(Object.values(studentAverages).map(({ sum, count }) => sum / count))

            // Set loading to false.
            setIsLoading(false)
          })
          .catch((error) => {
            addSnackbar({
              message: t('error.fetchStudentRatings'),
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error(t('error.fetchStudentRatings') + ' ' + error)
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

  return useMemo(
    () => ({
      ...ratingStats,
      spiderGraphData,
      lineGraphData,
      histogramData,
      isLoading,
      topics
    }),
    [ratingStats, spiderGraphData, lineGraphData, histogramData, isLoading, topics]
  )
}
