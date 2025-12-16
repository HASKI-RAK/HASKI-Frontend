import { MenuItem } from '@mui/material'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Select from './DefaultSelect'

describe('[HASKI-REQ-0086] DefaultSelect tests', () => {
  test('DefaultSelect renders correctly', () => {
    const select = render(
      <MemoryRouter>
        <Select value={'test'}>
          <MenuItem value={'test'} />
          <MenuItem value={'test2'} />
        </Select>
      </MemoryRouter>
    )

    expect(select).toBeTruthy()
  })
})
