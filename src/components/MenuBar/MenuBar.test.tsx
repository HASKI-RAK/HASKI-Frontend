import '@testing-library/jest-dom'
import { fireEvent, getByText, render, waitFor } from '@testing-library/react'
import MenuBar, { MenuBarProps } from './MenuBar'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import * as router from 'react-router'
import { mockServices } from 'jest.setup'
jest.requireActual('i18next')

const navigate = jest.fn()

describe('MenuBar', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('should return to home when clicked on logo or text', () => {
    const { getAllByRole, getAllByText } = render(
      <MemoryRouter>
        <MenuBar />
      </MemoryRouter>
    )

    // Click on the logo:
    fireEvent.click(getAllByRole('img')[0])
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/')

    // Click on the component with text 'HASKI':
    fireEvent.click(getAllByText('HASKI')[0])

    // Assert that useNavigate was called again
    expect(navigate).toHaveBeenCalledTimes(2)
    expect(navigate).toHaveBeenCalledWith('/')
  })

  test('popover is rendered when Topics button is clicked', async () => {
    const props: MenuBarProps = {
      courseSelected: true
    }

    const { getByText, getAllByTestId } = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
    )

    await waitFor(async () => {
      fireEvent.click(getByText('components.MenuBar.TopicButton'))
      await waitFor(() => {
        expect(getAllByTestId('Menubar-Topic-Wirtschaftsinformatik')[0]).toBeInTheDocument()
      })
    })
  })

  test('fetching user when opening Topics throws error ', async () => {
    mockServices.getUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const props: MenuBarProps = {
      courseSelected: true
    }

    const { container, getByText } = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.MenuBar.TopicButton'))
      waitFor(() => {
        expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
      })
    })
  })

  test('fetching user when opening Questionnaire Results', async () => {
    mockServices.getUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const props: MenuBarProps = {
      courseSelected: true
    }

    const { getByTestId } = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByTestId('QuestionnaireResultsIcon'))
    })
  })

  test('fetching topic throws error ', async () => {
    mockServices.getLearningPathTopic.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const props: MenuBarProps = {
      courseSelected: true
    }

    const { container, getByText } = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.MenuBar.TopicButton'))
      waitFor(() => {
        expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
      })
    })
  })

  test('click on HelpIcon should open popover', () => {
    const props: MenuBarProps = {
      courseSelected: false
    }

    const result = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
    )
    // click on HelpIcon:
    fireEvent.click(result.getByTestId('HelpIcon'))
    expect(result.getByTestId('HelpIcon')).toBeInTheDocument()
  })

  test('click on SettingsIcon should open popover', () => {
    const props: MenuBarProps = {
      courseSelected: false
    }

    const result = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
    )
    // click on HelpIcon:
    fireEvent.click(result.getByTestId('SettingsIcon'))
    expect(result.getByTestId('SettingsIcon')).toBeInTheDocument()
  })

  test('click on UserIcon should open popover', () => {
    const props: MenuBarProps = {
      courseSelected: false
    }

    const result = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
    )

    // click on UserIcon:
    fireEvent.click(result.getByTestId('useravatar'))

    expect(result.getAllByTestId('usermenuitem').length).toBeGreaterThan(0)

    // click on first element of popover:
    fireEvent.click(result.getAllByTestId('usermenuitem')[0])
    // TODO 📑: will be implemented in the future. Current menu is mock.
  })

  test('click on Learningtype should open Questionnaire Results Modal', () => {
    const props: MenuBarProps = {
      courseSelected: false
    }

    const result = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
    )

    // click on QuestionnaireResultsIcon:
    fireEvent.click(result.getByTestId('QuestionnaireResultsIcon'))
    expect(result.getByTestId('ILS and ListK Modal')).toBeInTheDocument()

    // click on close button
    fireEvent.click(result.getByTestId('QuestionnaireResultsCloseButton'))
    expect(result.queryByTestId('ILS and ListK Modal')).not.toBeInTheDocument()
  })

  test('clicking logout should close popover', () => {
    const props: MenuBarProps = {
      courseSelected: true
    }

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
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
    const props: MenuBarProps = {
      courseSelected: true
    }

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
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
    const props: MenuBarProps = {
      courseSelected: true
    }

    const { getByText, getAllByTestId } = render(
      <MemoryRouter>
        <MenuBar {...props} />
      </MemoryRouter>
    )

    await waitFor(async () => {
      fireEvent.click(getByText('components.MenuBar.TopicButton'))
      await waitFor(() => {
        expect(getAllByTestId('Menubar-Topic-Wirtschaftsinformatik')[0]).toBeInTheDocument()
        fireEvent.click(getAllByTestId('Menubar-Topic-Wirtschaftsinformatik')[0])
        expect(navigate).toHaveBeenCalledWith('course/undefined/topic/1')
      })
    })
  })

  it('navigates to questionnaire ils-short page', async () => {
    const { getByTestId, getByText } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <MenuBar courseSelected={false} />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    fireEvent.click(getByTestId('useravatar'))
    fireEvent.click(getByTestId('questionnaireILSshort'))
    expect(getByTestId('Questions Modal')).toBeInTheDocument()
    expect(
      getByText('components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-9')
    ).toBeInTheDocument()
  })

  it('navigates to questionnaire ils-long page', async () => {
    const { getByTestId, getByText } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <MenuBar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    fireEvent.click(getByTestId('useravatar'))
    fireEvent.click(getByTestId('questionnaireILS'))
    expect(getByTestId('Questions Modal')).toBeInTheDocument()
    expect(
      getByText('components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-1')
    ).toBeInTheDocument()
  })

  it('navigates to questionnaire listk page', async () => {
    const { getByTestId, getByText } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <MenuBar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    fireEvent.click(getByTestId('useravatar'))
    fireEvent.click(getByTestId('questionnaireListk'))
    expect(getByTestId('Questions Modal')).toBeInTheDocument()
    expect(
      getByText('components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-1')
    ).toBeInTheDocument()
  })

  it('navigates to logout page', async () => {
    const { getAllByText, getByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <MenuBar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    fireEvent.click(getByTestId('useravatar'))
    fireEvent.click(getAllByText('components.MenuBar.Profile.Logout')[0])
    expect(navigate).toHaveBeenCalledWith('/login')
  })
})
