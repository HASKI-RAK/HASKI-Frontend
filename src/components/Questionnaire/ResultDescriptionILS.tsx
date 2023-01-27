import {useTranslation} from "react-i18next";
import Typography from '@mui/material/Typography';
import {getDimensionOne, getDimensionTwo, getDimensionThree, getDimensionFour, getInterpretation} from "./TableILS";

export function ResultDescriptionILS (){

    const {t} = useTranslation();

    const score1=1;
    const score2=-9;
    const score3=7;
    const score4=11;


    //active, reflective, sensory...etc
    const dimension1 = getDimensionOne(score1, true);
    const dimension2 = getDimensionTwo(score2, true);
    const dimension3 = getDimensionThree(score3, true);
    const dimension4 = getDimensionFour(score4, true)
    const arrayDimension = [dimension1, dimension2, dimension3, dimension4];

    //balanced, moderate, strong
    const interpretationScore1 = getInterpretation(score1, "", true).trim();
    const interpretationScore2 = getInterpretation(score2, "", true).trim();
    const interpretationScore3 = getInterpretation(score3, "", true).trim();
    const interpretationScore4 = getInterpretation(score4, "", true).trim();

    const interpretationArray = [interpretationScore1, interpretationScore2, interpretationScore3, interpretationScore4];

    const balancedArray = [];
    const resultInterpretationString = [];
    let resultInterpretationBalancedString = "";
    let resultInterpretationBalancedExtendedString = "";

    //All dimensions are processed here and balanced dimensions are stored in balancedArray
    for (const item in interpretationArray) {
        if (interpretationArray[item] === "balanced") {
            balancedArray.push(arrayDimension[item] + "." + interpretationArray[item]);
        }
        else{
            resultInterpretationString.push(
                <div>
                    <Typography variant="h6" gutterBottom>
                        {arrayDimension[item]}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {t("components.QuestionnaireResults.ResultDescriptionILS." + arrayDimension[item] + "." + interpretationArray[item])} <br/>
                    </Typography>
                </div>)
        }
    }

    //All balanced dimensions are processed here
    if (balancedArray.length > 0) {
        if (balancedArray.length === 4){
            return(
                <div>
                    <Typography variant="h6" gutterBottom>
                        Alle Dimensionen
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {t("components.QuestionnaireResults.ResultDescriptionILS.EverythingBalanced")}
                    </Typography>
                </div>
            )
        }
        else {
            for(const dim in balancedArray) {
                switch (balancedArray[dim]) {
                    case "Active.balanced":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.processing") + " & ";
                        break;
                    case "Reflective.balanced":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.processing") + " & ";
                        break;
                    case "Sensory.balanced":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.perception") + " & ";
                        break;
                    case "Intuitive.balanced":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.perception") + " & ";
                        break;
                    case "Verbal.balanced":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.presentation") + " & ";
                        break;
                    case "Visual.balanced":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.presentation") + " & ";
                        break;
                    case "Sequential.balanced":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.organisation") + " & ";
                        break;
                    case "Global.balanced":
                        resultInterpretationBalancedExtendedString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.organisation") + " & ";
                        break;
                    default: break;
            }}

            //Remove last " & "
            resultInterpretationBalancedExtendedString = resultInterpretationBalancedExtendedString.slice(0, resultInterpretationBalancedExtendedString.length - 2);

            resultInterpretationBalancedString = t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.Part1") + " " +
            t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced."+ balancedArray.length) + " " +
            t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.Part2") + " " + resultInterpretationBalancedExtendedString + " " +
            t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.Part3");
            }
        }

    return(
        <div>
            {resultInterpretationString}
            {resultInterpretationBalancedString == "" ? <br/> :
            <div>
                <Typography variant="h6" gutterBottom>
                    Restliche Dimensionen
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {resultInterpretationBalancedString}
                </Typography>
            </div>
            }
        </div>
    )
}

