import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import { LearningPathTopic } from '@core'
import ExistingTopicsTable from './ExistingTopicsTable'

// Mock Data
const mockExistingTopics: LearningPathTopic = {
  topics: [
    {
      contains_le: true,
      created_at: '2023-01-01',
      created_by: 'User1',
      id: 1,
      is_topic: true,
      last_updated: '2023-01-02',
      lms_id: 101,
      name: 'Topic 1',
      parent_id: null,
      student_topic: {
        done: false,
        done_at: null,
        id: 1,
        student_id: 1,
        topic_id: 1,
        visits: []
      },
      university: 'University 1'
    },
    {
      contains_le: false,
      created_at: '2023-01-01',
      created_by: 'User2',
      id: 2,
      is_topic: true,
      last_updated: '2023-01-02',
      lms_id: 102,
      name: 'Topic 2',
      parent_id: null,
      student_topic: {
        done: true,
        done_at: '2023-01-03',
        id: 2,
        student_id: 2,
        topic_id: 2,
        visits: []
      },
      university: 'University 2'
    }
  ]
}

describe('ExistingTopicsTable', () => {
  it('renders title', () => {
    const { getByText } = render(<ExistingTopicsTable existingTopics={mockExistingTopics} />)
    expect(getByText('components.ExistingTopicsTable.title')).toBeInTheDocument()
  })

  it('renders list of existing topics with checkboxes', () => {
    const { getByText, getAllByRole } = render(<ExistingTopicsTable existingTopics={mockExistingTopics} />)

    // Verify topics are rendered
    mockExistingTopics.topics.forEach((topic) => {
      expect(getByText(topic.name)).toBeInTheDocument()
    })

    // Verify checkboxes are checked and disabled
    const checkboxes = getAllByRole('checkbox')
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked()
      expect(checkbox).toBeDisabled()
    })
  })

  it('renders correct number of checkboxes', () => {
    const { getAllByRole } = render(<ExistingTopicsTable existingTopics={mockExistingTopics} />)

    // Check if number of checkboxes matches the number of topics
    const checkboxes = getAllByRole('checkbox')
    expect(checkboxes.length).toBe(mockExistingTopics.topics.length)
  })
})
