import React from 'react';
import {ResponsiveNetwork} from '@nivo/network';
import {useTranslation} from 'react-i18next';
import {getListKParameters, getSubscaleScore} from "./TableListK";

function SetData(): {nodes: {id: string, height: number, size: number, color: string}[], links: {source: string, target: string, distance: number}[]}{
    const {t} = useTranslation();
    const [organize, elaborate, criticalReview, repeat, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates, literatureResearch, learningEnvironment] = getListKParameters();
    return {

        "nodes": [
            {
                "id": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "height": 1,
                "size": 24,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "height": 1,
                "size": 24,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "height": 1,
                "size": 24,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "height": 1,
                "size": 24,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": "List K",
                "height": 2,
                "size": 32,
                "color": "rgb(244, 117, 96)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Organize") + "\n " +  organize.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Elaborate") + "\n   " + elaborate.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Critical review") + "\n   " + criticalReview.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Repeat") + "\n   " + repeat.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Attention") + "\n   " + attention.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Effort") + "\n   " + effort.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Time") + "\n   " + time.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Goals & plans") + "\n   " + goalsPlans.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Control") + "\n   " + control.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Regulate") + "\n   " + regulate.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Learning with classmates") + "\n   " + learnWithClassmates.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Literature research") + "\n   " + literatureResearch.toFixed(2),
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Learning environment") + "\n   " + learningEnvironment.toFixed(2),
                "height": 0,
                "size": 12,
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
                "target": t("components.QuestionnaireResults.TableListK.Organize") + "\n " +  organize.toFixed(2),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Elaborate") + "\n   " + elaborate.toFixed(2),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Critical review") + "\n   " + criticalReview.toFixed(2),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Repeat") + "\n   " + repeat.toFixed(2),
                "distance": 50
            },
            {
                "source": "List K",
                "target": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Attention") + "\n   " + attention.toFixed(2),
                "distance": 80
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Effort") + "\n   " + effort.toFixed(2),
                "distance": 80
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Time") + "\n   " + time.toFixed(2),
                "distance": 60
            },
            {
                "source": "List K",
                "target": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Goals & plans") + "\n   " + goalsPlans.toFixed(2),
                "distance": 60
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Control") + "\n   " + control.toFixed(2),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Regulate") + "\n   " + regulate.toFixed(2),
                "distance": 50
            },
            {
                "source": "List K",
                "target": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "distance": 70
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Learning with classmates") + "\n   " + learnWithClassmates.toFixed(2),
                "distance": 40
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Literature research") + "\n   " + literatureResearch.toFixed(2),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Learning environment") + "\n   " + learningEnvironment.toFixed(2),
                "distance": 50
            }
        ]
    };

}

// tslint:disable-next-line:variable-name
export const GraphListK = () => {
    const { t } = useTranslation();
    const graphListKData = SetData();
    const cognitiveStrategies = t("components.QuestionnaireResults.TableListK.Cognitive strategies");
    const intResMngtStrategies = t("components.QuestionnaireResults.TableListK.Internal resource management strategies");
    const metacognitiveStrategies = t("components.QuestionnaireResults.TableListK.Metacognitive strategies");
    const extResMngtStrategies = t("components.QuestionnaireResults.TableListK.External resource management strategies");

    const [organize, elaborate, criticalReview, repeat, attention, effort, time, goalsPlans, control, regulate, learnWithClassmates, literatureResearch, learningEnvironment] = getListKParameters();

    return (

        <div style={{height: 500, minWidth: 650}}>
            <ResponsiveNetwork
                data={graphListKData}
                margin={{ top: 0, right: 150, bottom: 80, left: 0 }}
                linkDistance={function(e){return e.distance}}
                repulsivity={100}
                nodeSize={function(n){return n.size}}
                activeNodeSize={function(n){return 1.5*n.size}}
                nodeColor={function(e){return e.color}}
                nodeBorderWidth={1}
                nodeBorderColor="black"
                linkColor={{ from: 'source.color', modifiers: [] }}
                linkThickness={function(n){return 2+2*n.target.data.height}}
                linkBlendMode="multiply"
                motionConfig="wobbly"
                animate={true}
                annotations={[
                    {
                        type: 'circle',
                        match: {
                            id: cognitiveStrategies
                        },
                        note: 'Score: ' + getSubscaleScore([organize, elaborate, criticalReview, repeat]).toFixed(2),
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
                        note: 'Score: ' + getSubscaleScore([attention, effort, time]).toFixed(2),
                        noteWidth: 250,
                        noteX: 20,
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
                        noteX: 20,
                        noteY: 35,
                        offset: 13,
                        noteTextOffset: -15
                    },
                    {
                        type: 'circle',
                        match: {
                            id: metacognitiveStrategies
                        },
                        note: 'Score: ' + getSubscaleScore([goalsPlans, control, regulate]).toFixed(2),
                        noteWidth: 145,
                        noteX: -20,
                        noteY: 80,
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
                        noteX: -20,
                        noteY: 80,
                        offset: 13,
                        noteTextOffset: -15
                    },
                    {
                        type: 'circle',
                        match: {
                            id: extResMngtStrategies
                        },
                        note: 'Score: ' + getSubscaleScore([learnWithClassmates, literatureResearch, learningEnvironment]).toFixed(2),
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
