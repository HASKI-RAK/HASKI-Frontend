import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { CreateLearningElementSolutionModal } from '@components'
import { RoleContext, RoleContextType, SnackbarContext } from '@services'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { Topic } from '@core'
import * as router from 'react-router'
import { mockServices } from 'jest.setup'

// Mock react-router params
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

describe('CreateLearningElementSolutionModal', () => {
  const setActiveStep = jest.fn()
  const setSelectedLearningElements = jest.fn()
  const setLearningElementsWithSolutions = jest.fn()
  const handleCloseCreateLearningElementSolutionModal = jest.fn()

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

  const topicMock: Topic = {
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
  }

  const baseProps = {
    open: true,
    activeStep: 0,
    setActiveStep,
    currentTopic: topicMock,
    selectedLearningElements: {
      1: [{ lms_id: 11, lms_learning_element_name: 'Test Element', lms_activity_type: 'video', classification: 'EK' }]
    },
    selectedSolutions: {
      1: [{ solutionLmsId: 1, solutionLmsName: 'Solution 1', solutionLmsType: 'h5p' }]
    },
    learningElementsWithSolutions: {
      1: [{ learningElementLmsId: 11, solutionLmsId: 1, solutionLmsType: 'h5p', learningElementName: 'Test Element' }]
    },
    setSelectedLearningElements,
    setLearningElementsWithSolutions,
    handleCloseCreateLearningElementSolutionModal
  }

  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  const renderModal = (props = {}) =>
    render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateLearningElementSolutionModal {...baseProps} {...props} />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

  it('renders modal and stepper', () => {
    renderModal()
    expect(screen.getByTestId('add-solution-modal-close-button')).toBeInTheDocument()
    expect(screen.getByText('components.CreateLearningElementTable.selectLearningElements')).toBeInTheDocument()
  })

  it('closes modal when close button clicked', () => {
    renderModal()
    fireEvent.click(screen.getByTestId('add-solution-modal-close-button'))
    expect(handleCloseCreateLearningElementSolutionModal).toHaveBeenCalled()
  })

  it('navigates to solution step', async () => {
    renderModal()
    const nextButton = screen.getByRole('button', { name: 'appGlobal.next' })
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(setActiveStep).toHaveBeenCalledWith(1)
    })
  })

  it('navigates with stepper buttons', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    const { getByRole, getByText } = render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateLearningElementSolutionModal
              open={true}
              activeStep={1}
              setActiveStep={setActiveStep}
              currentTopic={{
                contains_le: true,
                created_at: 'string',
                created_by: 'string',
                id: 2,
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
              }}
              selectedLearningElements={{
                2: [
                  {
                    lms_id: 11,
                    lms_learning_element_name: 'Test Element',
                    lms_activity_type: 'video',
                    classification: 'EK'
                  }
                ]
              }}
              selectedSolutions={{
                2: [{ solutionLmsId: 1, solutionLmsName: 'Solution 1', solutionLmsType: 'h5p' }]
              }}
              learningElementsWithSolutions={{
                2: [
                  {
                    learningElementLmsId: 11,
                    solutionLmsId: 1,
                    solutionLmsType: 'h5p',
                    learningElementName: 'Test Element'
                  }
                ]
              }}
              setSelectedLearningElements={setSelectedLearningElements}
              setLearningElementsWithSolutions={setLearningElementsWithSolutions}
              handleCloseCreateLearningElementSolutionModal={handleCloseCreateLearningElementSolutionModal}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    expect(getByText('Wirtschaftsinformatik')).toBeInTheDocument()

    await waitFor(() => {
      const buttons = screen.getAllByRole('button', { name: /selectLearningElements|selectSolutions/i })
      fireEvent.click(buttons[0]) // Click first step

      fireEvent.click(getByRole('button', { name: 'appGlobal.back' })) // Click back button
    })

    expect(setActiveStep).toHaveBeenCalledWith(0)
    expect(setActiveStep).toHaveBeenCalledTimes(2)
  })

  it('disables next button if no matching solution exists', () => {
    const props = {
      selectedLearningElements: {
        101: [{ lms_id: 99, lms_learning_element_name: 'Unmatched', lms_activity_type: 'video', classification: 'EK' }]
      },
      learningElementsWithSolutions: {
        101: [{ learningElementLmsId: 11, solutionLmsId: 21, solutionLmsType: 'h5p', learningElementName: 'Other' }]
      }
    }
    renderModal(props)
    const nextButton = screen.getByRole('button', { name: 'appGlobal.next' })
    expect(nextButton).toBeDisabled()
  })

  it('calls postLearningElementSolution on handleSend', async () => {
    const { postLearningElementSolution } = mockServices

    render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateLearningElementSolutionModal
              open={true}
              activeStep={1}
              setActiveStep={setActiveStep}
              currentTopic={{
                contains_le: true,
                created_at: 'string',
                created_by: 'string',
                id: 2,
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
              }}
              selectedLearningElements={{
                2: [
                  {
                    lms_id: 11,
                    lms_learning_element_name: 'Test Element',
                    lms_activity_type: 'video',
                    classification: 'EK'
                  }
                ]
              }}
              selectedSolutions={{
                2: [
                  {
                    solutionLmsId: 1,
                    solutionLmsName: 'Solution 1',
                    solutionLmsType: 'h5p'
                  }
                ]
              }}
              learningElementsWithSolutions={{
                2: [
                  {
                    learningElementLmsId: 11,
                    solutionLmsId: 1,
                    solutionLmsType: 'h5p',
                    learningElementName: 'Test Element'
                  }
                ]
              }}
              setSelectedLearningElements={setSelectedLearningElements}
              setLearningElementsWithSolutions={setLearningElementsWithSolutions}
              handleCloseCreateLearningElementSolutionModal={handleCloseCreateLearningElementSolutionModal}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    const sendButton = screen.getByRole('button', { name: 'appGlobal.next' })
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(postLearningElementSolution).toHaveBeenCalledWith({
        learningElementLmsId: 11,
        outputJson: JSON.stringify({ solution_lms_id: 1, activity_type: 'h5p' })
      })
    })
  })

  it('catches Error on handleSend', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '1' })
    mockServices.postLearningElementSolution.mockRejectedValue(() => {
      throw new Error('postLearningElementSolution error')
    })

    render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateLearningElementSolutionModal
              open={true}
              activeStep={1}
              setActiveStep={setActiveStep}
              currentTopic={{
                contains_le: true,
                created_at: 'string',
                created_by: 'string',
                id: 2,
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
              }}
              selectedLearningElements={{
                2: [
                  {
                    lms_id: 11,
                    lms_learning_element_name: 'Test Element',
                    lms_activity_type: 'video',
                    classification: 'EK'
                  }
                ]
              }}
              selectedSolutions={{
                2: [
                  {
                    solutionLmsId: 1,
                    solutionLmsName: 'Solution 1',
                    solutionLmsType: 'h5p'
                  }
                ]
              }}
              learningElementsWithSolutions={{
                2: [
                  {
                    learningElementLmsId: 11,
                    solutionLmsId: 1,
                    solutionLmsType: 'h5p',
                    learningElementName: 'Test Element'
                  }
                ]
              }}
              setSelectedLearningElements={setSelectedLearningElements}
              setLearningElementsWithSolutions={setLearningElementsWithSolutions}
              handleCloseCreateLearningElementSolutionModal={handleCloseCreateLearningElementSolutionModal}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    const sendButton = screen.getByRole('button', { name: 'appGlobal.next' })
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(addSnackbarMock).toHaveBeenCalledWith({
        message: 'error.postLearningElementSolution',
        severity: 'error',
        autoHideDuration: 5000
      })
    })
  })

  it('disables sendButton if currentTopic is missing', async () => {
    renderModal({ currentTopic: undefined, activeStep: 1 })
    const sendButton = screen.getByRole('button', { name: 'appGlobal.next' })
    expect(sendButton).toBeDisabled()

    /*    await waitFor(() => {
      expect(addSnackbar).toHaveBeenCalledWith({
        message: 'components.AddSolutionModal.noTopic',
        severity: 'error'
      })
    })*/
  })
})
