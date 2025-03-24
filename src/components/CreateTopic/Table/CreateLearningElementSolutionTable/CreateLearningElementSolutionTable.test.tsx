import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RemoteTopics, RemoteLearningElement } from '@core'
import CreateLearningElementSolutionTable from './CreateLearningElementSolutionTable'
import { LearningElementWithClassification } from '../CreateLearningElementClassificationTable/CreateLearningElementClassificationTable'
import { Solution, RemoteLearningElementWithSolution, RemoteLearningElementWithClassification } from '../../Modal/CreateTopicModal/CreateTopicModal'
import { act } from 'react-test-renderer'
import exp from 'constants'

describe('CreateLearningElementSolutionTable', () => {
    const mockSelectedTopics: RemoteTopics[] = [
        {
          topic_lms_id: 1,
          topic_lms_name: 'Topic 1',
          lms_learning_elements: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }]
        }
    ]

    const mockLearningElements: { [key: number]: RemoteLearningElement[] } = {
        1: [
          { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' },
          { lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }
        ]
    }

    const mockLearningElementsClassification: { [key: number]: LearningElementWithClassification[] } = {
        1: [
          { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: 'AN', disabled: false },
          { lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity', classification: 'LZ', disabled: false },
          { lms_id: 103, lms_learning_element_name: 'Element 3', lms_activity_type: 'Activity', classification: 'EK', disabled: true }
        ]
    }

    const mockSelectedSolutions: { [key: number]: Solution[] } = {
        1: [
            { solutionLmsId: 103, solutionLmsName: 'Solution 1' }
        ]
    }



    test('renders skeleton wehn no topics are selected', () => {
        render(
            <MemoryRouter>
                <CreateLearningElementSolutionTable
                    selectedTopics={[]}
                    LearningElementsClassification={{}}
                    selectedSolutions={{}}
                    learningElementsWithSolutions={{}}
                    onLearningElementSolutionChange={() => { }}
                />
            </MemoryRouter>
        )

        expect(screen.getByTestId('SkeletonList Element-1')).toBeInTheDocument()
    })

    test('renders table when topics are selected', () => {
        act(async () => {
          render(
              <MemoryRouter>
                  <CreateLearningElementSolutionTable
                      selectedTopics={mockSelectedTopics}
                      LearningElementsClassification={mockLearningElementsClassification}
                      selectedSolutions={{}}
                      learningElementsWithSolutions={{}}
                      onLearningElementSolutionChange={jest.fn()}
                  />
              </MemoryRouter>
          )

          await waitFor(() => {
            expect(screen.getByText('efe 1')).toBeInTheDocument()
            expect(screen.getByText('Element 1')).toBeInTheDocument()
            expect(screen.getByText('Element 2')).toBeInTheDocument()
          })
        })
    })

    test('renders dropdown with available solutions', async () => {
        const { getAllByRole } = render(
            <MemoryRouter>
                <CreateLearningElementSolutionTable
                    selectedTopics={mockSelectedTopics}
                    LearningElementsClassification={mockLearningElementsClassification}
                    selectedSolutions={mockSelectedSolutions}
                    learningElementsWithSolutions={{}}
                    onLearningElementSolutionChange={jest.fn()}
                />
            </MemoryRouter>
        )

        await waitFor(() => {
            const selectDropdown = getAllByRole('combobox')
            expect(selectDropdown).toHaveLength(0)
            const menuItems = getAllByRole('option', { hidden: true })
            expect(menuItems).toHaveLength(2)
        })
    })
})