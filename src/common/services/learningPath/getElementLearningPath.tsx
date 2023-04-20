import { RequestResponse } from "./RequestResponse";

export const getElementLearningPath = async (topicIndex: number): Promise<RequestResponse> => {
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
};