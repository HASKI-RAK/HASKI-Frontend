import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CollapsibleList from './CollapsibleList'

describe('[HASKI-REQ-0086] CollapsibleList', () => {
  it('renders without input', () => {
    const collapsibleList = render(<CollapsibleList />)
    expect(collapsibleList).toBeTruthy()
  })

  it('renders with input', () => {
    const mockProps = {
      header: 'test',
      content: [{ header: 'test1', body: ['test2'] }]
    }

    const { getByText } = render(
      <MemoryRouter>
        <CollapsibleList {...mockProps} />
      </MemoryRouter>
    )
    expect(getByText(mockProps.content[0].header)).toBeInTheDocument()
    expect(getByText(mockProps.content[0].body[0])).toBeInTheDocument()
  })
})
