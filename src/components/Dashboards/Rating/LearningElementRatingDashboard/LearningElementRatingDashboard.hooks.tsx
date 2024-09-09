import log from 'loglevel'
import { useContext, useEffect, useMemo, useState } from 'react'
import { LearningElementRating, Topic, User } from '@core'
import { SnackbarContext, fetchLearningElementRatings } from '@services'
import { usePersistedStore, useStore } from '@store'

export type LearningElementRatingDashboardHookReturn = {
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
  isLoading: boolean
  topics: Topic[]
}

export const useLearningElementRatingDashboard = (): LearningElementRatingDashboardHookReturn => {
  // States.
  const [topics, setTopics] = useState<Topic[]>([])
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

  // Store.
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  // Context.
  const { addSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    // Get the user.
    getUser()
      .then((user: User) => {
        // Get the courses of the user.
        getCourses(user.settings.user_id, user.lms_user_id, user.id)
          .then((courseResponse) => {
            const courseTopics: Topic[] = []
            Promise.all(
              courseResponse.courses.map((course) =>
                // Get all topics of the course.
                getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, course.id.toString())
                  .then((learningPathTopicResponse) => {
                    courseTopics.push(...learningPathTopicResponse.topics)
                  })
                  .catch((error) => {
                    addSnackbar({
                      message: 'translation-file',
                      severity: 'error',
                      autoHideDuration: 3000
                    })
                    log.error('translationfile' + ' ' + error)
                  })
              )
            ).then(() => {
              setTopics(courseTopics)
            })
          })
          .catch((error) => {
            addSnackbar({
              message: 'translation-file',
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error('translationfile' + ' ' + error)
          })

        // Fetch all learning element ratings.
        fetchLearningElementRatings()
          .then((learningElementRatingResponse) => {
            // Group ratings by learning element and topic, keeping only the latest and second latest ratings.
            const groupedRatings = learningElementRatingResponse.reduce((acc, rating) => {
              const key = `${rating.learning_element_id}-${rating.topic_id}`
              if (!acc[key]) {
                acc[key] = [rating]
              } else {
                acc[key].push(rating)
                acc[key].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                acc[key] = acc[key].slice(0, 2) // Keep only the two latest ratings
              }
              return acc
            }, {} as { [key: string]: LearningElementRating[] })

            // Create topic map.
            const topicMap: {
              [topicId: number]: { latest: LearningElementRating[]; secondLatest: LearningElementRating[] }
            } = {}

            // Calculate averages for the latest and second latest ratings.
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

            // Calculate the average rating for each topic.
            const topicAverages = Object.keys(topicMap).map((topicId) => {
              const topicData = topicMap[parseInt(topicId)]

              // Calculate the sum of the latest ratings.
              const latestRatingsSum = topicData.latest.reduce(
                (acc, rating) => {
                  acc.ratingSum += rating.rating_value
                  acc.deviationSum += rating.rating_deviation
                  return acc
                },
                { ratingSum: 0, deviationSum: 0 }
              )

              // Calculate the sum of the second latest ratings.
              const secondLatestRatingsSum = topicData.secondLatest.reduce(
                (acc, rating) => {
                  acc.ratingSum += rating.rating_value
                  acc.deviationSum += rating.rating_deviation
                  return acc
                },
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

              // Set the data of one topic for the spider graph.
              spiderData[topicId] = latestAvgRating

              return {
                topicId: parseInt(topicId),
                latestAvgRating,
                latestAvgDeviation,
                secondLatestAvgRating,
                secondLatestAvgDeviation
              }
            })

            // Set data for spider graph.
            setSpiderGraphData(spiderData)

            // Calculate the overall averages.
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

            // Set the rating stats.
            const totalTopics = topicAverages.length
            setRatingStats({
              ratingValue: overallAverages.latestRatingSum / totalTopics,
              ratingDeviation: overallAverages.latestDeviationSum / totalTopics,
              ratingValueTrend:
                overallAverages.latestRatingSum / totalTopics - overallAverages.secondLatestRatingSum / totalTopics,
              ratingDeviationTrend:
                overallAverages.latestDeviationSum / totalTopics -
                overallAverages.secondLatestDeviationSum / totalTopics,
              maxRatingDeviation: Math.max(
                ...Object.values(groupedRatings)
                  .flat()
                  .map((r) => r.rating_deviation)
              )
            })

            // Sort the ratings by timestamp ascending.
            const sortedRatings = learningElementRatingResponse.toSorted((a, b) => {
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
              const relevantRatings = sortedRatings.filter(
                (r) => new Date(r.timestamp).getTime() <= timestamp.getTime()
              )
              const topicMap: { [topicId: number]: { sum: number; count: number; deviationSum: number } } = {}

              relevantRatings.forEach((rating) => {
                if (!topicMap[rating.topic_id]) {
                  topicMap[rating.topic_id] = { sum: 0, count: 0, deviationSum: 0 }
                }
                topicMap[rating.topic_id].sum += rating.rating_value
                topicMap[rating.topic_id].deviationSum += rating.rating_deviation
                topicMap[rating.topic_id].count += 1
              })

              const topicAverages = Object.values(topicMap).map((topic) => ({
                avgRating: topic.sum / topic.count,
                avgDeviation: topic.deviationSum / topic.count
              }))

              const generalAvgRating =
                topicAverages.reduce((acc, topic) => acc + topic.avgRating, 0) / topicAverages.length
              const generalAvgDeviation =
                topicAverages.reduce((acc, topic) => acc + topic.avgDeviation, 0) / topicAverages.length

              lineGraphData.push({
                value: generalAvgRating,
                deviation: generalAvgDeviation,
                timestamp
              })
            })

            // Set the data for the line graph.
            setLineGraphData(lineGraphData)

            // Set loading to false
            setIsLoading(false)
          })
          .catch((error) => {
            addSnackbar({
              message: 'translation-file',
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error('translationfile' + ' ' + error)
          })
      })
      .catch((error) => {
        addSnackbar({
          message: 'translation-file',
          severity: 'error',
          autoHideDuration: 3000
        })
        log.error('translationfile' + ' ' + error)
      })
  }, [])

  return useMemo(
    () => ({
      ...ratingStats,
      spiderGraphData,
      lineGraphData,
      isLoading,
      topics
    }),
    [ratingStats, spiderGraphData, lineGraphData, isLoading, topics]
  )
}
