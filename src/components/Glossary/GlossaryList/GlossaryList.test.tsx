import { render, renderHook } from '@testing-library/react'
import { useGlossaryList } from './GlossaryList.hooks'
import GlossaryList from './GlossaryList'
import '@testing-library/jest-dom'

describe('GlossaryList tests', () => {
  const mockGlossaryListProps = {
    glossaryEntries: [
      {
        term: 'testTerm 1',
        definition: 'testDefinition 1',
        sources: 'testSource 1',
        tags: ['testTag 1-1', 'testTag 1-2'],
        fundamental: true
      },
      {
        term: 'testTerm 2',
        definition: 'testDefinition 2',
        sources: 'testSource 2',
        tags: ['testTag 2-1', 'testTag 2-2'],
        fundamental: false
      }
    ],
    expandedList: ['listItem 1', 'listItem 2', 'listItem 3'],
    setExpandedList: jest.fn()
  }
  it('renders with input', () => {
    const { getByText } = render(<GlossaryList {...mockGlossaryListProps} />)

    expect(getByText(mockGlossaryListProps.glossaryEntries[0].term)).toBeInTheDocument()
    expect(getByText(mockGlossaryListProps.glossaryEntries[0].definition)).toBeInTheDocument()
    expect(getByText(mockGlossaryListProps.glossaryEntries[0].sources)).toBeInTheDocument()
    expect(getByText(mockGlossaryListProps.glossaryEntries[0].tags[0])).toBeInTheDocument()
    expect(getByText(mockGlossaryListProps.glossaryEntries[0].tags[1])).toBeInTheDocument()

    expect(getByText(mockGlossaryListProps.glossaryEntries[1].term)).toBeInTheDocument()
    expect(getByText(mockGlossaryListProps.glossaryEntries[1].definition)).toBeInTheDocument()
    expect(getByText(mockGlossaryListProps.glossaryEntries[1].sources)).toBeInTheDocument()
    expect(getByText(mockGlossaryListProps.glossaryEntries[1].tags[0])).toBeInTheDocument()
    expect(getByText(mockGlossaryListProps.glossaryEntries[1].tags[1])).toBeInTheDocument()
  })

  it('renders without input', () => {
    const { queryByText } = render(<GlossaryList />)

    expect(queryByText(mockGlossaryListProps.glossaryEntries[0].term)).toEqual(null)
    expect(queryByText(mockGlossaryListProps.glossaryEntries[0].definition)).toEqual(null)
    expect(queryByText(mockGlossaryListProps.glossaryEntries[0].sources)).toEqual(null)
    expect(queryByText(mockGlossaryListProps.glossaryEntries[0].tags[0])).toEqual(null)
    expect(queryByText(mockGlossaryListProps.glossaryEntries[0].tags[1])).toEqual(null)

    expect(queryByText(mockGlossaryListProps.glossaryEntries[1].term)).toEqual(null)
    expect(queryByText(mockGlossaryListProps.glossaryEntries[1].definition)).toEqual(null)
    expect(queryByText(mockGlossaryListProps.glossaryEntries[1].sources)).toEqual(null)
    expect(queryByText(mockGlossaryListProps.glossaryEntries[1].tags[0])).toEqual(null)
    expect(queryByText(mockGlossaryListProps.glossaryEntries[1].tags[1])).toEqual(null)
  })

  test('General functionality of GlossaryList hook', () => {
    const { result } = renderHook(() => useGlossaryList())

    expect(result.current).toStrictEqual({
      filterByTags: expect.any(Function),
      filterByIndexElement: expect.any(Function),
      searchByQuery: expect.any(Function),
      collapseAll: expect.any(Function),
      expandAll: expect.any(Function)
    })

    const glossaryEntriesFilteredByTags = result.current.filterByTags(mockGlossaryListProps.glossaryEntries, [
      'testTag 1-1'
    ])
    expect(glossaryEntriesFilteredByTags).toStrictEqual([mockGlossaryListProps.glossaryEntries[0]])

    const glossaryEntriesFilteredByIndexElement = result.current.filterByIndexElement(
      mockGlossaryListProps.glossaryEntries,
      't'
    )
    expect(glossaryEntriesFilteredByIndexElement).toStrictEqual(mockGlossaryListProps.glossaryEntries)

    const glossaryEntriesFilteredByFundamental = result.current.filterByIndexElement(
      mockGlossaryListProps.glossaryEntries,
      'pages.glossary.fundamentals'
    )
    expect(glossaryEntriesFilteredByFundamental).toStrictEqual([mockGlossaryListProps.glossaryEntries[0]])

    const glossaryEntriesSearchedByQuery = result.current.searchByQuery(
      mockGlossaryListProps.glossaryEntries,
      'testSource 2'
    )

    expect(glossaryEntriesSearchedByQuery).toStrictEqual([mockGlossaryListProps.glossaryEntries[1]])
  })
})
