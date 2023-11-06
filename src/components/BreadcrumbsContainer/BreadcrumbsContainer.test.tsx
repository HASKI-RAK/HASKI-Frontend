import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import BreadcrumbsContainer from './BreadcrumbsContainer'
import { MemoryRouter } from 'react-router-dom'
import * as router from 'react-router'
import '@testing-library/jest-dom'

const navigate = jest.fn()
describe('BreadcrumbsContainer', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('should render the default breadcrumb with default path', () => {
    const { getAllByText, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <BreadcrumbsContainer />
      </MemoryRouter>
    )
    expect(getAllByText('pages.home').length).toEqual(1)
    expect(getByText('/')).toBeInTheDocument()

    // click first link:
    fireEvent.click(getAllByText('pages.home')[0])
    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('should render a longer breadcrumb', () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['/example/path']}>
        <BreadcrumbsContainer />
      </MemoryRouter>
    )
    expect(getAllByText('pages.home').length).toEqual(1)
    expect(getAllByText('/').length).toEqual(2)

    // click first link:
    fireEvent.click(getAllByText('pages.example')[0])
    expect(navigate).toHaveBeenCalledWith('/example')
  })
})
