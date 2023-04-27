import {LearningCharacteristicsILSResponse, learningCharacteristics, characteristics, ilsCharacteristics} from "./RequestResponse";
import * as process from "process";

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
                characteristicID: 1,
                id: 1
            },
            learningAnalytics: {
                characteristicID: 2,
                id: 2
            },
            learningStrategy: {
                characteristicID: 3,
                id: 3
            },
            learningStyle: {
                characteristicID: 4,
                id: 4,
                inputDimension: "vrb",
                inputValue: 0,
                perceptionDimension: "sns",
                perceptionValue: 0,
                processingDimension: "act",
                processingValue: 0,
                understandingDimension: "seq",
                understandingValue: 0
            },
            studentID: 0
        };

        return{
            status: 500,
            message: "Some error occurred, while fetching the learning characteristics (ILS)",
            data: learningCharacteristicsExample
        }
    }
}