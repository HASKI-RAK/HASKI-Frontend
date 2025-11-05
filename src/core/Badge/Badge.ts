type Badge = {
  id: number
  course_id: number
  topic_id: number
  variant_key: string
  active: boolean
}

type BadgeVariant =
  | 'perfect_one_exercise'
  | 'complete_exercises'
  | 'perfect_self_evaluation'
  | 'revisit_topic'
  | 'half_exercises'

type BadgeResponse = Badge[]

type BadgeReturn = (topicId: string) => Promise<BadgeResponse>

type PostBadgeReturn = (course_id: string, topic_id: string) => Promise<BadgeResponse>

type CourseBadgesReturn = (courseId: string) => Promise<BadgeResponse>

export default Badge
export type { BadgeResponse, BadgeReturn, BadgeVariant, CourseBadgesReturn, PostBadgeReturn }
