import Typography from '@mui/material/Typography';
import {GetListKParameters, GetSubscaleScore} from "./TableListK";
import {useTranslation} from "react-i18next";

function getGeneralSubscalesBelow3Element(organize: number, elaborate: number, criticalReview: number, repeat: number, attention: number,
                                          effort: number, time: number, goalsPlans: number, control: number, regulate: number,
                                          learnWithClassmates: number, literatureResearch: number, learningEnvironment: number): JSX.Element[]{

    const {t} = useTranslation();

    const averageSubscaleBelow3Array = [];
    let averageSubscaleBelow3String = "";
    const cognitiveSubscaleBelow3Html = [];

    const cognitiveStrategiesAverage = GetSubscaleScore([organize, elaborate, criticalReview, repeat]);
    const averageInternalResourceManagementStrategies = GetSubscaleScore([attention, effort, time]);
    const averageMetacognitiveStrategies = GetSubscaleScore([goalsPlans, control, regulate]);
    const averageExternalResourcesManagementStrategies = GetSubscaleScore([learnWithClassmates, literatureResearch, learningEnvironment]);
    const averageSubscaleArray = [cognitiveStrategiesAverage, averageInternalResourceManagementStrategies, averageMetacognitiveStrategies, averageExternalResourcesManagementStrategies];

    for(const item in averageSubscaleArray) {
        if(averageSubscaleArray[item] < 3) {
            averageSubscaleBelow3Array.push(averageSubscaleArray[item]);
        }
    }
    if(averageSubscaleBelow3Array.length > 1) {
        averageSubscaleBelow3String += " " + t("components.QuestionnaireResults.ResultDescriptionListK.SubscaleAverage Below3." + averageSubscaleBelow3Array.length);
    }

    cognitiveSubscaleBelow3Html.push(
        <div key={"GeneralDescriptionListK"}>
            <Typography variant="h6" gutterBottom>
                {t("components.QuestionnaireResults.ResultDescriptionListK.GeneralDescription.Title")} <br/>
            </Typography>
            <Typography variant="body2" gutterBottom>
                {t("components.QuestionnaireResults.ResultDescriptionListK.GeneralDescription.Description")}
                {averageSubscaleBelow3String} <br/>
            </Typography>
        </div>
    );

    return cognitiveSubscaleBelow3Html;
}

function getCognitiveStrategiesBelow3Element(organize: number, elaborate: number, criticalReview: number, repeat: number) {

    const {t} = useTranslation();

    let cognitiveStrategiesBelow3String = t("components.QuestionnaireResults.ResultDescriptionListK.CognitiveStrategies Below3.Part1");
    const cognitiveStrategiesBelow3Array = [];
    const cognitiveStrategiesBelow3Html = [];

    if(organize < 3) {
        cognitiveStrategiesBelow3Array.push("Organize");
        cognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.TableListK.Organize") + " &";
    }
    if(elaborate < 3) {
        cognitiveStrategiesBelow3Array.push("Elaborate");
        cognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.TableListK.Elaborate") + " &";
    }
    if(criticalReview < 3) {
        cognitiveStrategiesBelow3Array.push("Critical review");
        cognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.TableListK.Critical review") + " &";
    }
    if(repeat < 3) {
        cognitiveStrategiesBelow3Array.push("Repeat");
        cognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.TableListK.Repeat") + " &";
    }

    //Remove last " & "
    cognitiveStrategiesBelow3String = cognitiveStrategiesBelow3String.slice(0, cognitiveStrategiesBelow3String.length - 2);

    if(cognitiveStrategiesBelow3Array.length > 0) {
        cognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.ResultDescriptionListK.CognitiveStrategies Below3.Part2");
        cognitiveStrategiesBelow3Html.push(
            <div key={"CognitiveStrategiesDescriptionListK"}>
                <Typography variant={"h6"} gutterBottom>
                    {t("components.QuestionnaireResults.TableListK.Cognitive strategies")}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {cognitiveStrategiesBelow3String}
                </Typography>
            </div>
        );
    }

    return cognitiveStrategiesBelow3Html;
}

