import Typography from '@mui/material/Typography';
import {getListKParameters, getSubscaleScore} from "./TableListK";
import {useTranslation} from "react-i18next";

type GeneralSubscalesProps = {
    CognitiveStrategies: CognitiveStrategiesProps,
    attention: number,
    effort: number,
    time: number,
    goalsPlans: number,
    control: number,
    regulate: number,
    learnWithClassmates: number,
    literatureResearch: number,
    learningEnvironment: number,
}

type CognitiveStrategiesProps = {
    organize: number,
    elaborate: number,
    criticalReview: number,
    repeat: number,
}

type MetaCognitiveStrategiesProps = {
    goalsPlans: number,
    control: number,
    regulate: number,
}

const useGeneralSubscalesBelow3Element = (generalProps: GeneralSubscalesProps): JSX.Element => {

    const {t} = useTranslation();

    const averageSubscaleBelow3Array = [];
    let averageSubscaleBelow3String = "";

    const cognitiveStrategiesAverage = getSubscaleScore([generalProps.CognitiveStrategies.organize, generalProps.CognitiveStrategies.elaborate, generalProps.CognitiveStrategies.criticalReview, generalProps.CognitiveStrategies.repeat]);
    const averageInternalResourceManagementStrategies = getSubscaleScore([generalProps.attention, generalProps.effort, generalProps.time]);
    const averageMetacognitiveStrategies = getSubscaleScore([generalProps.goalsPlans, generalProps.control, generalProps.regulate]);
    const averageExternalResourcesManagementStrategies = getSubscaleScore([generalProps.learnWithClassmates, generalProps.literatureResearch, generalProps.learningEnvironment]);
    const averageSubscaleArray = [cognitiveStrategiesAverage, averageInternalResourceManagementStrategies, averageMetacognitiveStrategies, averageExternalResourcesManagementStrategies];

    for(const item in averageSubscaleArray) {
        if(averageSubscaleArray[item] < 3) {
            averageSubscaleBelow3Array.push(averageSubscaleArray[item]);
        }
    }
    if(averageSubscaleBelow3Array.length > 1) {
        averageSubscaleBelow3String += " " + t("components.QuestionnaireResults.ResultDescriptionListK.SubscaleAverage Below3." + averageSubscaleBelow3Array.length);
    }

    return(
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
};

const useCognitiveStrategiesBelow3Element = (generalProps: CognitiveStrategiesProps) => {

    const {t} = useTranslation();

    let cognitiveStrategiesBelow3String = t("components.QuestionnaireResults.ResultDescriptionListK.CognitiveStrategies Below3.Part1");
    const cognitiveStrategiesBelow3Array = [];
    const cognitiveStrategiesBelow3Html = [];

    if(generalProps.organize < 3) {
        cognitiveStrategiesBelow3Array.push("Organize");
        cognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.TableListK.Organize") + " &";
    }
    if(generalProps.elaborate < 3) {
        cognitiveStrategiesBelow3Array.push("Elaborate");
        cognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.TableListK.Elaborate") + " &";
    }
    if(generalProps.criticalReview < 3) {
        cognitiveStrategiesBelow3Array.push("Critical review");
        cognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.TableListK.Critical review") + " &";
    }
    if(generalProps.repeat < 3) {
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
};

const useMetacognitiveStrategiesBelow3Element = (metacognitiveProps: MetaCognitiveStrategiesProps) => {

    const {t} = useTranslation();

    let metacognitiveStrategiesBelow3String = t("components.QuestionnaireResults.ResultDescriptionListK.MetacognitiveStrategies Below3.Part1");
    const metacognitiveStrategiesBelow3Array = [];
    const metacognitiveStrategiesBelow3Html = [];

    if(metacognitiveProps.goalsPlans < 3) {
        metacognitiveStrategiesBelow3Array.push("Goals and plans");
        metacognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.ResultDescriptionListK.MetacognitiveStrategies Below3.Goals & Plans") + " &";
    }
    if(metacognitiveProps.control < 3) {
        metacognitiveStrategiesBelow3Array.push("Control");
        metacognitiveStrategiesBelow3String += " " + t("components.QuestionnaireResults.TableListK.Control") + " &";
    }
    if(metacognitiveProps.regulate < 3) {
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
};

//relevant subscales are: attention, time, learning with classmates, literature research and learning environment
const useRelevantSubscalesBelow3Element = (subScalesRelevantCombinations: (string| number)[][]): JSX.Element[] => {

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
};

export const ResultDescriptionListK = () => {

    const [organize, elaborate, criticalReview, repeat, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates,
        literatureResearch, learningEnvironment] = getListKParameters()[0];

    const subScalesRelevantCombinations = [["attention",attention], ["time",time], ["learnWithClassmates",learnWithClassmates], ["literatureResearch",literatureResearch], ["learningEnvironment",learningEnvironment]];

    const generalSubscalesBelow3 = useGeneralSubscalesBelow3Element({CognitiveStrategies:{organize, elaborate, criticalReview, repeat}, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates, literatureResearch, learningEnvironment});
    const cognitiveStrategiesBelow3 = useCognitiveStrategiesBelow3Element({organize, elaborate, criticalReview, repeat});
    const metacognitiveStrategiesBelow3 = useMetacognitiveStrategiesBelow3Element({goalsPlans, control, regulate});
    const relevantSubscalesBelow3 = useRelevantSubscalesBelow3Element(subScalesRelevantCombinations);

    return (
        <div key={"ResultDescriptionListK"}>
            {generalSubscalesBelow3}
            {cognitiveStrategiesBelow3}
            {metacognitiveStrategiesBelow3}
            {relevantSubscalesBelow3}
        </div>
    )
};
