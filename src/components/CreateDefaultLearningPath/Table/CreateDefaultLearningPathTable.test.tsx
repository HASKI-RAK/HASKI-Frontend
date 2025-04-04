import '@testing-library/jest-dom'
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
      expect(getByText('components.CreateDefaultLearningPathTable.leftHeader')).toBeInTheDocument()
    })
  })

  it('drags an element', async () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <CreateDefaultLearningPathTable
          orderedItems={['KÜ', 'ÜB', 'AN']}
          disabledItems={[]}
          setOrderedItems={dummySetOrderedItems}
          setDisabledItems={dummySetDisabledItems}
          handleClose={dummyHandleClose}
        />
      </MemoryRouter>
    )

    const startButton = getByRole('button', { name: /appGlobal.start/i })
    fireEvent.click(startButton)

    await waitFor(() => {
      expect(getByText('components.CreateDefaultLearningPathTable.leftHeader')).toBeInTheDocument()
    })
    const draggableItem = getByText('KÜ - Overview')
    const anotherOne = getByText('AN - Animation')
    fireEvent.dragStart(draggableItem)
    fireEvent.dragOver(anotherOne)
    fireEvent.drop(draggableItem)
    await waitFor(() => {
      expect(getByText('KÜ - Overview')).toBeInTheDocument()
    })
  })

  it('returns null when wrong classification is given', async () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <CreateDefaultLearningPathTable
          orderedItems={['AIAIAI', 'ÜB', 'AN']}
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
      expect(getByText('components.CreateDefaultLearningPathTable.leftHeader')).toBeInTheDocument()
    })

    const resetButton = getByText('appGlobal.reset')
    expect(resetButton).toBeInTheDocument()
    fireEvent.click(resetButton)
    expect(dummySetOrderedItems).toHaveBeenCalled()
    expect(dummySetOrderedItems).toHaveBeenCalled()
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
      expect(getByText('components.CreateDefaultLearningPathTable.leftHeader')).toBeInTheDocument()
    })

    const resetButton = getByText('appGlobal.reset')
    expect(resetButton).toBeInTheDocument()
    fireEvent.click(resetButton)
    expect(dummySetOrderedItems).toHaveBeenCalled()
    expect(dummySetOrderedItems).toHaveBeenCalled()
  })

  it('clicks on remove button on sorted item', async () => {
    const { getByText, getByRole, getByTestId } = render(
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

    const startButton = getByRole('button', { name: /Start/i })
    fireEvent.click(startButton)

    await waitFor(() => {
      expect(getByText('components.CreateDefaultLearningPathTable.rightHeader')).toBeInTheDocument()
    })

    await waitFor(() => {
      const removeButton = getByTestId('remove-KÜ-button')
      fireEvent.pointerDown(removeButton)
      fireEvent.mouseDown(removeButton)
      fireEvent.click(removeButton)
    })
  })

  it('calling submit and closing modal without handleClose function', async () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <CreateDefaultLearningPathTable
          orderedItems={dummyOrderedItems}
          disabledItems={dummyDisabledItems}
          setOrderedItems={dummySetOrderedItems}
          setDisabledItems={dummySetDisabledItems}
        />
      </MemoryRouter>
    )

    expect(getByText('components.CreateDefaultLearningPathTable.header')).toBeInTheDocument()
    expect(getByRole('button', { name: /appGlobal.start/i })).toBeInTheDocument()

    const startButton = screen.getByRole('button', { name: /Start/i })
    fireEvent.click(startButton)

    await waitFor(() => {
      expect(screen.getByText('components.CreateDefaultLearningPathTable.rightHeader')).toBeInTheDocument()
    })

    const submitButton = screen.getByRole('button', { name: /appGlobal.submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('components.CreateDefaultLearningPathTable.rightHeader')).toBeInTheDocument()
    })
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
      expect(screen.getByText('components.CreateDefaultLearningPathTable.rightHeader')).toBeInTheDocument()
    })

    const submitButton = screen.getByRole('button', { name: /appGlobal.submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockServices.postDefaultLearningPath).toHaveBeenCalled()
      expect(dummyHandleClose).toHaveBeenCalledWith({}, 'closeButtonClick')
    })
  }, 20000)
})
