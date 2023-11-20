import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import MenuBar, { MenuBarProps } from './MenuBar'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import * as router from 'react-router'
import { mockServices } from 'jest.setup'
import { act } from 'react-dom/test-utils'
jest.requireActual('i18next')

const navigate = jest.fn()

describe('MenuBar', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  test('ils-short can be closed after sending answers', async () => {
    const { getByTestId, getByText } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <MenuBar courseSelected={false} />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    fireEvent.click(getByTestId('useravatar'))
    fireEvent.click(getByTestId('questionnaireILSshort'))

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    const backButton = getByTestId('backButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()
    expect(getByTestId('sendButtonILSQuestionnaire')).toBeDisabled()

    for (let i = 0; i < 6; i++) {
      const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton1)

      const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton2)

      const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton3)

      const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton4)

      expect(RadioButton1.checked).toBe(true)
      expect(RadioButton2.checked).toBe(true)
      expect(RadioButton3.checked).toBe(true)
      expect(RadioButton4.checked).toBe(true)

      if (i < 5) {
        fireEvent.click(nextButton)
      } else {
        const sendButton = getByTestId('sendButtonILSQuestionnaire')
        expect(sendButton).toBeEnabled()
        await act(async () => {
          fireEvent.click(sendButton)
        })
        expect(getByTestId('sendButtonILSQuestionnaire')).toBeDisabled()
        expect(getByTestId('QuestionnaireQuestionsModal-Close-Button')).toBeInTheDocument()
        fireEvent.click(getByTestId('QuestionnaireQuestionsModal-Close-Button'))
      }
    }
  }, 20000)

  // If only the describe runs, the test passes without problems. Running all tests in jest, this test times out.
  // Adding a bigger timeout solved the problem
  test('ils-long can be closed after sending answers', async () => {
    const { getByTestId, getByText } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <MenuBar courseSelected={false} />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    fireEvent.click(getByTestId('useravatar'))
    fireEvent.click(getByTestId('questionnaireILS'))

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    const backButton = getByTestId('backButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()

    for (let i = 0; i < 11; i++) {
      const RadioButton1 = getByTestId('ilsLongQuestionnaireILSButtonGroup1').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton1)

      const RadioButton2 = getByTestId('ilsLongQuestionnaireILSButtonGroup2').querySelectorAll(
        'input[type="radio"]'
      )[1] as HTMLInputElement
      fireEvent.click(RadioButton2)

      const RadioButton3 = getByTestId('ilsLongQuestionnaireILSButtonGroup3').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton3)

      const RadioButton4 = getByTestId('ilsLongQuestionnaireILSButtonGroup4').querySelectorAll(
        'input[type="radio"]'
      )[1] as HTMLInputElement
      fireEvent.click(RadioButton4)

      expect(RadioButton1.checked).toBe(true)
      expect(RadioButton2.checked).toBe(true)
      expect(RadioButton3.checked).toBe(true)
      expect(RadioButton4.checked).toBe(true)

      if (i < 10) {
        fireEvent.click(nextButton)
      } else {
        const sendButton = getByTestId('sendButtonILSQuestionnaire')
        expect(sendButton).toBeEnabled()
        await act(async () => {
          fireEvent.click(sendButton)
        })
        expect(getByTestId('sendButtonILSQuestionnaire')).toBeDisabled()
        expect(getByTestId('QuestionnaireQuestionsModal-Close-Button')).toBeInTheDocument()
        fireEvent.click(getByTestId('QuestionnaireQuestionsModal-Close-Button'))
      }
    }
  }, 20000)

  test('listk can be closed after sending answers', async () => {
    const { getByTestId, getByText } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <MenuBar courseSelected={false} />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    fireEvent.click(getByTestId('useravatar'))
    fireEvent.click(getByTestId('questionnaireListk'))

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableListKQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonListKQuestionnaire')
    const backButton = getByTestId('backButtonListKQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()

    for (let i = 0; i < 8; i++) {
      if (i < 7) {
        const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton1)

        const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton2)

        const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton3)

        const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton4)

        const RadioButton5 = getByTestId('ListKQuestionnaireButtonGroup5').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton5)

        expect(RadioButton1.checked).toBe(true)
        expect(RadioButton2.checked).toBe(true)
        expect(RadioButton3.checked).toBe(true)
        expect(RadioButton4.checked).toBe(true)
        expect(RadioButton5.checked).toBe(true)
        fireEvent.click(nextButton)
      }
      //Last step only has 4 radio buttongroups
      else {
        const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton1)

        const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton2)

        const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton3)

        const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton4)

        expect(RadioButton1.checked).toBe(true)
        expect(RadioButton2.checked).toBe(true)
        expect(RadioButton3.checked).toBe(true)
        expect(RadioButton4.checked).toBe(true)

        const sendButton = getByTestId('sendButtonListKQuestionnaire')
        expect(sendButton).toBeEnabled()
        await act(async () => {
          fireEvent.click(sendButton)
        })
        expect(getByTestId('sendButtonListKQuestionnaire')).toBeDisabled()
        expect(getByTestId('QuestionnaireQuestionsModal-Close-Button')).toBeInTheDocument()
        fireEvent.click(getByTestId('QuestionnaireQuestionsModal-Close-Button'))
      }
    }
  }, 30000)

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
      fireEvent.click(getByText('components.MenuBar.topicButton'))
      await waitFor(() => {
        expect(getAllByTestId('Menubar-Topic-Wirtschaftsinformatik')[0]).toBeInTheDocument()
      })
    })
  })

  test('fetching user when opening Topics throws error ', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
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
      fireEvent.click(getByText('components.MenuBar.topicButton'))
      waitFor(() => {
        expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
      })
    })
  })

  test('fetching user when opening Questionnaire Results', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
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
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() => {
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
      fireEvent.click(getByText('components.MenuBar.topicButton'))
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
      fireEvent.click(getByText('components.MenuBar.topicButton'))
      await waitFor(() => {
        expect(getAllByTestId('Menubar-Topic-Wirtschaftsinformatik')[0]).toBeInTheDocument()
        fireEvent.click(getAllByTestId('Menubar-Topic-Wirtschaftsinformatik')[0])
        expect(navigate).toHaveBeenCalledWith('course/undefined/topic/1')
      })
    })
  })

  it('opens the ils-short questionnaire', async () => {
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
    expect(getByText('components.TableILSQuestions.introduction')).toBeInTheDocument()
  })

  it('closes the ils-short questionnaire', async () => {
    window.confirm = jest.fn(() => true) // always click 'yes'

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
    expect(getByText('components.TableILSQuestions.introduction')).toBeInTheDocument()

    expect(getByTestId('QuestionnaireQuestionsModal-Close-Button')).toBeInTheDocument()
    fireEvent.click(getByTestId('QuestionnaireQuestionsModal-Close-Button'))
  })

  it('opens the questionnaire ils-long questionnaire', async () => {
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
    expect(getByText('components.TableILSQuestions.introduction')).toBeInTheDocument()
  })

  it('close the ils-long questionnaire', async () => {
    window.confirm = jest.fn(() => true) // always click 'yes'

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
    expect(getByText('components.TableILSQuestions.introduction')).toBeInTheDocument()

    expect(getByTestId('QuestionnaireQuestionsModal-Close-Button')).toBeInTheDocument()
    fireEvent.click(getByTestId('QuestionnaireQuestionsModal-Close-Button'))
  })

  it('open the listk questionnaire', async () => {
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
    expect(getByText('components.TableListKQuestions.introduction')).toBeInTheDocument()
  })

  it('close the listk questionnaire', async () => {
    window.confirm = jest.fn(() => true) // always click 'yes'

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
    expect(getByText('components.TableListKQuestions.introduction')).toBeInTheDocument()

    expect(getByTestId('QuestionnaireQuestionsModal-Close-Button')).toBeInTheDocument()
    fireEvent.click(getByTestId('QuestionnaireQuestionsModal-Close-Button'))
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
    fireEvent.click(getAllByText('components.MenuBar.profileLogout')[0])
    expect(navigate).toHaveBeenCalledWith('/login')
  })
})
