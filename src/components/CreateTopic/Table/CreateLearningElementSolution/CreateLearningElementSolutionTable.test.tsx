import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LearningElementWithClassification } from '@components'
import { RemoteTopics } from '@core'
import { RemoteLearningElementWithSolution, Solution } from '../../Modal/CreateTopicModal/CreateTopicModal'
import CreateLearningElementSolutionTable from './CreateLearningElementSolutionTable'

describe('CreateLearningElementSolutionTable', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockSelectedTopics: RemoteTopics[] = [
    {
      topic_lms_id: 1,
      topic_lms_name: 'Topic 1',
      lms_learning_elements: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }]
    }
  ]

  const mockLearningElementsClassification: { [key: number]: LearningElementWithClassification[] } = {
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
    1: [{ solutionLmsId: 103, solutionLmsName: 'Solution 1' }]
  }

  let mockLearningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] } = {}

  const mockOnLearningElementSolutionChange = jest.fn(
    (selectedSolutions: { [key: number]: RemoteLearningElementWithSolution[] }) => {
      mockLearningElementsWithSolutions = { ...selectedSolutions } // Update the mock state
      console.log('Updated mockLearningElementsWithSolutions:', mockLearningElementsWithSolutions) // Debugging
    }
  )

  beforeEach(() => {
    mockLearningElementsWithSolutions = {}
  })

  test('renders skeleton wehn no topics are selected', () => {
    render(
      <MemoryRouter>
        <CreateLearningElementSolutionTable
          selectedTopics={[]}
          selectedLearningElementsClassification={{}}
          selectedSolutions={{}}
          learningElementsWithSolutions={{}}
          onLearningElementSolutionChange={() => {}}
        />
      </MemoryRouter>
    )

    expect(screen.getByTestId('SkeletonList Element-1')).toBeInTheDocument
  })

  test('learningElementsWithSolutions is set with values from learningElemensClassification', async () => {
    act(() => {
      render(
        <MemoryRouter>
          <CreateLearningElementSolutionTable
            selectedTopics={mockSelectedTopics}
            selectedLearningElementsClassification={mockLearningElementsClassification}
            selectedSolutions={mockSelectedSolutions}
            learningElementsWithSolutions={mockLearningElementsWithSolutions}
            onLearningElementSolutionChange={mockOnLearningElementSolutionChange}
          />
        </MemoryRouter>
      )
    })
    await waitFor(() => {
      expect(mockOnLearningElementSolutionChange).toHaveBeenCalledWith({
        1: [
          { learningElementLmsId: 101, learningElementName: 'Element 1', solutionLmsId: 0 },
          { learningElementLmsId: 102, learningElementName: 'Element 2', solutionLmsId: 0 }
        ]
      })
      expect(screen.getByText('Topic 1')).toBeInTheDocument
    })
  })

  test('renders every element in learningElementsWithSolutions', async () => {
    const mockLeElWithSolutions = {
      1: [
        { learningElementLmsId: 101, learningElementName: 'Element 1', solutionLmsId: 0 },
        { learningElementLmsId: 102, learningElementName: 'Element 2', solutionLmsId: 0 }
      ]
    }

    act(() => {
      render(
        <MemoryRouter>
          <CreateLearningElementSolutionTable
            selectedTopics={mockSelectedTopics}
            selectedLearningElementsClassification={mockLearningElementsClassification}
            selectedSolutions={mockSelectedSolutions}
            learningElementsWithSolutions={mockLeElWithSolutions}
            onLearningElementSolutionChange={mockOnLearningElementSolutionChange}
          />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(screen.getByText('Element 1')).toBeInTheDocument
      expect(screen.getByText('Element 2')).toBeInTheDocument
    })
  })

  test('renders dropdown with available solutions', async () => {
    const mockLeElWithSolutions = {
      1: [
        { learningElementLmsId: 101, learningElementName: 'Element 1', solutionLmsId: 0, solutionLmsType: 'type' },
        { learningElementLmsId: 102, learningElementName: 'Element 2', solutionLmsId: 0, solutionLmsType: 'type' }
      ]
    }

    act(() => {
      render(
        <MemoryRouter>
          <CreateLearningElementSolutionTable
            selectedTopics={mockSelectedTopics}
            selectedLearningElementsClassification={mockLearningElementsClassification}
            selectedSolutions={mockSelectedSolutions}
            learningElementsWithSolutions={mockLeElWithSolutions}
            onLearningElementSolutionChange={jest.fn()}
          />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      const selectDropdown = screen.getAllByText('components.CreateLearningElementSolutionTable.noSolution')
      expect(selectDropdown).toHaveLength(2)

      fireEvent.mouseDown(selectDropdown[1])

      const menuItems = screen.getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(2)

      fireEvent.click(menuItems[1])
      expect(screen.getByText('Solution 1')).toBeInTheDocument
    })
  })

  it('does not render disabled elements', async () => {
    const mockLeElWithSolutions = {
      1: [
        { learningElementLmsId: 101, learningElementName: 'Element 1', solutionLmsId: 0, solutionLmsType: 'type' },
        { learningElementLmsId: 102, learningElementName: 'Element 2', solutionLmsId: 0, solutionLmsType: 'type' },
        { learningElementLmsId: 103, learningElementName: 'Element 3', solutionLmsId: 0, solutionLmsType: 'type' }
      ]
    }

    act(() => {
      render(
        <MemoryRouter>
          <CreateLearningElementSolutionTable
            selectedTopics={mockSelectedTopics}
            selectedLearningElementsClassification={mockLearningElementsClassification}
            selectedSolutions={mockSelectedSolutions}
            learningElementsWithSolutions={mockLeElWithSolutions}
            onLearningElementSolutionChange={jest.fn()}
          />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(screen.queryByText('Element 3')).not.toBeInTheDocument
    })
  })
})
