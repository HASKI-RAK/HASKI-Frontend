import { LearningPathLearningElementNode, nodeTypes } from '@components'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ReactFlow, { Node } from 'reactflow'
import { mockReactFlow } from '@mocks'
import '@testing-library/jest-dom'

describe('FeedbackNode tests', () => {
  beforeEach(() => {
    mockReactFlow()
  })

  const mockData: LearningPathLearningElementNode = {
    lmsId: 1,
    name: 'testNode',
    activityType: 'testType',
    classification: 'RQ',
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

  it('renders correctly and can be clicked', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
      </MemoryRouter>
    )
    const FeedbackNode = getByTestId('feedbackNode')

    expect(FeedbackNode).toBeInTheDocument()

    fireEvent.click(FeedbackNode)

    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })
})
