import { LearningPathLearningElementNode, nodeTypes } from '@components'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ReactFlow, { Node } from 'reactflow'
import { mockReactFlow } from '@mocks'
import '@testing-library/jest-dom'

describe('ExerciseNode tests', () => {
  beforeEach(() => {
    mockReactFlow()
  })

  const mockData: LearningPathLearningElementNode = {
    lmsId: 1,
    name: 'testNode',
    activityType: 'testType',
    classification: 'ÜB',
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
    const { getByTestId } = render(
      <MemoryRouter>
        <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
      </MemoryRouter>
    )
    const ExerciseNode = getByTestId('exerciseNode')

    expect(ExerciseNode).toBeInTheDocument()

    fireEvent.click(ExerciseNode)

    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })
})
