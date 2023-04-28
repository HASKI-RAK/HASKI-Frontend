import {getLearningCharacteristicsILS} from "../../common/services/QuestionnaireResults/ILS/getLearningCharacteristicsILS";
import {learningCharacteristics, ilsCharacteristics, characteristics} from "../../common/services/QuestionnaireResults/ILS/RequestResponse";
import {useEffect, useState} from "react";

export const useILS = () => {

    const defaultLearningCharacteristics: learningCharacteristics = {
        id: -1,
        knowledge: {} as characteristics,
        learning_analytics: {} as characteristics,
        learning_strategy: {} as characteristics,
        learning_style: {} as ilsCharacteristics,
        student_id: -1
    };

    const [ILScharacteristics, setILScharacteristics] = useState<learningCharacteristics>(defaultLearningCharacteristics)

    const effect = async () => {

        getLearningCharacteristicsILS().then((response) => {
            if(response.status === 200){
                console.log(response)
                setILScharacteristics(response.data)
            }
            else {
                console.log(response)
                setILScharacteristics(response.data)
            }

        })

    }

    useEffect(() => {
        effect()
    } , [])

    return {ILScharacteristics}
}