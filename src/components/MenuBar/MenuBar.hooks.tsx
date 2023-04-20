import {useEffect, useState} from "react";
import {getCourseTopics} from "../../common/services/topic/getCourseTopics";
import {getElementLearningPath} from "../../common/services/learningPath/getElementLearningPath";
import {LearningPath} from "../../common/services/learningPath/RequestResponse";
import {Topic} from "../../common/services/topic/RequestResponse";

const getSortedLearningPath = async (data: Topic[]): Promise<LearningPath[]> => {
    const promises = data.map((topic) => getElementLearningPath(topic.id));
    const learningPaths = await Promise.all(promises);

    return learningPaths
    .filter((learningPath) => learningPath.status === 200)
     .map((learningPath) => {
        learningPath.data.path.sort((a, b) => a.position - b.position);
        return learningPath.data;
    });
};

export const useLearningPath = () => {
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [learningPath, setLearningPath] = useState<LearningPath[]>([]);

    const effect = async ()  => {

        setLoading(true);
        getCourseTopics().then((response) => {
            if(response.status === 200) {
                setTopics(response.data.topics);

                getSortedLearningPath(response.data.topics).then((dataLearningPath) => {
                    setLearningPath(dataLearningPath);
                    setLoading(false);
                })
            }
        })};

    useEffect(() => {
        effect();
    },[]);

    return { loading, topics, learningPath };
};