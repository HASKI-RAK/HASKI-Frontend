import '@testing-library/jest-dom'
import { act, fireEvent, render } from '@testing-library/react'
import { mockReactFlow } from '@mocks'
import { ReactFlow } from 'reactflow'
import WrappedMiniMap from './WrappedMiniMap'

describe('WrappedMiniMap component', () => {
  beforeEach(() => {
    mockReactFlow()
  })
  it('renders', () => {
    const { getByTestId } = render(
      <ReactFlow>
        <WrappedMiniMap />
      </ReactFlow>
    )
    expect(getByTestId('rf__minimap')).toBeInTheDocument()
  })

  it('resizes according to window size', () => {
    const { getByTestId } = render(
      <ReactFlow>
        <WrappedMiniMap />
      </ReactFlow>
    )
    expect(getByTestId('rf__minimap')).toHaveStyle('transform: scale(0.75) translate(1.5rem, 1.5rem)')
    act(() => {
      global.innerWidth = 1921
      fireEvent.resize(window)
    })
    expect(getByTestId('rf__minimap')).toHaveStyle('transform: scale(1.5) translate(-1.5rem, -1.5rem)')

    act(() => {
      global.innerWidth = 1920
      fireEvent.resize(window)
    })
    expect(getByTestId('rf__minimap')).toHaveStyle('transform: scale(1.2) translate(-1rem, -1rem)')

    act(() => {
      global.innerWidth = 1300
      fireEvent.resize(window)
    })
    expect(getByTestId('rf__minimap')).toHaveStyle('transform: scale(1) translate(0rem, 0rem)')

    act(() => {
      global.innerWidth = 700
      fireEvent.resize(window)
    })
    expect(getByTestId('rf__minimap')).toHaveStyle('transform: scale(0.5) translate(6rem, 5rem)')
  })
})
