import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RemoteTopics, RemoteLearningElement } from '@core'
import CreateLearningElementSolutionTable from './CreateLearningElementSolutionTable'
import { LearningElementWithClassification } from '../CreateLearningElementClassificationTable/CreateLearningElementClassificationTable'

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
          { lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity', classification: '' },
          { lms_id: 102, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity', classification: 'LZ' }
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

        expect(screen.getByTestId('create-learning-element-solution-table-skeleton')).toBeInTheDocument()
    })

    test('renders table when topics are selected', () => {

        render(
            <MemoryRouter>
                <CreateLearningElementSolutionTable
                    selectedTopics={mockSelectedTopics}
                    LearningElementsClassification={{}}
                    selectedSolutions={{}}
                    learningElementsWithSolutions={{}}
                    onLearningElementSolutionChange={() => { }}
                />
            </MemoryRouter>
        )

        expect(screen.getByTestId('create-learning-element-solution-table')).toBeInTheDocument()
    })
})