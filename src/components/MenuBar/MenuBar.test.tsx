import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import MenuBar from './MenuBar'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { Topic } from '../../common/services/topic/RequestResponse'
import { LearningElement, LearningPath } from '../../common/services/learningPath/RequestResponse'

const loading = false
const topics: Topic[] = []
const learningElementPath: LearningPath[] = []

describe('MenuBar', () => {
    it('should return to home when clicked on logo or text', () => {
        const history = createMemoryHistory({ initialEntries: ['/home'] })
        const loading = false
        const topics: Topic[] = []
        const learningElementPath: LearningPath[] = []

        const result = render(
            <Router location={ history.location } navigator={ history }>
                <MenuBar loading={ loading } topics={ topics } learningElementPath={ learningElementPath }/>
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
                created_by: 'dimitri', id: 1,
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
                created_by: 'dimitri', id: 2,
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

        const learningElementPath: LearningPath[] = [{
            based_on: 'some-Algorithm',
            calculated_on: 'today',
            course_id: 1,
            id: 1,
            path: [{
                id: 1,
                learning_element: exampleLearningElement,
                learning_element_id: 1,
                learning_path_id: 1,
                position: 1,
                recommended: true
            }]
        },
            {
                based_on: 'some-Algorithm',
                calculated_on: 'today',
                course_id: 1,
                id: 2,
                path: [{
                    id: 2,
                    learning_element: exampleLearningElement,
                    learning_element_id: 1,
                    learning_path_id: 1,
                    position: 1,
                    recommended: true
                }]
            }]

        const result = render(
            <Router location={ history.location } navigator={ history }>
                <MenuBar loading={ loading } topics={ topics } learningElementPath={ learningElementPath }/>
            </Router>
        )
        // click on Topics button:
        fireEvent.click(result.getAllByText('components.MenuBar.MenuBar.TopicButton')[0])
        expect(result.getByText('Allgemeine Informatik')).toBeInTheDocument()

        // click on subtopic:
        fireEvent.click(result.getAllByText('Quiz on Chapter 3')[0])
        // render is different from browser url. in browser url is /topics/Design%20patterns/Adapter
        expect(history.location.pathname).toEqual(
            '/topics/Allgemeine Informatik/Quiz on Chapter 3'
        )
    })

    test('click on HelpIcon should open popover', () => {
        const history = createMemoryHistory({ initialEntries: ['/home'] })
        const result = render(
            <Router location={ history.location } navigator={ history }>
                <MenuBar loading={ loading } topics={ topics } learningElementPath={ learningElementPath }/>
            </Router>
        )
        // click on HelpIcon:
        fireEvent.click(result.getByTestId('HelpIcon'))
        expect(result.getByTestId('HelpIcon')).toBeInTheDocument()
    })

    test('click on SettingsIcon should open popover', () => {
        const history = createMemoryHistory({ initialEntries: ['/home'] })
        const result = render(
            <Router location={ history.location } navigator={ history }>
                <MenuBar loading={ loading } topics={ topics } learningElementPath={ learningElementPath }/>
            </Router>
        )
        // click on HelpIcon:
        fireEvent.click(result.getByTestId('SettingsIcon'))
        expect(result.getByTestId('SettingsIcon')).toBeInTheDocument()
    })

    test('click on UserIcon should open popover', () => {
        const history = createMemoryHistory({ initialEntries: ['/home'] })
        const result = render(
            <Router location={ history.location } navigator={ history }>
                <MenuBar loading={ loading } topics={ topics } learningElementPath={ learningElementPath }/>
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

        const { getByTestId, queryByTestId } = render(
            <Router location={ history.location } navigator={ history }>
                <MenuBar loading={ loading } topics={ topics } learningElementPath={ learningElementPath }/>
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

        const { getByTestId, queryByTestId } = render(
            <Router location={ history.location } navigator={ history }>
                <MenuBar loading={ loading } topics={ topics } learningElementPath={ learningElementPath }/>
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
})
