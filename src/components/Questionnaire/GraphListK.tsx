import React from 'react';
import {ResponsiveNetwork} from '@nivo/network';


const data = {
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
            "distance": 80
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
            "distance": 80
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
            "distance": 80
        },
        {
            "source": "List K",
            "target": "Metacognitive strategies",
            "distance": 80
        },
        {
            "source": "Metacognitive strategies",
            "target": "Goals & plans \n   2.67",
            "distance": 80
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
            "distance": 80
        },
        {
            "source": "External resource management strategies",
            "target": "Learning with classmates \n   3.00",
            "distance": 50
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
};


export const GraphListK = () => {
    return (

        <div style={{height: 400, width: 600}}>
            <ResponsiveNetwork
                data={data}
                margin={{ top: 0, right: 0, bottom: 0, left: -100 }}
                linkDistance={function(e){return e.distance}}
                repulsivity={100}
                nodeSize={function(n){return n.size}}
                activeNodeSize={function(n){return 1.5*n.size}}
                nodeColor={function(e){return e.color}}
                nodeBorderWidth={1}
                nodeBorderColor="black"
                linkThickness={function(n){return 2+2*n.target.data.height}}
                linkColor={{ from: 'source.color', modifiers: [] }}
                linkBlendMode="multiply"
                motionConfig="wobbly"
                annotations={[
                    {
                        type: 'circle',
                        match: {
                            id: 'Cognitive strategies'
                        },
                        note: 'Score: 2.42',
                        noteX: -30,
                        noteY: 36,
                        offset: 13,
                        noteTextOffset: 5
                    },
                    {
                        type: 'circle',
                        match: {
                            id: 'Internal resource management strategies'
                        },
                        note: 'Score: 1.89',
                        noteX: 60,
                        noteY: 70,
                        offset: 13,
                        noteTextOffset: 5
                    },
                    {
                        type: 'circle',
                        match: {
                            id: 'Metacognitive strategies'
                        },
                        note: 'Score: 2.33',
                        noteX: -40,
                        noteY: 50,
                        offset: 13,
                        noteTextOffset: 5
                    },
                    {
                        type: 'circle',
                        match: {
                            id: 'External resource management strategies'
                        },
                        note: 'Score: 3.45',
                        noteX: 60,
                        noteY: 25,
                        offset: 13,
                        noteTextOffset: 5
                    }
                ]}
            />
        </div>
    );
}
