import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as router from 'react-router'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BreadcrumbsContainer from './BreadcrumbsContainer'

describe('[HASKI-REQ-0088] BreadcrumbsContainer', () => {
  const navigate = jest.fn()

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('should render the default breadcrumb with default path', async () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['']}>
        <BreadcrumbsContainer />
      </MemoryRouter>
    )
    expect(getAllByText('pages.home').length).toEqual(1)

    // click first link:
    await act(async () => {
      fireEvent.click(getAllByText('pages.home')[0])
    })
    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('should render and navigate to home when clicking on home link', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/example/path']}>
        <BreadcrumbsContainer />
      </MemoryRouter>
    )

    // click the "Home" link:
    fireEvent.click(getByText('pages.home'))

    // Expect that the navigate function was called with '/'
    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('should render a longer breadcrumb', async () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['/hello/example/path']}>
        <BreadcrumbsContainer />
      </MemoryRouter>
    )
    expect(getAllByText('pages.example').length).toEqual(1)
    expect(getAllByText('/').length).toEqual(3)

    fireEvent.click(getAllByText('pages.example')[0])
    expect(navigate).toHaveBeenCalled()
  })

  it('should render a longer breadcrumb, with number in it', async () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['/hello/example/2/path']}>
        <BreadcrumbsContainer />
      </MemoryRouter>
    )
    expect(getAllByText('pages.example').length).toEqual(1)
    expect(getAllByText('/').length).toEqual(3)

    fireEvent.click(getAllByText('pages.example')[0])
    expect(navigate).toHaveBeenCalled()
  })

  it('number in path is not represented in Breadcrumbs', async () => {
    const { getAllByText, queryByText } = render(
      <MemoryRouter initialEntries={['/hello/example/2/topic/3/path']}>
        <BreadcrumbsContainer />
      </MemoryRouter>
    )
    expect(getAllByText('pages.example').length).toEqual(1)
    expect(getAllByText('/').length).toEqual(4)

    expect(queryByText('2')).not.toBeInTheDocument()
  })

  it('multiple numbers in path are not represented in Breadcrumbs', async () => {
    const { getAllByText, queryByText } = render(
      <MemoryRouter initialEntries={['/hello/example/2/3/path']}>
        <BreadcrumbsContainer />
      </MemoryRouter>
    )
    expect(getAllByText('/').length).toEqual(3)

    expect(queryByText('2')).not.toBeInTheDocument()
    expect(queryByText('3')).not.toBeInTheDocument()
  })

  it('renders course and topic names from ids in the URL', async () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['/course/1/topic/1']}>
        <Routes>
          <Route path="/course/:courseId/topic/:topicId" element={<BreadcrumbsContainer />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(async () =>
      act(async () => {
        fireEvent.click(getAllByText('pages.home')[0])
      })
    )

    await waitFor(() => {
      expect(screen.getByText('pages.home')).toBeInTheDocument()
      expect(screen.getByText('test')).toBeInTheDocument()
      expect(screen.getByText('Wirtschaftsinformatik')).toBeInTheDocument()
    })
  })

  it('renders course name and does not fetch topics when topicId is missing', async () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['/course/1']}>
        <Routes>
          <Route path="/course/:courseId" element={<BreadcrumbsContainer />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(async () =>
      act(async () => {
        fireEvent.click(getAllByText('pages.home')[0])
      })
    )

    await waitFor(() => {
      expect(screen.getByText('pages.home')).toBeInTheDocument()
      expect(screen.getByText('test')).toBeInTheDocument()
    })
  })
})
