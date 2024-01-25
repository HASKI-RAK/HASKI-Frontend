import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Searchbar from './Searchbar'
import '@testing-library/jest-dom'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('Searchbar tests', () => {
  const mockSearchbarProps = {
    label: 'testLabel',
    setSearchQuery: jest.fn(),
    timeout: 1000
  }

  it('renders without input', () => {
    expect(
      render(
        <MemoryRouter>
          <Searchbar />
        </MemoryRouter>
      )
    ).toBeTruthy()
  })

  it('renders with input', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <Searchbar {...mockSearchbarProps} />
      </MemoryRouter>
    )
    expect(getAllByText(mockSearchbarProps.label).length).toEqual(2)
  })

  test('Search query has changed', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Searchbar {...mockSearchbarProps} />
      </MemoryRouter>
    )
    const searchbarInput = getByRole('textbox')

    expect(setTimeout).toHaveBeenCalledTimes(0)
    fireEvent.change(searchbarInput, { target: { value: 'testValue' } })
    expect(mockSearchbarProps.setSearchQuery).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(mockSearchbarProps.timeout)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(mockSearchbarProps.setSearchQuery).toHaveBeenCalledTimes(1)
    expect(mockSearchbarProps.setSearchQuery).toHaveBeenCalledWith('testValue')
  })
})
