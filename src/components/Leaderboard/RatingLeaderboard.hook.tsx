import { Dispatch, SetStateAction, useCallback, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { handleError } from '@components'
import { StudentRating } from '@core'
import { fetchStudentRatings, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import { LeaderboardEntry } from './Leaderboard'

export const useRatingLeaderboard = (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const getUser = usePersistedStore((state) => state.getUser)
  //const [ tableContent, setTableContent ] = useState<Leaderboard>()
  const [leaderboardRatings, setLeaderboardRatings] = useState<LeaderboardEntry[]>([])
  const [currentStudentId, setCurrentStudentId] = useState<number | null>(null)

  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  const findNewestRatings = useCallback((ratings: StudentRating[]): StudentRating[] => {
    const ratingsByUser = ratings.reduce<Record<number, StudentRating>>((acc, rating) => {
      const id = rating.student_id
      const existing = acc[id]
      const newest = existing && existing.timestamp >= rating.timestamp ? existing : rating
      return { ...acc, [id]: newest }
    }, {} as Record<number, StudentRating>)
    return Object.values(ratingsByUser)
  }, [])

  // Find the user and their two closest neighbors in rating value
  const findUserAndNeighbors = useCallback((ratings: StudentRating[], userId: number): StudentRating[] => {
    // Sort ratings by rating value in descending order (highest first)
    const sortedRatings = [...ratings].sort((a, b) => b.rating_value - a.rating_value)

    // Find the index of the target user
    const userIndex = sortedRatings.findIndex((rating: StudentRating) => rating.student_id === userId)

    if (userIndex === -1) {
      return [] // User not found
    }

    if (sortedRatings.length <= 3) {
      return sortedRatings
    }

    const result: StudentRating[] = []

    if (userIndex === 0) {
      // User has highest rating - get next two lowest
      result.push(sortedRatings[userIndex], sortedRatings[userIndex + 1], sortedRatings[userIndex + 2])
    } else if (userIndex === sortedRatings.length - 1) {
      // User has lowest rating - get next two highest
      result.push(sortedRatings[userIndex - 2], sortedRatings[userIndex - 1], sortedRatings[userIndex])
    } else {
      // User is in the middle - get one higher and one lower
      result.push(sortedRatings[userIndex - 1], sortedRatings[userIndex], sortedRatings[userIndex + 1])
    }

    return result
  }, [])

  const ratingsInTopic = useCallback((ratings: StudentRating[], topic_id: number): StudentRating[] => {
    return ratings.filter((rating) => rating.topic_id === topic_id)
  }, [])

  const updateTableContent = useCallback(
    (topic_id: number) => {
      setIsLoading(true)
      getUser()
        .then((user) => {
          setCurrentStudentId(user.id)
          fetchStudentRatings(user.settings.user_id, user.id).then((data) => {
            const topicRatings = ratingsInTopic(data, topic_id)
            const newestRatings = findNewestRatings(topicRatings)
            const userAndNeighboringRatings = findUserAndNeighbors(newestRatings, user.id)
            const leaderboardEntries: LeaderboardEntry[] = userAndNeighboringRatings.map((rating) => ({
              studentId: rating.student_id,
              scoredValue: rating.rating_value
            }))
            setLeaderboardRatings(leaderboardEntries)
          })
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.getUser', error, 5000)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [getUser]
  )

  const loadRatings = useCallback(
    (topic_id: number) => {
      if (!topic_id) return
      updateTableContent(topic_id)
    },
    [updateTableContent]
  )

  return useMemo(
    () => ({
      currentStudentId,
      leaderboardRatings,
      loadRatings
    }),
    [currentStudentId, leaderboardRatings, updateTableContent]
  )
}
