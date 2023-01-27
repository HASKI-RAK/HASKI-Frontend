import React from 'react';
import {ResponsiveBar} from '@nivo/bar';
import {useTranslation} from 'react-i18next';


export function SetData(): [data: { dimension: string, [score: string]: string }[] , score: string] {

    const {t} = useTranslation();
    const score = t("components.QuestionnaireResults.TableILS.Dimension");

    const data = [
        {
            "dimension": t("components.QuestionnaireResults.TableILS.Global") + " / " + t("components.QuestionnaireResults.TableILS.Sequential"),
            [score]: "11",
        },
        {
            "dimension": t("components.QuestionnaireResults.TableILS.Verbal") + " / " + t("components.QuestionnaireResults.TableILS.Visual"),
            [score]: "3",
        },
        {
            "dimension": t("components.QuestionnaireResults.TableILS.Intuitive") + " / " + t("components.QuestionnaireResults.TableILS.Sensory"),
            [score]: "5",
        },
        {
            "dimension": t("components.QuestionnaireResults.TableILS.Reflective") + " / " + t("components.QuestionnaireResults.TableILS.Active"),
            [score]: "1",
        },
    ];

    return [data,score];
}


export const GraphILS = () => {
    const {t} = useTranslation();
    const [data, score] = SetData();

    return (

        <div style={{height: 300, minWidth: 850,}}>
            <ResponsiveBar
                data={data}
                keys={[score]}
                indexBy={"dimension"}
                margin={{top: 0, right: 100, bottom: 50, left: 80}}
                padding={0.3}
                axisBottom={{
                    tickSize: 5, tickValues: [-11, -9, -7, -5, -3, -1, 1, 3, 5, 7, 9, 11], tickPadding: 5, tickRotation: 0,
                    legend: t("components.QuestionnaireResults.TableILS.Score"), legendPosition: 'middle', legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5, tickPadding: 5, tickRotation: 0, format: (value: string) => {
                        return value.substring(0, value.indexOf(" / "));
                    },
                }}
                axisRight={{
                    tickSize: 5, tickPadding: 5, tickRotation: 0, format: (value: string) => {
                        return value.substring(value.indexOf(" / ")+2, value.length);
                    },
                    }
                }
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
