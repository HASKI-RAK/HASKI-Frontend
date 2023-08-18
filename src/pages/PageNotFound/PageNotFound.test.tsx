import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import PageNotFound from './PageNotFound'
import { mockReactFlow } from '@mocks'
import '@testing-library/jest-dom'
describe('PageNotFound', () => {
  beforeEach(() => {
    mockReactFlow()
  })
  it('renders all nodes and edges', () => {
    const history = createMemoryHistory()
    const screen = render(
      <Router navigator={history} location={history.location}>
        <PageNotFound />
      </Router>
    )
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Do you know how you got here?')).toBeInTheDocument()
    expect(screen.getByText('We neither. Contact us!')).toBeInTheDocument()
    expect(screen.getByText('Did you make a typo?')).toBeInTheDocument()
    expect(screen.getByText('Try to fix it')).toBeInTheDocument()
    expect(screen.getByText('We messed up. Contact us!')).toBeInTheDocument()
    expect(screen.getByText('Back home')).toBeInTheDocument()
  })

  it('navigates to home page when "Back home" node is clicked', () => {
    const history = createMemoryHistory()
    const screen = render(
      <Router navigator={history} location={history.location}>
        <PageNotFound />
      </Router>
    )

    fireEvent.click(screen.getByText('Back home'))
    expect(history.location.pathname).toBe('/')
  })
})
