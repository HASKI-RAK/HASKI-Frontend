import React from 'react'
import { render, screen, renderHook, act, fireEvent } from '@testing-library/react'
import GlossaryForm, { GlossaryFormProps } from './GlossaryForm'
import { GlossaryEntryProps } from '@components'
import { useGlossaryFormHookParams, GlossaryFormHookReturn, useGlossaryForm } from './GlossaryForm.hooks'

const mockGlossaryEntryProps: GlossaryEntryProps[] = [
  { term: 'term1', definition: 'definition1', sources: 'source1', tags: ['TaG1'], fundamental: true },
  { term: 'term2', definition: 'definition2', sources: 'source2', tags: ['tag11', 'tag12'], fundamental: false },
  { term: 'TeRm3', definition: 'dEfIniTioN3', sources: 'SoUrcE3', tags: [], fundamental: false }
]

describe('GlossaryForm tests', () => {

  test('functionality of hooks', () => {
    const { result } = renderHook(() => useGlossaryForm())

    expect(result.current).toMatchObject({
      glossaryState: {
        expandedList: [],
        searchQuery: '',
        selectedIndexElement: '',
        selectedTags: [],
        setExpandedList: expect.any(Function),
        setSearchQuery: expect.any(Function),
        setSelectedIndexElement: expect.any(Function),
        setSelectedTags: expect.any(Function)
      },
      filterByTags: expect.any(Function),
      filterByIndexElement: expect.any(Function),
      searchByQuery: expect.any(Function),
      collapseAll: expect.any(Function),
      expandAll: expect.any(Function)
    })

    const entriesFilteredByTags = result.current.filterByTags(['tag12', 'tag12'], mockGlossaryEntryProps)
    expect(entriesFilteredByTags).toMatchObject([
      { term: 'term2', definition: 'definition2', sources: 'source2', tags: ['tag11', 'tag12'], fundamental: false }
    ])
    act(() => {
      result.current.glossaryState.setExpandedList!(['term1'])
    })
    expect(result.current.glossaryState.expandedList).toStrictEqual(['term1'])


    const entriesFilteredByIndexElement = result.current.filterByIndexElement('t', mockGlossaryEntryProps)
    expect(entriesFilteredByIndexElement).toMatchObject([
      { term: 'term1', definition: 'definition1', sources: 'source1', tags: ['TaG1'], fundamental: true },
      { term: 'term2', definition: 'definition2', sources: 'source2', tags: ['tag11', 'tag12'], fundamental: false },
      { term: 'TeRm3', definition: 'dEfIniTioN3', sources: 'SoUrcE3', tags: [], fundamental: false }
    ])


    const entriesSearchedByQuery = result.current.searchByQuery(mockGlossaryEntryProps)
    expect(entriesSearchedByQuery).toMatchObject(mockGlossaryEntryProps)
    act(() => {
      result.current.glossaryState.setSearchQuery!('term1')
    })
    expect(result.current.glossaryState.searchQuery).toStrictEqual('term1')

    const entriesCollapsed = result.current.collapseAll()
    expect(result.current.collapseAll).toBeCalled

    const entriesExpanded = result.current.expandAll(mockGlossaryEntryProps)
    expect(result.current.expandAll).toBeCalled


    act(() => {
      result.current.glossaryState.setExpandedList!(['term1', 'term2'])
    })
    expect(result.current.glossaryState.expandedList).toStrictEqual(['term1', 'term2'])

    act(() => {
      result.current.glossaryState.setSearchQuery!('SearchQuery')
    })
    expect(result.current.glossaryState.searchQuery).toStrictEqual('SearchQuery')

    act(() => {
      result.current.glossaryState.setSelectedIndexElement!('SelectedIndexElement')
    })
    expect(result.current.glossaryState.selectedIndexElement).toStrictEqual('SelectedIndexElement')

    act(() => {
      result.current.glossaryState.setSelectedTags!(['SelectedTag1', 'SelectedTag2'])
    })
    expect(result.current.glossaryState.selectedTags).toStrictEqual(['SelectedTag1', 'SelectedTag2'])
  })

  it('GlossaryForm collapseAll Button', () => {
    const { getByText } = render(<GlossaryForm />)
    const button = getByText('pages.glossary.collapseAll')

    fireEvent.click(button)
    expect(button).toBeCalled
  })

  it('GlossaryForm expandAll Button', () => {
    const { getByText } = render(<GlossaryForm />)
    const button = getByText('pages.glossary.expandAll')

    fireEvent.click(button)
    expect(button).toBeCalled
  })

  it('GlossaryForm hooks selectedIndexElement == pages.glossary.fundamentals', () => {
    const { result } = renderHook(() => useGlossaryForm())

    const entriesFilteredByIndexElement = result.current.filterByIndexElement('pages.glossary.fundamentals', mockGlossaryEntryProps)
    act(() => {
      result.current.glossaryState.setSelectedIndexElement!('pages.glossary.fundamentals')
    })
    expect(result.current.glossaryState.selectedIndexElement).toStrictEqual('pages.glossary.fundamentals')

  })

  it('GlossaryForm there is a term with the selected Index Element', () => {
    const { result } = renderHook(() => useGlossaryForm())
    act(() => {
    result.current.glossaryState.setSelectedIndexElement!(mockGlossaryEntryProps[0].term!)
    result.current.glossaryState.setSearchQuery!(mockGlossaryEntryProps[0].term!)
  })
    expect(result.current.glossaryState.selectedIndexElement).toStrictEqual(mockGlossaryEntryProps[0].term!)
    const test = result.current.searchByQuery(mockGlossaryEntryProps);

    expect(test).toMatchObject([{ term: 'term1', definition: 'definition1', sources: 'source1', tags: ['TaG1'], fundamental: true }])
  })

  it('GlossaryForm searchQuery case-insensitive match, search by different elements', () => {
    const { result } = renderHook(() => useGlossaryForm())

    act(() => {
      result.current.glossaryState.setSearchQuery!('tErM1')
    })
    expect(result.current.glossaryState.searchQuery).toStrictEqual('tErM1')
    const test1 = result.current.searchByQuery(mockGlossaryEntryProps);
    expect(test1).toMatchObject([{ term: 'term1', definition: 'definition1', sources: 'source1', tags: ['TaG1'], fundamental: true }])

    act(() => {
      result.current.glossaryState.setSearchQuery!('DeFiNiTiOn1')
    })
    expect(result.current.glossaryState.searchQuery).toStrictEqual('DeFiNiTiOn1')
    const test2 = result.current.searchByQuery(mockGlossaryEntryProps);
    expect(test2).toMatchObject([{ term: 'term1', definition: 'definition1', sources: 'source1', tags: ['TaG1'], fundamental: true }])

    act(() => {
      result.current.glossaryState.setSearchQuery!('sOuRcE1')
    })
    expect(result.current.glossaryState.searchQuery).toStrictEqual('sOuRcE1')
    const test3 = result.current.searchByQuery(mockGlossaryEntryProps);
    expect(test3).toMatchObject([{ term: 'term1', definition: 'definition1', sources: 'source1', tags: ['TaG1'], fundamental: true }])

    act(() => {
      result.current.glossaryState.setSearchQuery!('tAg1')
    })
    expect(result.current.glossaryState.searchQuery).toStrictEqual('tAg1')
    const test4 = result.current.searchByQuery(mockGlossaryEntryProps);
    expect(test4).toMatchObject([{ term: 'term1', definition: 'definition1', sources: 'source1', tags: ['TaG1'], fundamental: true }, { term: 'term2', definition: 'definition2', sources: 'source2', tags: ['tag11', 'tag12'], fundamental: false }])

  })
})
