type Topic = {
    contains_le: boolean
    created_at: string
    created_by: string
    id: number
    is_topic: boolean
    last_updated: string | null
    lms_id: number
    name: string
    parent_id: number | null
    student_topic: {
        done: boolean
        done_at: string | null
        id: number
        student_id: number
        topic_id: number
        visits: string[]
    }
    university: string
}

export default Topic