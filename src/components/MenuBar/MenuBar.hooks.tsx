import {useEffect, useState} from "react";

export type Topic = {
    contains_le: boolean;
    created_at: string;
    created_by: string;
    id: number;
    is_topic: boolean;
    last_updated: string | null;
    lms_id: number;
    name: string;
    parent_id: number | null;
    student_topic: {
        done: boolean;
        done_at: string | null;
        id: number;
        student_id: number;
        topic_id: number;
        visits: string[]; // Define type of visits array if known
    };
    university: string;
}

export type TopicsResponse = {
    topics: Topic[];
}

export type LearningElement = {
    activity_type: string;
    classification: string;
    created_at: string;
    created_by: string;
    id: number;
    last_updated: string | null;
    lms_id: number;
    name: string;
    student_learning_element: null;
    university: string;
}

export type PathItem = {
    id: number;
    learning_element: LearningElement;
    learning_element_id: number;
    learning_path_id: number;
    position: number;
    recommended: boolean;
}

export type LearningPath = {
    based_on: string;
    calculated_on: string | null;
    course_id: number;
    id: number;
    path: PathItem[];
}

export const useLearningPath = () => {
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [learningPath, setLearningPath] = useState<LearningPath[]>([]);

    useEffect(() => {
        const fetchTopics = async() => {
            setLoading(true); // set loading state to true before making request
            try {
                const responseTopic = await fetch('http://127.0.0.1:5000/user/2/5/student/1/course/1/topic');
                const dataTopic: TopicsResponse = await responseTopic.json();
                dataTopic.topics.sort((a, b) => b.id - a.id);
                setTopics(dataTopic.topics);

                try {
                    const dataLearningPath: LearningPath[] = [];
                    for(const topic of dataTopic.topics) {
                        const topicIndex = topic.id.toString();
                        const responseLearningPath = await fetch(`http://127.0.0.1:5000/user/2/5/student/1/course/1/topic/${topicIndex}/learningPath`);
                        const path: LearningPath = await responseLearningPath.json();
                        // how do we know where the element is in Moodle?
                        path.path.sort((a, b) => a.position - b.position);
                        dataLearningPath.push(path);
                    }
                    setLearningPath(dataLearningPath);
                    setLoading(false); // set loading state to false after request is done
                }
                catch(error) {
                    console.error(error);
                    const emptyPath: LearningPath[] = [{
                        based_on: "",
                        calculated_on: "",
                        course_id: 0,
                        id: 0,
                        path: [
                            {
                                id: 0,
                                learning_element: {
                                    activity_type: "",
                                    classification: "",
                                    created_at: "",
                                    created_by: "",
                                    id: 0,
                                    last_updated: "",
                                    lms_id: 0,
                                    name: "",
                                    student_learning_element: null,
                                    university: ""
                                },
                                learning_element_id: 0,
                                learning_path_id: 0,
                                position: 0,
                                recommended: false
                            }
                        ]
                    }];
                    setLearningPath(emptyPath);
                    setLoading(false); // set loading state to false if there is an error
                }
            }
            catch(error) {
                console.error(error);
                const emptyTopic: Topic[] = [{
                    contains_le: false,
                    created_at: "",
                    created_by: "",
                    id: 0,
                    is_topic: false,
                    last_updated: "",
                    lms_id: 0,
                    name: "",
                    parent_id: 0,
                    student_topic: {done: false, done_at: "", id: 0, student_id: 0, topic_id: 0, visits: []},
                    university: ""
                }];
                setTopics(emptyTopic);
                setLoading(false); // set loading state to false if there is an error
            }
        };
        fetchTopics();
    }, []);

    return {loading, topics, learningPath};
}