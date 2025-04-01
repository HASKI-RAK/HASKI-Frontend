import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import CreateDefaultLearningPathTable from './CreateDefaultLearningPathTable'

jest.mock('./CreateDefaultLearningPathTable.hooks', () => ({
  useCreateDefaultLearningPathTable: jest.fn()
}))

describe('CreateDefaultLearningPathTable Component', () => {
  const dummyOrderedItems: string[] = []
  const dummyDisabledItems: string[] = []
  const dummySetOrderedItems = jest.fn()
  const dummySetDisabledItems = jest.fn()
  const dummyHandleClose = jest.fn()

  it('renders CoverSheet on initial render and shows Start button', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <CreateDefaultLearningPathTable
          orderedItems={dummyOrderedItems}
          disabledItems={dummyDisabledItems}
          setOrderedItems={dummySetOrderedItems}
          setDisabledItems={dummySetDisabledItems}
          handleClose={dummyHandleClose}
        />
      </MemoryRouter>
    )

    expect(getByText('components.CreateDefaultLearningPathTable.header')).toBeInTheDocument()
    expect(getByRole('button', { name: /appGlobal.start/i })).toBeInTheDocument()
  })

  it('transitions to drag and drop view after clicking Start', async () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <CreateDefaultLearningPathTable
          orderedItems={dummyOrderedItems}
          disabledItems={dummyDisabledItems}
          setOrderedItems={dummySetOrderedItems}
          setDisabledItems={dummySetDisabledItems}
          handleClose={dummyHandleClose}
        />
      </MemoryRouter>
    )

    const startButton = getByRole('button', { name: /appGlobal.start/i })
    fireEvent.click(startButton)

    await waitFor(() => {
      expect(getByText('Classification Items')).toBeInTheDocument()
    })
  })

  it('calls handleRemoveAll when the Reset button is clicked', async () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <CreateDefaultLearningPathTable
          orderedItems={['KÜ', 'ÜB', 'AN']}
          disabledItems={['ZL']}
          setOrderedItems={dummySetOrderedItems}
          setDisabledItems={dummySetDisabledItems}
          handleClose={dummyHandleClose}
        />
      </MemoryRouter>
    )

    const startButton = getByRole('button', { name: /appGlobal.start/i })
    fireEvent.click(startButton)

    await waitFor(() => {
      expect(getByText('Classification Items')).toBeInTheDocument()
    })

    const resetButton = getByText('appGlobal.reset')
    expect(resetButton).toBeInTheDocument()
    fireEvent.click(resetButton)
    expect(dummySetOrderedItems).toHaveBeenCalled()
    expect(dummySetOrderedItems).toHaveBeenCalled()
  })

  it('calls handleSubmit and handleClose when the Submit button is clicked', async () => {
    render(
      <MemoryRouter>
        <CreateDefaultLearningPathTable
          orderedItems={['KÜ', 'AN', 'ÜB', 'FO']}
          disabledItems={['ZL', 'LZ', 'EK', 'BE', 'AB', 'SE', 'ZF', 'RQ']}
          setOrderedItems={dummySetOrderedItems}
          setDisabledItems={dummySetDisabledItems}
          handleClose={dummyHandleClose}
        />
      </MemoryRouter>
    )

    const startButton = screen.getByRole('button', { name: /Start/i })
    fireEvent.click(startButton)

    await waitFor(() => {
      expect(screen.getByText('Order the Items')).toBeInTheDocument()
    })

    const submitButton = screen.getByRole('button', { name: /appGlobal.submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockServices.postDefaultLearningPath).toHaveBeenCalled()
      expect(dummyHandleClose).toHaveBeenCalledWith({}, 'closeButtonClick')
    })
  })
})
