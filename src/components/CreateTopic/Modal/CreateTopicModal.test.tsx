import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import React from 'react'
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
            <CreateTopicModal
              successTopicCreated={false}
              setSuccessTopicCreated={jest.fn()}
              handleCloseCreateTopicModal={jest.fn()}
            />
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
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={jest.fn()}
              handleCloseCreateTopicModal={jest.fn()}
            />
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
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={jest.fn()}
              handleCloseCreateTopicModal={handleCloseCreateTopicModal}
            />
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
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={jest.fn()}
              handleCloseCreateTopicModal={handleCloseCreateTopicModal}
            />
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
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={handleSetSuccessTopicCreated}
              handleCloseCreateTopicModal={handleCloseCreateTopicModal}
            />
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
    const { getByText, getAllByRole, getByTestId, queryByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={handleSetSuccessTopicCreated}
              handleCloseCreateTopicModal={handleCloseCreateTopicModal}
            />
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
      const button = getAllByRole('combobox')[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option')
      expect(menuItems).toHaveLength(13)
      fireEvent.click(getAllByRole('option')[1])
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox')[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option')
      expect(menuItems).toHaveLength(5)
      fireEvent.click(getAllByRole('option')[1])
      fireEvent.click(getByText('components.CreateTopicModal.createTopics'))
    })

    await waitFor(() => {
      expect(mockServices.postTopic).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(mockServices.postLearningElement).toHaveBeenCalled()
      expect(mockServices.postLearningPathAlgorithm).toHaveBeenCalled()
      expect(mockServices.postCalculateLearningPathForAllStudents).toHaveBeenCalled()
      expect(handleSetSuccessTopicCreated).toHaveBeenCalledWith(true)
      expect(queryByText('components.CreateTopicModal.createTopics')).toBeInTheDocument()
    })

    await waitFor(() => {
      fireEvent.click(getByTestId('create-topic-modal-close-button'))
    })
  })

  it('calls handleCreate on submit in the last step, but calculation fails', async () => {
    mockServices.postCalculateLearningPathForAllStudents.mockImplementationOnce(() => Promise.resolve())

    const { getByText, getAllByRole, getByTestId, queryByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={handleSetSuccessTopicCreated}
              handleCloseCreateTopicModal={handleCloseCreateTopicModal}
            />
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
      const button = getAllByRole('combobox')[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option')
      expect(menuItems).toHaveLength(13)
      fireEvent.click(getAllByRole('option')[1])
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox')[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option')
      expect(menuItems).toHaveLength(5)
      fireEvent.click(getAllByRole('option')[1])
      fireEvent.click(getByText('components.CreateTopicModal.createTopics'))
    })

    await waitFor(() => {
      expect(mockServices.postTopic).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(mockServices.postLearningElement).toHaveBeenCalled()
      expect(mockServices.postLearningPathAlgorithm).toHaveBeenCalled()
      expect(mockServices.postCalculateLearningPathForAllStudents).toHaveBeenCalled()
      expect(handleSetSuccessTopicCreated).toHaveBeenCalledWith(false)
      expect(queryByText('components.CreateTopicModal.createTopics')).toBeInTheDocument()
    })

    await waitFor(() => {
      fireEvent.click(getByTestId('create-topic-modal-close-button'))
    })
  })

  it('renders empty remoteTopics and alreadyCreatedTopics when getUser API call fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { getByText } = render(
      <MemoryRouter>
        <CreateTopicModal
          openCreateTopicModal={true}
          successTopicCreated={false}
          setSuccessTopicCreated={jest.fn()}
          handleCloseCreateTopicModal={jest.fn()}
        />
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
        <CreateTopicModal
          openCreateTopicModal={true}
          successTopicCreated={false}
          setSuccessTopicCreated={jest.fn()}
          handleCloseCreateTopicModal={jest.fn()}
        />
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
        <CreateTopicModal
          openCreateTopicModal={true}
          successTopicCreated={false}
          setSuccessTopicCreated={jest.fn()}
          handleCloseCreateTopicModal={jest.fn()}
        />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByText('components.TableRemoteTopics.noAdditionalTopics')).toBeInTheDocument()
    })
  })

  it('calls handleCreate on submit in the last step, but returns without give courseId', async () => {
    mockServices.postCalculateLearningPathForAllStudents.mockImplementationOnce(() => Promise.resolve())
    jest.spyOn(router, 'useParams').mockReturnValue({})

    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={handleSetSuccessTopicCreated}
              handleCloseCreateTopicModal={handleCloseCreateTopicModal}
            />
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
      const button = getAllByRole('combobox')[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option')
      expect(menuItems).toHaveLength(13)
      fireEvent.click(getAllByRole('option')[1])
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox')[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option')
      expect(menuItems).toHaveLength(5)
      fireEvent.click(getAllByRole('option')[1])
      fireEvent.click(getByText('components.CreateTopicModal.createTopics'))
    })

    await waitFor(() => {
      expect(mockServices.postTopic).not.toHaveBeenCalled()
      expect(handleSetSuccessTopicCreated).not.toHaveBeenCalled()
    })
  })

  it('changes topic after elements, classifications and algorithms are set', async () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <CreateTopicModal
              openCreateTopicModal={true}
              successTopicCreated={false}
              setSuccessTopicCreated={handleSetSuccessTopicCreated}
              handleCloseCreateTopicModal={handleCloseCreateTopicModal}
            />
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
      const button = getAllByRole('combobox')[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option')
      expect(menuItems).toHaveLength(13)
      fireEvent.click(getAllByRole('option')[1])
      fireEvent.click(getByText('appGlobal.next'))
    })

    await waitFor(() => {
      const button = getAllByRole('combobox')[0]
      fireEvent.mouseDown(button)
      const menuItems = getAllByRole('option')
      expect(menuItems).toHaveLength(5)
      fireEvent.click(getAllByRole('option')[1])
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
      fireEvent.click(getAllByRole('checkbox')[0])
      expect(getAllByRole('checkbox')[0]).not.toBeChecked()
    })
  })

  it('renders empty remoteTopics and alreadyCreatedTopics when getUser API call fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { getByText } = render(
      <MemoryRouter>
        <CreateTopicModal
          openCreateTopicModal={true}
          successTopicCreated={false}
          setSuccessTopicCreated={jest.fn()}
          handleCloseCreateTopicModal={jest.fn()}
        />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByText('components.TableRemoteTopics.noAdditionalTopics')).toBeInTheDocument()
    })
  })
})
