import '@testing-library/jest-dom'
import { TableILS, ILSInterpretation, ILSDimension } from './TableILS'
import { render } from '@testing-library/react'
import React from 'react'

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

describe('Test TableILS with all Methods', () => {

  test('Table values are correct', () => {
    const { getAllByRole } = render(<TableILS data={mockILS} />)

    expect(getAllByRole('columnheader')[0]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Dimension'
    )
    expect(getAllByRole('columnheader')[1]).toHaveTextContent('')
    expect(getAllByRole('columnheader')[2]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Interpretation'
    )
    expect(getAllByRole('columnheader')[3]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Score'
    )
    expect(getAllByRole('cell')[1]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Active'
    )
    expect(getAllByRole('cell')[0]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(getAllByRole('cell')[5]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Sensory'
    )
    expect(getAllByRole('cell')[4]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Intuitive'
    )
    expect(getAllByRole('cell')[9]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Visual'
    )
    expect(getAllByRole('cell')[8]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Verbal'
    )
    expect(getAllByRole('cell')[13]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Sequential'
    )
    expect(getAllByRole('cell')[12]).toHaveTextContent(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Global'
    )
  })

  test('Dimension interpretation is correct', () => {
    expect(ILSInterpretation(-1, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'
    )
    expect(ILSInterpretation(1, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'
    )
    expect(ILSInterpretation(-3, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'
    )
    expect(ILSInterpretation(3, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced'
    )
    expect(ILSInterpretation(-5, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(5, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(-7, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(7, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.moderate components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(-9, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.strong components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(9, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.strong components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(-11, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.strong components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(11, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')).toBe(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.strong components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )

    expect(ILSInterpretation(-1, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'balanced components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(1, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'balanced components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(-3, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'balanced components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(3, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'balanced components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(-5, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'moderate components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(5, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'moderate components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(-7, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'moderate components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(7, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'moderate components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(-9, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'strong components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(ILSInterpretation(9, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'strong components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
    expect(
      ILSInterpretation(-11, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)
    ).toBe('strong components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')
    expect(ILSInterpretation(11, 'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective', true)).toBe(
      'strong components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective'
    )
  })

  test('Returned dimensions are correct', () => {
    expect(ILSDimension(1, 3)).toBe('components.Questionnaire.QuestionnaireResults.Table.TableILS.Active')
    expect(ILSDimension(1, -3)).toBe('components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')
    expect(ILSDimension(2, 3)).toBe('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sensory')
    expect(ILSDimension(2, -3)).toBe('components.Questionnaire.QuestionnaireResults.Table.TableILS.Intuitive')
    expect(ILSDimension(3, 3)).toBe('components.Questionnaire.QuestionnaireResults.Table.TableILS.Visual')
    expect(ILSDimension(3, -3)).toBe('components.Questionnaire.QuestionnaireResults.Table.TableILS.Verbal')
    expect(ILSDimension(4, 3)).toBe('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sequential')
    expect(ILSDimension(4, -3)).toBe('components.Questionnaire.QuestionnaireResults.Table.TableILS.Global')

    expect(ILSDimension(1, 3, true)).toBe('Active')
    expect(ILSDimension(1, -3, true)).toBe('Reflective')
    expect(ILSDimension(2, 3, true)).toBe('Sensory')
    expect(ILSDimension(2, -3, true)).toBe('Intuitive')
    expect(ILSDimension(3, 3, true)).toBe('Visual')
    expect(ILSDimension(3, -3, true)).toBe('Verbal')
    expect(ILSDimension(4, 3, true)).toBe('Sequential')
    expect(ILSDimension(4, -3, true)).toBe('Global')

    expect(ILSDimension(100, 3)).toBe('No dimension found')
    expect(ILSDimension(100, 3, true)).toBe('No dimension found')
  })

  test('Table Score-values are numbers', () => {
    const { getAllByRole } = render(<TableILS data={mockILS}/>)

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
