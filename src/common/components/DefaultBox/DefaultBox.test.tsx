import { render, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ImageWrapper from './ImageWrapper'
import NodeWrapper from './NodeWrapper'
import '@testing-library/jest-dom'
import { xAPI } from '@services'

describe('DefaultBox tests', () => {
  test('ImageWrapper sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByTestId } = render(
      <MemoryRouter>
        <ImageWrapper data-testid="imageWrapper" />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('imageWrapper'))

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })

  test('NodeWrapper sends statement on click', async () => {
    const sendStatement = jest.fn()
    jest.spyOn(xAPI, 'sendStatement').mockImplementation(sendStatement)

    const { getByTestId } = render(
      <MemoryRouter>
        <NodeWrapper data-testid="nodeWrapper" />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('nodeWrapper'))

    await waitFor(() => {
      expect(sendStatement).toHaveBeenCalled()
    })
  })
})
