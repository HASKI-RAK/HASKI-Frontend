import {Network} from '@nivo/network';
import {useTranslation} from 'react-i18next';
import {getListKParameters} from "./TableListK";

// Center the Score beneath the Subscale name. That is done with Whitespaces before the score.
const centerString = (str: string, maxLen: number): string => str.padStart((str.length+maxLen*1.5)/2);

export const SetData = (): { nodes: { id: string, height: number, size: number, score: number, color: string }[], links: { source: string, target: string, distance: number }[] } => {

    const {t} = useTranslation();
    const [[
        organize, elaborate, criticalReview, repeat, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates,
        literatureResearch, learningEnvironment
    ], [
        averageCognitiveStrategies, averageInternalResourceManagementStrategies,
        averageMetacognitiveStrategies, averageExternalResourcesManagementStrategies
    ]] = getListKParameters();

    // Center the Score beneath the Subscale name. That is done with Whitespaces before the score.
    const organizeCentered = t("components.QuestionnaireResults.TableListK.Organize") + "\n" + centerString(organize.toFixed(2), (t("components.QuestionnaireResults.TableListK.Organize")).length);
    const elaborateCentered = t("components.QuestionnaireResults.TableListK.Elaborate") + "\n" + centerString(elaborate.toFixed(2), (t("components.QuestionnaireResults.TableListK.Elaborate")).length);
    const criticalReviewCentered = t("components.QuestionnaireResults.TableListK.Critical review") + "\n" + centerString(criticalReview.toFixed(2), (t("components.QuestionnaireResults.TableListK.Critical review")).length);
    const repeatCentered = t("components.QuestionnaireResults.TableListK.Repeat") + "\n" + centerString(repeat.toFixed(2), (t("components.QuestionnaireResults.TableListK.Repeat")).length);
    const attentionCentered = t("components.QuestionnaireResults.TableListK.Attention") + "\n" + centerString(attention.toFixed(2), (t("components.QuestionnaireResults.TableListK.Attention")).length);
    const effortCentered = t("components.QuestionnaireResults.TableListK.Effort") + "\n" + centerString(effort.toFixed(2), (t("components.QuestionnaireResults.TableListK.Effort")).length);
    const timeCentered = t("components.QuestionnaireResults.TableListK.Time") + "\n" + centerString(time.toFixed(2), (t("components.QuestionnaireResults.TableListK.Time")).length);
    const goalsPlansCentered = t("components.QuestionnaireResults.TableListK.Goals & plans") + "\n" + centerString(goalsPlans.toFixed(2), (t("components.QuestionnaireResults.TableListK.Goals & plans")).length);
    const controlCentered = t("components.QuestionnaireResults.TableListK.Control") + "\n" + centerString(control.toFixed(2), (t("components.QuestionnaireResults.TableListK.Control")).length);
    const regulateCentered = t("components.QuestionnaireResults.TableListK.Regulate") + "\n" + centerString(regulate.toFixed(2), (t("components.QuestionnaireResults.TableListK.Regulate")).length);
    const learnWithClassmatesCentered = t("components.QuestionnaireResults.TableListK.Learning with classmates") + "\n" + centerString(learnWithClassmates.toFixed(2), (t("components.QuestionnaireResults.TableListK.Learning with classmates")).length);
    const literatureResearchCentered = t("components.QuestionnaireResults.TableListK.Literature research") + "\n" + centerString(literatureResearch.toFixed(2), (t("components.QuestionnaireResults.TableListK.Literature research")).length);
    const learningEnvironmentCentered = t("components.QuestionnaireResults.TableListK.Learning environment") + "\n" + centerString(learningEnvironment.toFixed(2), (t("components.QuestionnaireResults.TableListK.Learning environment")).length);


    return {

        "nodes": [
            {
                "id": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "height": 1,
                "size": 12,
                "score": averageCognitiveStrategies,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "height": 1,
                "size": 12,
                "score": averageInternalResourceManagementStrategies,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "height": 1,
                "size": 12,
                "score": averageMetacognitiveStrategies,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "height": 1,
                "size": 12,
                "score": averageExternalResourcesManagementStrategies,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": "List K",
                "height": 2,
                "size": 12,
                "score": 3,
                "color": "rgb(244, 117, 96)"
            },
            {
                "id": organizeCentered,
                "height": 0,
                "size": 5,
                "score": organize,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": elaborateCentered,
                "height": 0,
                "size": 5,
                "score": elaborate,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": criticalReviewCentered,
                "height": 0,
                "size": 5,
                "score": criticalReview,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": repeatCentered,
                "height": 0,
                "size": 5,
                "score": repeat,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": attentionCentered,
                "height": 0,
                "size": 5,
                "score": attention,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": effortCentered,
                "height": 0,
                "size": 5,
                "score": effort,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": timeCentered,
                "height": 0,
                "size": 5,
                "score": time,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": goalsPlansCentered,
                "height": 0,
                "size": 5,
                "score": goalsPlans,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": controlCentered,
                "height": 0,
                "size": 5,
                "score": control,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": regulateCentered,
                "height": 0,
                "size": 5,
                "score": regulate,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": learnWithClassmatesCentered,
                "height": 0,
                "size": 5,
                "score": learnWithClassmates,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": literatureResearchCentered,
                "height": 0,
                "size": 5,
                "score": literatureResearch,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": learningEnvironmentCentered,
                "height": 0,
                "size": 5,
                "score": learningEnvironment,
                "color": "rgb(232, 193, 160)"
            }
        ],
        "links": [
            {
                "source": "List K",
                "target": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "distance": 60
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "target": organizeCentered,
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "target": elaborateCentered,
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "target": criticalReviewCentered,
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "target": repeatCentered,
                "distance": 50
            },
            {
                "source": "List K",
                "target": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "target": attentionCentered,
                "distance": 70
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "target": effortCentered,
                "distance": 70
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "target": timeCentered,
                "distance": 55
            },
            {
                "source": "List K",
                "target": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "target": goalsPlansCentered,
                "distance": 60
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "target": controlCentered,
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "target": regulateCentered,
                "distance": 50
            },
            {
                "source": "List K",
                "target": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "distance": 70
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "target": learnWithClassmatesCentered,
                "distance": 60
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "target": literatureResearchCentered,
                "distance": 55
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "target": learningEnvironmentCentered,
                "distance": 50
            }
        ]
    };

};

