import { useNavigate } from 'react-router-dom'
import ReactFlow, { Background, Edge, MarkerType, Node, useEdgesState, useNodesState } from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: '404' },
    position: { x: 250, y: 0 }
  },
  { id: '2', data: { label: 'Do you know how you got here?' }, position: { x: 250, y: 100 } },
  { id: '3', data: { label: 'We neither. Contact us!' }, position: { x: 350, y: 200 } },
  { id: '4', data: { label: 'Did you make a typo?' }, position: { x: 150, y: 200 } },
  { id: '5', data: { label: 'Try to fix it' }, position: { x: 250, y: 300 } },
  { id: '6', data: { label: 'We messed up. Contact us!' }, position: { x: 50, y: 300 } },
  {
    id: '7',
    type: 'output',
    data: { label: 'Back home' },
    position: { x: 350, y: 400 },
    style: { color: '#0041d0', textDecoration: 'underline', cursor: 'pointer' }
  }
]

const initialEdges: Edge[] = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: '2-3',
    source: '2',
    target: '3',
    animated: true,
    label: 'No',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: '2-4',
    source: '2',
    target: '4',
    animated: true,
    label: 'Yes',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: '4-5',
    source: '4',
    target: '5',
    animated: true,
    label: 'Yes',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: '4-6',
    source: '4',
    target: '6',
    animated: true,
    label: 'No',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: '5-7',
    source: '5',
    target: '7',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: '6-7',
    source: '6',
    target: '7',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: '3-7',
    source: '3',
    target: '7',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  }
]
/**
 * # PageNotFound Page
 * Uses the {@link https://reactflow.dev/ | ReactFlow} library to display a flowchart.
 * The flow chart is a decision tree that helps the user to find the right page in a fun way.
 * @category Pages
 */
export const PageNotFound = () => {
  const [nodes] = useNodesState(initialNodes)
  const [edges] = useEdgesState(initialEdges)
  const navigate = useNavigate()

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={(event, node) => {
        if (node?.id === '7') {
          navigate('/')
        }
      }}
      fitView>
      <Background />
    </ReactFlow>
  )
}

export default PageNotFound
