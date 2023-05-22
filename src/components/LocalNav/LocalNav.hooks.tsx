import {useEffect, useState} from 'react'
import { Topic } from '@services'
import {LearningPath} from '@core'
import log from 'loglevel'
import useBoundStore from "@store";
import {LearningPathReturn} from "@core";

const hardcodedTopics: Topic[] = [
    {
        id: 1,
        name: "Allgemein",
        contains_le: true,
        created_at: "now",
        created_by: "me",
        is_topic: true,
        last_updated: "now",
        parent_id: null,
        lms_id: 1,
        university: "HS-KE",
        student_topic: {
            done: false,
            done_at: null,
            id: 1,
            student_id: 1,
            topic_id: 1,
            visits: []
        }
    },
    {
        id: 16,
        name: "Individuelle Anordnung",
        contains_le: true,
        created_at: "now",
        created_by: "me",
        is_topic: true,
        last_updated: "now",
        parent_id: null,
        lms_id: 16,
        university: "HS-KE",
        student_topic: {
            done: false,
            done_at: null,
            id: 16,
            student_id: 16,
            topic_id: 16,
            visits: []
        }
    },
    {
        id: 7,
        name: "Entwurfsmuster Allgemein",
        contains_le: true,
        created_at: "now",
        created_by: "me",
        is_topic: true,
        last_updated: "now",
        parent_id: null,
        lms_id: 7,
        university: "HS-KE",
        student_topic: {
            done: false,
            done_at: null,
            id: 7,
            student_id: 7,
            topic_id: 7,
            visits: []
        }
    },
    {
        id: 2,
        name: "Bekannte Entwurfsmuster",
        contains_le: true,
        created_at: "now",
        created_by: "me",
        is_topic: true,
        last_updated: "now",
        parent_id: null,
        lms_id: 2,
        university: "HS-KE",
        student_topic: {
            done: false,
            done_at: null,
            id: 2,
            student_id: 2,
            topic_id: 2,
            visits: []
        }
    },
    {
        id: 3,
        name: "Strategie",
        contains_le: true,
        created_at: "now",
        created_by: "me",
        is_topic: true,
        last_updated: "now",
        parent_id: null,
        lms_id: 3,
        university: "HS-KE",
        student_topic: {
            done: false,
            done_at: null,
            id: 3,
            student_id: 3,
            topic_id: 3,
            visits: []
        }
    },
    {
        id: 4,
        name: "Zustand",
        contains_le: true,
        created_at: "now",
        created_by: "me",
        is_topic: true,
        last_updated: "now",
        parent_id: null,
        lms_id: 4,
        university: "HS-KE",
        student_topic: {
            done: false,
            done_at: null,
            id: 4,
            student_id: 4,
            topic_id: 4,
            visits: []
        }
    },
    {
        id: 5,
        name: "Adapter",
        contains_le: true,
        created_at: "now",
        created_by: "me",
        is_topic: true,
        last_updated: "now",
        parent_id: null,
        lms_id: 5,
        university: "HS-KE",
        student_topic: {
            done: false,
            done_at: null,
            id: 5,
            student_id: 5,
            topic_id: 5,
            visits: []
        }
    },
    {
        id: 6,
        name: "Fassade",
        contains_le: true,
        created_at: "now",
        created_by: "me",
        is_topic: true,
        last_updated: "now",
        parent_id: null,
        lms_id: 6,
        university: "HS-KE",
        student_topic: {
            done: false,
            done_at: null,
            id: 6,
            student_id: 6,
            topic_id: 6,
            visits: []
        }
    },
    {
        id: 14,
        name: "Abschluss",
        contains_le: true,
        created_at: "now",
        created_by: "me",
        is_topic: true,
        last_updated: "now",
        parent_id: null,
        lms_id: 14,
        university: "HS-KE",
        student_topic: {
            done: false,
            done_at: null,
            id: 14,
            student_id: 14,
            topic_id: 14,
            visits: []
        }
    }
]

export const getSortedLearningPath = async(data: Topic[], userId: number, lmsUserId: number, studentId: number, fetchLearningPath: LearningPathReturn): Promise<LearningPath[]> => {

    const promises = data.map((topic) => fetchLearningPath(userId, lmsUserId, studentId, 2, topic.id)) //reihenfolge der parameter beachten
    const learningPaths = await Promise.all(promises)

    return learningPaths.map((learningPath) => {
        learningPath.path.sort((a, b) => a.position - b.position)
        return learningPath
    })
}

export const useLearningPath = (): { loading: boolean; topics: Topic[]; learningPaths: LearningPath[] } => {
    const [loading, setLoading] = useState(true)
    const [topics, setTopics] = useState<Topic[]>([])
    const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
    const fetchUser = useBoundStore((state) => state.fetchUser)
    const fetchLearningPath = useBoundStore((state) => state.fetchLearningPath)

    const effect = async() => {
        setLoading(true)
        try {
            const user = await fetchUser();
                setTopics(hardcodedTopics)
                //const dataLearningPath = await getSortedLearningPath(hardcodedTopics, user.settings.user_id, user.lms_user_id, user.id, fetchLearningPath)

                //setLearningPaths(dataLearningPath)
        }
        catch(error) {
            log.error(error)
            throw error
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        effect().catch(() => {
            log.error('An error occurred while fetching course topics in LocalNav.hooks')
        })
    }, [])

    return {loading, topics, learningPaths}
}
