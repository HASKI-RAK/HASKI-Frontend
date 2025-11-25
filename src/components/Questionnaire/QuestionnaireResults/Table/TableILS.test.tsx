import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import TableILS, { ILSDimension, ILSInterpretation } from './TableILS'

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

//we have to mock react-i18next otherwise a warning will appear
//"You will need pass in an i18next instance by using initReactI18next" => mock is needed.

describe('[HASKI-REQ-0007] Test TableILS with all Methods', () => {
  test('Table values are correct', () => {
    const { getAllByRole } = render(<TableILS data={mockILS} />)

    expect(getAllByRole('columnheader')[0]).toHaveTextContent('components.TableILS.dimension')
    expect(getAllByRole('columnheader')[1]).toHaveTextContent('')
    expect(getAllByRole('columnheader')[2]).toHaveTextContent('components.TableILS.interpretation')
    expect(getAllByRole('columnheader')[3]).toHaveTextContent('components.TableILS.score')
    expect(getAllByRole('cell')[1]).toHaveTextContent('components.TableILS.active')
    expect(getAllByRole('cell')[0]).toHaveTextContent('components.TableILS.reflective')
    expect(getAllByRole('cell')[5]).toHaveTextContent('components.TableILS.sensory')
    expect(getAllByRole('cell')[4]).toHaveTextContent('components.TableILS.intuitive')
    expect(getAllByRole('cell')[9]).toHaveTextContent('components.TableILS.visual')
    expect(getAllByRole('cell')[8]).toHaveTextContent('components.TableILS.verbal')
    expect(getAllByRole('cell')[13]).toHaveTextContent('components.TableILS.sequential')
    expect(getAllByRole('cell')[12]).toHaveTextContent('components.TableILS.global')
  })

  test('Dimension interpretation is correct', () => {
    expect(ILSInterpretation(-1, 'components.TableILS.reflective')).toBe('components.TableILS.balanced')
    expect(ILSInterpretation(1, 'components.TableILS.reflective')).toBe('components.TableILS.balanced')
    expect(ILSInterpretation(-3, 'components.TableILS.reflective')).toBe('components.TableILS.balanced')
    expect(ILSInterpretation(3, 'components.TableILS.reflective')).toBe('components.TableILS.balanced')
    expect(ILSInterpretation(-5, 'components.TableILS.reflective')).toBe(
      'components.TableILS.moderate components.TableILS.reflective'
    )
    expect(ILSInterpretation(5, 'components.TableILS.reflective')).toBe(
      'components.TableILS.moderate components.TableILS.reflective'
    )
    expect(ILSInterpretation(-7, 'components.TableILS.reflective')).toBe(
      'components.TableILS.moderate components.TableILS.reflective'
    )
    expect(ILSInterpretation(7, 'components.TableILS.reflective')).toBe(
      'components.TableILS.moderate components.TableILS.reflective'
    )
    expect(ILSInterpretation(-9, 'components.TableILS.reflective')).toBe(
      'components.TableILS.strong components.TableILS.reflective'
    )
    expect(ILSInterpretation(9, 'components.TableILS.reflective')).toBe(
      'components.TableILS.strong components.TableILS.reflective'
    )
    expect(ILSInterpretation(-11, 'components.TableILS.reflective')).toBe(
      'components.TableILS.strong components.TableILS.reflective'
    )
    expect(ILSInterpretation(11, 'components.TableILS.reflective')).toBe(
      'components.TableILS.strong components.TableILS.reflective'
    )

    expect(ILSInterpretation(-1, 'components.TableILS.reflective', true)).toBe(
      'balanced components.TableILS.reflective'
    )
    expect(ILSInterpretation(1, 'components.TableILS.reflective', true)).toBe('balanced components.TableILS.reflective')
    expect(ILSInterpretation(-3, 'components.TableILS.reflective', true)).toBe(
      'balanced components.TableILS.reflective'
    )
    expect(ILSInterpretation(3, 'components.TableILS.reflective', true)).toBe('balanced components.TableILS.reflective')
    expect(ILSInterpretation(-5, 'components.TableILS.reflective', true)).toBe(
      'moderate components.TableILS.reflective'
    )
    expect(ILSInterpretation(5, 'components.TableILS.reflective', true)).toBe('moderate components.TableILS.reflective')
    expect(ILSInterpretation(-7, 'components.TableILS.reflective', true)).toBe(
      'moderate components.TableILS.reflective'
    )
    expect(ILSInterpretation(7, 'components.TableILS.reflective', true)).toBe('moderate components.TableILS.reflective')
    expect(ILSInterpretation(-9, 'components.TableILS.reflective', true)).toBe('strong components.TableILS.reflective')
    expect(ILSInterpretation(9, 'components.TableILS.reflective', true)).toBe('strong components.TableILS.reflective')
    expect(ILSInterpretation(-11, 'components.TableILS.reflective', true)).toBe('strong components.TableILS.reflective')
    expect(ILSInterpretation(11, 'components.TableILS.reflective', true)).toBe('strong components.TableILS.reflective')
  })

  test('Returned dimensions are correct', () => {
    expect(ILSDimension(1, 3)).toBe('components.TableILS.active')
    expect(ILSDimension(1, -3)).toBe('components.TableILS.reflective')
    expect(ILSDimension(2, 3)).toBe('components.TableILS.sensory')
    expect(ILSDimension(2, -3)).toBe('components.TableILS.intuitive')
    expect(ILSDimension(3, 3)).toBe('components.TableILS.visual')
    expect(ILSDimension(3, -3)).toBe('components.TableILS.verbal')
    expect(ILSDimension(4, 3)).toBe('components.TableILS.sequential')
    expect(ILSDimension(4, -3)).toBe('components.TableILS.global')

    expect(ILSDimension(1, 3, true)).toBe('active')
    expect(ILSDimension(1, -3, true)).toBe('reflective')
    expect(ILSDimension(2, 3, true)).toBe('sensory')
    expect(ILSDimension(2, -3, true)).toBe('intuitive')
    expect(ILSDimension(3, 3, true)).toBe('visual')
    expect(ILSDimension(3, -3, true)).toBe('verbal')
    expect(ILSDimension(4, 3, true)).toBe('sequential')
    expect(ILSDimension(4, -3, true)).toBe('global')

    expect(ILSDimension(100, 3)).toBe('No dimension found')
    expect(ILSDimension(100, 3, true)).toBe('No dimension found')
  })

  test('Table Score-values are numbers', () => {
    const { getAllByRole } = render(<TableILS data={mockILS} />)

    const cell3 = getAllByRole('cell')[3].textContent
    let cell3Int
    if (cell3 !== null) {
      cell3Int = parseInt(cell3)
    }

    const cell7 = getAllByRole('cell')[7].textContent
    let cell7Int
    if (cell7 !== null) {
      cell7Int = parseInt(cell7)
    }

    const cell11 = getAllByRole('cell')[11].textContent
    let cell11Int
    if (cell11 !== null) {
      cell11Int = parseInt(cell11)
    }

    const cell15 = getAllByRole('cell')[15].textContent
    let cell15Int
    if (cell15 !== null) {
      cell15Int = parseInt(cell15)
    }

    expect(cell3Int).toBeGreaterThanOrEqual(-11)
    expect(cell7Int).toBeGreaterThanOrEqual(-11)
    expect(cell11Int).toBeGreaterThanOrEqual(-11)
    expect(cell15Int).toBeGreaterThanOrEqual(-11)
  })
})

// tests for mui can be found https://github.com/mui/material-ui/blob/master/packages/mui-material/src
