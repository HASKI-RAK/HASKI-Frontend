import { render } from '@testing-library/react'
import React from 'react'
import SkeletonList from './SkeletonList'

// Adjust the import path accordingly

describe('SkeletonList component', () => {
  it('renders skeleton items', () => {
    const container = render(<SkeletonList />)

    expect(container).toBeTruthy()
  })
})
