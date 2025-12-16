import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import GraphILS, { useData } from './GraphILS'

const mockILS = {
  characteristic_id: 1,
  id: 1,
  input_dimension: 'test',
  input_value: 1,
  perception_dimension: 'test',
  perception_value: 1,
  processing_dimension: 'test',
  processing_value: 1,
  understanding_dimension: 'test',
  understanding_value: 1
}

describe('[HASKI-REQ-0007] Test GraphILS with all Methods', () => {
  test('Required data is returned in correct format', () => {
    const data = useData(mockILS)

    expect(data.length).toBe(4)

    expect(data[0].possibleDimensions).toMatch('components.TableILS.global' + ' / ' + 'components.TableILS.sequential')
    expect(data[1].possibleDimensions).toMatch('components.TableILS.verbal' + ' / ' + 'components.TableILS.visual')
    expect(data[2].possibleDimensions).toMatch('components.TableILS.intuitive' + ' / ' + 'components.TableILS.sensory')
    expect(data[3].possibleDimensions).toMatch('components.TableILS.reflective' + ' / ' + 'components.TableILS.active')
  })

  test('GraphILS renders without crashing', async () => {
    const graphILS = render(<GraphILS data={mockILS} />)

    await waitFor(() => {
      expect(graphILS.getByText('components.TableILS.active')).toBeInTheDocument()
      expect(graphILS.getByText('components.TableILS.reflective')).toBeInTheDocument()
      expect(graphILS.getByText('components.TableILS.sensory')).toBeInTheDocument()
      expect(graphILS.getByText('components.TableILS.intuitive')).toBeInTheDocument()
      expect(graphILS.getByText('components.TableILS.visual')).toBeInTheDocument()
      expect(graphILS.getByText('components.TableILS.verbal')).toBeInTheDocument()
      expect(graphILS.getByText('components.TableILS.sequential')).toBeInTheDocument()
      expect(graphILS.getByText('components.TableILS.global')).toBeInTheDocument()

      expect(graphILS).toBeTruthy()
    })
  })
})
