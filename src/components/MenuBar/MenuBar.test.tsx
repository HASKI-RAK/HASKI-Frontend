import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import MenuBar from './MenuBar'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

describe('MenuBar', () => {
  it('should return to home when clicked on logo or text', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })
    const result = render(
      <Router location={history.location} navigator={history}>
        <MenuBar />
      </Router>
    )
    // click on img:
    fireEvent.click(result.getAllByRole('img')[0])
    expect(history.location.pathname).toEqual('/')

    history.push('/home')

    // click on component a with text HASKI:
    fireEvent.click(result.getAllByText('HASKI')[0])
    expect(history.location.pathname).toEqual('/')
  })

  test('popover is rendered when Topics button is clicked', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })
    const result = render(
      <Router location={history.location} navigator={history}>
        <MenuBar />
      </Router>
    )
    // click on Topics button:
    fireEvent.click(result.getAllByText('Topics')[0])
    expect(result.getByText('Design patterns')).toBeInTheDocument()

    // click on subtopic:
    fireEvent.click(result.getAllByText('Adapter')[0])
    // render is different from browser url. in browser url is /topics/Design%20patterns/Adapter
    expect(history.location.pathname).toEqual('/topics/Design patterns/Adapter')
  })

  test('click on HelpIcon should open popover', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })
    const result = render(
      <Router location={history.location} navigator={history}>
        <MenuBar />
      </Router>
    )
    // click on HelpIcon:
    fireEvent.click(result.getByTestId('HelpIcon'))
    expect(result.getByTestId('HelpIcon')).toBeInTheDocument()
  })

  test('click on SettingsIcon should open popover', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })
    const result = render(
      <Router location={history.location} navigator={history}>
        <MenuBar />
      </Router>
    )
    // click on HelpIcon:
    fireEvent.click(result.getByTestId('SettingsIcon'))
    expect(result.getByTestId('SettingsIcon')).toBeInTheDocument()
  })

  test('click on UserIcon should open popover', () => {
    const history = createMemoryHistory({ initialEntries: ['/home'] })
    const result = render(
      <Router location={history.location} navigator={history}>
        <MenuBar />
      </Router>
    )

    // click on UserIcon:
    fireEvent.click(result.getByTestId('useravatar'))

    expect(result.getAllByTestId('usermenuitem').length).toBeGreaterThan(0)

    // click on first element of popover:
    fireEvent.click(result.getAllByTestId('usermenuitem')[0])
    // TODO 📑: will be implemented in the future. Current menu is mock.
  })
})
