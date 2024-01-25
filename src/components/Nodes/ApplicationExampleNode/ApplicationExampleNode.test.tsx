import { LearningPathLearningElementNode, nodeTypes } from '@components'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ReactFlow, { Node } from 'reactflow'
import { mockReactFlow } from '@mocks'
import '@testing-library/jest-dom'

describe('ApplicationExampleNode tests', () => {
  beforeEach(() => {
    mockReactFlow()
  })

  it('renders correctly and can be clicked, isDone is false', () => {
    const mockData: LearningPathLearningElementNode = {
      lmsId: 1,
      name: 'testNode',
      activityType: 'testType',
      classification: 'AB',
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

    const { getByTestId } = render(
      <MemoryRouter>
        <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
      </MemoryRouter>
    )
    const applicationExampleNode = getByTestId('basicNode')

    expect(applicationExampleNode).toBeInTheDocument()

    fireEvent.click(applicationExampleNode)

    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })

  it('renders correctly and can be clicked, isDone is true', () => {
    const mockData: LearningPathLearningElementNode = {
      lmsId: 1,
      name: 'testNode',
      activityType: 'testType',
      classification: 'AB',
      isRecommended: true,
      handleSetUrl: jest.fn(),
      handleSetTitle: jest.fn(),
      handleOpen: jest.fn(),
      handleClose: jest.fn(),
      handleSetLmsId: jest.fn(),
      isDone: true
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

    const { getByTestId } = render(
      <MemoryRouter>
        <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
      </MemoryRouter>
    )
    const applicationExampleNode = getByTestId('basicNode')

    expect(applicationExampleNode).toBeInTheDocument()

    fireEvent.click(applicationExampleNode)

    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })
})