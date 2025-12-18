import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ReactFlow, { Node } from 'reactflow'
import { mockReactFlow } from '@mocks'
import { LearningPathLearningElementNode, nodeTypes } from '@components'

describe('[HASKI-REQ-0085] DefaultGroup tests', () => {
  beforeEach(() => {
    mockReactFlow()
  })

  const mockData: LearningPathLearningElementNode = {
    learningElementId: 1,
    lmsId: 1,
    name: 'testNode',
    activityType: 'testType',
    classification: 'GROUP',
    handleSetUrl: jest.fn(),
    handleSetTitle: jest.fn(),
    handleOpen: jest.fn(),
    handleClose: jest.fn(),
    handleSetLmsId: jest.fn(),
    isDone: false,
    isDisabled: false,
    isRecommended: false
  }

  const mockNode: Node = {
    id: 'testId',
    type: mockData.classification,
    data: mockData,
    position: {
      x: 0,
      y: 0
    }
  }

  it('renders correctly', () => {
    const reactFlow = render(<ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />)

    expect(reactFlow).toBeTruthy()
  })
})
