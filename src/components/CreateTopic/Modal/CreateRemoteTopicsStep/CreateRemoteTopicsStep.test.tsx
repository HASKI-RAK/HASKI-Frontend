import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LearningPathTopic, RemoteTopics, Topic } from '@core'
import CreateRemoteTopicsStep from './CreateRemoteTopicsStep'

jest.mock('@components', () => ({
  CreateRemoteTopicsTable: jest.fn(({ children }) => <div data-testid="create-remote-topics-table">{children}</div>),
  ExistingTopicsTable: jest.fn(() => <div data-testid="existing-topics-table"></div>)
}))

describe('[HASKI-REQ-0026] CreateRemoteTopicsStep', () => {
  const mockHandleTopicChange = jest.fn()
  const mockOnNext = jest.fn()

  const mockLearningElement = {
    lms_id: 101,
    lms_learning_element_name: 'Element 1',
    lms_activity_type: 'Activity'
  }
  const exampleTopic1: Topic = {
    contains_le: true,
    created_at: '2024-11-07T12:00:00Z',
    created_by: 'John Doe',
    id: 1,
    is_topic: true,
    last_updated: null,
    lms_id: 101,
    name: 'Introduction to Programming',
    parent_id: null,
    student_topic: {
      done: false,
      done_at: null,
      id: 1001,
      student_id: 5001,
      topic_id: 1,
      visits: ['2024-11-06T14:00:00Z', '2024-11-07T10:30:00Z']
    },
    university: 'Example University'
  }
  const exampleTopic2: Topic = {
    contains_le: true,
    created_at: '2024-11-07T12:00:00Z',
    created_by: 'John Doe',
    id: 2,
    is_topic: true,
    last_updated: null,
    lms_id: 101,
    name: 'Introduction to Programming-2',
    parent_id: null,
    student_topic: {
      done: false,
      done_at: null,
      id: 1001,
      student_id: 5001,
      topic_id: 1,
      visits: ['2024-11-06T14:00:00Z', '2024-11-07T10:30:00Z']
    },
    university: 'Example University'
  }

  const remoteTopics: RemoteTopics[] = [
    { topic_lms_id: 1, topic_lms_name: 'Topic 1', lms_learning_elements: [mockLearningElement] },
    { topic_lms_id: 2, topic_lms_name: 'Topic 2', lms_learning_elements: [mockLearningElement] }
  ]
  const selectedTopics: RemoteTopics[] = []
  const alreadyCreatedTopics: LearningPathTopic = {
    topics: [exampleTopic1, exampleTopic2]
  }

  it('renders CreateRemoteTopicsTable component', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CreateRemoteTopicsStep
          alreadyCreatedTopics={alreadyCreatedTopics}
          selectedTopics={selectedTopics}
          handleTopicChange={mockHandleTopicChange}
          onNext={mockOnNext}
          remoteTopics={remoteTopics}
        />
      </MemoryRouter>
    )

    expect(getByText('components.TableRemoteTopics.title')).toBeInTheDocument()
    expect(getByText('appGlobal.next')).toBeInTheDocument()
    expect(getByText('components.ExistingTopicsTable.title')).toBeInTheDocument()
  })

  it('does not render ExistingTopicsTable when alreadyCreatedTopics is undefined', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <CreateRemoteTopicsStep
          selectedTopics={selectedTopics}
          handleTopicChange={mockHandleTopicChange}
          onNext={mockOnNext}
          remoteTopics={remoteTopics}
        />
      </MemoryRouter>
    )

    expect(queryByTestId('existing-topics-table')).not.toBeInTheDocument()
  })

  it('does not render ExistingTopicsTable when alreadyCreatedTopics.topics is empty', () => {
    const emptyAlreadyCreatedTopics = { topics: [] }
    const { queryByTestId } = render(
      <MemoryRouter>
        <CreateRemoteTopicsStep
          alreadyCreatedTopics={emptyAlreadyCreatedTopics}
          selectedTopics={selectedTopics}
          handleTopicChange={mockHandleTopicChange}
          onNext={mockOnNext}
          remoteTopics={remoteTopics}
        />
      </MemoryRouter>
    )

    expect(queryByTestId('existing-topics-table')).not.toBeInTheDocument()
  })

  it('disables the Next button when no topics are selected', () => {
    render(
      <MemoryRouter>
        <CreateRemoteTopicsStep
          alreadyCreatedTopics={alreadyCreatedTopics}
          selectedTopics={selectedTopics}
          handleTopicChange={mockHandleTopicChange}
          onNext={mockOnNext}
          remoteTopics={remoteTopics}
        />
      </MemoryRouter>
    )

    const nextButton = screen.getByText('appGlobal.next')
    expect(nextButton).toBeDisabled()
  })

  it('enables the Next button when topics are selected', () => {
    render(
      <MemoryRouter>
        <CreateRemoteTopicsStep
          alreadyCreatedTopics={alreadyCreatedTopics}
          selectedTopics={[
            { topic_lms_id: 1, topic_lms_name: 'Topic 1', lms_learning_elements: [mockLearningElement] }
          ]}
          handleTopicChange={mockHandleTopicChange}
          onNext={mockOnNext}
          remoteTopics={remoteTopics}
        />
      </MemoryRouter>
    )

    const nextButton = screen.getByText('appGlobal.next')
    expect(nextButton).toBeEnabled()
    fireEvent.click(nextButton)
    expect(mockOnNext).toHaveBeenCalled()
  })
})
