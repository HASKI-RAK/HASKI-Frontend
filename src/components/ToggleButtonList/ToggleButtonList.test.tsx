import { ToggleButtonList } from '@components'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('ToggleButtonList tests', () => {
  const mockToggleButtonListProps = {
    toggleButtonList: ['test1', 'test2'],
    selectedElement: 'test1'
  }

  it('renders without input', () => {
    render(<ToggleButtonList />)
  })

  it('renders with input', () => {
    const { getByText } = render(<ToggleButtonList {...mockToggleButtonListProps} />)
    expect(getByText(mockToggleButtonListProps.toggleButtonList[0])).toBeInTheDocument()
    expect(getByText(mockToggleButtonListProps.toggleButtonList[1])).toBeInTheDocument()
  })
})
