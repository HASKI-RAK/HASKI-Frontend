import { render } from '@testing-library/react'
import React from 'react'
import SkeletonList from './SkeletonList'

// Adjust the import path accordingly

describe('[HASKI-REQ-0086] SkeletonList component', () => {
  it('renders skeleton items', () => {
    const container = render(<SkeletonList />)

    expect(container).toBeTruthy()
  })
})
