import { TopicLearningElements as TopicLearningElement, LearningElement } from '@core'
import { Box, Card, Modal, Typography } from '@mui/material'
import log from 'loglevel'
import { useEffect, useMemo, useState } from 'react'
import { create, StateCreator } from 'zustand'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import ReactFlow, { Handle, Node, NodeProps, NodeTypes, Position } from 'reactflow'

const style = {
  position: 'absolute',
  top: '25%',
  left: '25%',
  transform: 'translate(-20%, -20%)',
  width: '75%',
  height: '85%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'hidden'
}

const design_patterns_general = [
  {
    name: 'Kurzübersicht',
    link: 'fakedomain.com/',
    description: 'Kurzübersicht über die wichtigsten Design Patterns',
    tags: ['general', 'overview'],
    type: 'text'
  },
  {
    name: 'Selbsteinschätzungstest',
    link: 'http://fakedomain.com/mod/quiz/view.php?id=5',
    description: 'Selbsteinschätzungstest für Design Patterns',
    tags: ['general', 'test'],
    type: 'quiz'
  }
]

const IframeModal = ({
  url,
  title,
  isOpen,
  onClose
}: {
  url: string
  title: string
  isOpen: boolean
  onClose: () => void
}): JSX.Element => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <iframe
          src={url}
          title={title}
          width="120%"
          height="130%"
          style={{
            position: 'relative',
            left: '-19%',
            top: '-21%'
          }}
        />
      </Box>
    </Modal>
  )
}
const learning_path_mock: TopicLearningElement[] = [
  {
    position: 1,
    learning_element: {
      id: 1,
      lms_id: 4,
      activity_type: 'assign',
      classification: 'RQ',
      name: 'Test Learning Element 1',
      done: false,
      done_at: '2017-07-21T17:32:28Z',
      nr_of_visits: 3,
      last_visit: '2017-07-21T17:32:28Z',
      time_spend: 123.45,
      is_recommended: true
    }
  },
  {
    position: 2,
    learning_element: {
      id: 2,
      lms_id: 4,
      activity_type: 'assign',
      classification: 'RQ',
      name: 'Test Learning Element 5',
      done: false,
      done_at: '2017-07-21T17:32:28Z',
      nr_of_visits: 0,
      last_visit: '2017-07-21T17:32:28Z',
      time_spend: 123.45,
      is_recommended: true
    }
  },
  {
    position: 3,
    learning_element: {
      id: 2,
      lms_id: 4,
      activity_type: 'assign',
      classification: 'RQ',
      name: 'Test Learning Element 3',
      done: false,
      done_at: '2017-07-21T17:32:28Z',
      nr_of_visits: 20,
      last_visit: '2017-07-21T17:32:28Z',
      time_spend: 1000,
      is_recommended: true
    }
  }
]

interface TopicSlice {
  topicLearningElements: TopicLearningElement[]
  addBear: () => void
  eatFish: () => void
}
const createBearSlice: StateCreator<TopicSlice & FishSlice, [], [], TopicSlice> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 }))
})

interface FishSlice {
  fishes: number
  addFish: () => void
}
const createFishSlice: StateCreator<TopicSlice & FishSlice, [], [], FishSlice> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 }))
})

const useBoundStore = create<TopicSlice & FishSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a)
}))

const _useTopic = () => {
  const [initalNodes, setInitalNodes] = useState<TopicNode[]>()
  const [initalEdges, setInitalEdges] = useState<TopicEdge[]>()
  const [searchParams] = useSearchParams()
  const topic = searchParams.get('topic')

  useEffect(() => {
    if (topic) {
      // request to backend to get learning path for topic
      // alert('Topic: ' + topic)
      // const nodes: TopicNode[] = topiclearningelements_to_nodes(learning_path_mock)
      // setInitalNodes(nodes)
      // const edges: TopicEdge[] = nodes.map((item, index) => ({
      //   id: index.toString(),
      //   source: item.id,
      //   target: item.id
      // }))
      // setInitalEdges(edges)
    }
  }, [topic])

  return { topic }
}
export const BasicNode = ({ data }: NodeProps<TopicNode>) => {
  console.log(data)
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState(process.env.MOODLE + `/mod/${data.activity_type}/view.php?id=${data.lms_id}`)
  const [title, setTitle] = useState(data.label)
  console.log(url)
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem',
          cursor: 'pointer'
        }}
        onClick={() => {
          setIsOpen(true)
        }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {data.label}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {t('topic.type')}: {data.activity_type}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          {t('topic.visits')}: {data.nr_of_visits}
        </Typography>
        <IframeModal url={url} title={title} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Card>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ top: '50%', background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
    </>
  )
}
type TopicNode = {
  lms_id: number
  label: string
  activity_type: string
  classification: string
  done: boolean
  nr_of_visits: number
  last_visit: string
  time_spend: number
  is_recommended: boolean
}

const nodeTypes: NodeTypes = {
  special: BasicNode
}

type TopicProps = {
  useTopic?: typeof _useTopic
}
// TODO URL Stuktur übelrgeen. bzswp. localhost:3000/topic?topic=1
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } }
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

export const Topic = ({ useTopic = _useTopic }: TopicProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const { t } = useTranslation()
  const [initalNodes, setInitalNodes] = useState<Node[]>()
  const [initalEdges, setInitalEdges] = useState<TopicEdge[]>()
  const [searchParams] = useSearchParams()
  const topic = searchParams.get('topic')

  useEffect(() => {
    if (topic) {
      // request to backend to get learning path for topic
      // alert('Topic: ' + topic)
      const nodes: Node[] = topiclearningelements_to_nodes(learning_path_mock)
      setInitalNodes(nodes)
      const edges: TopicEdge[] = nodes.map((item, index) => ({
        id: index.toString(),
        source: item.id,
        target: nodes[index + 1]?.id
      }))
      setInitalEdges(edges)
      console.log('nodes', nodes)
      console.log('edges', edges)
    }
  }, [topic])

  log.setLevel('error')
  return (
    <Box height={'100%'}>
      <ReactFlow fitView nodes={initalNodes} edges={initalEdges} nodeTypes={nodeTypes} />
      {/* {design_patterns_general.map((item) => (
        <Card
          key={item.name}
          sx={{ p: 2, m: 2 }}
          onClick={() => {
            setIsOpen(true)
            setUrl(item.link)
            setTitle(item.name)
          }}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </Card>
      ))} */}
      <IframeModal url={url} title={title} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  )
}

export default Topic

type TopicEdge = {
  id: string
  source: string
  target: string
}
const topiclearningelements_to_nodes = (learning_path: TopicLearningElement[]): Node<TopicNode>[] => {
  // alert('map_TopicLearningElements_to_reactflow')
  return learning_path.map((item, index) => {
    return {
      id: item.position.toString(),
      type: 'special',
      data: {
        lms_id: item.learning_element.lms_id,
        label: item.learning_element.name,
        activity_type: item.learning_element.activity_type,
        classification: item.learning_element.classification,
        done: item.learning_element.done,
        nr_of_visits: item.learning_element.nr_of_visits,
        last_visit: item.learning_element.last_visit,
        time_spend: item.learning_element.time_spend,
        is_recommended: item.learning_element.is_recommended
      },
      position: {
        x: 0,
        y: index * 200
      }
    }
  })
}
