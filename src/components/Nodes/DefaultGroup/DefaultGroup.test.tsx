import { LearningPathLearningElementNode, nodeTypes } from '@components'
import { mockReactFlow } from '@mocks'
import { render } from '@testing-library/react'
import ReactFlow, { Node } from 'reactflow'
import '@testing-library/jest-dom'

describe('DefaultGroup tests', () => {
  beforeEach(() => {
    mockReactFlow()
  })

  const mockData: LearningPathLearningElementNode = {
    lmsId: 1,
    name: 'testNode',
    activityType: 'testType',
    classification: 'GROUP',
    isRecommended: true,
    handleSetUrl: jest.fn(),
    handleSetTitle: jest.fn(),
    handleOpen: jest.fn(),
    handleClose: jest.fn(),
    handleSetLmsId: jest.fn(),
    isDone: false
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
