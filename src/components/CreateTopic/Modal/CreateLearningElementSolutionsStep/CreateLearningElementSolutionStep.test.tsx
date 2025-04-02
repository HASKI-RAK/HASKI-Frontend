import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RemoteTopics } from '@core'
import {
  RemoteLearningElementWithClassification,
  RemoteLearningElementWithSolution,
  Solution
} from '../../Modal/CreateTopicModal/CreateTopicModal'
import CreateLearningelementSolutionStep from './CreateLearningElementSolutionStep'

describe('CreateLearningElementSolutionStep', () => {
  const mockOnNext = jest.fn()
  const mockOnBack = jest.fn()
  const onLearningElementSolutionChange = jest.fn()

  const mockLearningElement = {
    lms_id: 101,
    lms_learning_element_name: 'Element 1',
    lms_activity_type: 'Activity'
  }

  const mockSelectedTopics: RemoteTopics[] = [
    {
      topic_lms_id: 1,
      topic_lms_name: 'Topic 1',
      lms_learning_elements: [mockLearningElement]
    }
  ]

  const mockLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] } = {
    1: [
      {
        lms_id: 101,
        lms_learning_element_name: 'Element 1',
        lms_activity_type: 'Activity',
        classification: 'AN',
        disabled: false
      },
      {
        lms_id: 102,
        lms_learning_element_name: 'Element 2',
        lms_activity_type: 'Activity',
        classification: 'LZ',
        disabled: false
      },
      {
        lms_id: 103,
        lms_learning_element_name: 'Element 3',
        lms_activity_type: 'Activity',
        classification: 'EK',
        disabled: true
      }
    ]
  }

  const mockSelectedSolutions: { [key: number]: Solution[] } = {
    1: [{ solutionLmsId: 103, solutionLmsName: 'Element 3' }]
  }

  it('renders back and next buttons', () => {
    const mockLearningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] } = {}
    render(
      <MemoryRouter>
        <CreateLearningelementSolutionStep
          selectedTopics={mockSelectedTopics}
          LearningElementsClassification={mockLearningElementsClassification}
          selectedSolutions={mockSelectedSolutions}
          learningElementsWithSolutions={mockLearningElementsWithSolutions}
          onLearningElementSolutionChange={onLearningElementSolutionChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('appGlobal.back')).toBeInTheDocument()
    expect(screen.getByText('appGlobal.next')).toBeInTheDocument()
  })

  it('disables the next button when not all solutions are used', () => {
    const mockLearningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] } = {}
    render(
      <MemoryRouter>
        <CreateLearningelementSolutionStep
          selectedTopics={mockSelectedTopics}
          LearningElementsClassification={mockLearningElementsClassification}
          selectedSolutions={mockSelectedSolutions}
          learningElementsWithSolutions={mockLearningElementsWithSolutions}
          onLearningElementSolutionChange={onLearningElementSolutionChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('appGlobal.next')).toBeDisabled()
  })

  it('enables the next button when all solutions are used', async () => {
    const mockLearningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] } = {
      1: [
        { learningElementLmsId: 101, learningElementName: 'Element 1', solutionLmsId: 103 },
        { learningElementLmsId: 102, learningElementName: 'Element 2', solutionLmsId: 0 }
      ]
    }

    render(
      <MemoryRouter>
        <CreateLearningelementSolutionStep
          selectedTopics={mockSelectedTopics}
          LearningElementsClassification={mockLearningElementsClassification}
          selectedSolutions={mockSelectedSolutions}
          learningElementsWithSolutions={mockLearningElementsWithSolutions}
          onLearningElementSolutionChange={onLearningElementSolutionChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('appGlobal.next')).not.toBeDisabled()
  })

  it('calls onBack when back button is clicked', () => {
    const mockLearningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] } = {}
    render(
      <MemoryRouter>
        <CreateLearningelementSolutionStep
          selectedTopics={mockSelectedTopics}
          LearningElementsClassification={mockLearningElementsClassification}
          selectedSolutions={mockSelectedSolutions}
          learningElementsWithSolutions={mockLearningElementsWithSolutions}
          onLearningElementSolutionChange={onLearningElementSolutionChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('appGlobal.back'))
    expect(mockOnBack).toHaveBeenCalled()
  })

  it('calls onNext when next button is clicked', async () => {
    const mockLearningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] } = {
      1: [
        { learningElementLmsId: 101, learningElementName: 'Element 1', solutionLmsId: 103 },
        { learningElementLmsId: 102, learningElementName: 'Element 2', solutionLmsId: 0 }
      ]
    }

    render(
      <MemoryRouter>
        <CreateLearningelementSolutionStep
          selectedTopics={mockSelectedTopics}
          LearningElementsClassification={mockLearningElementsClassification}
          selectedSolutions={mockSelectedSolutions}
          learningElementsWithSolutions={mockLearningElementsWithSolutions}
          onLearningElementSolutionChange={onLearningElementSolutionChange}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('appGlobal.next'))
    expect(mockOnNext).toHaveBeenCalled()
  })
})
