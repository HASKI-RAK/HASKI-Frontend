import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, RoleContext, RoleContextType } from '@services'
import CreateTopicModal from './CreateTopicModal'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom')
}))

describe('CreateTopicModal', () => {
  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2' })

  const handleCloseCreateTopicModal = jest.fn()
  const handleSetSuccessTopicCreated = jest.fn()

  it('does not render the modal with open false', async () => {
    const { queryByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal handleCloseCreateTopicModal={jest.fn()} />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    // Verify the modal is open and the first step is displayed
    expect(queryByText('appGlobal.topics')).not.toBeInTheDocument()
    expect(queryByText('appGlobal.learningElements')).not.toBeInTheDocument()
    expect(queryByText('appGlobal.classifications')).not.toBeInTheDocument()
    expect(queryByText('appGlobal.algorithms')).not.toBeInTheDocument()
  })

  it('renders the modal with the first step', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={jest.fn()} />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    // Verify the modal is open and the first step is displayed
    expect(getByText('appGlobal.topics')).toBeInTheDocument()
    expect(getByText('appGlobal.learningElements')).toBeInTheDocument()
    expect(getByText('appGlobal.classifications')).toBeInTheDocument()
    expect(getByText('appGlobal.algorithms')).toBeInTheDocument()
  })

  it('closes the modal when close button is clicked', () => {
    const handleCloseCreateTopicModal = jest.fn()
    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={handleCloseCreateTopicModal} />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const closeButton = getByTestId('create-topic-modal-close-button')
    fireEvent.click(closeButton)
    expect(handleCloseCreateTopicModal).toHaveBeenCalled()
  })

  it('displays the next step when Next button is clicked', async () => {
    const handleCloseCreateTopicModal = jest.fn()
    const { getByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={handleCloseCreateTopicModal} />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const nextButton = getByText('appGlobal.topics')
    fireEvent.click(nextButton)

    // Wait for the second step to appear
    await waitFor(() => {
      expect(getByText('appGlobal.learningElements')).toBeInTheDocument()
    })
  })

  it('clicks on back button', async () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={handleCloseCreateTopicModal} />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getAllByRole('checkbox').length).toEqual(4)
      fireEvent.click(getAllByRole('checkbox')[0])
    })
    await waitFor(() => {
      fireEvent.click(getByText('appGlobal.next'))
      expect(getByText('superKnowledge.pdf')).toBeInTheDocument()
      fireEvent.click(getAllByRole('checkbox')[0])
      fireEvent.click(getByText('appGlobal.back'))
    })
    await waitFor(() => {
      expect(getAllByRole('checkbox').length).toEqual(4)
    })
  })

  it('calls handleCreate on submit in the last step', async () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={handleCloseCreateTopicModal} />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getAllByRole('checkbox').length).toEqual(4)
      fireEvent.click(getAllByRole('checkbox')[0])
    })
    await waitFor(() => {
      fireEvent.click(getByText('appGlobal.next'))
      expect(getByText('superKnowledge.pdf')).toBeInTheDocument()
      fireEvent.click(getAllByRole('checkbox')[0])
      fireEvent.click(getByText('appGlobal.next'))
    })

    // open classification menu for the first element
    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    // all 12 possible classifications present select the 11th one
    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[10])
    })

    // select classification for second element
    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[1]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[7])
    })

    // select classification for third element
    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[2]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[6])
    })

    // mark third element as solution
    await waitFor(() => {
      expect(getAllByRole('checkbox').length).toEqual(6)
      fireEvent.click(getAllByRole('checkbox')[5])
    })

    // check if the selected classifications are shown
    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      expect(button).toHaveTextContent('ZF - Summary')
      const button1 = getAllByRole('combobox', { hidden: true })[1]
      expect(button1).toHaveTextContent('ÜB - Exercise')
      const button2 = getAllByRole('combobox', { hidden: true })[2]
      expect(button2).toHaveTextContent('AB - Application Example')
      expect(getByText('appGlobal.next')).toBeEnabled()
      fireEvent.click(getByText('appGlobal.next'))
    })

    // select solution step
    await waitFor(() => {
      const dropdowns = getAllByRole('combobox', { hidden: true })
      expect(dropdowns).toHaveLength(2)
      expect(dropdowns[0]).toHaveTextContent('components.CreateLearningElementSolutionTable.noSolution')
      fireEvent.mouseDown(dropdowns[0])
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(2)
      fireEvent.click(menuItems[1])
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(4)
      fireEvent.click(menuItems[1])
      fireEvent.click(getByText('components.CreateTopicModal.createTopics'))
    })

    await waitFor(() => {
      expect(mockServices.postTopic).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(mockServices.postLearningElement).toHaveBeenCalled()
      expect(mockServices.postLearningPathAlgorithm).toHaveBeenCalled()
      expect(mockServices.postLearningElementSolution).toHaveBeenCalled()
      expect(mockServices.postCalculateLearningPathForAllStudents).toHaveBeenCalled()
    })
  }, 20000)

  it('calls handleCreate on submit in the last step, but calculation fails', async () => {
    mockServices.postCalculateLearningPathForAllStudents.mockImplementationOnce(() => {
      throw new Error('postCalculateLearningPathForAllStudents error')
    })

    const { getByText, getAllByRole, getByTestId, queryByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={handleCloseCreateTopicModal} />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getAllByRole('checkbox').length).toEqual(4)
      fireEvent.click(getAllByRole('checkbox')[0])
    })
    await waitFor(() => {
      fireEvent.click(getByText('appGlobal.next'))
      expect(getByText('superKnowledge.pdf')).toBeInTheDocument()
      fireEvent.click(getAllByRole('checkbox')[0])
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[11])
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[1]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[4])
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[2]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[9])
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      expect(button).toHaveTextContent('RQ - Reflective Quiz')
      const button1 = getAllByRole('combobox', { hidden: true })[1]
      expect(button1).toHaveTextContent('AN - Animation')
      const button2 = getAllByRole('combobox', { hidden: true })[2]
      expect(button2).toHaveTextContent('ZL - Additional Literature')
      expect(getByText('appGlobal.next')).toBeEnabled()
      fireEvent.click(getByText('appGlobal.next'))
    })

    // select solution step with no solutions
    await waitFor(() => {
      const dropdowns = getAllByRole('combobox', { hidden: true })
      expect(dropdowns).toHaveLength(3)
      expect(dropdowns[0]).toHaveTextContent('components.CreateLearningElementSolutionTable.noSolution')
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(4)
      fireEvent.click(menuItems[1])
      fireEvent.click(getByText('components.CreateTopicModal.createTopics'))
    })

    await waitFor(() => {
      expect(mockServices.postTopic).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(mockServices.postLearningElement).toHaveBeenCalled()
      expect(mockServices.postLearningPathAlgorithm).toHaveBeenCalled()
      expect(mockServices.postCalculateLearningPathForAllStudents).toHaveBeenCalled()
      expect(queryByText('components.CreateTopicModal.createTopics')).toBeInTheDocument()
    })

    await waitFor(() => {
      fireEvent.click(getByTestId('create-topic-modal-close-button'))
    })
  }, 20000)

  it('renders empty remoteTopics and alreadyCreatedTopics when getUser API call fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { getByText } = render(
      <MemoryRouter>
        <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={jest.fn()} />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByText('components.TableRemoteTopics.noAdditionalTopics')).toBeInTheDocument()
    })
  })

  it('renders empty remoteTopics and alreadyCreatedTopics when getTopics API call fails', async () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() => {
      throw new Error('getLearningPathTopic error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { getByText } = render(
      <MemoryRouter>
        <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={jest.fn()} />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByText('components.TableRemoteTopics.noAdditionalTopics')).toBeInTheDocument()
    })
  })

  it('renders empty getRemoteTopics and alreadyCreatedTopics when getTopics API call fails', async () => {
    mockServices.fetchRemoteTopics.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { getByText } = render(
      <MemoryRouter>
        <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={jest.fn()} />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByText('components.TableRemoteTopics.noAdditionalTopics')).toBeInTheDocument()
    })
  }, 20000)

  it('calls handleCreate on submit in the last step, but returns without give courseId', async () => {
    mockServices.postCalculateLearningPathForAllStudents.mockImplementationOnce(() => Promise.resolve())
    jest.spyOn(router, 'useParams').mockReturnValue({})

    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={handleCloseCreateTopicModal} />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getAllByRole('checkbox').length).toEqual(4)
      fireEvent.click(getAllByRole('checkbox')[0])
    })
    await waitFor(() => {
      fireEvent.click(getByText('appGlobal.next'))
      expect(getByText('superKnowledge.pdf')).toBeInTheDocument()
      fireEvent.click(getAllByRole('checkbox')[0])
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[1])
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[1]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[4])
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[2]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[8])
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      expect(button).toHaveTextContent('KÜ - Overview')
      const button1 = getAllByRole('combobox', { hidden: true })[1]
      expect(button1).toHaveTextContent('AN - Animation')
      const button2 = getAllByRole('combobox', { hidden: true })[2]
      expect(button2).toHaveTextContent('SE - Self-Assessment Test')
      expect(getByText('appGlobal.next')).toBeEnabled()
      fireEvent.click(getByText('appGlobal.next'))
    })

    // select solution step with no solutions
    await waitFor(() => {
      const dropdowns = getAllByRole('combobox', { hidden: true })
      expect(dropdowns).toHaveLength(3)
      expect(dropdowns[0]).toHaveTextContent('components.CreateLearningElementSolutionTable.noSolution')
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(4)
      fireEvent.click(menuItems[1])
      fireEvent.click(getByText('components.CreateTopicModal.createTopics'))
    })

    await waitFor(() => {
      expect(mockServices.postTopic).not.toHaveBeenCalled()
      expect(handleSetSuccessTopicCreated).not.toHaveBeenCalled()
    })
  }, 20000)

  it('changes topic after elements, classifications and algorithms are set', async () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={handleCloseCreateTopicModal} />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getAllByRole('checkbox').length).toEqual(4)
      fireEvent.click(getAllByRole('checkbox')[0])
    })

    await waitFor(() => {
      fireEvent.click(getByText('appGlobal.next'))
      expect(getByText('superKnowledge.pdf')).toBeInTheDocument()
      fireEvent.click(getAllByRole('checkbox')[0])
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[2])
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[1]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[0])
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[2]
      expect(getAllByRole('combobox', { hidden: true })).toHaveLength(3)
      fireEvent.mouseDown(button)
    })

    await waitFor(() => {
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(12)
      fireEvent.click(menuItems[5])
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      expect(button).toHaveTextContent('FO - Forum')
      const button1 = getAllByRole('combobox', { hidden: true })[1]
      expect(button1).toHaveTextContent('LZ - Learning Objective')
      const button2 = getAllByRole('combobox', { hidden: true })[2]
      expect(button2).toHaveTextContent('BE - Example')
      expect(getByText('appGlobal.next')).toBeEnabled()
      fireEvent.click(getByText('appGlobal.next'))
    })

    // select solution step with no solutions
    await waitFor(() => {
      const dropdowns = getAllByRole('combobox', { hidden: true })
      expect(dropdowns).toHaveLength(3)
      expect(dropdowns[0]).toHaveTextContent('components.CreateLearningElementSolutionTable.noSolution')
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox', { hidden: true })[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option', { hidden: true })
      expect(menuItems).toHaveLength(4)
      fireEvent.click(menuItems[1])
    })

    await waitFor(() => {
      expect(getByText('appGlobal.back')).toBeInTheDocument()
      fireEvent.click(getByText('appGlobal.back'))
    })

    await waitFor(() => {
      expect(getByText('appGlobal.back')).toBeInTheDocument()
      fireEvent.click(getByText('appGlobal.back'))
    })

    await waitFor(() => {
      expect(getByText('appGlobal.back')).toBeInTheDocument()
      fireEvent.click(getByText('appGlobal.back'))
    })

    await waitFor(() => {
      expect(getAllByRole('checkbox').length).toEqual(4)
      fireEvent.click(getAllByRole('checkbox', { hidden: true })[0])
      expect(getAllByRole('checkbox')[0]).not.toBeChecked()
    })
  }, 20000)

  it('renders empty remoteTopics and alreadyCreatedTopics when getUser API call fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { getByText } = render(
      <MemoryRouter>
        <CreateTopicModal openCreateTopicModal={true} handleCloseCreateTopicModal={jest.fn()} />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByText('components.TableRemoteTopics.noAdditionalTopics')).toBeInTheDocument()
    })
  })
})
