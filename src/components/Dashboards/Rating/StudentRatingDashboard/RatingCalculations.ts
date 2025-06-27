import { LearningElementRating, StudentRating } from "@core"

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
    const totalRatingDeviation = sortedRatings
      .slice(0, idx + 1)
      .reduce((acc, r) => acc + r.rating_deviation, 0)
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
  
  // Calculate the histogram data.
  return Object.values(studentAverages).map(({ sum, count }) => sum / count)
}