import React from 'react';
import {ResponsiveBar} from '@nivo/bar';
import {useTranslation} from 'react-i18next';

export function SetData(): any{
    const {t} = useTranslation();
    const score = t("components.QuestionnaireResults.TableILS.Dimension");

    const data = [
        {
            "dimension": t("components.QuestionnaireResults.TableILS.Global"),
            [score]: 11,
        },
        {
            "dimension": t("components.QuestionnaireResults.TableILS.Verbal"),
            [score]: 3,
        },
        {
            "dimension": t("components.QuestionnaireResults.TableILS.Intuitive"),
            [score]: -5,
        },
        {
            "dimension": t("components.QuestionnaireResults.TableILS.Reflective"),
            [score]: -1,
        },
    ];

    return [data, score];
}




export const GraphILS = () => {
    const [data, score] = SetData();
    return (

        <div style={{height: 300, width: 600}}>
            <ResponsiveBar
                data={data}
                keys={[score]}
                indexBy="dimension"
                margin={{top: 0, right: 130, bottom: 50, left: 60}}
                padding={0.3}
                minValue={-11}
                maxValue={11}
                layout="horizontal"
                valueScale={{type: 'linear'}}
                indexScale={{type: 'band', round: true}}
                colors={{scheme: 'red_yellow_blue'}}
                colorBy="indexValue"
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#b62867',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                borderRadius={10}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="white"
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={function(e) {
                    return e.id + ": " + e.formattedValue + " in Score: " + e.indexValue
                }}
            />
        </div>
    );
}
