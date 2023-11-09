import { IFrameModal } from '@components'
import { Box } from '@mui/material'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('IFrameModal tests', () => {
  it('is displayed', () => {
    const open = true
    const { getByTestId } = render(
      <MemoryRouter>
        <Box>
          <IFrameModal url="fakedomain.com:8080" title="Modal is open" isOpen={open} onClose={jest.fn()} />
        </Box>
      </MemoryRouter>
    )

    expect(getByTestId('IFrameModal')).toBeInTheDocument
  })

  it('is displayed and can be closed', () => {
    const open = true
    const handleClose = jest.fn()
    const { getByTestId } = render(
      <MemoryRouter>
        <Box>
          <IFrameModal url="fakedomain.com:8080" title="Modal is open" isOpen={open} onClose={handleClose} />
        </Box>
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('IFrameModal-Close-Button'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
