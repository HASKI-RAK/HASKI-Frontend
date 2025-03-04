import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Box } from '@common/components'
import DeleteEntityModal from './DeleteEntityModal'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key // Mock translation function
  })
}))

describe('DeleteEntityModal Component', () => {
  const mockSetDeleteEntityModalOpen = jest.fn()
  const mockOnDeleteConfirm = jest.fn()

  const defaultProps = {
    openDeleteEntityModal: true,
    entityName: 'Test Course',
    entityType: 'Course',
    entityId: 1,
    entityLmsId: 101,
    setDeleteEntityModalOpen: mockSetDeleteEntityModalOpen,
    onDeleteConfirm: mockOnDeleteConfirm
  }

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <Box>
          <DeleteEntityModal {...defaultProps} />
        </Box>
      </MemoryRouter>
    )
  }

  test('renders the modal when open', () => {
    renderComponent()
    expect(screen.getByText('Course components.DeleteEntityModal.header')).toBeInTheDocument()
  })

  test('closes the modal when cancel button is clicked', () => {
    renderComponent()

    const cancelButton = screen.getByText('appGlobal.cancel')
    fireEvent.click(cancelButton)

    expect(mockSetDeleteEntityModalOpen).toHaveBeenCalledWith(false)
  })

  test('handles checkbox interaction correctly', () => {
    renderComponent()

    const checkbox = screen.getByTestId('delete-entity-modal-accept-label').querySelector('input')
    const deleteButton = screen.getByText('appGlobal.delete')

    expect(checkbox).not.toBeChecked()
    expect(deleteButton).toBeDisabled()

    fireEvent.click(checkbox!)

    expect(checkbox).toBeChecked()
    expect(deleteButton).toBeEnabled()
  })

  test('calls onDeleteConfirm when delete button is clicked', () => {
    renderComponent()

    const checkbox = screen.getByTestId('delete-entity-modal-accept-label').querySelector('input')
    fireEvent.click(checkbox!) // Check the checkbox to enable the button

    const deleteButton = screen.getByText('appGlobal.delete')
    fireEvent.click(deleteButton)

    expect(mockOnDeleteConfirm).toHaveBeenCalledWith(1, 101)
  })
})
