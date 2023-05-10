import {useEffect, useState} from 'react'
import {getCourseTopics, getElementLearningPath, LearningPath, Topic} from '@services'

export const getSortedLearningPath = async(data: Topic[]): Promise<LearningPath[]> => {
    const promises = data.map((topic) => getElementLearningPath(topic.id))
    const learningPaths = await Promise.all(promises)

    return learningPaths.filter((learningPath) => learningPath.status === 200).map((learningPath) => {
        learningPath.data.path.sort((a, b) => a.position - b.position)
        return learningPath.data
    })
}

export const useLearningPath = (): { loading: boolean; topics: Topic[]; learningPath: LearningPath[] } => {
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [learningPath, setLearningPath] = useState<LearningPath[]>([]);

    const effect = async () => {
        setLoading(true);
        try {
            const response = await getCourseTopics();
            if (response.status === 200) {
                setTopics(response.data.topics);
                const dataLearningPath = await getSortedLearningPath(response.data.topics);
                setLearningPath(dataLearningPath);
            } else {
                // some error occurred
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
            effect().catch(() => {
                console.log('useEffect');
            });
    }, [])

    return {loading, topics, learningPath}
}
