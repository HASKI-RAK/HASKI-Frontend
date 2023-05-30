import React from 'react'
import { render, screen, renderHook, act } from '@testing-library/react'
import GlossaryForm, { GlossaryFormProps } from './GlossaryForm'
import { GlossaryEntryProps } from '@components'
import { useGlossaryFormHookParams, GlossaryFormHookReturn, useGlossaryForm } from './GlossaryForm.hooks'

const mockGlossaryEntryProps: GlossaryEntryProps[] = [
  {
    term: 'term1',
    definition: 'definition1',
    sources: 'source1',
    tags: ['tag1'],
    fundamental: false
  },
  { term: 'term2', definition: 'definition2', sources: 'source2', tags: ['tag1', 'tag2'], fundamental: false },
  { term: 'term3', definition: 'definition3', sources: 'source3', tags: [], fundamental: false }
]

describe('GlossaryForm tests', () => {
  //GloassaryList needs unique key prop keys
  it('GlossaryForm renders', () => {
    const { getByTestId } = render(<GlossaryForm />)
    const component = getByTestId('GlossaryForm')
    expect(component).toBeInTheDocument()

    screen.debug()
  })

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

    const entriesFilteredByTags = result.current.filterByTags(['tag1', 'tag2'], mockGlossaryEntryProps)
    expect(entriesFilteredByTags).toMatchObject([
      { term: 'term2', definition: 'definition2', sources: 'source2', tags: ['tag1', 'tag2'], fundamental: false }
    ])

    act(() => {
      result.current.glossaryState.setExpandedList!(['term1'])
    })

    expect(result.current.glossaryState.expandedList).toStrictEqual(['term1'])
  })
})
