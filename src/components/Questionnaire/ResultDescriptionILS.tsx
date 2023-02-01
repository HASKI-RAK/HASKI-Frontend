import {useTranslation} from "react-i18next";
import Typography from '@mui/material/Typography';
import {getILSParameters, getILSDimension, getInterpretation} from "./TableILS";

export function ResultDescriptionILS (){

    const {t} = useTranslation();

    const [dimensionOneScore, dimensionTwoScore, dimensionThreeScore, dimensionFourScore] = getILSParameters();

    //active, reflective, sensory...etc, it´s mandatory in english because of internationalization name in .json file
    const dimensionOne = getILSDimension(1, dimensionOneScore, true);
    const dimensionTwo = getILSDimension(2, dimensionTwoScore, true);
    const dimensionThree = getILSDimension(3, dimensionThreeScore, true);
    const dimensionFour = getILSDimension(4, dimensionFourScore, true)
    const dimensionArray = [dimensionOne, dimensionTwo, dimensionThree, dimensionFour];

    //balanced, moderate, strong
    const interpretationDimensionOneScore = getInterpretation(dimensionOneScore, "", true).trim();
    const interpretationDimensionTwoScore = getInterpretation(dimensionTwoScore, "", true).trim();
    const interpretationDimensionThreeScore = getInterpretation(dimensionThreeScore, "", true).trim();
    const interpretationDimensionFourScore = getInterpretation(dimensionFourScore, "", true).trim();

    const interpretationArray = [interpretationDimensionOneScore, interpretationDimensionTwoScore, interpretationDimensionThreeScore, interpretationDimensionFourScore];

    const balancedDimensionsArray = [];
    const unbalancedDimensionsArray = [];
    let balancedDimensionsInterpretationString = "";
    let balancedDimensionsKeyWordString = "";

    //All dimensions are processed here and balanced dimensions are stored in balancedDimensionsArray
    for (const item in interpretationArray) {
        if (interpretationArray[item] === "balanced") {
            balancedDimensionsArray.push(dimensionArray[item] + "." + interpretationArray[item]);
        }
        else{
            unbalancedDimensionsArray.push(
                <div>
                    <Typography variant="h6" gutterBottom>
                        {dimensionArray[item]}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {t("components.QuestionnaireResults.ResultDescriptionILS." + dimensionArray[item] + "." + interpretationArray[item])} <br/>
                    </Typography>
                </div>)
        }
    }

    //All balanced dimensions are processed here
    if (balancedDimensionsArray.length > 0) {
        if (balancedDimensionsArray.length === 4){
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
            for(const dim in balancedDimensionsArray) {
                switch (balancedDimensionsArray[dim]) {
                    case "Active.balanced":
                        balancedDimensionsKeyWordString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.processing") + " & ";
                        break;
                    case "Reflective.balanced":
                        balancedDimensionsKeyWordString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.processing") + " & ";
                        break;
                    case "Sensory.balanced":
                        balancedDimensionsKeyWordString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.perception") + " & ";
                        break;
                    case "Intuitive.balanced":
                        balancedDimensionsKeyWordString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.perception") + " & ";
                        break;
                    case "Verbal.balanced":
                        balancedDimensionsKeyWordString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.presentation") + " & ";
                        break;
                    case "Visual.balanced":
                        balancedDimensionsKeyWordString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.presentation") + " & ";
                        break;
                    case "Sequential.balanced":
                        balancedDimensionsKeyWordString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.organisation") + " & ";
                        break;
                    case "Global.balanced":
                        balancedDimensionsKeyWordString += t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.organisation") + " & ";
                        break;
                    default: break;
                }}

            //Remove last " & "
            balancedDimensionsKeyWordString = balancedDimensionsKeyWordString.slice(0, balancedDimensionsKeyWordString.length - 2);

            balancedDimensionsInterpretationString = t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.Part1") + " " +
                t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced."+ balancedDimensionsArray.length) + " " +
                t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.Part2") + " " + balancedDimensionsKeyWordString + " " +
                t("components.QuestionnaireResults.ResultDescriptionILS.SomethingBalanced.Part3");
        }
    }

    return(
        <div>
            {unbalancedDimensionsArray}
            {balancedDimensionsInterpretationString == "" ? <br/> :
                <div>
                    <Typography variant="h6" gutterBottom>
                        {t("components.QuestionnaireResults.ResultDescriptionILS.RemainingDimensions")}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {balancedDimensionsInterpretationString}
                    </Typography>
                </div>
            }
        </div>
    )
}