import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import * as router from 'react-router'
import { Router } from 'react-router-dom'
import Footer from './Footer'

const navigate = jest.fn()

describe('Footer', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  test('should render the footer and click on every element', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })

    const { getByText, getAllByRole } = render(
      <Router location={history.location} navigator={history}>
        <Footer />
      </Router>
    )
    expect(getByText('components.Footer.project' + ' HASKI ' + new Date().getFullYear())).toBeInTheDocument()

    // click on every button:
    getAllByRole('button').forEach((button) => {
      fireEvent.click(button)
    })

    expect(navigate).toHaveBeenCalledTimes(5)
  })
})
