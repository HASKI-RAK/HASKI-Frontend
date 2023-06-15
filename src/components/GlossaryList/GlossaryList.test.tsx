import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { TestGlossaryListProps, TestGlossaryList } from './GlossaryList'

describe('GlossaryList', () => {
  const mockPropsNorm: TestGlossaryListProps = {
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

  test('renders without crashing', () => {
    const { getByTestId } = render(<TestGlossaryList {...mockPropsNorm} />)

    const glossaryEntriesAsString = mockPropsNorm.glossaryEntries
      ?.map((entry) => {
        const tagsAsString = entry.tags?.join('')
        const sourcesAsString = entry.sources ? `pages.glossary.sources${entry.sources}` : ''

        return `${entry.term}${tagsAsString}${entry.definition}${sourcesAsString}`
      })
      .join('')

    expect(getByTestId('GlossaryList').textContent?.length).toEqual(glossaryEntriesAsString?.length)
  })
})
