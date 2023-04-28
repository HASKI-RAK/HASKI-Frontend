import {LearningCharacteristicsILSResponse, learningCharacteristics} from "./RequestResponse";

export const getLearningCharacteristicsILS = async(): Promise<LearningCharacteristicsILSResponse> => {
    try {
        const response = await fetch(
            process.env.BACKEND + '/user/2/5/student/1/learningCharacteristics',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )

        const data = await response.json()

        return{
            status: response.status,
            message: response.statusText,
            data: data
        }

    }
    catch(error){

        const learningCharacteristicsExample: learningCharacteristics = {
            id: 1,
            knowledge: {
                characteristic_id: 1,
                id: 1
            },
            learning_analytics: {
                characteristic_id: 2,
                id: 2
            },
            learning_strategy: {
                characteristic_id: 3,
                id: 3
            },
            learning_style: {
                characteristic_id: 4,
                id: 4,
                input_dimension: "vrb",
                input_value: 0,
                perception_dimension: "sns",
                perception_value: 0,
                processing_dimension: "act",
                processing_value: 0,
                understanding_dimension: "seq",
                understanding_value: 0
            },
            student_id: 0
        };

        return{
            status: 500,
            message: process.env.BACKEND + '/user/2/5/student/1/learningCharacteristics',
            data: learningCharacteristicsExample
        }
    }
}