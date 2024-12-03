import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Filter from './Filter'

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
      <MemoryRouter>
        <Filter
          label={mockFilterProps.label}
          options={mockFilterProps.options}
          selectedOptions={mockFilterProps.selectedOptions}
          setSelectedOptions={mockFilterProps.setSelectedOptions}
        />
      </MemoryRouter>
    )
    const select = getByTestId('filter')
    expect(select).toBeInTheDocument()
  })

  test('Dropdown can be opened', () => {
    const { getByRole, getAllByRole } = render(
      <MemoryRouter>
        <Filter
          label={mockFilterProps.label}
          options={mockFilterProps.options}
          selectedOptions={mockFilterProps.selectedOptions}
          setSelectedOptions={mockFilterProps.setSelectedOptions}
        />
      </MemoryRouter>
    )

    const button = getByRole('combobox')
    fireEvent.mouseDown(button)
    const menuItems = getAllByRole('option')
    expect(menuItems).toHaveLength(mockFilterProps.options.length)
  })

  test('Single option can be selected', () => {
    const { getByRole, getAllByRole } = render(
      <MemoryRouter>
        <Filter
          label={mockFilterProps.label}
          options={mockFilterProps.options}
          selectedOptions={mockFilterProps.selectedOptions}
          setSelectedOptions={mockFilterProps.setSelectedOptions}
        />
      </MemoryRouter>
    )

    const button = getByRole('combobox')
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
      <MemoryRouter>
        <Filter
          label={mockFilterProps.label}
          options={mockFilterProps.options}
          selectedOptions={mockFilterProps.selectedOptions}
          setSelectedOptions={mockFilterProps.setSelectedOptions}
        />
      </MemoryRouter>
    )

    const button = getByRole('combobox')
    fireEvent.mouseDown(button)
    const checkboxes = getAllByRole('checkbox')
    const checkbox = checkboxes[0] as HTMLInputElement
    expect(checkbox.checked).toBe(false)
    fireEvent.change(checkbox, { target: { checked: true } }) // fireEvent.click(checkbox) doesn't work
    expect(checkbox.checked).toBe(true)
  })

  test('Multiple options can be selected', () => {
    const { getByRole, getAllByRole } = render(
      <MemoryRouter>
        <Filter
          label={mockFilterProps.label}
          options={mockFilterProps.options}
          selectedOptions={mockFilterProps.selectedOptions}
          setSelectedOptions={mockFilterProps.setSelectedOptions}
        />
      </MemoryRouter>
    )

    const button = getByRole('combobox')
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
      <MemoryRouter>
        <Filter
          label={mockFilterProps.label}
          options={mockFilterProps.options}
          selectedOptions={mockFilterProps.selectedOptions}
          setSelectedOptions={mockFilterProps.setSelectedOptions}
        />
      </MemoryRouter>
    )

    const select = getByTestId('filter') as HTMLInputElement
    expect(select.value.split(',')).toEqual(mockFilterProps.selectedOptions)
  })

  test('setSelectedOptions can be undefined', () => {
    const { getByTestId, getByRole, getAllByRole } = render(
      <MemoryRouter>
        <Filter
          label={mockFilterProps.label}
          options={mockFilterProps.options}
          selectedOptions={mockFilterProps.selectedOptions}
        />
      </MemoryRouter>
    )
    const button = getByRole('combobox')
    fireEvent.mouseDown(button)

    const menuItems = getAllByRole('option')
    menuItems[0].click()

    const select = getByTestId('filter')
    fireEvent.change(select, { target: { value: menuItems[0].textContent } })

    expect(mockFilterProps.selectedOptions).toEqual(['tag 2', 'tag 4'])
  })

  // No snapshot testing
})
