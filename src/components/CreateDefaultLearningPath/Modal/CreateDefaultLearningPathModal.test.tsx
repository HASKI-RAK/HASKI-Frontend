import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, RoleContext, RoleContextType, SnackbarContext } from '@services'
import CreateDefaultLearningPathModal from './CreateDefaultLearningPathModal'

describe('[HASKI-REQ-0026] DefaultLearningPathModal component', () => {
  const handleClose = jest.fn()

  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  const addSnackbarMock = jest.fn()
  const mockAddSnackbar = {
    snackbarsErrorWarning: [],
    snackbarsSuccessInfo: [],
    setSnackbarsErrorWarning: (a: any[]) => a,
    setSnackbarsSuccessInfo: (a: any) => a,
    addSnackbar: (a: any) => {
      addSnackbarMock(a)
      return a
    },
    updateSnackbar: (a: any) => a,
    removeSnackbar: (a: any) => a
  }

  it('renders the modal and loads default learning path data without open parameter', async () => {
    const { queryByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateDefaultLearningPathModal handleClose={handleClose} />
            </SnackbarContext.Provider>
          </RoleContext.Provider>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      expect(queryByRole('button', { name: /appGlobal.start/i })).not.toBeInTheDocument()
    })
  })

  it('renders the modal and loads default learning path data', async () => {
    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateDefaultLearningPathModal open={true} handleClose={handleClose} />
            </SnackbarContext.Provider>
          </RoleContext.Provider>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      expect(getByRole('button', { name: /appGlobal.start/i })).toBeInTheDocument()
    })

    // Verify that getUser and getDefaultLearningPath have been called.
    expect(mockServices.fetchUser).toHaveBeenCalled()
    expect(mockServices.fetchDefaultLearningPath).toHaveBeenCalled()
  })

  it('calls handleClose when the close button is clicked', async () => {
    const { getByRole, getByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateDefaultLearningPathModal open={true} handleClose={handleClose} />
            </SnackbarContext.Provider>
          </RoleContext.Provider>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    // Wait for the modal content to be rendered.
    await waitFor(() => {
      expect(getByRole('button', { name: /appGlobal.start/i })).toBeInTheDocument()
    })

    const closeButton = getByTestId('close-default-learning-path-modal-button')
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledWith({}, 'closeButtonClick')
  })

  it('catches error when fetchDefaultLearningPath fails', async () => {
    mockServices.fetchDefaultLearningPath.mockImplementationOnce(() => {
      throw new Error('fetchDefaultLearningPath error')
    })

    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateDefaultLearningPathModal open={true} handleClose={handleClose} />
            </SnackbarContext.Provider>
          </RoleContext.Provider>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    // Wait for the modal content to be rendered.
    await waitFor(() => {
      expect(getByRole('button', { name: /appGlobal.start/i })).toBeInTheDocument()
    })
  })

  it('catches error when fetchUser fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('fetchUser error')
    })

    const { getByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <SnackbarContext.Provider value={mockAddSnackbar}>
              <CreateDefaultLearningPathModal open={true} handleClose={handleClose} />
            </SnackbarContext.Provider>
          </RoleContext.Provider>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      expect(getByRole('button', { name: /appGlobal.start/i })).toBeInTheDocument()
    })
  })
})
