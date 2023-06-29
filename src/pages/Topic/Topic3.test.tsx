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
import * as services from '@services'

describe('Topic tests', () => {
  test('getUser fails', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })

    jest.spyOn(services, 'getUser').mockImplementation(() => {
      return Promise.reject({
        id: 1,
        lmsUserId: 1,
        name: 'Theodor Test',
        role: 'Tester',
        roleId: 1,
        settings: {
          id: 1,
          userId: 1,
          pswd: 'test',
          theme: 'test'
        },
        university: 'test'
      })
    })
    act(() => {
      render(
        <Router location={history.location} navigator={history}>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Topic />
          </AuthContext.Provider>
        </Router>
      )
    })
  })
})
