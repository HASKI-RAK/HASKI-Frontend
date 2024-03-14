import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import LabeledSwitch from './LabeledSwitch'

const mockProps = {
  labelLeft: 'labelLeft',
  labelRight: 'labelRight',
  isGrouped: true,
  setIsGrouped: jest.fn()
}

describe('LabeledSwitch tests', () => {
  it('renders correctly without input', () => {
    const labeledSwitch = render(<LabeledSwitch />)
    expect(labeledSwitch).toBeTruthy()
  })

  it('renders correctly with input', () => {
    const labeledSwitch = render(<LabeledSwitch {...mockProps} />)
    expect(labeledSwitch).toBeTruthy()
  })

  test('Switch can be clicked', () => {
    const { getByRole } = render(<LabeledSwitch {...mockProps} />)
    const switchButton = getByRole('checkbox')

    act(() => {
      fireEvent.click(switchButton)
      fireEvent.change(switchButton, { target: { checked: false } })
    })

    expect((switchButton as HTMLInputElement).checked).toBe(false)
  })
})
