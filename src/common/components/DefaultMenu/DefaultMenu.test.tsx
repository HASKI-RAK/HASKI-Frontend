import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Menu from './DefaultMenu'

describe('[HASKI-REQ-0086] DefaultMenu tests', () => {
  test('DefaultMenu renders correctly', () => {
    const menu = render(
      <MemoryRouter>
        <Menu open={true} anchorEl={document.body} />
      </MemoryRouter>
    )

    expect(menu).toBeTruthy()
  })
})
