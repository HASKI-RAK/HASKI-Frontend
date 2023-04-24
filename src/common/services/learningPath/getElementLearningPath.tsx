import {LearningElement, LearningPath, PathItem, RequestResponse} from "./RequestResponse";

export const getElementLearningPath = async (topicIndex: number): Promise<RequestResponse> => {
    try {

        const response = await fetch(
            process.env.BACKEND + `/user/2/5/student/1/course/1/topic/${topicIndex}/learningPath`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "text/json",
                },
            }
        );

        const data = await response.json();

        return {
            status: response.status,
            message: response.statusText,
            data: data,
        };
    }
    catch (error) {

        const learningElement: LearningElement = {
            activity_type: "example",
            classification: "example",
            created_at: "2023-04-21T00:00:00Z",
            created_by: "example",
            id: 1,
            last_updated: null,
            lms_id: 123,
            name: "example",
            student_learning_element: null,
            university: "example"
        };

        const pathItem: PathItem = {
            id: 1,
            learning_element: learningElement,
            learning_element_id: 2,
            learning_path_id: 3,
            position: 4,
            recommended: true
        };

        const learningPath: LearningPath = {
            based_on: "example",
            calculated_on: null,
            course_id: 1,
            id: 2,
            path: [pathItem]
        };

        return {
            status: 500,
            message: "Some error occurred, while fetching Element learning path.",
            data: learningPath,
        };
    }
};