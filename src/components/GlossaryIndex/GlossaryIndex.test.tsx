import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import GlossaryIndex, { GlossaryIndexProps } from './GlossaryIndex'

describe('GlossaryIndex tests', () => {
  const mockNorm: GlossaryIndexProps = {
    orientation: 'horizontal',
    indexElements: ['test1', 'test2', 'test3'],
    selectedIndexElement: 'test1',
    setSelectedIndexElement: jest.fn()
  }
  const mockUndefined: GlossaryIndexProps = {
    orientation: undefined,
    indexElements: undefined,
    selectedIndexElement: undefined,
    setSelectedIndexElement: undefined
  }

  test('renders correctly normal Input', () => {
    const { getAllByTestId } = render(<GlossaryIndex {...mockNorm} />)

    const button = getAllByTestId('glossaryIndexButton')
    expect(button[0].textContent).toEqual(mockNorm.indexElements![0])
    screen.debug()
  })

  test('renders correctly undefined Input', () => {
    const mockRender = render(<GlossaryIndex {...mockUndefined} />)

    const button = screen.getByRole('group')
    expect(button).toBeInTheDocument()
  })

  test('clickEvent', () => {
    const { getAllByTestId } = render(<GlossaryIndex {...mockNorm} />)
    fireEvent.click(getAllByTestId('glossaryIndexButton')[0])
    fireEvent.click(getAllByTestId('glossaryIndexButton')[1])
    fireEvent.click(getAllByTestId('glossaryIndexButton')[2])
    expect(mockNorm.setSelectedIndexElement).toHaveBeenCalledTimes(3)
  })
})
