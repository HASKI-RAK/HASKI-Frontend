type Badge = {
  id: number
  course_id: number
  topic_id: number
  variant_key: string
  active: boolean
}

type BadgeResponse = Badge[]

type BadgeReturn = (topicId: string) => Promise<BadgeResponse>

type PostBadgeReturn = (course_id: string, topic_id: string) => Promise<BadgeResponse>

type CourseBadgesReturn = (courseId: string) => Promise<BadgeResponse>

export default Badge
export type { BadgeResponse, BadgeReturn, CourseBadgesReturn, PostBadgeReturn }
