import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LocalNav, { LocalNavProps } from './LocalNav'
import { Topic, LearningElement, LearningPath } from '@services'
import * as router from 'react-router'

const navigate = jest.fn()

describe('LocalNav', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('should render the LocalNav', () => {
    const result = render(<LocalNav />)
    expect(result).toBeTruthy()
  })

  it('should render the LocalNav with loading', () => {
    const result = render(<LocalNav />)
    expect(result).toBeTruthy()
  })

  it('should render the LocalNav with Topic and learningElementPath', () => {
    const exampleLearningElement: LearningElement = {
      activity_type: 'Quiz',
      classification: 'Formative',
      created_at: '2023-04-19T10:30:00.000Z',
      created_by: 'John Doe',
      id: 123,
      last_updated: '2023-04-20T15:45:00.000Z',
      lms_id: 456,
      name: 'Quiz on Chapter 3',
      student_learning_element: null,
      university: 'ABC University'
    }
    const topics: Topic[] = [
      {
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
    ]
    const learningElementPath: LearningPath[] = [
      {
        based_on: 'some-Algorithm',
        calculated_on: 'today',
        course_id: 1,
        id: 1,
        path: [
          {
            id: 1,
            learning_element: exampleLearningElement,
            learning_element_id: 1,
            learning_path_id: 1,
            position: 1,
            recommended: true
          }
        ]
      }
    ]

    const mockUseLearningPath = jest.fn().mockReturnValue({
      loading: false,
      topics: topics,
      learningPaths: learningElementPath
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPath
    }

    const result = render(<LocalNav {...props} />)
    expect(result).toBeTruthy()
  })

})