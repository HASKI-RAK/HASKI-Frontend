import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ImageWrapper from './ImageWrapper'
import NodeWrapper from './NodeWrapper'
import '@testing-library/jest-dom'
import { xAPI, AuthContext } from '@services'

describe('DefaultBox tests', () => {
  test('ImageWrapper sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

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
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

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
