import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SelectLearningElementTable from './SelectLearningElementTable'
import { Topic } from '@core'
import React from 'react'
import '@testing-library/jest-dom'
import { RoleContext, RoleContextType, SnackbarContext } from '@services'
import '@testing-library/jest-dom'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { mockServices } from 'jest.setup'

describe('<SelectLearningElementTable />', () => {
  const topicMock: Topic = {
    contains_le: true,
    created_at: '',
    created_by: '',
    id: 1,
    is_topic: true,
    last_updated: null,
    lms_id: 1001,
    name: 'Wirtschaftsinformatik',
    parent_id: null,
    university: 'HS-Test',
    student_topic: {
      done: false,
      done_at: null,
      id: 1,
      student_id: 1,
      topic_id: 1,
      visits: []
    }
  }

  const selectedLearningElements = {
    1: [
      { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: 'KÜ' },
      { lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity', classification: 'EK' }
    ]
  }

  const setSelectedLearningElements = jest.fn()

  const addSnackbarMock = jest.fn()
  const mockAddSnackbar = {
    snackbarsErrorWarning: [],
    snackbarsSuccessInfo: [],
    setSnackbarsErrorWarning: (a: any[]) => a,
    setSnackbarsSuccessInfo: (a: any) => a,
    addSnackbar: (a: any) => {
      addSnackbarMock(a)
      return a
    },
    updateSnackbar: (a: any) => a,
    removeSnackbar: (a: any) => a
  }

  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  const defaultProps = {
    currentTopic: topicMock,
    selectedLearningElements: {},
    setSelectedLearningElements
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders title and topic name', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    const { getByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SelectLearningElementTable {...defaultProps} />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      expect(getByText('components.SelectLearningElementTable.title')).toBeInTheDocument()
      expect(getByText('Wirtschaftsinformatik')).toBeInTheDocument()
    })
  })

  it('renders learning elements without existing solutions', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    const { getAllByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SelectLearningElementTable
              currentTopic={topicMock}
              selectedLearningElements={selectedLearningElements}
              setSelectedLearningElements={setSelectedLearningElements}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      expect(getAllByText('test')).toHaveLength(3)
    })

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
    fireEvent.click(checkboxes[0])
    await waitFor(() => {
      expect(setSelectedLearningElements).toHaveBeenCalledWith({
        1001: [{ lms_id: 2, lms_learning_element_name: 'test', lms_activity_type: 'test', classification: '' }]
      })
    })
  })

  it('handles Error when fetchLearningPathElement returns Error', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })
    mockServices.fetchLearningPathElement.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    const { getByText, queryAllByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SelectLearningElementTable
              currentTopic={topicMock}
              selectedLearningElements={selectedLearningElements}
              setSelectedLearningElements={setSelectedLearningElements}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      expect(getByText('components.SelectLearningElementTable.title')).toBeInTheDocument()
      expect(getByText('Wirtschaftsinformatik')).toBeInTheDocument()
      expect(queryAllByText('test')).toHaveLength(0)
      expect(addSnackbarMock).toHaveBeenCalledWith({
        autoHideDuration: 5000,
        message: 'error.fetchLearningPathElement',
        severity: 'error'
      })
    })
  })
  /* it('allows selecting and unselecting learning elements', async () => {
    mockGetUser.mockResolvedValue({ settings: { user_id: 1 }, lms_user_id: 1, id: 1 })
    mockGetLearningPathElement.mockResolvedValue({
      path: [
        {
          learning_element: {
            lms_id: 123,
            name: 'Element 1',
            activity_type: 'video'
          }
        }
      ]
    })

    mockGetLearningElementSolution.mockRejectedValue({ status: 404 }) // No existing solution

    render(
      <SnackbarContext.Provider value={mockSnackbar}>
        <SelectLearningElementTable {...defaultProps} />
      </SnackbarContext.Provider>
    )

    const checkbox = await screen.findByLabelText('Element 1')
    expect(checkbox).not.toBeChecked()

    fireEvent.click(checkbox)

    await waitFor(() => {
      expect(setSelectedLearningElements).toHaveBeenCalledWith({
        1001: [
          {
            lms_id: 123,
            lms_learning_element_name: 'Element 1',
            lms_activity_type: 'video',
            classification: ''
          }
        ]
      })
    })

    // Simulate unchecking
    fireEvent.click(checkbox)

    await waitFor(() => {
      expect(setSelectedLearningElements).toHaveBeenCalledWith({
        1001: []
      })
    })
  })

  it('renders children if provided', async () => {
    mockGetUser.mockResolvedValue({ settings: { user_id: 1 }, lms_user_id: 1, id: 1 })
    mockGetLearningPathElement.mockResolvedValue({ path: [] })

    render(
      <SnackbarContext.Provider value={mockSnackbar}>
        <SelectLearningElementTable {...defaultProps}>
          <div data-testid="custom-child">Child Content</div>
        </SelectLearningElementTable>
      </SnackbarContext.Provider>
    )

    expect(await screen.findByTestId('custom-child')).toBeInTheDocument()
  })*/
})
