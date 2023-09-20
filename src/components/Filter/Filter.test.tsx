import '@testing-library/jest-dom'
import Filter from './Filter'
import { fireEvent, render, act, screen } from '@testing-library/react'
import selectEvent from 'react-select-event'
import { Select, MenuItem } from '@common/components'

// clock ist faketimer
// .tick runs all timers
jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

const mockFilterProps = {
  label: 'filter',
  options: ['tag 1', 'tag 2', 'tag 3', 'tag 4'],
  selectedOptions: ['tag 2', 'tag 4'],
  setSelectedOptions: jest.fn()
}

describe('Filter tests', () => {
  it('renders without input', () => {
    const filter = render(<Filter />)
    expect(filter).toBeTruthy()
  })

  it('renders with input', () => {
    const { getByTestId } = render(
      <Filter
        label={mockFilterProps.label}
        options={mockFilterProps.options}
        selectedOptions={mockFilterProps.selectedOptions}
        setSelectedOptions={mockFilterProps.setSelectedOptions}
      />
    )
    const select = getByTestId('filter')
    expect(select).toBeInTheDocument()
  })

  test('Dropdown can be opened', () => {
    const { getByRole, getAllByRole } = render(
      <Filter
        label={mockFilterProps.label}
        options={mockFilterProps.options}
        selectedOptions={mockFilterProps.selectedOptions}
        setSelectedOptions={mockFilterProps.setSelectedOptions}
      />
    )

    const button = getByRole('button')
    fireEvent.mouseDown(button)
    const menuItems = getAllByRole('option')
    expect(menuItems).toHaveLength(mockFilterProps.options.length)
  })

  test('Single option can be selected', () => {
    const { getByRole, getAllByRole } = render(
      <Filter
        label={mockFilterProps.label}
        options={mockFilterProps.options}
        selectedOptions={mockFilterProps.selectedOptions}
        setSelectedOptions={mockFilterProps.setSelectedOptions}
      />
    )

    const button = getByRole('button')
    fireEvent.mouseDown(button)
    const menuItems = getAllByRole('option')
    fireEvent.click(menuItems[0])
    expect(mockFilterProps.setSelectedOptions).toHaveBeenCalledTimes(1)
    expect(mockFilterProps.setSelectedOptions).toHaveBeenCalledWith([
      ...mockFilterProps.selectedOptions,
      menuItems[0].textContent
    ])
  })

  test('Checkbox can be checked', () => {
    const { getByRole, getAllByRole } = render(
      <Filter
        label={mockFilterProps.label}
        options={mockFilterProps.options}
        selectedOptions={mockFilterProps.selectedOptions}
        setSelectedOptions={mockFilterProps.setSelectedOptions}
      />
    )

    const button = getByRole('button')
    fireEvent.mouseDown(button)
    const checkboxes = getAllByRole('checkbox')
    const checkbox = checkboxes[0] as HTMLInputElement
    expect(checkbox.checked).toBe(false)
    fireEvent.change(checkbox, { target: { checked: true } }) // fireEvent.click(checkbox) doesn't work
    expect(checkbox.checked).toBe(true)
  })

  test('Multiple options can be selected', () => {
    const { getByRole, getAllByRole } = render(
      <Filter
        label={mockFilterProps.label}
        options={mockFilterProps.options}
        selectedOptions={mockFilterProps.selectedOptions}
        setSelectedOptions={mockFilterProps.setSelectedOptions}
      />
    )

    const button = getByRole('button')
    fireEvent.mouseDown(button)
    const menuItems = getAllByRole('option')
    fireEvent.click(menuItems[0])
    expect(mockFilterProps.setSelectedOptions).toHaveBeenCalledWith([
      ...mockFilterProps.selectedOptions,
      menuItems[0].textContent
    ])
    fireEvent.click(menuItems[2])
    expect(mockFilterProps.setSelectedOptions).toHaveBeenCalledWith([
      ...mockFilterProps.selectedOptions,
      menuItems[2].textContent
    ])
    expect(mockFilterProps.setSelectedOptions).toHaveBeenCalledTimes(2)
  })

  test('Currently selected options get rendered', () => {
    const { getByTestId } = render(
      <Filter
        label={mockFilterProps.label}
        options={mockFilterProps.options}
        selectedOptions={mockFilterProps.selectedOptions}
        setSelectedOptions={mockFilterProps.setSelectedOptions}
      />
    )

    const select = getByTestId('filter') as HTMLInputElement
    expect(select.value.split(',')).toEqual(mockFilterProps.selectedOptions)
  })

  test('setSelectedOptions can be undefined', () => {
    const { getByTestId, getByRole, getAllByRole, getByLabelText, rerender } = render(
      <form data-testid="form">
        <label htmlFor="selectedOptions">selectedOptions</label>
        <Filter
          label={mockFilterProps.label}
          options={mockFilterProps.options}
          selectedOptions={mockFilterProps.selectedOptions}
          setSelectedOptions={mockFilterProps.setSelectedOptions}
        />
      </form>
    )
    screen.debug()
    const select = getByTestId('filter')

    console.debug(getByTestId('form').innerHTML)

    expect(getByTestId('form')).toHaveFormValues({ selectedOptions: 'tag 2,tag 4' })

    const test = getByLabelText('selectedOptions')

    const button = getByRole('button')
    expect(button).toHaveAccessibleName('tag 2 tag 4')
    fireEvent.mouseDown(button)

    const menuItems = getAllByRole('option')
    act(() => {
      menuItems[0].click()
      jest.runOnlyPendingTimers()
    })

    fireEvent.mouseDown(button)
    rerender(
      <form data-testid="form">
        <label htmlFor="selectedOptions">selectedOptions</label>
        <Filter
          label={mockFilterProps.label}
          options={mockFilterProps.options}
          selectedOptions={mockFilterProps.selectedOptions}
          setSelectedOptions={mockFilterProps.setSelectedOptions}
        />
      </form>
    )

    screen.debug()

    expect(button).toHaveAccessibleName('tag 1 tag 2 tag 4')

    // fireEvent.change(test, { target: { value: 'Choc' } })
    // selectEvent.select(test, menuItems[0].textContent!)
    expect(getByTestId('form')).toHaveFormValues({ selectedOptions: 'tag 1,tag 2,tag 4' })

    //

    fireEvent.click(menuItems[0])
    // fireEvent.change(select, { target: { value: menuItems[0].textContent } })
    //  fireEvent.change(getByLabelText('selectedOptions'), { target: { value: 'tag 1' } })
    //selectEvent.select(getByTestId('form'), 'tag 1')

    // console.log(select.getAttribute('value'))
    // expect(mockFilterProps.selectedOptions).toEqual(['tag 2', 'tag 4'])
  })

  // No snapshot testing
})
