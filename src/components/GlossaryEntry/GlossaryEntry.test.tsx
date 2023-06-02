import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import GlossaryEntry, { GlossaryEntryProps } from './GlossaryEntry'

describe('Test the Glossary Entry', () => {
  const mockNorm: GlossaryEntryProps = {
    term: 'testTerm',
    definition: 'testDefinition',
    sources: 'testSources',
    tags: ['tag 1', 'tag 2'],
    fundamental: true
  }
  const mockExpandedList = ['testTerm']
  const mockSetExpandedList = jest.fn()

  const mockEmpty: GlossaryEntryProps = {
    term: '',
    definition: '',
    sources: '',
    tags: [],
    fundamental: false
  }

  const mockTerm: GlossaryEntryProps = {
    term: 'tastyTerm_2',
    definition: '',
    sources: '',
    tags: [],
    fundamental: false
  }

  test('renders correctly normal Input', () => {
    const { getByTestId, getAllByTestId } = render(
      <GlossaryEntry expandedList={mockExpandedList} setExpandedList={mockSetExpandedList} {...mockNorm} />
    )

    const button = getByTestId('glossaryEntryTerm')
    expect(button.textContent).toEqual(mockNorm.term!)

    const tags = getAllByTestId('glossaryEntryTag')
    expect(tags.length).toEqual(mockNorm.tags?.length)

    const definition = getByTestId('glossaryEntryDefinition')
    expect(definition.textContent).toEqual(mockNorm.definition!)

    const sources = getByTestId('glossaryEntrySources')
    expect(sources.textContent).toEqual(mockNorm.sources!)
  })

  test('renders correctly undefined Input', () => {
    const { getByTestId } = render(<GlossaryEntry />)

    const button = getByTestId('glossaryEntryTerm')
    expect(button.textContent).toEqual('')

    const definition = getByTestId('glossaryEntryDefinition')
    expect(definition.textContent).toEqual('')

    const sources = getByTestId('glossaryEntrySources')
    expect(sources.textContent).toEqual('')
  })

  test('renders correctly Empty Input', () => {
    const { getByTestId } = render(<GlossaryEntry {...mockEmpty} />)

    const button = getByTestId('glossaryEntryTerm')
    expect(button.textContent).toEqual(mockEmpty.term!)

    const definition = getByTestId('glossaryEntryDefinition')
    expect(definition.textContent).toEqual(mockEmpty.definition!)

    const sources = getByTestId('glossaryEntrySources')
    expect(sources.textContent).toEqual(mockEmpty.sources!)
  })

  test('open GlossaryEntry', () => {
    const { getByRole } = render(
      <GlossaryEntry expandedList={mockExpandedList} setExpandedList={mockSetExpandedList} {...mockNorm} />
    )
    fireEvent.click(getByRole('button'))
    expect(mockSetExpandedList).toHaveBeenCalled()
  })

  test('close GlossaryEntry', () => {
    const { getByRole } = render(
      <GlossaryEntry expandedList={mockExpandedList} setExpandedList={mockSetExpandedList} {...mockTerm} />
    )
    fireEvent.click(getByRole('button'))
    expect(mockSetExpandedList).toHaveBeenCalled()
  })
})
