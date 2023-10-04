import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Footer from './Footer'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import * as router from 'react-router'

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
    expect(getByText(new Date().getFullYear())).toBeInTheDocument()

    // click on every button:
    getAllByRole('button').forEach((button) => {
      fireEvent.click(button)
    })

    expect(navigate).toHaveBeenCalledTimes(6)
  })
})
