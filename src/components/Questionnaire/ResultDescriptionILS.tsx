import {useTranslation} from "react-i18next";
import {getDimensionOne, getDimensionTwo, getDimensionThree, getDimensionFour, getInterpretation} from "./TableILS";

export function ResultDescriptionILS(score1: number, score2: number, score3: number, score4: number) {

    const {t} = useTranslation();

    //active, reflective, sensory...etc
    const dimension1 = getDimensionOne(score1);
    const dimension2 = getDimensionTwo(score2);
    const dimension3 = getDimensionThree(score3);
    const dimension4 = getDimensionFour(score4)

    const arrayDimension = [dimension1, dimension2, dimension3, dimension4];

    //balanced, moderate, strong
    const interpretationScore1 = getInterpretation(score1, "").trim();
    const interpretationScore2 = getInterpretation(score2, "").trim();
    const interpretationScore3 = getInterpretation(score3, "").trim();
    const interpretationScore4 = getInterpretation(score4, "").trim();

    const arrayInterpretation = [interpretationScore1, interpretationScore2, interpretationScore3, interpretationScore4];
    const arrayBalanced = [];
    let balancedCount = 0;
    let itemCount = 1;
    let resultInterpretationString = "";
    let resultInterpretationBalancedString = "";
    let resultInterpretationBalancedExtendedString = "";

    for (const item in arrayInterpretation) {
        if (item === "balanced") {
            balancedCount++;
            arrayBalanced.push(item);
        }
        else{
            resultInterpretationString += t("components.QuestionnaireResults.ResultDescriptionILS."+arrayDimension[itemCount]+"."+item) + " \n"
            itemCount++;
        }
    }

    if (balancedCount > 0) {
        if (balancedCount === 4){
            resultInterpretationBalancedString = t("components.QuestionnaireResults.ResultDescriptionILS.EverythingBalanced");
            return(
                <div>
                    {resultInterpretationBalancedString} <br/>
                </div>
            )
        }
        else {
            for(const item in arrayBalanced) {
                switch (item) {
                    case "(components.QuestionnaireResults.ResultDescriptionILS.Active.balanced)":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.processing") + " & "
                        break;
                    case "(components.QuestionnaireResults.ResultDescriptionILS.Reflective.balanced)":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.processing") + " & "
                        break;
                    case "(components.QuestionnaireResults.ResultDescriptionILS.Sensory.balanced)":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.perception") + " & "
                        break;
                    case "(components.QuestionnaireResults.ResultDescriptionILS.Intuitive.balanced)":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.perception") + " & "
                        break;
                    case "(components.QuestionnaireResults.ResultDescriptionILS.Verbal.balanced)":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.presentation") + " & "
                        break;
                    case "(components.QuestionnaireResults.ResultDescriptionILS.Visual.balanced)":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.presentation") + " & "
                        break;
                    case "(components.QuestionnaireResults.ResultDescriptionILS.Sequential.balanced)":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.organisation") + " & "
                        break;
                    case "(components.QuestionnaireResults.ResultDescriptionILS.Global.balanced)":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.organisation") + " & "
                        break;
                    default: break;
            }}

            resultInterpretationBalancedString = t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.Part1") + " " +
            t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced."+balancedCount) + " " +
            t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.Part2") + " " + resultInterpretationBalancedExtendedString + " " +
            t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.Part3");
            }
        }

    return(
        <div>
            {resultInterpretationString} <br/>
            {resultInterpretationBalancedString} <br/>
        </div>
    )
}

