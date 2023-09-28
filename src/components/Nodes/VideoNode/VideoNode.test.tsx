import { LearningPathLearningElementNode, nodeTypes } from '@components'
import { render, fireEvent } from '@testing-library/react'
import { mockReactFlow } from '@mocks'
import ReactFlow, { Node } from 'reactflow'
import '@testing-library/jest-dom'

describe('VideoNode tests', () => {
  beforeEach(() => {
    mockReactFlow()
  })

  const mockData: LearningPathLearningElementNode = {
    lmsId: 1,
    name: 'testNode',
    activityType: 'testType',
    classification: 'AN',
    isRecommended: true,
    handleSetUrl: jest.fn(),
    handleSetTitle: jest.fn(),
    handleOpen: jest.fn(),
    handleClose: jest.fn()
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

  it('renders correctly and can be clicked', () => {
    const { getByTestId } = render(<ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />)
    const VideoNode = getByTestId('videoNode')

    expect(VideoNode).toBeInTheDocument()

    fireEvent.click(VideoNode)

    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })
})