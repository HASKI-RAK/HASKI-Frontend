import { memo, useEffect } from 'react'
import ReactFlow, { Background, Controls, ReactFlowProvider, useReactFlow } from 'reactflow'
import { Grid } from '@common/components'
import { nodeTypes, ResponsiveMiniMap } from '@components'
import { LearningPathElement, LearningPathElementStatus } from '@core'
import { useTopic } from '@pages'

const exampleLearningPathElement: LearningPathElement = {
  based_on: 'aco',
  calculated_on: 'Mon, 27 Jan 2025 13:02:21 GMT',
  course_id: 2,
  id: 13,
  path: [
    {
      id: 23,
      learning_element: {
        activity_type: 'h5pactivity',
        classification: 'KÜ',
        created_at: 'Mon, 27 Jan 2025 00:00:00 GMT',
        created_by: 'Admin User',
        id: 8,
        last_updated: 'null',
        lms_id: 5,
        name: 'Kurzübersicht',
        student_learning_element: {
          done: false,
          done_at: 'null',
          id: 25,
          learning_element_id: 8,
          student_id: 2
        },
        university: 'HS-KE'
      },
      learning_element_id: 8,
      learning_path_id: 13,
      position: 1,
      recommended: true
    },
    {
      id: 24,
      learning_element: {
        activity_type: 'lti',
        classification: 'ÜB',
        created_at: 'Mon, 27 Jan 2025 00:00:00 GMT',
        created_by: 'Admin User',
        id: 9,
        last_updated: 'null',
        lms_id: 6,
        name: 'Übung 1 - Leicht',
        student_learning_element: {
          done: false,
          done_at: 'null',
          id: 26,
          learning_element_id: 9,
          student_id: 2
        },
        university: 'HS-KE'
      },
      learning_element_id: 9,
      learning_path_id: 13,
      position: 2,
      recommended: false
    },
    {
      id: 25,
      learning_element: {
        activity_type: 'resource',
        classification: 'ÜB',
        created_at: 'Mon, 27 Jan 2025 00:00:00 GMT',
        created_by: 'Admin User',
        id: 10,
        last_updated: 'null',
        lms_id: 27,
        name: 'Übung 2 - Leicht',
        student_learning_element: {
          done: false,
          done_at: 'null',
          id: 27,
          learning_element_id: 10,
          student_id: 2
        },
        university: 'HS-KE'
      },
      learning_element_id: 10,
      learning_path_id: 13,
      position: 2,
      recommended: false
    },
    {
      id: 26,
      learning_element: {
        activity_type: 'h5pactivity',
        classification: 'ÜB',
        created_at: 'Mon, 27 Jan 2025 00:00:00 GMT',
        created_by: 'Admin User',
        id: 11,
        last_updated: 'null',
        lms_id: 40,
        name: 'Übung 1 - Mittel',
        student_learning_element: {
          done: false,
          done_at: 'null',
          id: 28,
          learning_element_id: 11,
          student_id: 2
        },
        university: 'HS-KE'
      },
      learning_element_id: 11,
      learning_path_id: 13,
      position: 2,
      recommended: false
    },
    {
      id: 28,
      learning_element: {
        activity_type: 'h5p',
        classification: 'ZF',
        created_at: 'Mon, 27 Jan 2025 00:00:00 GMT',
        created_by: 'Admin User',
        id: 13,
        last_updated: 'null',
        lms_id: 87,
        name: 'Zusammenfassung',
        student_learning_element: {
          done: false,
          done_at: 'null',
          id: 29,
          learning_element_id: 13,
          student_id: 2
        },
        university: 'HS-KE'
      },
      learning_element_id: 13,
      learning_path_id: 13,
      position: 3,
      recommended: false
    }
  ]
}

const exampleLearningPathStatuses: LearningPathElementStatus[] = [
  {
    cmid: 6,
    state: 0,
    timecompleted: 0
  },
  {
    cmid: 27,
    state: 1,
    timecompleted: 1692345921
  },
  {
    cmid: 40,
    state: 1,
    timecompleted: 1695370718
  },
  {
    cmid: 45,
    state: 1,
    timecompleted: 1696851553
  },
  {
    cmid: 87,
    state: 0,
    timecompleted: 0
  },
  {
    cmid: 11,
    state: 0,
    timecompleted: 1692012171
  },
  {
    cmid: 17,
    state: 0,
    timecompleted: 0
  },
  {
    cmid: 21,
    state: 0,
    timecompleted: 0
  },
  {
    cmid: 25,
    state: 0,
    timecompleted: 0
  }
]

const LearningElementLearningPath = () => {
  const { mapNodes } = useTopic()
  const { fitView } = useReactFlow()
  const { nodes, edges } = mapNodes(exampleLearningPathElement, exampleLearningPathStatuses, [], true)

  useEffect(() => {
    if (nodes) {
      setTimeout(() => {
        fitView({
          padding: 5,
          minZoom: 0.6,
          duration: 100,
          nodes: [{ id: nodes[3].id }]
        })
      }, 100)
    }
  }, [nodes, edges])

  return (
    <Grid
      sx={{
        height: '40rem',
        width: '100%'
      }}>
      {/* needs its own ReactFlowProvider to not interfere with other components that use reactflow (e.g. topic page) */}
      <ReactFlowProvider>
        <ReactFlow
          id="example-flow"
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}>
          <ResponsiveMiniMap />
          <Background gap={16} />
          <Controls showInteractive={false} position="top-right" style={{ marginTop: 25 }} />
        </ReactFlow>
      </ReactFlowProvider>
    </Grid>
  )
}
export default memo(LearningElementLearningPath)
