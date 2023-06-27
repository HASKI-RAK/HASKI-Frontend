import '@testing-library/jest-dom'
import {fireEvent, render} from '@testing-library/react'
import LocalNav, { LocalNavProps } from './LocalNav'
import * as router from 'react-router'
import {LearningPathElement, LearningPathLearningElement, Topic, LearningElement} from "@core";
import StudentLearningElement from "../../common/core/StudentLearningElement/StudentLearningElement";
import {createMemoryHistory} from "history";
import { Router } from 'react-router-dom'

const navigate = jest.fn()

describe('LocalNav', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('should render the LocalNav', () => {
    const result = render(<LocalNav />)
    expect(result).toBeTruthy()
  })

  it('should render the LocalNav with Topic and learningElementPath loading Topics', () => {

    const mockStudentLearningElement: StudentLearningElement = {
      id: 1,
      student_id: 1,
      learning_element_id: 1,
      done: false,
      done_at: "null",
    }

    const mockLearningElement: LearningElement = {
      id: 1,
      lms_id: 1,
      activity_type: "Quiz",
      classification: "Formative",
      name: "Quiz on Chapter 3",
      university: "HS-KE",
      created_by: "John Doe",
      created_at: "2023-04-19T10:30:00.000Z",
      last_updated: "2023-04-20T15:45:00.000Z",
      student_learning_element: mockStudentLearningElement
    }

    const mockLearningPathLearningElement: LearningPathLearningElement[] = [
      {
        id: 1,
        learning_element_id: 1,
        learning_path_id: 1,
        recommended: true,
        position: 1,
        learning_element: mockLearningElement
      }
    ]

    const mockLearningPathElement: LearningPathElement = {
      id: 1,
      course_id: 1,
      based_on: "some-Algorithm",
      calculated_on: "today",
      path: mockLearningPathLearningElement
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
      },
      {
        contains_le: true,
        created_at: '2021-09-01T12:00:00.000Z',
        created_by: 'dimitri',
        id: 2,
        is_topic: true,
        last_updated: '2021-09-01T12:00:00.000Z',
        lms_id: 1,
        name: 'test2',
        parent_id: 1,
        student_topic: {
          done: false,
          done_at: null,
          id: 2,
          student_id: 1,
          topic_id: 1,
          visits: []
        },
        university: 'HS-KE'
      }
    ]


    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: true,
      topics: topics,
    })

    const mockUseLearningPathElement = jest.fn().mockReturnValue({
      loadingElements: true,
      learningPaths: mockLearningPathElement,
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic,
      useLearningPathElement: mockUseLearningPathElement
    }

    const {getAllByTestId} = render(<LocalNav {...props} />)

    const loadingSkeletons = getAllByTestId(/LocalNav-Skeleton-Topic/);
    expect(loadingSkeletons).toHaveLength(3);

  })

  it('should render the LocalNav with Topic and learningElementPath loading Elements', () => {

    const mockStudentLearningElement: StudentLearningElement = {
      id: 1,
      student_id: 1,
      learning_element_id: 1,
      done: false,
      done_at: "null",
    }

    const mockLearningElement: LearningElement = {
      id: 1,
      lms_id: 1,
      activity_type: "Quiz",
      classification: "Formative",
      name: "Quiz on Chapter 3",
      university: "HS-KE",
      created_by: "John Doe",
      created_at: "2023-04-19T10:30:00.000Z",
      last_updated: "2023-04-20T15:45:00.000Z",
      student_learning_element: mockStudentLearningElement
    }

    const mockLearningPathLearningElement: LearningPathLearningElement[] = [
      {
        id: 1,
        learning_element_id: 1,
        learning_path_id: 1,
        recommended: true,
        position: 1,
        learning_element: mockLearningElement
      }
    ]

    const mockLearningPathElement: LearningPathElement = {
      id: 1,
      course_id: 1,
      based_on: "some-Algorithm",
      calculated_on: "today",
      path: mockLearningPathLearningElement
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
      },
      {
        contains_le: true,
        created_at: '2021-09-01T12:00:00.000Z',
        created_by: 'dimitri',
        id: 2,
        is_topic: true,
        last_updated: '2021-09-01T12:00:00.000Z',
        lms_id: 1,
        name: 'test2',
        parent_id: 1,
        student_topic: {
          done: false,
          done_at: null,
          id: 2,
          student_id: 1,
          topic_id: 1,
          visits: []
        },
        university: 'HS-KE'
      }
    ]


    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: topics,
    })

    const mockUseLearningPathElement = jest.fn().mockReturnValue({
      loadingElements: true,
      learningPaths: mockLearningPathElement,
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic,
      useLearningPathElement: mockUseLearningPathElement
    }

    const {getAllByTestId} = render(<LocalNav {...props} />)

    const topicAccordions = getAllByTestId(/topic-Accordion/);
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(topicAccordions[0]);
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('true');

    const loadingSkeletons = getAllByTestId(/LocalNav-Skeleton-Element/);
    expect(loadingSkeletons).toHaveLength(1);

    fireEvent.click(topicAccordions[0]);
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('false');

  })

  it('should render the LocalNav with Topic and learningElementPath rendered', () => {

    const mockStudentLearningElement: StudentLearningElement = {
      id: 1,
      student_id: 1,
      learning_element_id: 1,
      done: false,
      done_at: "null",
    }

    const mockLearningElement: LearningElement = {
      id: 1,
      lms_id: 1,
      activity_type: "Quiz",
      classification: "Formative",
      name: "Quiz on Chapter 3",
      university: "HS-KE",
      created_by: "John Doe",
      created_at: "2023-04-19T10:30:00.000Z",
      last_updated: "2023-04-20T15:45:00.000Z",
      student_learning_element: mockStudentLearningElement
    }

    const mockLearningPathLearningElement: LearningPathLearningElement[] = [
      {
        id: 1,
        learning_element_id: 1,
        learning_path_id: 1,
        recommended: true,
        position: 1,
        learning_element: mockLearningElement
      }
    ]

    const mockLearningPathElement: LearningPathElement = {
      id: 1,
      course_id: 1,
      based_on: "some-Algorithm",
      calculated_on: "today",
      path: mockLearningPathLearningElement
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
      },
      {
        contains_le: true,
        created_at: '2021-09-01T12:00:00.000Z',
        created_by: 'dimitri',
        id: 2,
        is_topic: true,
        last_updated: '2021-09-01T12:00:00.000Z',
        lms_id: 1,
        name: 'test2',
        parent_id: 1,
        student_topic: {
          done: false,
          done_at: null,
          id: 2,
          student_id: 1,
          topic_id: 1,
          visits: []
        },
        university: 'HS-KE'
      }
    ]


    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: topics,
    })

    const mockUseLearningPathElement = jest.fn().mockReturnValue({
      loadingElements: false,
      learningPaths: mockLearningPathElement,
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic,
      useLearningPathElement: mockUseLearningPathElement
    }

    const result = render(<LocalNav {...props} />)
    expect(result).toBeTruthy()
  })

  it('should render the LocalNav with Topic and learningElementPath clicked (opened)', () => {

    const mockStudentLearningElement: StudentLearningElement = {
      id: 1,
      student_id: 1,
      learning_element_id: 1,
      done: false,
      done_at: "null",
    }

    const mockLearningElement: LearningElement = {
      id: 1,
      lms_id: 1,
      activity_type: "Quiz",
      classification: "Formative",
      name: "Quiz on Chapter 3",
      university: "HS-KE",
      created_by: "John Doe",
      created_at: "2023-04-19T10:30:00.000Z",
      last_updated: "2023-04-20T15:45:00.000Z",
      student_learning_element: mockStudentLearningElement
    }

    const mockLearningPathLearningElement: LearningPathLearningElement[] = [
      {
        id: 1,
        learning_element_id: 1,
        learning_path_id: 1,
        recommended: true,
        position: 1,
        learning_element: mockLearningElement
      }
    ]

    const mockLearningPathElement: LearningPathElement = {
      id: 1,
      course_id: 1,
      based_on: "some-Algorithm",
      calculated_on: "today",
      path: mockLearningPathLearningElement
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
      },
      {
        contains_le: true,
        created_at: '2021-09-01T12:00:00.000Z',
        created_by: 'dimitri',
        id: 2,
        is_topic: true,
        last_updated: '2021-09-01T12:00:00.000Z',
        lms_id: 1,
        name: 'test2',
        parent_id: 1,
        student_topic: {
          done: false,
          done_at: null,
          id: 2,
          student_id: 1,
          topic_id: 1,
          visits: []
        },
        university: 'HS-KE'
      }
    ]


    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: topics,
    })

    const mockUseLearningPathElement = jest.fn().mockReturnValue({
      loadingElements: false,
      learningPaths: mockLearningPathElement,
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic,
      useLearningPathElement: mockUseLearningPathElement
    }

    const {getAllByTestId} = render(<LocalNav {...props} />)

    const topicAccordions = getAllByTestId(/topic-Accordion/);
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(topicAccordions[0]);
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(topicAccordions[0]);
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('false');
  })

  it('should render the LocalNav with Topic and learningElementPath clicked on Element', () => {

    const mockStudentLearningElement: StudentLearningElement = {
      id: 1,
      student_id: 1,
      learning_element_id: 1,
      done: false,
      done_at: "null",
    }

    const mockLearningElement: LearningElement = {
      id: 1,
      lms_id: 1,
      activity_type: "Quiz",
      classification: "Formative",
      name: "Quiz on Chapter 3",
      university: "HS-KE",
      created_by: "John Doe",
      created_at: "2023-04-19T10:30:00.000Z",
      last_updated: "2023-04-20T15:45:00.000Z",
      student_learning_element: mockStudentLearningElement
    }

    const mockLearningPathLearningElement: LearningPathLearningElement[] = [
      {
        id: 1,
        learning_element_id: 1,
        learning_path_id: 1,
        recommended: true,
        position: 1,
        learning_element: mockLearningElement
      }
    ]

    const mockLearningPathElement: LearningPathElement = {
      id: 1,
      course_id: 1,
      based_on: "some-Algorithm",
      calculated_on: "today",
      path: mockLearningPathLearningElement
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
      },
      {
        contains_le: true,
        created_at: '2021-09-01T12:00:00.000Z',
        created_by: 'dimitri',
        id: 2,
        is_topic: true,
        last_updated: '2021-09-01T12:00:00.000Z',
        lms_id: 1,
        name: 'test2',
        parent_id: 1,
        student_topic: {
          done: false,
          done_at: null,
          id: 2,
          student_id: 1,
          topic_id: 1,
          visits: []
        },
        university: 'HS-KE'
      }
    ]


    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: topics,
    })

    const mockUseLearningPathElement = jest.fn().mockReturnValue({
      loadingElements: false,
      learningPaths: mockLearningPathElement,
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic,
      useLearningPathElement: mockUseLearningPathElement
    }

    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const {getByTestId, getAllByTestId} = render(
        <Router location={history.location} navigator={history}>
          <LocalNav {...props} />
        </Router>)

    const topicAccordions = getAllByTestId(/topic-Accordion/);
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(topicAccordions[0]);
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(getByTestId("Quiz on Chapter 3"))
  })

})