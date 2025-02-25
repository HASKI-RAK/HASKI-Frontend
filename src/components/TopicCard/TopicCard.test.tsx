import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-test-renderer'
import TopicCard from './TopicCard'

describe('TopicCard tests', () => {
  const navigate = jest.fn()

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  /*  it('renders without input', async () => {
    const topicCard = render(
      <MemoryRouter>
        <TopicCard />
      </MemoryRouter>
    )

    expect(topicCard).toBeTruthy()
  })*/

  it('renders with empty calculatedTopicProgress and isSmOrDown true', async () => {
    const mockProps = {
      topic: {
        contains_le: true,
        created_at: '2021-09-01T12:00:00.000Z',
        created_by: 'dimitri',
        id: 1,
        is_topic: true,
        last_updated: '2021-09-01T12:00:00.000Z',
        lms_id: 1,
        name: 'test',
        parent_id: 1,
        student_topic: {
          done: false,
          done_at: null,
          id: 1,
          student_id: 1,
          topic_id: 1,
          visits: []
        },
        university: 'HS-KE'
      },
      calculatedTopicProgress: [],
      isSmOrDown: true,
      isCourseCreatorRole: false
    }

    let topicCard
    await act(async () => {
      topicCard = render(
        <MemoryRouter>
          <TopicCard {...mockProps} />
        </MemoryRouter>
      )
    })

    expect(topicCard).toBeTruthy()
  })

  it('renders with input, isSmOrDown false and click button', () => {
    const mockProps = {
      topic: {
        contains_le: true,
        created_at: '2021-09-01T12:00:00.000Z',
        created_by: 'dimitri',
        id: 1,
        is_topic: true,
        last_updated: '2021-09-01T12:00:00.000Z',
        lms_id: 1,
        name: 'test',
        parent_id: 1,
        student_topic: {
          done: false,
          done_at: null,
          id: 1,
          student_id: 1,
          topic_id: 1,
          visits: []
        },
        university: 'HS-KE'
      },
      calculatedTopicProgress: [1, 1],
      isSmOrDown: false,
      isCourseCreatorRole: false
    }

    const { getAllByTestId } = render(
      <MemoryRouter>
        <TopicCard {...mockProps} />
      </MemoryRouter>
    )

    const topicButton = getAllByTestId('Topic-Navigate-Button')[0]
    fireEvent.click(topicButton)

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  test('algorithm settings modal can be opened through menu and closed', () => {
    const mockProps = {
      topic: {
        contains_le: true,
        created_at: '2021-09-01T12:00:00.000Z',
        created_by: 'dimitri',
        id: 1,
        is_topic: true,
        last_updated: '2021-09-01T12:00:00.000Z',
        lms_id: 1,
        name: 'test',
        parent_id: 1,
        student_topic: {
          done: false,
          done_at: null,
          id: 1,
          student_id: 1,
          topic_id: 1,
          visits: []
        },
        university: 'HS-KE'
      },
      calculatedTopicProgress: [1, 1],
      isSmOrDown: false,
      isCourseCreatorRole: false
    }

    const { getAllByTestId, getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <TopicCard {...mockProps} />
      </MemoryRouter>
    )

    const settingsButton = getAllByTestId('TopicSettingsButton')[0]
    fireEvent.click(settingsButton)
    expect(getByTestId('TopicSettingsMenu')).toBeInTheDocument

    const algorithmMenuItem = getByTestId('AlgorithmSettingsItem')
    fireEvent.click(algorithmMenuItem)
    expect(getByTestId('algorithm-settings-modal')).toBeInTheDocument

    const closeButton = getByTestId('algorithm-settings-modal-close-button')
    fireEvent.click(closeButton)
    expect(queryByTestId('algorithm-settings-modal')).toBeNull()
  })

  it('changes the displayed algorithm, after the user changed it', async () => {
    const mockProps = {
      topic: {
        contains_le: true,
        created_at: '2021-09-01T12:00:00.000Z',
        created_by: 'dimitri',
        id: 1,
        is_topic: true,
        last_updated: '2021-09-01T12:00:00.000Z',
        lms_id: 1,
        name: 'test',
        parent_id: 1,
        student_topic: {
          done: false,
          done_at: null,
          id: 1,
          student_id: 1,
          topic_id: 1,
          visits: []
        },
        university: 'HS-KE'
      },
      calculatedTopicProgress: [1, 1],
      isSmOrDown: false,
      isCourseCreatorRole: false
    }

    const { getAllByTestId, getByTestId, queryByText } = render(
      <MemoryRouter>
        <TopicCard {...mockProps} />
      </MemoryRouter>
    )

    const settingsButton = getAllByTestId('TopicSettingsButton')[0]
    fireEvent.click(settingsButton)
    expect(getByTestId('TopicSettingsMenu')).toBeInTheDocument

    const algorithmMenuItem = getByTestId('AlgorithmSettingsItem')
    fireEvent.click(algorithmMenuItem)
    expect(getByTestId('algorithm-settings-modal')).toBeInTheDocument

    const saveButton = getByTestId('algorithm-settings-modal-save-button')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(queryByText('components.TopicCard.learningPath')).toBeInTheDocument
      expect(queryByText('Fixed Order')).toBeInTheDocument
      expect(mockServices.fetchStudentLpLeAlg).toHaveBeenCalledTimes(4)
    })
  })

  it('does not display any algorithm when the fetches fail', async () => {
    const mockProps = {
      topic: {
        contains_le: true,
        created_at: '2021-09-01T12:00:00.000Z',
        created_by: 'dimitri',
        id: 1,
        is_topic: true,
        last_updated: '2021-09-01T12:00:00.000Z',
        lms_id: 1,
        name: 'test',
        parent_id: 1,
        student_topic: {
          done: false,
          done_at: null,
          id: 1,
          student_id: 1,
          topic_id: 1,
          visits: []
        },
        university: 'HS-KE'
      },
      calculatedTopicProgress: [1, 1],
      isSmOrDown: false,
      isCourseCreatorRole: false
    }

    mockServices.fetchStudentLpLeAlg = jest
      .fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockRejectedValueOnce(new Error('Error'))

    mockServices.fetchTeacherLpLeAlg = jest
      .fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockRejectedValueOnce(new Error('Error'))

    const { getAllByTestId, getByTestId, queryByText } = render(
      <MemoryRouter>
        <TopicCard {...mockProps} />
      </MemoryRouter>
    )

    const settingsButton = getAllByTestId('TopicSettingsButton')[0]
    fireEvent.click(settingsButton)
    expect(getByTestId('TopicSettingsMenu')).toBeInTheDocument

    const algorithmMenuItem = getByTestId('AlgorithmSettingsItem')
    fireEvent.click(algorithmMenuItem)
    expect(getByTestId('algorithm-settings-modal')).toBeInTheDocument

    const saveButton = getByTestId('algorithm-settings-modal-save-button')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(queryByText('components.TopicCard.learningPath')).not.toBeInTheDocument
    })
  })
})
