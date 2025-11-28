import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CollapsibleListEntry from './CollapsibleListEntry'

describe('CollapsibleListEntry tests', () => {
  it('renders without input', () => {
    const collapsibleListEntry = render(
      <MemoryRouter>
        <CollapsibleListEntry />
      </MemoryRouter>
    )
    expect(collapsibleListEntry).toBeTruthy()
  })

  it('renders with input', () => {
    const mockProps = {
      header: 'header',
      body: ['body'],
      startAnimation: true,
      delay: 50
    }

    const { getByText } = render(
      <MemoryRouter>
        <CollapsibleListEntry {...mockProps} />
      </MemoryRouter>
    )

    expect(getByText(mockProps.header)).toBeInTheDocument()
    expect(getByText(mockProps.body[0])).toBeInTheDocument()
  })
})
