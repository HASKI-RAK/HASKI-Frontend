import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { CreateRemoteTopicsTable } from '@components'
import { RemoteTopics } from '@core'

jest.mock('./CreateRemoteTopicsTable.hooks', () => ({
  useCreateRemoteTopicsTable: jest.fn().mockImplementation(() => ({
    handleTopicChange: jest.fn()
  }))
}))

const mockHandleTopicChange = jest.fn()

const mockSelectedTopics: RemoteTopics[] = [
  {
    topic_lms_id: 1,
    topic_lms_name: 'Topic 1',
    lms_learning_elements: [{ lms_id: 101, lms_learning_element_name: 'Element 1', lms_activity_type: 'Activity' }]
  }
]
const mockRemoteTopics: RemoteTopics[] = [
  {
    topic_lms_id: 1,
    topic_lms_name: 'Topic 1',
    lms_learning_elements: [{ lms_id: 101, lms_learning_element_name: 'Element 2', lms_activity_type: 'Activity' }]
  },
  {
    topic_lms_id: 2,
    topic_lms_name: 'Topic 2',
    lms_learning_elements: [{ lms_id: 103, lms_learning_element_name: 'Element 4', lms_activity_type: 'Activity' }]
  }
]

describe('CreateRemoteTopicsTable', () => {
  it('renders correctly', () => {
    const { container } = render(
      <CreateRemoteTopicsTable
        onTopicChange={mockHandleTopicChange}
        selectedTopics={mockSelectedTopics}
        remoteTopics={mockRemoteTopics}
      />
    )
    expect(container).toBeTruthy()
  })

  it('renders with a child', () => {
    const { getByTestId } = render(
      <CreateRemoteTopicsTable
        onTopicChange={mockHandleTopicChange}
        selectedTopics={mockSelectedTopics}
        remoteTopics={mockRemoteTopics}>
        <div data-testid="child">Child Content</div>
      </CreateRemoteTopicsTable>
    )
    expect(getByTestId('child')).toBeInTheDocument()
  })

  it('selects 2nd available remote topic', async () => {
    const { getByText, getAllByRole } = render(
      <CreateRemoteTopicsTable
        onTopicChange={mockHandleTopicChange}
        selectedTopics={mockSelectedTopics}
        remoteTopics={mockRemoteTopics}>
        <div data-testid="child">Child Content</div>
      </CreateRemoteTopicsTable>
    )
    const topic1 = getAllByRole('checkbox')[0]
    const topic2 = getAllByRole('checkbox')[1]

    await waitFor(() => {
      expect(getByText('Topic 1')).toBeInTheDocument()
      expect(getByText('Topic 2')).toBeInTheDocument()
      expect(topic1).toBeChecked()
    })
    fireEvent.click(topic2)
    await waitFor(() => {
      expect(mockHandleTopicChange).toHaveBeenCalled()
    })
  })
})
