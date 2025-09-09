import { render, screen, fireEvent } from '@testing-library/react'
import SelectLearningElementStep from './SelectLearningElementStep'
import { Topic } from '@core'
import React from 'react'
import '@testing-library/jest-dom'
import { RoleContext, RoleContextType, SnackbarContext } from '@services'
import { MemoryRouter } from 'react-router-dom'

describe('SelectLearningElementStep', () => {
  const mockSetSelectedLearningElements = jest.fn()
  const mockOnNext = jest.fn()

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

  const mockTopic: Topic = {
    contains_le: true,
    created_at: '2023-01-01',
    created_by: 'admin',
    id: 1,
    is_topic: true,
    last_updated: null,
    lms_id: 1001,
    name: 'Test Topic',
    parent_id: null,
    university: 'HS-Test',
    student_topic: {
      done: false,
      done_at: null,
      id: 1,
      student_id: 42,
      topic_id: 1,
      visits: []
    }
  }

  it('renders message when no topic is selected', () => {
    render(
      <SelectLearningElementStep
        selectedTopics={undefined}
        selectedLearningElements={{}}
        setSelectedLearningElements={mockSetSelectedLearningElements}
        onNext={mockOnNext}
      />
    )

    expect(screen.getByText('components.SelectLearningElementStep.noTopicSelected')).toBeInTheDocument()
  })

  it('renders with topic but disables button if no elements are selected', () => {
    render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SelectLearningElementStep
              selectedTopics={mockTopic}
              selectedLearningElements={{}} // no elements
              setSelectedLearningElements={mockSetSelectedLearningElements}
              onNext={mockOnNext}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    const button = screen.getByRole('button', { name: 'appGlobal.next' })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('enables button when elements are selected', () => {
    render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SelectLearningElementStep
              selectedTopics={mockTopic}
              selectedLearningElements={{
                1001: [
                  {
                    lms_id: 123,
                    lms_learning_element_name: 'Test Element',
                    lms_activity_type: 'video',
                    classification: 'EK'
                  }
                ]
              }}
              setSelectedLearningElements={mockSetSelectedLearningElements}
              onNext={mockOnNext}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )
    const button = screen.getByRole('button', { name: 'appGlobal.next' })
    expect(button).toBeEnabled()
  })

  it('calls onNext when next button is clicked', () => {
    render(
      <SnackbarContext.Provider value={mockAddSnackbar}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SelectLearningElementStep
              selectedTopics={mockTopic}
              selectedLearningElements={{
                1001: [
                  {
                    lms_id: 123,
                    lms_learning_element_name: 'Test Element',
                    lms_activity_type: 'video',
                    classification: 'EK'
                  }
                ]
              }}
              setSelectedLearningElements={mockSetSelectedLearningElements}
              onNext={mockOnNext}
            />
          </RoleContext.Provider>
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    const button = screen.getByRole('button', { name: 'appGlobal.next' })
    fireEvent.click(button)

    expect(mockOnNext).toHaveBeenCalled()
  })
})
