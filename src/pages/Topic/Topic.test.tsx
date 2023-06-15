import { act, render, renderHook, fireEvent, screen } from '@testing-library/react'
import { LearningPathLearningElementNode, nodeTypes } from '@components'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import ReactFlow, { Node, Edge, MiniMap, Controls, Background, WrapNodeProps, NodeProps } from 'reactflow'
import { DefaultBox as Box, DefaultSkeleton as Skeleton } from '@common/components'
// import 'reactflow/dist/base.css'
import { mockReactFlow } from '__mocks__/ResizeObserver'
import { Router } from 'react-router-dom'
import Topic from './Topic'
import { AuthContext } from '@services'

beforeEach(() => {
  mockReactFlow()
})

describe('Topic tests', () => {
  it('auth is false', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    render(
      <Router location={history.location} navigator={history}>
        <AuthContext.Provider value={{ isAuth: false, setIsAuth: jest.fn(), logout: jest.fn() }}>
          <Topic />
        </AuthContext.Provider>
      </Router>
    )

    // timeout beenden
  })

  it('auth is true', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    render(
      <Router location={history.location} navigator={history}>
        <AuthContext.Provider value={{ isAuth: true, setIsAuth: jest.fn(), logout: jest.fn() }}>
          <Topic />
        </AuthContext.Provider>
      </Router>
    )
  })
})
