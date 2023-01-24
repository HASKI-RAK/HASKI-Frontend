import React from 'react';
import {ResponsiveNetwork} from '@nivo/network';
import {useTranslation} from 'react-i18next';

function SetData(): any{
    const {t} = useTranslation();
    const data = {

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
                "id": t("components.QuestionnaireResults.TableListK.Organize")+ "\n   1.67",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Elaborate")+ "\n   2.00",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Critical review")+ "\n   3.67",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Repeat")+ "\n   2.33",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Attention")+ "\n   1.00",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Effort")+ "\n   2.33",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Time")+ "\n   2.33",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Goals & plans")+ "\n   2.67",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Control")+ "\n   3.33",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Regulate")+ "\n   1.00",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Learning with classmates")+ "\n   3.00",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Literature research")+ "\n   3.67",
                "height": 0,
                "size": 12,
                "color": "rgb(232, 193, 160)"
            },
            {
                "id": t("components.QuestionnaireResults.TableListK.Learning environment")+ "\n   3.67",
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
                "target": t("components.QuestionnaireResults.TableListK.Organize")+ "\n   1.67",
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Elaborate")+ "\n   2.00",
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Critical review")+ "\n   3.67",
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Cognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Repeat")+ "\n   2.33",
                "distance": 50
            },
            {
                "source": "List K",
                "target": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Attention")+ "\n   1.00",
                "distance": 80
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Effort")+ "\n   2.33",
                "distance": 80
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Internal resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Time")+ "\n   2.33",
                "distance": 60
            },
            {
                "source": "List K",
                "target": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Goals & plans")+ "\n   2.67",
                "distance": 60
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Control")+ "\n   3.33",
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.Metacognitive strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Regulate")+ "\n   1.00",
                "distance": 50
            },
            {
                "source": "List K",
                "target": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "distance": 70
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Learning with classmates")+ "\n   3.00",
                "distance": 40
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Literature research")+ "\n   3.67",
                "distance": 50
            },
            {
                "source": t("components.QuestionnaireResults.TableListK.External resource management strategies"),
                "target": t("components.QuestionnaireResults.TableListK.Learning environment")+ "\n   3.67",
                "distance": 50
            }
        ]
    };

    return data;

}

/*const data = {

    "nodes": [
        {
            "id": "Cognitive strategies",
            "height": 1,
            "size": 24,
            "color": "rgb(97, 205, 187)"
        },
        {
            "id": "Internal resource management strategies",
            "height": 1,
            "size": 24,
            "color": "rgb(97, 205, 187)"
        },
        {
            "id": "Metacognitive strategies",
            "height": 1,
            "size": 24,
            "color": "rgb(97, 205, 187)"
        },
        {
            "id": "External resource management strategies",
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
            "id": "Organize \n   1.67",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Elaborate \n   2.00",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Critical review \n   3.67",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Repeat \n   2.33",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Attention \n   1.00",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Effort \n   2.33",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Time \n   2.33",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Goals & plans \n   2.67",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Control \n   3.33",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Regulate \n   1.00",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Learning with classmates \n   3.00",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Literature research \n   3.67",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        },
        {
            "id": "Learning environment \n   3.67",
            "height": 0,
            "size": 12,
            "color": "rgb(232, 193, 160)"
        }
    ],
    "links": [
        {
            "source": "List K",
            "target": "Cognitive strategies",
            "distance": 60
        },
        {
            "source": "Cognitive strategies",
            "target": "Organize \n   1.67",
            "distance": 50
        },
        {
            "source": "Cognitive strategies",
            "target": "Elaborate \n   2.00",
            "distance": 50
        },
        {
            "source": "Cognitive strategies",
            "target": "Critical review \n   3.67",
            "distance": 50
        },
        {
            "source": "Cognitive strategies",
            "target": "Repeat \n   2.33",
            "distance": 50
        },
        {
            "source": "List K",
            "target": "Internal resource management strategies",
            "distance": 50
        },
        {
            "source": "Internal resource management strategies",
            "target": "Attention \n   1.00",
            "distance": 80
        },
        {
            "source": "Internal resource management strategies",
            "target": "Effort \n   2.33",
            "distance": 80
        },
        {
            "source": "Internal resource management strategies",
            "target": "Time \n   2.33",
            "distance": 60
        },
        {
            "source": "List K",
            "target": "Metacognitive strategies",
            "distance": 50
        },
        {
            "source": "Metacognitive strategies",
            "target": "Goals & plans \n   2.67",
            "distance": 60
        },
        {
            "source": "Metacognitive strategies",
            "target": "Control \n   3.33",
            "distance": 50
        },
        {
            "source": "Metacognitive strategies",
            "target": "Regulate \n   1.00",
            "distance": 50
        },
        {
            "source": "List K",
            "target": "External resource management strategies",
            "distance": 70
        },
        {
            "source": "External resource management strategies",
            "target": "Learning with classmates \n   3.00",
            "distance": 40
        },
        {
            "source": "External resource management strategies",
            "target": "Literature research \n   3.67",
            "distance": 50
        },
        {
            "source": "External resource management strategies",
            "target": "Learning environment \n   3.67",
            "distance": 50
        }
    ]
};*/


export const GraphListK = () => {
    const { t } = useTranslation();
    const data1 = SetData();
    const cognitiveStrategies = t("components.QuestionnaireResults.TableListK.Cognitive strategies");
    const intResMngtStrategies = t("components.QuestionnaireResults.TableListK.Internal resource management strategies");
    const metacognitiveStrategies = t("components.QuestionnaireResults.TableListK.Metacognitive strategies");
    const extResMngtStrategies = t("components.QuestionnaireResults.TableListK.External resource management strategies");


    return (

        <div style={{height: 400, minWidth: 600}}>
            <ResponsiveNetwork
                data={data1}
                margin={{ top: 0, right: 110, bottom: 0, left: 0 }}
                linkDistance={data1.nodes.distance}
                repulsivity={100}
                nodeSize={data1.nodes.size}
                activeNodeSize={1.5*data1.nodes.size}
                nodeColor={data1.nodes.color}
                nodeBorderWidth={1}
                nodeBorderColor="black"
                linkColor={{ from: 'source.color', modifiers: [] }}
                linkBlendMode="multiply"
                motionConfig="wobbly"
                annotations={[
                    {
                        type: 'circle',
                        match: {
                            id: cognitiveStrategies
                        },
                        note: 'Score: 2.42',
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
                        note: 'Score: 1.89',
                        noteWidth: 240,
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
                        noteWidth: 240,
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
                        note: 'Score: 2.33',
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
                        note: 'Score: 3.45',
                        noteWidth: 240,
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
                        noteWidth: 240,
                        noteX: 10,
                        noteY: 90,
                        offset: 13,
                        noteTextOffset: -15
                    }
                ]}
            />
        </div>
    );
}
