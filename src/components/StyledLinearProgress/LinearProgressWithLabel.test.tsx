import { render } from '@testing-library/react'
import LinearProgressWithLabel from './LinearProgressWithLabel'

describe('LinearProgressWithLabel', () => {
  it('renders LinearProgressWithLabel', async () => {
    const { container } = render(
      <LinearProgressWithLabel
        value={50}
        text={'this is a test'}
        textposition={{ xs: '1rem', sm: '2rem', md: '3rem', lg: '4rem', xl: '5rem', xxl: '6rem', xxxl: '7rem' }}
      />
    )

    expect(container.textContent).toBe('components.LinearProgressWithLabel.learningProgress: this is a test')
  })
})
