import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { App } from './App'

describe('App tests', () => {
  test('renders correctly', () => {
    const app = render(<App />)

    expect(app).toBeTruthy()
  })
})
