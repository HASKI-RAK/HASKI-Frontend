import GlossaryIndex, { GlossaryIndexProps } from './GlossaryIndex'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('GlossaryIndex tests', () => {
  const mockIndexProps: GlossaryIndexProps = {
    orientation: 'horizontal',
    indexElements: ['test1', 'test2', 'test3'],
    selectedIndexElement: 'test1',
    setSelectedIndexElement: jest.fn()
  }

  it('renders with input', () => {
    const { getByText } = render(<GlossaryIndex {...mockIndexProps} />)
    expect(getByText('test1').textContent).toEqual(mockIndexProps.indexElements?.[0])
    expect(getByText('test2').textContent).toEqual(mockIndexProps.indexElements?.[1])
    expect(getByText('test3').textContent).toEqual(mockIndexProps.indexElements?.[2])
  })

  it('renders without input', () => {
    const { getByRole } = render(<GlossaryIndex />)
    const button = getByRole('group')
    expect(button).toBeInTheDocument()
  })

  test('Elements can be selected', () => {
    const { getByText } = render(<GlossaryIndex {...mockIndexProps} />)
    fireEvent.click(getByText('test1'))
    fireEvent.click(getByText('test2'))
    fireEvent.click(getByText('test3'))
    expect(mockIndexProps.setSelectedIndexElement).toHaveBeenCalledTimes(3)
  })
})
