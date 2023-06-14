import AdditionalLiteratureNode from './AdditionalLiteratureNode'
import { act, render, renderHook, fireEvent, screen } from '@testing-library/react'
import { LearningPathLearningElementNode, nodeTypes } from '@components'
import '@testing-library/jest-dom'
import ReactFlow, { Node, Edge, MiniMap, Controls, Background, WrapNodeProps, NodeProps } from 'reactflow'
import { DefaultBox as Box, DefaultSkeleton as Skeleton } from '@common/components'
// import 'reactflow/dist/base.css'
import { mockReactFlow } from 'bin/__mocks__/ResizeObserver'

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

  const mockLearningElementStyle = {
    background: '#fff',
    padding: 10,
    border: '1px solid ' + '#ddd',
    borderRadius: 8,
    cursor: 'pointer',
    visiblity: true
  }

  const mockNode: Node = {
    id: 'testId',
    type: mockData.classification,
    data: mockData,
    position: {
      x: 0,
      y: 0
    },
    style: mockLearningElementStyle
  }

  it('renders correctly and can be clicked', () => {
    const { getAllByRole, getByTestId } = render(
      <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
    )

    // expect

    screen.debug()

    const test2 = getAllByRole('button')
    fireEvent.click(test2[0])
    // const test = getByTestId('rf__node-testId')
    // fireEvent.click(test)
    // fireEvent.click(getByRole('button'))
  })
})
