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

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

beforeEach(() => {
  jest.clearAllTimers()
  mockReactFlow()
})

describe('Topic tests', () => {
  test('getLearning fails', () => {
    const history = createMemoryHistory({ initialEntries: ['/home', '/course', '/2'] })
    jest.spyOn(services, 'getLearningPath').mockImplementation(() => {
      return Promise.reject({
        id: 1,
        courseId: 2,
        basedOn: 'string',
        calculatedOn: 'string',
        path: [
          {
            id: 1,
            learningElementId: 1,
            learningPathId: 1,
            recommended: true,
            position: 1,
            learningElement: {
              id: 1,
              lmsId: 1,
              activityType: 'KÜ',
              classification: 'KÜ',
              name: 'Kurzüberblick',
              university: 'HS-Kempten',
              createdAt: 'string',
              createdBy: 'string',
              lastUpdated: 'string',
              studentLearningElement: {
                id: 1,
                studentId: 1,
                learningElementId: 1,
                done: true,
                doneAt: 'string'
              }
            }
          }
        ]
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
