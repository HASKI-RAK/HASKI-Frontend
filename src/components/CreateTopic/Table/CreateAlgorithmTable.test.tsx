import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { LearningElementWithClassification } from '@components'
import CreateAlgorithmTable, { CreateAlgorithmTableProps } from './CreateAlgorithmTable'

describe('CreateAlgorithmTable', () => {
  const mockHandleAlgorithmChange = jest.fn()

  const mockAlgorithmOptions = [
    {
      name: 'Select Algorithm',
      description: 'Please select an algorithm for the learning path calculation.',
      key: 'noKey',
      disabled: true
    },
    {
      name: 'Fixed Order',
      description: 'The learning elements are presented in a predetermined order.',
      key: 'default',
      disabled: false
    },
    {
      name: 'Graf',
      description:
        'This algorithm is based on the learning adaptive mechanism by Graf et al. It calculates the learning path based on the learning style of the learner.',
      key: 'graf',
      disabled: false
    },
    {
      name: 'ACO',
      description:
        'The Ant Colony Algorithm (ACO) is inspired by the behavior of ant workers. It calculates the learning path by simulating ants who leave behind pheromones to mark the best path.',
      key: 'aco',
      disabled: false
    },
    {
      name: 'Genetic Algorithm',
      description:
        'Based on natural selection, it combines learning paths to evolve the best one over several iterations.',
      key: 'ga',
      disabled: false
    }
  ]

  const notAllSelectedLearningElementClassifications: { [key: number]: LearningElementWithClassification[] } = {
    1: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: 'KÜ' }]
  }

  const defaultProps: CreateAlgorithmTableProps = {
    selectedTopics: [
      {
        topic_lms_id: 1,
        topic_lms_name: 'Topic 1',
        lms_learning_elements: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }]
      },
      {
        topic_lms_id: 2,
        topic_lms_name: 'Topic 2',
        lms_learning_elements: [{ lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }]
      }
    ],
    selectedLearningElementClassification: {
      1: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: 'KÜ' }],
      2: [{ lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity', classification: 'LZ' }]
    },
    onAlgorithmChange: mockHandleAlgorithmChange,
    selectedAlgorithms: {
      1: { topicName: 'Topic 1', algorithmShortName: 'algo1' }
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders topics with skeleton', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateAlgorithmTable
          selectedLearningElementClassification={notAllSelectedLearningElementClassifications}
          selectedTopics={[]}
          selectedAlgorithms={[]}
          onAlgorithmChange={defaultProps.onAlgorithmChange}
          children={defaultProps.children}
        />
      </MemoryRouter>
    )

    await waitFor(() => {
      act(() => {
        expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
      })
    })
  })

  it('renders topics with initial algorithm selection', async () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <CreateAlgorithmTable {...defaultProps} />
      </MemoryRouter>
    )

    // Verify topic names and initial algorithms
    expect(screen.getByText('Topic 1')).toBeInTheDocument()
    expect(screen.getByText('Topic 2')).toBeInTheDocument()

    const selectElements = getAllByRole('combobox')
    fireEvent.mouseDown(selectElements[0])
    const menuItems = getAllByRole('option')
    expect(menuItems).toHaveLength(mockAlgorithmOptions.length)
    fireEvent.click(getAllByRole('option')[1])
    expect(selectElements[0]).toHaveTextContent(mockAlgorithmOptions[1].name)
  })

  it('disables algorithm selection for topics without classification', async () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <CreateAlgorithmTable
          selectedLearningElementClassification={notAllSelectedLearningElementClassifications}
          selectedTopics={defaultProps.selectedTopics}
          selectedAlgorithms={defaultProps.selectedAlgorithms}
          onAlgorithmChange={defaultProps.onAlgorithmChange}
          children={defaultProps.children}
        />
      </MemoryRouter>
    )
    await waitFor(() => {
      const selectElement1 = getAllByRole('combobox')[0]
      expect(selectElement1).toBeEnabled()
      expect(getByText('components.CreateAlgorithmTable.missingClassification')).toBeInTheDocument()
    })
  })

  it('calls handleAlgorithmChange when a different algorithm is selected', async () => {
    const { getAllByRole, getByText } = render(
      <MemoryRouter>
        <CreateAlgorithmTable {...defaultProps} />
      </MemoryRouter>
    )

    // Open dropdown and select a new algorithm
    const selectElement = getAllByRole('combobox')[0]
    fireEvent.mouseDown(selectElement)
    const newAlgorithmOption = getByText('ACO')
    fireEvent.click(newAlgorithmOption)

    await waitFor(() => {
      expect(mockHandleAlgorithmChange).toHaveBeenCalledWith({
        1: { topicName: 'Topic 1', algorithmShortName: 'aco' }
      })
    })
  })

  it('renders children when provided', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateAlgorithmTable {...defaultProps}>
          <div data-testid="child">Child Content</div>
        </CreateAlgorithmTable>
      </MemoryRouter>
    )

    expect(getByTestId('child')).toBeInTheDocument()
  })
})
