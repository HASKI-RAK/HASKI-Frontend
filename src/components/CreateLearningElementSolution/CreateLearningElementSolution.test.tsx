import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import CreateLearningElementSolution from './CreateLearningElementSolution'
import { MemoryRouter, useParams } from 'react-router-dom'
import { RoleContext, RoleContextType, SnackbarContext } from '@services'
import * as router from 'react-router'
import React from 'react'
import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'

// Mock react-router params
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('CreateLearningElementSolution', () => {
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
    jest.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <SnackbarContext.Provider value={mockAddSnackbar}>
      <MemoryRouter>
        <RoleContext.Provider value={courseCreatorContext}>{children}</RoleContext.Provider>
      </MemoryRouter>
    </SnackbarContext.Provider>
  )

  it('renders the button', () => {
    const { getByText } = render(<CreateLearningElementSolution />, { wrapper: Wrapper })

    const button = getByText('components.CreateLearningElementSolution.addSolution')
    expect(button).toBeInTheDocument()
  })

  it('tries to open the modal when button is clicked, without topicId', async () => {
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ courseId: '1' })
    const { getByText } = render(<CreateLearningElementSolution />, { wrapper: Wrapper })

    const button = getByText('components.CreateLearningElementSolution.addSolution')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId('add-solution-modal-close-button')).toBeInTheDocument()
    })
  })

  it('tries to open the modal when button is clicked, without courseId', async () => {
    jest.spyOn(router, 'useParams').mockReturnValueOnce({ topicId: '2' })
    const { getByText } = render(<CreateLearningElementSolution />, { wrapper: Wrapper })

    const button = getByText('components.CreateLearningElementSolution.addSolution')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId('add-solution-modal-close-button')).toBeInTheDocument()
    })
  })

  it('opens the modal when button is clicked', async () => {
    const { getByText } = render(<CreateLearningElementSolution />, { wrapper: Wrapper })

    const button = getByText('components.CreateLearningElementSolution.addSolution')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId('add-solution-modal-close-button')).toBeInTheDocument()
    })
  })

  it('closes and resets state when modal close button is clicked', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

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
            lms_id: 2,
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

    const { getByText, getByTestId, queryByTestId } = render(<CreateLearningElementSolution />, { wrapper: Wrapper })

    const button = getByText('components.CreateLearningElementSolution.addSolution')
    fireEvent.click(button)

    await waitFor(() => {
      expect(getByText('Informatik')).toBeInTheDocument()
    })

    await waitFor(() => {
      const closeButton = getByTestId('add-solution-modal-close-button')
      expect(closeButton).toBeInTheDocument()
      fireEvent.click(closeButton)
    })

    await waitFor(() => {
      expect(queryByTestId('add-solution-modal-close-button')).not.toBeInTheDocument()
    })
  })

  it('handles error when getLearningPathElement fails', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })
    mockServices.fetchLearningPathElement.mockImplementationOnce(() => {
      throw new Error('fetchLearningPathElement error')
    })

    render(<CreateLearningElementSolution />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(addSnackbarMock).toHaveBeenCalledWith({
        autoHideDuration: 3000,
        message: 'error.fetchLearningPathElement',
        severity: 'error'
      })
    })

    mockServices.fetchLearningPathElement.mockReset()
  })

  it('handles error when getRemoteTopics fails', async () => {
    mockServices.fetchRemoteTopics.mockImplementationOnce(() => {
      throw new Error('fetchRemoteTopics error')
    })

    render(<CreateLearningElementSolution />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(addSnackbarMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          autoHideDuration: 3000,
          message: 'error.fetchRemoteTopics',
          severity: 'error'
        })
      )

      expect(addSnackbarMock).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          autoHideDuration: 3000,
          message: 'error.fetchLearningPathElement',
          severity: 'error'
        })
      )
    })
    mockServices.fetchRemoteTopics.mockReset()
  })

  it('handles error when getLearningPathTopic fails', async () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() => {
      throw new Error('fetchLearningPathTopic error')
    })

    render(<CreateLearningElementSolution />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(addSnackbarMock).toHaveBeenCalledWith({
        autoHideDuration: 5000,
        message: 'error.fetchLearningPathTopic',
        severity: 'error'
      })
    })
    mockServices.fetchLearningPathTopic.mockReset()
  })

  it('handles error when getUser fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('fetchUser error')
    })

    render(<CreateLearningElementSolution />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(addSnackbarMock).toHaveBeenCalledWith({
        autoHideDuration: 5000,
        message: 'error.fetchUser',
        severity: 'error'
      })
    })
    mockServices.fetchUser.mockReset()
  })
})