export const GraphListK = () => {
    const {t} = useTranslation();
    const graphListKData = SetData();
    const cognitiveStrategies = t("components.QuestionnaireResults.TableListK.Cognitive strategies");
    const intResMngtStrategies = t("components.QuestionnaireResults.TableListK.Internal resource management strategies");
    const metacognitiveStrategies = t("components.QuestionnaireResults.TableListK.Metacognitive strategies");
    const extResMngtStrategies = t("components.QuestionnaireResults.TableListK.External resource management strategies");

    const [ averageCognitiveStrategies, averageInternalResourceManagementStrategies,
        averageMetacognitiveStrategies, averageExternalResourcesManagementStrategies] = getListKParameters()[1];

    return (

        <div>
            <Network
                height={500}
                width={650}
                data={graphListKData}
                margin={{top: 0, right: 200, bottom: 80, left: 0}}
                linkDistance={(e: { distance: number; }) => e.distance}
                repulsivity={100}
                activeNodeSize={(n: { size: number; }) => n.size*3}
                nodeSize={(n: { size: number; score: number; }) => n.size * (n.score * 0.6 + 1)}
                nodeColor={(e: { color: string; }) => e.color}
                nodeBorderWidth={1.3}
                nodeBorderColor={(data:{data:{score:number}}) => {
                    if(data.data.score >= 3) {
                        return "black"
                    }
                    else {
                        return "#9c3641"

                    }
                }}
                linkColor={{from: 'source.color', modifiers: []}}
                linkThickness={(n: {target: {data: {height:number}}}) => 2 + 2 * n.target.data.height}
                linkBlendMode="multiply"
                motionConfig="wobbly"
                animate={true}
                annotations={[
                    {
                        type: 'circle',
                        match: {
                            id: cognitiveStrategies
                        },
                        note: t("components.QuestionnaireResults.ResultDescriptionListK.Score") + ": "  + (Math.round((averageCognitiveStrategies + Number.EPSILON) * 100) / 100).toFixed(2),
                        noteX: -10,
                        noteY: 40,
                        offset: 13,
                        noteTextOffset: 5
                    },
                    {
                        type: 'circle',
                        match: {
                            id: cognitiveStrategies
                        },
                        note: cognitiveStrategies,
                        noteX: -10,
                        noteY: 40,
                        offset: 13,
                        noteTextOffset: -15
                    },
                    {
                        type: 'circle',
                        match: {
                            id: intResMngtStrategies
                        },
                        note: t("components.QuestionnaireResults.ResultDescriptionListK.Score") + ": " + (Math.round((averageInternalResourceManagementStrategies + Number.EPSILON) * 100) / 100).toFixed(2),
                        noteWidth: 250,
                        noteX: 50,
                        noteY: 35,
                        offset: 13,
                        noteTextOffset: 5,
                    },
                    {
                        type: 'circle',
                        match: {
                            id: intResMngtStrategies
                        },
                        note: intResMngtStrategies,
                        noteWidth: 250,
                        noteX: 50,
                        noteY: 35,
                        offset: 13,
                        noteTextOffset: -15
                    },
                    {
                        type: 'circle',
                        match: {
                            id: metacognitiveStrategies
                        },
                        note: t("components.QuestionnaireResults.ResultDescriptionListK.Score") + ": " + (Math.round((averageMetacognitiveStrategies + Number.EPSILON) * 100) / 100).toFixed(2),
                        noteWidth: 145,
                        noteX: -10,
                        noteY: 100,
                        offset: 13,
                        noteTextOffset: 5
                    },
                    {
                        type: 'circle',
                        match: {
                            id: metacognitiveStrategies
                        },
                        note: metacognitiveStrategies,
                        noteWidth: 145,
                        noteX: -10,
                        noteY: 100,
                        offset: 13,
                        noteTextOffset: -15
                    },
                    {
                        type: 'circle',
                        match: {
                            id: extResMngtStrategies
                        },
                        note: t("components.QuestionnaireResults.ResultDescriptionListK.Score") + ": " + (Math.round((averageExternalResourcesManagementStrategies + Number.EPSILON) * 100) / 100).toFixed(2),
                        noteWidth: 250,
                        noteX: 10,
                        noteY: 90,
                        offset: 13,
                        noteTextOffset: 5
                    },
                    {
                        type: 'circle',
                        match: {
                            id: extResMngtStrategies
                        },
                        note: extResMngtStrategies,
                        noteWidth: 250,
                        noteX: 10,
                        noteY: 90,
                        offset: 13,
                        noteTextOffset: -15
                    }
                ]}
                ariaDescribedBy={"List K Graph"}
                ariaLabel={"List K Graph"}/>
        </div>
    );
}