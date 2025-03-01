import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarContext } from '@services'
import CreateLearningElement from './CreateLearningElement'

jest.mock('@components', () => ({
  handleError: jest.fn()
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

  beforeEach(() => {
    jest.resetAllMocks()
  })

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <SnackbarContext.Provider value={mockAddSnackbar}>
          <CreateLearningElement />
        </SnackbarContext.Provider>
      </MemoryRouter>
    )
  }

  test('renders the create learning element button', () => {
    renderComponent()
    const createButton = screen.getByText('components.CreateLearningElement.createLearningElement')
    expect(createButton).toBeInTheDocument()
  })

  test('opens the create learning element modal when button is clicked', () => {
    renderComponent()
    const createButton = screen.getByText('components.CreateLearningElement.createLearningElement')

    fireEvent.click(createButton)

    expect(screen.getByTestId('create-learning-elements-modal-close-button')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('create-learning-elements-modal-close-button'))
  })

  test('handles fetchLearningPath errors when fetching', async () => {
    mockServices.fetchUser.mockImplementation(() =>
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
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('getUser error')
    })

    await act(async () => {
      renderComponent()
    })

    expect(addSnackbarMock).toHaveBeenCalled()
  })
})
