import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TextField from './DefaultTextField'

describe('DefaultTextField tests', () => {
  test('DefaultTextField renders correctly', async () => {
    const textField= render(
      <MemoryRouter>
        <TextField value={'test'} />
      </MemoryRouter>
    )

    expect(textField).toBeTruthy()
  })
})
