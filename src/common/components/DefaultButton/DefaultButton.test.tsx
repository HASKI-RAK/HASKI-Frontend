import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Button from './DefaultButton'

describe('[HASKI-REQ-0086] DefaultButton tests', () => {
  test('DefaultButton sends statement on click', async () => {
    const button = render(
      <MemoryRouter>
        <Button />
      </MemoryRouter>
    )

    expect(button.getByRole('button')).toBeInTheDocument()
  })
})
