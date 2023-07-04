import { LearningPathLearningElementNode, nodeTypes } from '@components'
import { render, fireEvent } from '@testing-library/react'
import { mockReactFlow } from '__mocks__/ResizeObserver'
import ReactFlow, { Node } from 'reactflow'
import '@testing-library/jest-dom'

describe('SelfAssessmentNode tests', () => {
  beforeEach(() => {
    mockReactFlow()
  })

  const mockData: LearningPathLearningElementNode = {
    lmsId: 1,
    name: 'testNode',
    activityType: 'testType',
    classification: 'SE',
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
    const SelfAssessmentNode = getByTestId('selfAssessmentNode')

    expect(SelfAssessmentNode).toBeInTheDocument()

    fireEvent.click(SelfAssessmentNode)

    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })
})
