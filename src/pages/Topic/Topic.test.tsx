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
beforeEach(() => {
  mockReactFlow()

})

describe('Topic tests', () => {
  // SpyOn getUser to return a mock user
  const mock = jest.spyOn(services, 'getUser')
  mock.mockImplementation(() => {
    return Promise.resolve({
      id: 1,
      lmsUserId: 1,
      name: "string",
      role: "string",
      roleId: 1,
      settings: {
        id: 1,
        userId: 1,
        pswd: "string",
        theme: "string",
      },
      university: "string"
    })
  })

  // SpyOn getLearningPath to return a mock learning path
  const mock2 = jest.spyOn(services, 'getLearningPath')
  mock2.mockImplementation(() => {
    return Promise.resolve({
      id: 1,
      course_id: 2,
      based_on: "string",
      calculated_on: "string",
      path: [{
        id: 1,
        learningElementId: 1,
        learningPathId: 1,
        recommended: true,
        position: 1,
        learningElement: {
          id: 1,
          lmsId: 1,
          activityType: "string",
          classification: "string",
          name: "string",
          university: "string",
          createdBy: "string",
          createdAt: "string",
          lastUpdated: "string",
          studentLearningElement: {
            id: 1,
            student_id: 1,
            learning_element_id: 1,
            done: true,
            done_at: "string"
          }
        }
      }]
    })
  })

  it('auth is false', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    render(
      <Router location={history.location} navigator={history}>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
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
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Topic />
        </AuthContext.Provider>
      </Router>
    )
  })
})
