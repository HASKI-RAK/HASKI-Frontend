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
    expect(getByTestId('rf__minimap')).toHaveStyle(
      'transform: scale(0.8070923574810194) translate(0.803781843829086rem, 0.803781843829086rem)'
    )
    act(() => {
      global.innerWidth = 1536
      fireEvent.resize(window)
    })
    expect(getByTestId('rf__minimap')).toHaveStyle('transform: scale(1) translate(0rem, 0rem)')
  })
})
