import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Modal from './DefaultModal'

describe('DefaultModal tests', () => {
  test('DefaultModal renders correctly', () => {
    const modal = render(
      <MemoryRouter>
        <Modal open={true}>
          <></>
        </Modal>
      </MemoryRouter>
    )
    
    expect(modal).toBeTruthy()
  })
})
