import { useEffect, useMemo, useState } from 'react'
import { StudentRating, User } from '@core'
import { fetchStudentRatings } from '@services'
import { usePersistedStore } from '@store'

export type StudentRatingDashboardHookReturn = {
  readonly studentRatings: StudentRating[]
  readonly isLoading: boolean
}

export const useStudentRatingDashboard = (): StudentRatingDashboardHookReturn => {
  //
  const [isLoading, setIsLoading] = useState(true)
  const [studentRatings, setStudentRatings] = useState<StudentRating[]>([])
  const getUser = usePersistedStore((state) => state.getUser)

  useEffect(() => {
    fetchStudentRatings().then((studentRatingsResponse) => {
      setStudentRatings(studentRatingsResponse)
      setIsLoading(false)
    }) // catch

    getUser().then((user: User) => {
      // Get newest ratings of user_id for each topic
      const newestRatingsOfStudentOnEveryTopic = studentRatings.reduce((acc, rating) => {
        if (rating.student_id == user.id) {
          if (!acc[rating.topic_id] || acc[rating.topic_id].timestamp < rating.timestamp) {
            acc[rating.topic_id] = rating
          }
        }
        return acc
      }, {} as Record<number, StudentRating>)
    })
  }, []) // deps

  return useMemo(
    () => ({
      studentRatings,
      isLoading
    }),
    [studentRatings, isLoading]
  )
}
