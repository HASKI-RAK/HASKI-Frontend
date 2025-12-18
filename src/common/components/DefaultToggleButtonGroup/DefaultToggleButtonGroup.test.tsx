import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ToggleButton } from '@common/components'
import ToggleButtonGroup from './DefaultToggleButtonGroup'

describe('[HASKI-REQ-0086] DefaultToggleButtonGroup tests', () => {
  test('DefaultToggleButtonGroup renders correctly', () => {
    const toggleButtonGroup = render(
      <MemoryRouter>
        <ToggleButtonGroup value={'test'}>
          <ToggleButton value={'test'} />
          <ToggleButton value={'test2'} />
        </ToggleButtonGroup>
      </MemoryRouter>
    )

    expect(toggleButtonGroup).toBeTruthy()
  })
})
