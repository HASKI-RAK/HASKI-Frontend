import '@testing-library/jest-dom'
import { fireEvent, queryByRole, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, RoleContext, RoleContextType } from '@services'
import DefaultLearningPathModal from './CreateDefaultLearningPathModal'

const handleClose = jest.fn()

const courseCreatorContext = {
  isStudentRole: false,
  isCourseCreatorRole: true
} as RoleContextType

describe('DefaultLearningPathModal component', () => {
  it('renders the modal and loads default learning path data without open parameter', async () => {
    const { queryByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <DefaultLearningPathModal handleClose={handleClose} />
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
            <DefaultLearningPathModal open={true} handleClose={handleClose} />
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
    const handleClose = jest.fn()

    const { getByRole, getByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <RoleContext.Provider value={courseCreatorContext}>
            <DefaultLearningPathModal open={true} handleClose={handleClose} />
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
})
