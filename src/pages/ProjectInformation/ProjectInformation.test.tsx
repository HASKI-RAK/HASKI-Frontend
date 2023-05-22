import { render, fireEvent } from '@testing-library/react'
import ProjectInformation from './ProjectInformation'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom'

describe('Test the ProjectInformation page', () => {
  it('should render the ProjectInformation page', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/projectinformation'] })
    const { getByText } = render(
      <Router location={history.location} navigator={history}>
        <ProjectInformation />
      </Router>
    )
    fireEvent.click(getByText('pages.projectdescription'))
    expect(history.location.pathname).toBe('/projectinformation/projectdescription')
  })
})
