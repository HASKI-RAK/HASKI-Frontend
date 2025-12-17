import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import SelectLearningElementTable from './SelectLearningElementTable'
import { Topic } from '@core'
import React from 'react'
import '@testing-library/jest-dom'
import { RoleContext, RoleContextType, SnackbarContext } from '@services'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { mockServices } from 'jest.setup'

describe('SelectLearningElementTable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  const topicMockWithSolution: Topic = {
    contains_le: true,
    created_at: '',
    created_by: '',
    id: 1,
    is_topic: true,
    last_updated: null,
    lms_id: 1,
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

  const topicMockWithWrongSolution: Topic = {
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
      { lms_id: 1, lms_learning_element_name: 'test', lms_activity_type: 'test', classification: '' },
      { lms_id: 2, lms_learning_element_name: 'test', lms_activity_type: 'test', classification: '' }
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
    currentTopic: topicMockWithSolution,
    selectedLearningElements: {},
    setSelectedLearningElements
  }

  jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

  it('renders title and topic name', async () => {
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
    mockServices.fetchLearningElementSolution.mockRejectedValue(() =>
      Promise.reject({
        status: 404,
        message: 'No existing solution'
      })
    )

    const { getAllByText, getAllByRole } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SelectLearningElementTable
              currentTopic={topicMockWithWrongSolution}
              selectedLearningElements={selectedLearningElements}
              setSelectedLearningElements={setSelectedLearningElements}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      expect(getAllByText('test')).toHaveLength(4)
    })

    const checkboxes = getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(4)

    await waitFor(() => {
      // Select, unselect and select the first checkbox to test functionality
      fireEvent.click(checkboxes[0])
      fireEvent.click(checkboxes[0])
      fireEvent.click(checkboxes[0])
    })

    await waitFor(() => {
      expect(setSelectedLearningElements).toHaveBeenCalledWith({
        1001: [{ lms_id: 1, lms_learning_element_name: 'test', lms_activity_type: 'test', classification: '' }]
      })
    })
  })

  it('renders learning elements with existing solutions', async () => {
    mockServices.fetchLearningElementSolution.mockImplementation((lms_id: number) => {
      if (lms_id === 1) {
        return Promise.resolve({
          learning_element_lms_id: 10
          // other expected fields...
        })
      }
      // Simulate no solution found
      return Promise.reject({ status: 404 })
    })

    const setSelectedLearningElements1 = jest.fn()

    const { getAllByText, getAllByRole } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SelectLearningElementTable
              currentTopic={topicMockWithSolution}
              selectedLearningElements={selectedLearningElements}
              setSelectedLearningElements={setSelectedLearningElements1}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      expect(getAllByText('test')).toHaveLength(4)
    })

    const checkboxes = getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(4)

    await waitFor(() => {
      // Select, unselect and select the first checkbox to test functionality
      fireEvent.click(checkboxes[0])
      fireEvent.click(checkboxes[0])
      fireEvent.click(checkboxes[0])
    })

    await waitFor(() => {
      expect(setSelectedLearningElements1).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          1: [{ lms_id: 2, lms_learning_element_name: 'test', lms_activity_type: 'test', classification: '' }]
        })
      )

      expect(setSelectedLearningElements1).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          1: [{ lms_id: 2, lms_learning_element_name: 'test', lms_activity_type: 'test', classification: '' }]
        })
      )

      expect(setSelectedLearningElements1).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          1: [{ lms_id: 2, lms_learning_element_name: 'test', lms_activity_type: 'test', classification: '' }]
        })
      )
    })

    mockServices.fetchLearningPathElement.mockReset()
    mockServices.fetchLearningElementSolution.mockReset()
  })

  it('removes learning element from selection when checkbox is unchecked', async () => {
    const topicId = topicMockWithWrongSolution.lms_id

    const selectedBefore = {
      [topicId]: [
        {
          lms_id: 2,
          lms_learning_element_name: 'test',
          lms_activity_type: 'test',
          classification: ''
        }
      ]
    }

    // Mock the learning path element to return element with lms_id 2
    mockServices.fetchLearningPathElement.mockResolvedValue({
      path: [
        {
          learning_element: {
            lms_id: 2,
            name: 'test',
            activity_type: 'test'
          }
        }
      ]
    })

    // Mock that the solution does NOT exist
    mockServices.fetchLearningElementSolution.mockRejectedValue({ status: 404 })

    render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SelectLearningElementTable
              currentTopic={topicMockWithWrongSolution}
              selectedLearningElements={selectedBefore}
              setSelectedLearningElements={setSelectedLearningElements}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    const checkboxes = await screen.findAllByRole('checkbox')

    // Ensure the checkbox is initially checked
    expect(checkboxes[0]).toBeChecked()

    // Click to uncheck
    fireEvent.click(checkboxes[0])

    await waitFor(() => {
      expect(setSelectedLearningElements).toHaveBeenCalledWith({
        [topicId]: []
      })
    })

    mockServices.fetchLearningPathElement.mockReset()
    mockServices.fetchLearningElementSolution.mockReset()
  })

  it('handles Error when fetchLearningPathElement returns Error', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })
    mockServices.fetchLearningPathElement.mockImplementation(() => {
      throw new Error('getLearningPathElement error')
    })

    const { getByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SelectLearningElementTable
              currentTopic={topicMockWithSolution}
              selectedLearningElements={selectedLearningElements}
              setSelectedLearningElements={setSelectedLearningElements}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    await waitFor(() => {
      expect(getByText('components.SelectLearningElementTable.noLearningElements')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(addSnackbarMock).toHaveBeenCalledWith({
        autoHideDuration: 5000,
        message: 'error.fetchLearningPathElement',
        severity: 'error'
      })
    })
  })
})
