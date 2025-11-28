import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import LabeledSwitch from './LabeledSwitch'

const mockProps = {
  labelLeft: 'labelLeft',
  labelRight: 'labelRight',
  isGrouped: true,
  setIsGrouped: jest.fn()
}

describe('[HASKI-REQ-0026] LabeledSwitch tests', () => {
  it('renders correctly without input', () => {
    const labeledSwitch = render(
      <MemoryRouter>
        <LabeledSwitch />
      </MemoryRouter>
    )
    expect(labeledSwitch).toBeTruthy()
  })

  it('renders correctly with input', () => {
    const labeledSwitch = render(
      <MemoryRouter>
        <LabeledSwitch {...mockProps} />
      </MemoryRouter>
    )
    expect(labeledSwitch).toBeTruthy()
  })

  test('Switch can be clicked', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <LabeledSwitch {...mockProps} />
      </MemoryRouter>
    )
    const switchButton = getByRole('checkbox')

    act(() => {
      fireEvent.click(switchButton)
      fireEvent.change(switchButton, { target: { checked: false } })
    })

    expect((switchButton as HTMLInputElement).checked).toBe(false)
  })
})
