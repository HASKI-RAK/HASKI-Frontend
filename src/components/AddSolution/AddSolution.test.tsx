import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddSolution from './AddSolution'
import { MemoryRouter, useParams } from 'react-router-dom'
import { RoleContext, RoleContextType, SnackbarContext } from '@services'
import * as router from 'react-router'
import React from 'react'
import '@testing-library/jest-dom'

// Mock react-router params
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

// Mock translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

describe('<AddSolution />', () => {
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

  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <SnackbarContext.Provider value={mockAddSnackbar}>
      <MemoryRouter>
        <RoleContext.Provider value={courseCreatorContext}>{children}</RoleContext.Provider>
      </MemoryRouter>
    </SnackbarContext.Provider>
  )

  it('renders the button', () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '1', topicId: '2' })

    const { getByText } = render(<AddSolution />, { wrapper: Wrapper })

    const button = getByText('components.AddSolution.addSolution')
    expect(button).toBeInTheDocument()
  })

  it('opens the modal when button is clicked', async () => {
    const { getByText } = render(<AddSolution />, { wrapper: Wrapper })

    const button = getByText('components.AddSolution.addSolution')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId('add-solution-modal-close-button')).toBeInTheDocument()
    })
  })

  it('closes and resets state when modal close button is clicked', async () => {
    const { getByText, getByTestId, queryByTestId } = render(<AddSolution />, { wrapper: Wrapper })

    const button = getByText('components.AddSolution.addSolution')
    fireEvent.click(button)

    await waitFor(() => {
      const closeButton = getByTestId('add-solution-modal-close-button')
      expect(closeButton).toBeInTheDocument()
      fireEvent.click(closeButton)
    })

    await waitFor(() => {
      expect(queryByTestId('add-solution-modal-close-button')).not.toBeInTheDocument()
    })
  })
})
