import { StudentRating, User } from '@core'
import { usePersistedStore } from '@store'
import {
  StudentRatingDashboardHookReturn,
  useStudentRatingDashboard as _useStudentRatingDashboard
} from './StudentRatingDashboard.hooks'

type StudentRatingDashboardProps = {
  useStudentRatingDashboard?: () => StudentRatingDashboardHookReturn
}

const StudentRatingDashboard = ({
  useStudentRatingDashboard = _useStudentRatingDashboard
}: StudentRatingDashboardProps) => {
  const { studentRatings, isLoading } = useStudentRatingDashboard()
  const getUser = usePersistedStore((state) => state.getUser)

  getUser().then((user: User) => {
    // Get newest ratings of user_id for each topic
    const newestRatingsOfStudentOnEveryTopic = studentRatings?.reduce((acc, rating) => {
      if (rating.student_id == user.id) {
        if (!acc[rating.topic_id] || acc[rating.topic_id].timestamp < rating.timestamp) {
          acc[rating.topic_id] = rating
        }
      }
      return acc
    }, {} as Record<number, StudentRating>)

    console.log(newestRatingsOfStudentOnEveryTopic)
  })
  // Get average rating value over all topics

  /**
   const averageRatingValue = 0
   const averageRatingDeviation = 0
   const maxRatingValue = 0
   const maxRatingDeviation = 0
   const ratingValueTrend = 0
   */

  // Für Histogram
  const newestRatingOfEveryStudent = studentRatings?.reduce((acc, rating) => {
    if (!acc[rating.student_id] || acc[rating.student_id].timestamp < rating.timestamp) {
      acc[rating.student_id] = rating
    }
    return acc
  }, {} as Record<number, StudentRating>)

  return <>{!isLoading && <div>Help</div>}</>
}

export default StudentRatingDashboard
