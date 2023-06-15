import AdditionalLiteratureNode from './AdditionalLiteratureNode'
import { act, render, renderHook, fireEvent, screen } from '@testing-library/react'
import { LearningPathLearningElementNode, nodeTypes } from '@components'
import '@testing-library/jest-dom'
import ReactFlow, { Node, Edge, MiniMap, Controls, Background, WrapNodeProps, NodeProps } from 'reactflow'
import { DefaultBox as Box, DefaultSkeleton as Skeleton } from '@common/components'
// import 'reactflow/dist/base.css'
import { mockReactFlow } from '__mocks__/ResizeObserver'

beforeEach(() => {
  mockReactFlow()
})

describe('AdditionalLiteratureNode test', () => {
  const mockData: LearningPathLearningElementNode = {
    lmsId: 1,
    name: 'testNode',
    activityType: 'testType',
    classification: 'ZL',
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

  it('renders correctly', () => {
    const { getByRole } = render(<ReactFlow nodes={[mockNode]} />)
  })

  it('renders correctly and can be clicked', () => {
    const { getAllByRole, getByTestId } = render(
      <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
    )

    // expect

    screen.debug()

    const test = getByTestId('rf__node-testId')
    const test2 = getAllByRole('button')

    act(() => {
      fireEvent.click(test2[0])
    })

    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })
})
