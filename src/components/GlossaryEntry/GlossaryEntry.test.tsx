import GlossaryEntry, { GlossaryEntryProps, GlossaryAccordionEntryProps } from './GlossaryEntry'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

const mockGlossaryEntry: GlossaryEntryProps = {
  term: 'testTerm',
  definition: 'testDefinition',
  sources: 'testSources',
  tags: ['tag 1', 'tag 2'],
  fundamental: true
}

const mockGlossaryAccordionEntryProps: GlossaryAccordionEntryProps = {
  expandedList: ['testTerm'],
  setExpandedList: jest.fn(),
  ...mockGlossaryEntry
}

const mockGlossaryEntry2: GlossaryEntryProps = {
  term: 'testTerm2',
  definition: '',
  sources: '',
  tags: [],
  fundamental: false
}

const mockGlossaryAccordionEntryProps2: GlossaryAccordionEntryProps = {
  expandedList: ['testTerm'],
  setExpandedList: jest.fn(),
  ...mockGlossaryEntry2
}

describe('Test GlossaryEntry', () => {
  it('renders correctly with input', () => {
    const { getByTestId, getAllByTestId } = render(
      <GlossaryEntry
        expandedList={mockGlossaryAccordionEntryProps.expandedList}
        setExpandedList={mockGlossaryAccordionEntryProps.setExpandedList}
        {...mockGlossaryAccordionEntryProps}
      />
    )

    const button = getByTestId('glossaryEntryTerm')
    expect(button.textContent).toEqual(mockGlossaryAccordionEntryProps.term)

    const tags = getAllByTestId('glossaryEntryTag')
    expect(tags.length).toEqual(mockGlossaryAccordionEntryProps.tags?.length)

    const definition = getByTestId('glossaryEntryDefinition')
    expect(definition.textContent).toEqual(mockGlossaryAccordionEntryProps.definition)

    const sources = getByTestId('glossaryEntrySources')
    expect(sources.textContent).toEqual(mockGlossaryAccordionEntryProps.sources)
  })

  test('renders correctly', () => {
    const { getByTestId } = render(<GlossaryEntry />)

    const button = getByTestId('glossaryEntryTerm')
    expect(button.textContent).toEqual('')

    const definition = getByTestId('glossaryEntryDefinition')
    expect(definition.textContent).toEqual('')

    const sources = getByTestId('glossaryEntrySources')
    expect(sources.textContent).toEqual('')
  })

  it('can be openend', () => {
    const { getByRole } = render(
      <GlossaryEntry
        expandedList={mockGlossaryAccordionEntryProps2.expandedList}
        setExpandedList={mockGlossaryAccordionEntryProps2.setExpandedList}
        {...mockGlossaryAccordionEntryProps2}
      />
    )
    fireEvent.click(getByRole('button'))
    expect(mockGlossaryAccordionEntryProps2.setExpandedList).toHaveBeenCalled()
  })

  it('can be closed', () => {
    const { getByRole } = render(
      <GlossaryEntry
        expandedList={mockGlossaryAccordionEntryProps.expandedList}
        setExpandedList={mockGlossaryAccordionEntryProps.setExpandedList}
        {...mockGlossaryAccordionEntryProps}
      />
    )
    fireEvent.click(getByRole('button'))
    expect(mockGlossaryAccordionEntryProps.setExpandedList).toHaveBeenCalled()
  })
})
