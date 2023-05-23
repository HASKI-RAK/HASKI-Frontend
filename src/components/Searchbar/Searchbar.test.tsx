import Searchbar, { SearchbarProps, debouncedSearchQuery } from './Searchbar'
import { fireEvent, render, act } from '@testing-library/react'
import { ChangeEvent } from 'react'
import '@testing-library/jest-dom'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('Searchbar tests', () => {
  const mockPropsNorm: SearchbarProps = {
    label: 'testLabel',
    setSearchQuery: jest.fn(),
    timeout: 1000
  }

  it('renders without crashing', () => {
    const { getAllByText } = render(<Searchbar {...mockPropsNorm} />)
    expect(getAllByText(mockPropsNorm.label!).length).toEqual(2)
  })

  test('Searchbar renders without input', () => {
    const { getByTestId } = render(<Searchbar />)
    const searchbar = getByTestId('searchbar')
    expect(searchbar).toBeInTheDocument()
  })

  test('query has changed', () => {
    const { getByRole } = render(<Searchbar {...mockPropsNorm} />)
    const searchbarInput = getByRole('textbox')

    expect(setTimeout).toHaveBeenCalledTimes(0)

    fireEvent.change(searchbarInput, { target: { value: 'testValue' } })

    expect(mockPropsNorm.setSearchQuery).toHaveBeenCalledTimes(0)

    jest.advanceTimersByTime(mockPropsNorm.timeout!)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(mockPropsNorm.setSearchQuery).toHaveBeenCalledTimes(1)
    expect(mockPropsNorm.setSearchQuery).toHaveBeenCalledWith('testValue')
  })

  test('debounced search query function', () => {
    render(<Searchbar {...mockPropsNorm} />)

    const mockEvent: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> = {
      target: {
        value: 'testValue'
      }
    } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

    expect(setTimeout).toHaveBeenCalledTimes(0)

    const mockDebouncedSearchQuery = debouncedSearchQuery(
      mockEvent,
      mockPropsNorm.setSearchQuery,
      mockPropsNorm.timeout
    )

    act(() => {
      mockDebouncedSearchQuery()
    })

    expect(setTimeout).toHaveBeenCalledTimes(1)
  })
})
