import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import ImageWrapper from './ImageWrapper'
import NodeWrapper from './NodeWrapper'

describe('DefaultBox tests', () => {
  test('ImageWrapper sends statement on click', async () => {
    const usePersistedStore = jest.fn().mockReturnValue({
      state: {
        getXAPI: () => ({
          sendStatement: jest.fn()
        })
      }
    })

    jest.mock('@store', () => ({
      ...jest.requireActual('@store'),
      usePersistedStore: () => usePersistedStore
    }))

    const sendStatement = usePersistedStore().state.getXAPI.sendStatement

    const { getByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <ImageWrapper data-testid="imageWrapper" />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.click(getByTestId('imageWrapper'))
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })

  test('NodeWrapper sends statement on click', async () => {
    const usePersistedStore = jest.fn().mockReturnValue({
      state: {
        getXAPI: () => ({
          sendStatement: jest.fn()
        })
      }
    })

    jest.mock('@store', () => ({
      ...jest.requireActual('@store'),
      usePersistedStore: () => usePersistedStore
    }))

    const sendStatement = usePersistedStore().state.getXAPI.sendStatement

    const { getByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <NodeWrapper data-testid="nodeWrapper" />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    act(() => {
      fireEvent.click(getByTestId('nodeWrapper'))
      waitFor(() => {
        expect(sendStatement).toHaveBeenCalled()
      })
    })
  })
})
