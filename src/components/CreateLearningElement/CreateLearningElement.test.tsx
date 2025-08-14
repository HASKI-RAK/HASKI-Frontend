import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { ReactFlowProvider } from 'reactflow'
import { SnackbarContext } from '@services'
import CreateLearningElement from './CreateLearningElement'

jest.mock('@components', () => ({
  handleError: jest.fn()
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('CreateLearningElement Component', () => {
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

  const renderComponent = () => {
    return render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course', '/1', '/topic', '/1']}>
          <SnackbarContext.Provider value={mockAddSnackbar}>
            <CreateLearningElement />
          </SnackbarContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )
  }

  test('renders the create learning element button', () => {
    renderComponent()
    const createButton = screen.getByText('components.CreateLearningElement.createLearningElement')
    expect(createButton).toBeInTheDocument()
  })

  test('opens the create learning element modal when button is clicked', async () => {
    await act(async () => {
      renderComponent()
    })
    const createButton = screen.getByText('components.CreateLearningElement.createLearningElement')

    fireEvent.click(createButton)

    expect(screen.getByTestId('create-learning-elements-modal-close-button')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('create-learning-elements-modal-close-button'))
  })

  test('opens the create learning element modal when button is clicked, next button works', async () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() =>
      Promise.resolve({
        topics: [
          {
            contains_le: true,
            created_at: 'string',
            created_by: 'string',
            id: 1,
            is_topic: true,
            last_updated: 'string',
            lms_id: 1,
            name: 'Wirtschaftsinformatik',
            parent_id: 1,
            university: 'HS-Kempten',
            student_topic: {
              done: true,
              done_at: 'string',
              id: 1,
              student_id: 1,
              topic_id: 1,
              visits: ['string']
            }
          },
          {
            contains_le: true,
            created_at: 'string',
            created_by: 'string',
            id: 2,
            is_topic: true,
            last_updated: 'string',
            lms_id: 3,
            name: 'Informatik',
            parent_id: 1,
            university: 'HS-Kempten',
            student_topic: {
              done: true,
              done_at: 'string',
              id: 2,
              student_id: 1,
              topic_id: 2,
              visits: ['string']
            }
          }
        ]
      })
    )
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    const { getByText, getByTestId, getAllByRole } = render(
      <ReactFlowProvider>
        <MemoryRouter initialEntries={['/course', '/1', '/topic', '/2']}>
          <SnackbarContext.Provider value={mockAddSnackbar}>
            <CreateLearningElement />
          </SnackbarContext.Provider>
        </MemoryRouter>
      </ReactFlowProvider>
    )

    const createButton = getByText('components.CreateLearningElement.createLearningElement')
    fireEvent.click(createButton)

    expect(getByTestId('create-learning-elements-modal-close-button')).toBeInTheDocument()

    await waitFor(() => {
      expect(getByText('components.CreateLearningElementTable.selectAllToggle')).toBeInTheDocument()
    })

    fireEvent.click(getAllByRole('checkbox')[1])
    const nextbutton = getByText('appGlobal.next')
    expect(nextbutton).toBeEnabled()
    fireEvent.click(nextbutton)

    expect(getByText('components.CreateLearningElementModal.createLearningElements')).toBeInTheDocument()

    expect(getByText('appGlobal.back')).toBeEnabled()
    fireEvent.click(getByText('appGlobal.back'))
    expect(getByTestId('create-learning-elements-modal-close-button')).toBeInTheDocument()
    fireEvent.click(getByTestId('create-learning-elements-modal-close-button'))
  })

  test('handles fetchLearningPath errors when fetching', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })
    mockServices.fetchUser.mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    mockServices.fetchLearningPathTopic.mockImplementationOnce(() => {
      throw new Error('getLearningPathTopic error')
    })

    await act(async () => {
      renderComponent()
    })

    expect(addSnackbarMock).toHaveBeenCalled()
  })

  test('handles fetchUser error when fetching', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    mockServices.fetchUser.mockImplementation(() => {
      throw new Error('getUser error')
    })

    await act(async () => {
      render(
        <ReactFlowProvider>
          <MemoryRouter initialEntries={['/course', '/1', '/topic', '/2']}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateLearningElement />
            </SnackbarContext.Provider>
          </MemoryRouter>
        </ReactFlowProvider>
      )
    })
    expect(addSnackbarMock).toHaveBeenCalled()
  })
})
