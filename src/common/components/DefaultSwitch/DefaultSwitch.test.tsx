import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Switch from './DefaultSwitch'

describe('DefaultSwitch tests', () => {
  test('DefaultSwitch renders correctly', async () => {
    const textField = render(
      <MemoryRouter>
        <Switch value={'test'} />
      </MemoryRouter>
    )

    expect(textField).toBeTruthy()
  })
})
