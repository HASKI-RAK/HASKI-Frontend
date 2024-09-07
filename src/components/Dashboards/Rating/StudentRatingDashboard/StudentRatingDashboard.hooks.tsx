import { useEffect, useMemo, useState } from 'react'
import { StudentRating, Topic, User } from '@core'
import { fetchStudentRatings } from '@services'
import { usePersistedStore, useStore } from '@store'

export type StudentRatingDashboardHookReturn = {
  readonly ratingValue: number
  readonly ratingDeviation: number
  readonly maxRatingDeviation: number
  readonly ratingValueTrend: number
  readonly ratingDeviationTrend: number
  readonly spiderGraphData: Record<string, number>
  readonly lineGraphData: { 
    value: number
    deviation: number
    timestamp: Date
  }[]
  readonly histogramData: number[]
  readonly studentRatings: StudentRating[]
  readonly isLoading: boolean
  readonly topics: Topic[]
}

export const useStudentRatingDashboard = (): StudentRatingDashboardHookReturn => {
  // States
  const [isLoading, setIsLoading] = useState(true)
  const [studentRatings, setStudentRatings] = useState<StudentRating[]>([])
  const [topics, setTopics] = useState<Topic[]>([])

  // Store.
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  // Rating.
  const [ratingValue, setRatingValue] = useState<number>(0)
  const [ratingDeviation, setRatingDeviation] = useState<number>(0)
  const [ratingValueTrend, setRatingValueTrend] = useState<number>(0)
  const [ratingDeviationTrend, setRatingDeviationTrend] = useState<number>(0)
  const [maxRatingDeviation, setMaxRatingDeviation] = useState<number>(0)

  // Spider graph.
  const [spiderGraphData, setSpiderGraphData] = useState<Record<string, number>>({})

  // Line graph.
  const [lineGraphData, setLineGraphData] = useState<
    {
      value: number
      deviation: number
      timestamp: Date
    }[]
  >([])

  // Histogram.
  const [histogramData, setHistogramData] = useState<number[]>([])

  useEffect(() => {
    getUser().then((user: User) => {
      getCourses(user.settings.user_id, user.lms_user_id, user.id).then((courseResponse) => {
        const courseTopics: Topic[] = []
        courseResponse.courses.map((course) =>
          getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, course.id.toString()).then(
            (learningPathTopicResponse) => {
              courseTopics.push(...learningPathTopicResponse.topics)
            }
          )
        )
        setTopics(courseTopics)
      }) // catch

      fetchStudentRatings().then((studentRatingsResponse) => {
        setStudentRatings(studentRatingsResponse)

        // Get the maximum rating value and deviation.
        const maxRatingValue = Math.max(...studentRatingsResponse.map((rating) => rating.rating_value))
        setMaxRatingDeviation(Math.max(...studentRatingsResponse.map((rating) => rating.rating_deviation)))

        // Get all ratings by student.
        const ratingsByStudent = studentRatingsResponse.filter((rating) => rating.student_id == user.id)

        // Sort all ratings of student by timestamp descending.
        const sortedRatings = ratingsByStudent.toSorted((a, b) => {
          const b_time = new Date(b.timestamp).getTime()
          const a_time = new Date(a.timestamp).getTime()
          return b_time - a_time
        })

        // Categorize ratings by topic_id.
        const categorizedRatings = sortedRatings.reduce(
          (acc: Record<string, StudentRating[]>, rating: StudentRating) => {
            if (!acc[rating.topic_id]) {
              acc[rating.topic_id] = []
            }
            acc[rating.topic_id].push(rating)
            return acc
          },
          {}
        )

        const spiderData: Record<string, number> = {}

        // Add first rating of student for each topic to spider graph data.
        Object.keys(categorizedRatings).forEach((key) => {
          const ratings = categorizedRatings[key]
          const firstRating = ratings[0]
          spiderData[firstRating.topic_id] = firstRating.rating_value
        })

        setSpiderGraphData(spiderData)

        // Add up all rating values and deviations.
        const { ratingValueTotal, ratingDeviationTotal, lastRatingValueTotal, lastRatingDeviationTotal } = Object.keys(
          categorizedRatings
        ).reduce(
          (totals, key) => {
            const ratings = categorizedRatings[key]
            const currentRatingValue = ratings[0].rating_value
            const currentRatingDeviation = ratings[0].rating_deviation

            if (ratings.length > 1) {
              totals.lastRatingValueTotal += ratings[1].rating_value
              totals.lastRatingDeviationTotal += ratings[1].rating_deviation
            }

            totals.ratingValueTotal += currentRatingValue
            totals.ratingDeviationTotal += currentRatingDeviation

            return totals
          },
          {
            ratingValueTotal: 0,
            ratingDeviationTotal: 0,
            lastRatingValueTotal: 0,
            lastRatingDeviationTotal: 0
          }
        )

        const categoryCount = Object.keys(categorizedRatings).length

        setRatingValue(ratingValueTotal / categoryCount)
        setRatingDeviation(ratingDeviationTotal / categoryCount)
        setRatingValueTrend(ratingValueTotal / categoryCount - lastRatingValueTotal / categoryCount)
        setRatingDeviationTrend(ratingDeviationTotal / categoryCount - lastRatingDeviationTotal / categoryCount)

        // Reverse the array.
        const reversedRatings = sortedRatings.toReversed()

        // Calculate the average rating value and deviation over time.
        const { studentRatingProgression } = reversedRatings.reduce(
          (previous, rating, index) => {
            const totalRatingValue = previous.totalRatingValue + rating.rating_value
            const totalRatingDeviation = previous.totalRatingDeviation + rating.rating_deviation

            const averageRatingValue = totalRatingValue / (index + 1)
            const averageRatingDeviation = totalRatingDeviation / (index + 1)

            const newStudentRating = {
              value: averageRatingValue,
              deviation: averageRatingDeviation * 1.96,
              timestamp: new Date(rating.timestamp)
            }

            return {
              totalRatingValue: totalRatingValue,
              totalRatingDeviation: totalRatingDeviation,
              studentRatingProgression: [...previous.studentRatingProgression, newStudentRating]
            }
          },
          {
            totalRatingValue: 0,
            totalRatingDeviation: 0,
            studentRatingProgression: [] as {
              value: number
              deviation: number
              timestamp: Date
            }[]
          }
        )

        setLineGraphData(studentRatingProgression)

        // Get the latest rating of every student on every topic.
        const latestsRatingsOfStudentsOnConcepts = studentRatingsResponse.reduce((acc, rating) => {
          const key = `${rating.student_id}-${rating.topic_id}`

          if (!acc[key] || new Date(rating.timestamp).getTime() > new Date(acc[key].timestamp).getTime()) {
            acc[key] = rating
          }

          return acc
        }, {} as { [key: string]: StudentRating })

        // Group all student ratings by student_id
        const studentRatingsMap: { [studentId: number]: { sum: number; count: number } } = {}

        // Calculate the average rating for each student.
        Object.values(latestsRatingsOfStudentsOnConcepts).forEach((rating) => {
          const { student_id, rating_value } = rating

          if (!studentRatingsMap[student_id]) {
            studentRatingsMap[student_id] = { sum: 0, count: 0 }
          }

          studentRatingsMap[student_id].sum += rating_value
          studentRatingsMap[student_id].count += 1
        })

        // Map all average ratings to an array.
        const averageRatings = Object.keys(studentRatingsMap).map((student_id) => {
          const { sum, count } = studentRatingsMap[parseInt(student_id)]
          return sum / count
        })

        setHistogramData(averageRatings)
        setIsLoading(false)
      }) // catch
    }) // catch
  }, []) // deps

  return useMemo(
    () => ({
      ratingValue: ratingValue,
      ratingDeviation: ratingDeviation,
      maxRatingDeviation: maxRatingDeviation,
      ratingValueTrend: ratingValueTrend,
      ratingDeviationTrend: ratingDeviationTrend,
      spiderGraphData: spiderGraphData,
      lineGraphData: lineGraphData,
      histogramData: histogramData,
      studentRatings: studentRatings,
      isLoading: isLoading,
      topics: topics
    }),
    [
      ratingValue,
      ratingDeviation,
      maxRatingDeviation,
      ratingValueTrend,
      ratingDeviationTrend,
      studentRatings,
      isLoading
    ]
  )
}
