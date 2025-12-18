import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ReactFlow, { Node } from 'reactflow'
import { mockReactFlow } from '@mocks'
import { LearningPathLearningElementNode, nodeTypes } from '@components'

describe('[HASKI-REQ-0085] ShortTextualIntroductionNode tests', () => {
  beforeEach(() => {
    mockReactFlow()
  })

  it('renders correctly and can be clicked, isDone is false', () => {
    const mockData: LearningPathLearningElementNode = {
      learningElementId: 1,
      lmsId: 1,
      name: 'testNode',
      activityType: 'testType',
      classification: 'KÜ',
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

    const { getByTestId } = render(
      <MemoryRouter>
        <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
      </MemoryRouter>
    )
    const shortTextualIntroductionNode = getByTestId('basicNode')

    expect(shortTextualIntroductionNode).toBeInTheDocument()

    fireEvent.click(shortTextualIntroductionNode)

    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })

  it('renders correctly and can be clicked, isDone is true', () => {
    const mockData: LearningPathLearningElementNode = {
      learningElementId: 1,
      lmsId: 1,
      name: 'testNode',
      activityType: 'testType',
      classification: 'KÜ',
      handleSetUrl: jest.fn(),
      handleSetTitle: jest.fn(),
      handleOpen: jest.fn(),
      handleClose: jest.fn(),
      handleSetLmsId: jest.fn(),
      isDone: true,
      isDisabled: true,
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

    const { getByTestId } = render(
      <MemoryRouter>
        <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
      </MemoryRouter>
    )
    const shortTextualIntroductionNode = getByTestId('basicNode')

    expect(shortTextualIntroductionNode).toBeInTheDocument()

    fireEvent.click(shortTextualIntroductionNode)

    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })
})
