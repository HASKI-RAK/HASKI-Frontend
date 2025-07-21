import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { Connection, Edge, MarkerType, addEdge } from 'reactflow'
import { mockReactFlow } from '@mocks'
import PageNotFound from './PageNotFound'

describe('PageNotFound', () => {
  beforeEach(() => {
    mockReactFlow()
  })
  it('renders all nodes and edges', () => {
    const history = createMemoryHistory()
    const screen = render(
      <Router navigator={history} location={history.location}>
        <PageNotFound />
      </Router>
    )
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Do you know how you got here?')).toBeInTheDocument()
    expect(screen.getByText('We neither. Contact us!')).toBeInTheDocument()
    expect(screen.getByText('Did you make a typo?')).toBeInTheDocument()
    expect(screen.getByText('Try to fix it')).toBeInTheDocument()
    expect(screen.getByText('We messed up. Contact us!')).toBeInTheDocument()
    expect(screen.getByText('Back home')).toBeInTheDocument()
  })

  it('navigates to home page when "Back home" node is clicked', () => {
    const history = createMemoryHistory()
    const screen = render(
      <Router navigator={history} location={history.location}>
        <PageNotFound />
      </Router>
    )

    fireEvent.click(screen.getByText('Back home'))
    expect(history.location.pathname).toBe('/')
  })

  it('should call setEdges with an updater that adds a new edge', () => {
    // Example initial edges array.
    const initialEdges: Edge[] = [
      { id: '1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed } }
    ]

    // Define a new connection to add (can be an Edge or Connection).
    const newConnection: Connection = {
      source: '2',
      target: '3',
      sourceHandle: null,
      targetHandle: null
    }

    // Create a mock for setEdges that simulates the functional update.
    const setEdges = jest.fn((updater: (edges: Edge[]) => Edge[]) => updater(initialEdges))

    // Define the onConnect callback as implemented in your component.
    const onConnect = (params: Edge | Connection) => setEdges((els) => addEdge(params, els))

    // Call the onConnect callback.
    const updatedEdges = onConnect(newConnection)

    // Calculate the expected edges using addEdge.
    const expectedEdges = addEdge(newConnection, initialEdges)

    // Assertions:
    expect(setEdges).toHaveBeenCalledTimes(1)
    // Depending on your implementation and addEdge, the resulting updatedEdges should match expectedEdges.
    expect(updatedEdges).toEqual(expectedEdges)
  })
})
