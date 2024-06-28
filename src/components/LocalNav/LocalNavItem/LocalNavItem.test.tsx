import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { Topic } from '@core'
import LocalNavItem from './LocalNavItem'

describe('LocalNavItem tests', () => {
  const navigate = jest.fn()

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  test('LocalNavItem renders correctly without input', () => {
    const localNavItem = render(
      <MemoryRouter>
        <LocalNavItem />
      </MemoryRouter>
    )

    expect(localNavItem).toBeTruthy()
  })

  test('LocalNavItem renders correctly with input and click on button', () => {
    const topic: Topic = {
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
    }

    const { getByRole } = render(
      <MemoryRouter>
        <LocalNavItem
          topic={topic}
          courseId="1"
          isProgressLoading={false}
          key="key"
          topicId="1"
          topicProgress={[1, 2]}
        />
      </MemoryRouter>
    )

    fireEvent.click(getByRole('button'))
    expect(navigate).toHaveBeenCalledWith('/course/1/topic/1')
  })
})
