import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import IconButton from './DefaultIconButton'

describe('[HASKI-REQ-0086] DefaultIconButton tests', () => {
  test('DefaultIconButton renders correctly', () => {
    const iconButton = render(
      <MemoryRouter>
        <IconButton />
      </MemoryRouter>
    )

    expect(iconButton).toBeTruthy()
  })
})
