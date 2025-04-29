import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ReactFlow, { Node } from 'reactflow'
import { mockReactFlow } from '@mocks'
import { LearningPathLearningElementNode, nodeTypes } from '@components'
import { RoleContext, RoleContextType, deleteLearningElement } from '@services'

jest.mock('@services', () => ({
  ...jest.requireActual('@services'),
  deleteLearningElement: jest.fn().mockResolvedValue(undefined)
}))

describe('BasicNode tests', () => {
  beforeEach(() => {
    mockReactFlow()
  })

  const getMockNode = (isDone: boolean, isDisabled: boolean): Node => {
    const mockData: LearningPathLearningElementNode = {
      learningElementId: 1,
      lmsId: 1,
      name: 'basicNode',
      activityType: 'testType',
      classification: 'DEFAULT',
      isRecommended: true,
      handleSetUrl: jest.fn(),
      handleSetTitle: jest.fn(),
      handleOpen: jest.fn(),
      handleClose: jest.fn(),
      handleSetLmsId: jest.fn(),
      isDone: isDone,
      isDisabled: isDisabled
    }

    return {
      id: 'testId',
      type: mockData.classification,
      data: mockData,
      position: { x: 0, y: 0 }
    }
  }

  test('renders correctly and can be clicked, isDone is false', () => {
    const mockNode = getMockNode(false, false)

    render(
      <MemoryRouter>
        <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
      </MemoryRouter>
    )

    const basicNode = screen.getByTestId('basicNode')
    expect(basicNode).toBeInTheDocument()

    fireEvent.click(basicNode)
    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })

  test('renders correctly and can be clicked, isDone is true', () => {
    const mockNode = getMockNode(true, false)

    render(
      <MemoryRouter>
        <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
      </MemoryRouter>
    )

    const basicNode = screen.getByTestId('basicNode')
    expect(basicNode).toBeInTheDocument()

    fireEvent.click(basicNode)
    expect(mockNode.data.handleOpen).toBeCalled()
    expect(mockNode.data.handleSetUrl).toBeCalled()
  })

  test('shows delete button on hover when isCourseCreatorRole is true', async () => {
    const mockNode = getMockNode(false, false)

    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    render(
      <RoleContext.Provider value={courseCreatorContext}>
        <MemoryRouter>
          <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
        </MemoryRouter>
      </RoleContext.Provider>
    )

    const basicNode = screen.getByTestId('basicNode')
    fireEvent.mouseEnter(basicNode)

    await waitFor(() => {
      expect(screen.getByTestId('delete-learning-element-button')).toBeVisible()
    })

    fireEvent.mouseLeave(basicNode)
    await waitFor(() => {
      expect(screen.getByTestId('delete-learning-element-button')).not.toBeVisible()
    })
  })

  test('clicking delete button opens delete modal', async () => {
    const mockNode = getMockNode(false, false)

    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    render(
      <RoleContext.Provider value={courseCreatorContext}>
        <MemoryRouter>
          <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
        </MemoryRouter>
      </RoleContext.Provider>
    )

    fireEvent.mouseEnter(screen.getByTestId('basicNode'))
    const deleteButton = await screen.findByTestId('delete-learning-element-button')
    fireEvent.click(deleteButton)

    expect(screen.getByTestId('delete-entity-modal-accept-label')).toBeInTheDocument()
  })

  test('clicking delete button opens delete modal, clicking outside closes it', async () => {
    const mockNode = getMockNode(false, false)

    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    render(
      <RoleContext.Provider value={courseCreatorContext}>
        <MemoryRouter>
          <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
        </MemoryRouter>
      </RoleContext.Provider>
    )

    // Hover over the node and open the delete modal
    fireEvent.mouseEnter(screen.getByTestId('basicNode'))
    const deleteButton = await screen.findByTestId('delete-learning-element-button')
    fireEvent.click(deleteButton)

    // Ensure the modal appears
    const modal = screen.getByTestId('delete-entity-modal')
    expect(modal).toBeInTheDocument()

    const backdrop = document.querySelector('.MuiBackdrop-root')
    if (!backdrop) {
      throw new Error('Backdrop not found! Ensure your modal uses Material UI backdrop structure.')
    }

    fireEvent.mouseDown(backdrop)
    fireEvent.click(backdrop)

    await waitFor(() => {
      expect(screen.queryByTestId('delete-entity-modal')).not.toBeInTheDocument()
    })
  })

  test('clicking delete button does not trigger handleOpen()', async () => {
    const mockNode = getMockNode(false, false)

    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    render(
      <RoleContext.Provider value={courseCreatorContext}>
        <MemoryRouter>
          <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
        </MemoryRouter>
      </RoleContext.Provider>
    )

    fireEvent.mouseEnter(screen.getByTestId('basicNode'))
    const deleteButton = await screen.findByTestId('delete-learning-element-button')
    fireEvent.click(deleteButton)

    expect(mockNode.data.handleOpen).not.toBeCalled()
  })

  test('confirming delete calls deleteLearningElement with correct arguments', async () => {
    const mockNode = getMockNode(false, false)

    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    render(
      <RoleContext.Provider value={courseCreatorContext}>
        <MemoryRouter>
          <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
        </MemoryRouter>
      </RoleContext.Provider>
    )

    fireEvent.mouseEnter(screen.getByTestId('basicNode'))
    const deleteButton = await screen.findByTestId('delete-learning-element-button')
    fireEvent.click(deleteButton)

    const confirmDeleteButton = screen.getByTestId('delete-entity-modal-accept-label')
    fireEvent.click(confirmDeleteButton)

    await waitFor(() => {
      fireEvent.click(screen.getByText('appGlobal.delete'))
      expect(deleteLearningElement).toHaveBeenCalledWith(1, 1)
    })
  })

  test('disabled classification nodes are not seen by students', async () => {
    const mockNode = getMockNode(false, true)

    const studentContext = {
      isStudentRole: true,
      isCourseCreatorRole: false
    } as RoleContextType

    const { queryByTestId } = render(
      <RoleContext.Provider value={studentContext}>
        <MemoryRouter>
          <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
        </MemoryRouter>
      </RoleContext.Provider>
    )

    expect(queryByTestId('basicNode')).not.toBeInTheDocument()
  })

  test('disabled classification nodes are seen by courseCreator', async () => {
    const mockNode = getMockNode(false, true)

    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    const { getByTestId } = render(
      <RoleContext.Provider value={courseCreatorContext}>
        <MemoryRouter>
          <ReactFlow nodesDraggable={false} nodes={[mockNode]} nodeTypes={nodeTypes} />
        </MemoryRouter>
      </RoleContext.Provider>
    )

    expect(getByTestId('basicNode')).toBeInTheDocument()
  })
})
