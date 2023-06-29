import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import MenuBar, { MenuBarProps } from './MenuBar'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { Topic, LearningElement, LearningPath, AuthContext } from '@services'

const topics: Topic[] = []
const learningElementPath: LearningPath[] = []

describe('MenuBar', () => {
  it('should return to home when clicked on logo or text', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const result = render(
      <Router location={history.location} navigator={history}>
        <MenuBar />
      </Router>
    )
    // click on img:
    fireEvent.click(result.getAllByRole('img')[0])
    expect(history.location.pathname).toEqual('/')

    history.push('/home')

    // click on component a with text HASKI:
    fireEvent.click(result.getAllByText('HASKI')[0])
    expect(history.location.pathname).toEqual('/')
  })

  test('popover is rendered when Topics button is clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const exampleLearningElement1: LearningElement = {
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

    const exampleLearningElement2: LearningElement = {
      activity_type: 'Quiz',
      classification: 'Formative',
      created_at: '2023-04-19T10:30:00.000Z',
      created_by: 'John Doe',
      id: 123,
      last_updated: '2023-04-20T15:45:00.000Z',
      lms_id: 456,
      name: 'Quiz on Chapter 5',
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
        name: 'Allgemeine Informatik',
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
        name: 'Zustand',
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
            learning_element: exampleLearningElement1,
            learning_element_id: 1,
            learning_path_id: 1,
            position: 1,
            recommended: true
          }
        ]
      },
      {
        based_on: 'some-Algorithm',
        calculated_on: 'today',
        course_id: 1,
        id: 2,
        path: [
          {
            id: 2,
            learning_element: exampleLearningElement2,
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

    const props: MenuBarProps = {
      useLearningPathTopic: mockUseLearningPath
    }

    const result = render(
      <Router location={history.location} navigator={history}>
        <MenuBar {...props} />
      </Router>
    )
    // click on Topics button:
    fireEvent.click(result.getAllByText('components.MenuBar.TopicButton')[0])
    expect(result.getByText('Allgemeine Informatik')).toBeInTheDocument()
  })

  test('click on HelpIcon should open popover', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const mockUseLearningPath = jest.fn().mockReturnValue({
      loading: false,
      topics: topics,
      learningPaths: learningElementPath
    })

    const props: MenuBarProps = {
      useLearningPathTopic: mockUseLearningPath
    }

    const result = render(
      <Router location={history.location} navigator={history}>
        <MenuBar {...props} />
      </Router>
    )
    // click on HelpIcon:
    fireEvent.click(result.getByTestId('HelpIcon'))
    expect(result.getByTestId('HelpIcon')).toBeInTheDocument()
  })

  test('click on SettingsIcon should open popover', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const mockUseLearningPath = jest.fn().mockReturnValue({
      loading: false,
      topics: topics,
      learningPaths: learningElementPath
    })

    const props: MenuBarProps = {
      useLearningPathTopic: mockUseLearningPath
    }

    const result = render(
      <Router location={history.location} navigator={history}>
        <MenuBar {...props} />
      </Router>
    )
    // click on HelpIcon:
    fireEvent.click(result.getByTestId('SettingsIcon'))
    expect(result.getByTestId('SettingsIcon')).toBeInTheDocument()
  })

  test('click on UserIcon should open popover', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const mockUseLearningPath = jest.fn().mockReturnValue({
      loading: false,
      topics: topics,
      learningPaths: learningElementPath
    })

    const props: MenuBarProps = {
      useLearningPathTopic: mockUseLearningPath
    }

    const result = render(
      <Router location={history.location} navigator={history}>
        <MenuBar {...props} />
      </Router>
    )

    // click on UserIcon:
    fireEvent.click(result.getByTestId('useravatar'))

    expect(result.getAllByTestId('usermenuitem').length).toBeGreaterThan(0)

    // click on first element of popover:
    fireEvent.click(result.getAllByTestId('usermenuitem')[0])
    // TODO 📑: will be implemented in the future. Current menu is mock.
  })

  test('clicking logout should close popover', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const mockUseLearningPath = jest.fn().mockReturnValue({
      loading: false,
      topics: topics,
      learningPaths: learningElementPath
    })

    const props: MenuBarProps = {
      useLearningPathTopic: mockUseLearningPath
    }

    const { getByTestId, queryByTestId } = render(
      <Router location={history.location} navigator={history}>
        <MenuBar {...props} />
      </Router>
    )

    const userAvatarButton = getByTestId('useravatar')

    // Open the user menu
    fireEvent.click(userAvatarButton)

    // Check that the menu is open
    const userMenuItem = getByTestId('usermenuitem')
    expect(userMenuItem).toBeInTheDocument()

    // Click the logout menu item to trigger onClose
    fireEvent.click(userMenuItem)

    // Check that the menu is closed
    const userMenu = queryByTestId('menu-appbar')
    expect(userMenu).toBeNull()
  })

  test('clicking outside of Menu should close popover', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const mockUseLearningPath = jest.fn().mockReturnValue({
      loading: false,
      topics: topics,
      learningPaths: learningElementPath
    })

    const props: MenuBarProps = {
      useLearningPathTopic: mockUseLearningPath
    }

    const { getByTestId, queryByTestId } = render(
      <Router location={history.location} navigator={history}>
        <MenuBar {...props} />
      </Router>
    )

    // get the user avatar button
    const userAvatarButton = getByTestId('useravatar')

    // simulate click on the user avatar button to open the menu
    fireEvent.click(userAvatarButton)

    const userMenuItem = getByTestId('usermenuitem')
    expect(userMenuItem).toBeInTheDocument()

    // simulate click outside of the menu to close it
    fireEvent.mouseDown(document.body)
    const userMenu = queryByTestId('menu-appbar')
    expect(userMenu).toBeNull()
  })


  it('should set anchorElTopics to null', async () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const exampleLearningElement1: LearningElement = {
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

    const exampleLearningElement2: LearningElement = {
      activity_type: 'Quiz',
      classification: 'Formative',
      created_at: '2023-04-19T10:30:00.000Z',
      created_by: 'John Doe',
      id: 123,
      last_updated: '2023-04-20T15:45:00.000Z',
      lms_id: 456,
      name: 'Quiz on Chapter 5',
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
        name: 'Allgemeine Informatik',
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
        name: 'Zustand',
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
            learning_element: exampleLearningElement1,
            learning_element_id: 1,
            learning_path_id: 1,
            position: 1,
            recommended: true
          }
        ]
      },
      {
        based_on: 'some-Algorithm',
        calculated_on: 'today',
        course_id: 1,
        id: 2,
        path: [
          {
            id: 2,
            learning_element: exampleLearningElement2,
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

    const props: MenuBarProps = {
      useLearningPathTopic: mockUseLearningPath
    }

    const {getAllByText, getByText} = render(
        <Router location={history.location} navigator={history}>
          <MenuBar {...props} />
        </Router>
    )
    // click on Topics button:
    fireEvent.click(getAllByText('components.MenuBar.TopicButton')[0])
    expect(getByText('Allgemeine Informatik')).toBeInTheDocument()

    fireEvent.click(getAllByText('Allgemeine Informatik')[0])
    expect(history.location.pathname).toBe('/course/undefined/topic/1')
    //fireEvent.keyDown(getAllByText('components.MenuBar.TopicButton')[0], {key: "esc",})
    //fireEvent.click(getAllByText('components.MenuBar.TopicButton')[0])

    //fireEvent.click(document.body); // Simulate clicking outside the Popover
    //await userEvent.keyboard('{esc}');

    //await waitFor(() => expect(result.getByText('Allgemeine Informatik')).not.toBeInTheDocument());
  });


  it('navigates to logout page', async () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const {getAllByText, getByTestId} = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(),logout: jest.fn() }}>
        <Router location={history.location} navigator={history}>
          <MenuBar />
        </Router>
      </AuthContext.Provider>
    )
    // click on Topics button:

    fireEvent.click(getByTestId('useravatar'))
    fireEvent.click(getAllByText('components.MenuBar.Profile.Logout')[0])
    expect(history.location.pathname).toEqual('/login')
  })
})
