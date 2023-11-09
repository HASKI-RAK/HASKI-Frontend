import { fireEvent, render, act } from '@testing-library/react'
import Searchbar, { debouncedSearchQuery } from './Searchbar'
import { MemoryRouter } from 'react-router-dom'
import { ChangeEvent } from 'react'
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
    const { getByDisplayValue } = render(
      <MemoryRouter>
        <Searchbar />
      </MemoryRouter>
    )
    expect(getByDisplayValue('')).toBeInTheDocument()
  })

  it('renders with input', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <Searchbar {...mockSearchbarProps} />
      </MemoryRouter>
    )
    expect(getAllByText(mockSearchbarProps.label).length).toEqual(2)
  })

  test('search query has changed', () => {
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

  test('debounced search query function', () => {
    const mockEvent = {
      target: {
        value: 'testValue'
      }
    } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

    expect(setTimeout).toHaveBeenCalledTimes(0)

    const mockDebouncedSearchQuery = debouncedSearchQuery(
      mockEvent,
      mockSearchbarProps.setSearchQuery,
      mockSearchbarProps.timeout
    )

    render(
      <MemoryRouter>
        <Searchbar {...mockSearchbarProps} />
      </MemoryRouter>
    )

    act(() => {
      mockDebouncedSearchQuery()
    })

    expect(setTimeout).toHaveBeenCalledTimes(1)
  })
})