function getMetacognitiveStrategiesBelow3Element(goalsPlans: number, control: number, regulate: number) {

    const {t} = useTranslation();

    let metacognitiveStrategiesBelow3String = t("components.QuestionnaireResults.ResultDescriptionListK.MetacognitiveStrategies Below3.Part1");
    const metacognitiveStrategiesBelow3Array = [];
    const metacognitiveStrategiesBelow3Html = [];

    if(goalsPlans < 3) {
        metacognitiveStrategiesBelow3Array.push("Goals and plans");
        metacognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.ResultDescriptionListK.MetacognitiveStrategies Below3.Goals & Plans") + " &";
    }
    if(control < 3) {
        metacognitiveStrategiesBelow3Array.push("Control");
        metacognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.TableListK.Control") + " &";
    }
    if(regulate < 3) {
        metacognitiveStrategiesBelow3Array.push("Regulate");
        metacognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.ResultDescriptionListK.MetacognitiveStrategies Below3.Regulate") + " &";
    }

    //Remove last " & "
    metacognitiveStrategiesBelow3String = metacognitiveStrategiesBelow3String.slice(0, metacognitiveStrategiesBelow3String.length - 2);

    if(metacognitiveStrategiesBelow3Array.length > 0) {
        metacognitiveStrategiesBelow3String += t("Dot");
        metacognitiveStrategiesBelow3Html.push(
            <div key={"MetaCognitiveStrategiesDescriptionListK"}>
                <Typography variant={"h6"} gutterBottom>
                    {t("components.QuestionnaireResults.TableListK.Metacognitive strategies")}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {metacognitiveStrategiesBelow3String}
                </Typography>
            </div>
        );
    }

    return metacognitiveStrategiesBelow3Html;
}

function getRelevantSubscalesBelow3Element(subScalesRelevantCombinations: (string| number)[][]): JSX.Element[] {

    const {t} = useTranslation();
    const subscalesBelow3Array = [];
    const subscalesBelow3MessageString = [];

    //Going through all combinations of subScales and adding them to the future if-statement if they are below 3
    for (const item in subScalesRelevantCombinations) {
        if(subScalesRelevantCombinations[item][1] < 3) {
            subscalesBelow3Array.push(subScalesRelevantCombinations[item][0] + " && ");
        }
    }

    //If there are any relevant subScales below 3, the if-statement is created
    if(subscalesBelow3Array.length > 0) {
        //remove last " && "
        subscalesBelow3Array[subscalesBelow3Array.length-1] = subscalesBelow3Array[subscalesBelow3Array.length-1].slice(0, subscalesBelow3Array[subscalesBelow3Array.length-1].length - 4);
        subscalesBelow3MessageString.push(
            <div key={"RelevantSubscalesBelow3DescriptionListK"}>
                <Typography variant={"h6"} gutterBottom>
                    {t("components.QuestionnaireResults.ResultDescriptionListK."+ subscalesBelow3Array.join("") +" Below3.Title")}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {t("components.QuestionnaireResults.ResultDescriptionListK."+ subscalesBelow3Array.join("") +" Below3.Description")}
                </Typography>
            </div>
        );
    }

    return subscalesBelow3MessageString;
}

export function ResultDescriptionListK() {

    const [organize, elaborate, criticalReview, repeat, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates,
        literatureResearch, learningEnvironment] = GetListKParameters()[0];

    const subScalesRelevantCombinations = [["attention",attention], ["time",time], ["learnWithClassmates",learnWithClassmates], ["literatureResearch",literatureResearch], ["learningEnvironment",learningEnvironment]];

    const generalSubscalesBelow3 = getGeneralSubscalesBelow3Element(organize, elaborate, criticalReview, repeat, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates, literatureResearch, learningEnvironment);
    const cognitiveStrategiesBelow3 = getCognitiveStrategiesBelow3Element(organize, elaborate, criticalReview, repeat);
    const metacognitiveStrategiesBelow3 = getMetacognitiveStrategiesBelow3Element(goalsPlans, control, regulate);
    const relevantSubscalesBelow3 = getRelevantSubscalesBelow3Element(subScalesRelevantCombinations);

    return (
        <div key={"ResultDescriptionListK"}>
            {generalSubscalesBelow3}
            {cognitiveStrategiesBelow3}
            {metacognitiveStrategiesBelow3}
            {relevantSubscalesBelow3}
        </div>
    )
}

export const ResultDescListK = () => {

    const res = ResultDescriptionListK();
    return (
        <div id={"ResultDescListK"}>
            {res}
        </div>
    );
}
