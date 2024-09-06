import { useEffect, useMemo, useState } from 'react'
import { LearningElementRating, StudentRating, Topic, User } from '@core'
import { fetchLearningElementRatings, fetchStudentRatings } from '@services'
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

export const useLearningElementRatingDashboard = (): StudentRatingDashboardHookReturn => {
  //
  const [topics, setTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [studentRatings, setStudentRatings] = useState<StudentRating[]>([])
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

      fetchLearningElementRatings().then((learningElementRatingResponse) => {
        // Get the maximum rating deviation.
        setMaxRatingDeviation(Math.max(...learningElementRatingResponse.map((rating) => rating.rating_deviation)))

        // Group by topic and learning_element and keep the latest and second latest ratings.
        const groupedRatings = learningElementRatingResponse.reduce((acc, rating) => {
          const key = `${rating.learning_element_id}-${rating.topic_id}`

          if (!acc[key]) {
            acc[key] = [rating]
          } else {
            acc[key].push(rating)
            acc[key].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

            acc[key] = acc[key].slice(0, 2)
          }

          return acc
        }, {} as { [key: string]: LearningElementRating[] })

        // Calculate average ratings for the latest and second latest ratings for each topic
        const topicMap: {
          [topicId: number]: { latest: LearningElementRating[]; secondLatest: LearningElementRating[] }
        } = {}

        Object.values(groupedRatings).forEach((ratingsList) => {
          const latestRating = ratingsList[0]
          const secondLatestRating = ratingsList[1]

          if (!topicMap[latestRating.topic_id]) {
            topicMap[latestRating.topic_id] = { latest: [], secondLatest: [] }
          }

          topicMap[latestRating.topic_id].latest.push(latestRating)
          if (secondLatestRating) {
            topicMap[latestRating.topic_id].secondLatest.push(secondLatestRating)
          }
        })

        const spiderData: Record<string, number> = {}

        // Calculate the average rating and deviation for each topic
        const topicAverages = Object.keys(topicMap).map((topicId) => {
          const topicData = topicMap[parseInt(topicId)]

          const latestRatingsSum = topicData.latest.reduce(
            (acc, rating) => {
              acc.ratingSum += rating.rating_value
              acc.deviationSum += rating.rating_deviation
              return acc
            },
            { ratingSum: 0, deviationSum: 0 }
          )

          const secondLatestRatingsSum = topicData.secondLatest.reduce(
            (acc, rating) => {
              acc.ratingSum += rating.rating_value
              acc.deviationSum += rating.rating_deviation
              return acc
            },
            { ratingSum: 0, deviationSum: 0 }
          )

          const latestAvgRating = latestRatingsSum.ratingSum / topicData.latest.length
          const latestAvgDeviation = latestRatingsSum.deviationSum / topicData.latest.length

          const secondLatestAvgRating = topicData.secondLatest.length
            ? secondLatestRatingsSum.ratingSum / topicData.secondLatest.length
            : 0

          const secondLatestAvgDeviation = topicData.secondLatest.length
            ? secondLatestRatingsSum.deviationSum / topicData.secondLatest.length
            : 0

          // Add the latest average rating to the spider graph data.
          spiderData[topicId] = latestAvgRating

          return {
            topicId: parseInt(topicId),
            latestAvgRating,
            latestAvgDeviation,
            secondLatestAvgRating,
            secondLatestAvgDeviation
          }
        })

        setSpiderGraphData(spiderData)

        // Calculate the overall average rating and deviation across all topics
        const overallAverages = topicAverages.reduce(
          (acc, topic) => {
            acc.latestRatingSum += topic.latestAvgRating
            acc.latestDeviationSum += topic.latestAvgDeviation

            acc.secondLatestRatingSum += topic.secondLatestAvgRating
            acc.secondLatestDeviationSum += topic.secondLatestAvgDeviation

            return acc
          },
          { latestRatingSum: 0, latestDeviationSum: 0, secondLatestRatingSum: 0, secondLatestDeviationSum: 0 }
        )

        const totalTopics = topicAverages.length

        setRatingValue(overallAverages.latestRatingSum / totalTopics)
        setRatingDeviation(overallAverages.latestDeviationSum / totalTopics)
        setRatingValueTrend(
          overallAverages.latestRatingSum / totalTopics - overallAverages.secondLatestRatingSum / totalTopics
        )
        setRatingDeviationTrend(
          overallAverages.latestDeviationSum / totalTopics - overallAverages.secondLatestDeviationSum / totalTopics
        )

        // Sort ratings by timestamp
        const sortedRatings = learningElementRatingResponse.sort((a, b) => {
          const aTime = new Date(a.timestamp).getTime()
          const bTime = new Date(b.timestamp).getTime()
          return aTime - bTime
        })

        // Step 2: Collect all unique timestamps
        const timestamps = Array.from(new Set(sortedRatings.map((r) => new Date(r.timestamp).getTime())))
          .map((t) => new Date(t))
          .sort((a, b) => a.getTime() - b.getTime())

        // Step 3: Progressively calculate the average ratings at each timestamp
        const lineGraphData: {
          value: number
          deviation: number
          timestamp: Date
        }[] = []

        timestamps.forEach((timestamp) => {
          // Step 4: Filter ratings that are up to and including the current timestamp
          const relevantRatings = sortedRatings.filter((r) => new Date(r.timestamp).getTime() <= timestamp.getTime())

          // Step 5: Group ratings by topic and calculate the average rating per topic
          const topicMap: { [topicId: number]: { sum: number; count: number; deviationSum: number } } = {}

          relevantRatings.forEach((rating) => {
            if (!topicMap[rating.topic_id]) {
              topicMap[rating.topic_id] = { sum: 0, count: 0, deviationSum: 0 }
            }
            topicMap[rating.topic_id].sum += rating.rating_value
            topicMap[rating.topic_id].deviationSum += rating.rating_deviation
            topicMap[rating.topic_id].count += 1
          })

          // Step 6: Calculate the average rating and deviation for each topic
          const topicAverages = Object.values(topicMap).map((topic) => ({
            avgRating: topic.sum / topic.count,
            avgDeviation: topic.deviationSum / topic.count
          }))

          // Step 7: Calculate the general average across all topics
          const generalAvgRating = topicAverages.reduce((acc, topic) => acc + topic.avgRating, 0) / topicAverages.length
          const generalAvgDeviation =
            topicAverages.reduce((acc, topic) => acc + topic.avgDeviation, 0) / topicAverages.length

          // Step 8: Add the result to the lineGraphData array
          lineGraphData.push({
            value: generalAvgRating,
            deviation: generalAvgDeviation,
            timestamp
          })
        })

        // Step 9: Update lineGraphData state with the calculated values
        setLineGraphData(lineGraphData)

        setIsLoading(false)
      }) // catch
    }) // then
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
