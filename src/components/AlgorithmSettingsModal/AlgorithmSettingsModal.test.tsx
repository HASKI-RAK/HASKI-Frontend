import '@testing-library/jest-dom'
import '@testing-library/jest-dom'
import { createRef } from 'react'
import { fireEvent, render, renderHook } from '@testing-library/react'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import AlgorithmSettingsModal from './AlgorithmSettingsModal'
import { TestRefType } from './AlgorithmSettingsModal'
import useAlgorithmSettingsModal from './AlgorithmSettingsModal.hooks'
import { get } from 'http'
import exp from 'constants'

const mockOptions = [
  { name: 'option1', description: 'description1', key: 'key1' },
  { name: 'option2', description: 'description2', key: 'key2' },
  { name: 'option3', description: 'description3', key: 'key3' }
]

const handleSave = jest.fn().mockName('handleSave')

describe('AlgorithmSettingsModal', () => {
  it('is displayed with all options', () => {
    const open = true
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal
          isOpen={open}
          handleClose={jest.fn()}
          getIDs={{ courseID: 1, topicID: 0 }}
          options={mockOptions}
        />
      </MemoryRouter>
    )

    expect(getByTestId('algorithm-modal')).toBeInTheDocument()
    expect(getByLabelText('option1')).toBeInTheDocument()
    expect(getByLabelText('option2')).toBeInTheDocument()
    expect(getByLabelText('option3')).toBeInTheDocument()
    //TODO: Find a better way to test the icon appearing
    expect(getByTestId('teacher-icon')).toBeInTheDocument()
  })

  test('if the radio buttons work', () => {
    const open = true
    const { getByLabelText } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal
          isOpen={open}
          handleClose={jest.fn()}
          getIDs={{ courseID: 1, topicID: 0 }}
          options={mockOptions}
        />
      </MemoryRouter>
    )

    const button1 = getByLabelText('option1') as HTMLInputElement
    const button2 = getByLabelText('option2') as HTMLInputElement

    expect(button1.checked).toBe(true)
    expect(button2.checked).toBe(false)

    fireEvent.click(button2)
    expect(button1.checked).toBe(false)
    expect(button2.checked).toBe(true)
  })

  test('if the close button works', () => {
    const open = true
    const handleClose = jest.fn()
    const { getByTestId } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal isOpen={open} handleClose={handleClose} getIDs={{ courseID: 1, topicID: 0 }} />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('algorithm-modal-close-button'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  test('if the save button works', () => {
    console.log = jest.fn()
    const handleClose = jest.fn()
    const open = true
    const { getByTestId } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal
          isOpen={open}
          handleClose={handleClose}
          getIDs={{ courseID: 1, topicID: 0 }}
          options={mockOptions}
        />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('algorithm-save-button'))

    expect(handleClose).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledTimes(1)
  })
})
