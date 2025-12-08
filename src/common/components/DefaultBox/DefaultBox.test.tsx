import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ImageWrapper from './ImageWrapper'
import NodeWrapper from './NodeWrapper'

describe('[HASKI-REQ-0086] DefaultBox tests', () => {
  test('ImageWrapper renders correctly', async () => {
    const box = render(
      <MemoryRouter>
        <ImageWrapper data-testid="imageWrapper" />
      </MemoryRouter>
    )

    expect(box).toBeTruthy()
  })

  test('NodeWrapper renders correctly', () => {
    const box = render(
      <MemoryRouter>
        <NodeWrapper data-testid="nodeWrapper" />
      </MemoryRouter>
    )

    expect(box).toBeTruthy()
  })
})
