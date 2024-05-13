import '@testing-library/jest-dom'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import AlgorithmSettingsModal from './AlgorithmSettingsModal'

const mockOptions = [
    {name: 'option1', description: 'description1', key: 'key1'},
    {name: 'option2', description: 'description2', key: 'key2'},
    {name: 'option3', description: 'description3', key: 'key3'}
]

describe('AlgorithmSettingsModal', () => {
    it('is displayed', () => {
        const open = true
        const { getByTestId } = render(
            <MemoryRouter>
                <AlgorithmSettingsModal isOpen={open} handleClose={jest.fn()} getIDs={jest.fn()} />
            </MemoryRouter>
        )

        expect(getByTestId('algorithm-modal')).toBeInTheDocument
    })

    test('if the close button works', () => {
        const open = true
        const handleClose = jest.fn()
        const { getByTestId } = render(
                <AlgorithmSettingsModal isOpen={open} handleClose={handleClose} getIDs={jest.fn()} />
        )

        fireEvent.click(getByTestId('algorithm-modal-close-button'))
        expect(handleClose).toHaveBeenCalledTimes(1)
    })

})