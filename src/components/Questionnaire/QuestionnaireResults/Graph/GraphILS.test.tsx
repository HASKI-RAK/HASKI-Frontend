import '@testing-library/jest-dom'
import GraphILS, { useData } from './GraphILS'
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

describe('Test GraphILS with all Methods', () => {
  test('Required data is returned in correct format', () => {
    const data = useData(mockILS)

    expect(data.length).toBe(4)

    expect(data[0].possibleDimensions).toMatch(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Global' +
        ' / ' +
        'components.Questionnaire.QuestionnaireResults.Table.TableILS.Sequential'
    )
    expect(data[1].possibleDimensions).toMatch(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Verbal' +
        ' / ' +
        'components.Questionnaire.QuestionnaireResults.Table.TableILS.Visual'
    )
    expect(data[2].possibleDimensions).toMatch(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Intuitive' +
        ' / ' +
        'components.Questionnaire.QuestionnaireResults.Table.TableILS.Sensory'
    )
    expect(data[3].possibleDimensions).toMatch(
      'components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective' +
        ' / ' +
        'components.Questionnaire.QuestionnaireResults.Table.TableILS.Active'
    )
  })

  test('GraphILS renders without crashing', () => {
    const graphILS = render(<GraphILS data={mockILS} />)

    expect(
      graphILS.getByText('components.Questionnaire.QuestionnaireResults.Table.TableILS.Active')
    ).toBeInTheDocument()
    expect(
      graphILS.getByText('components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective')
    ).toBeInTheDocument()
    expect(
      graphILS.getByText('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sensory')
    ).toBeInTheDocument()
    expect(
      graphILS.getByText('components.Questionnaire.QuestionnaireResults.Table.TableILS.Intuitive')
    ).toBeInTheDocument()
    expect(
      graphILS.getByText('components.Questionnaire.QuestionnaireResults.Table.TableILS.Visual')
    ).toBeInTheDocument()
    expect(
      graphILS.getByText('components.Questionnaire.QuestionnaireResults.Table.TableILS.Verbal')
    ).toBeInTheDocument()
    expect(
      graphILS.getByText('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sequential')
    ).toBeInTheDocument()
    expect(
      graphILS.getByText('components.Questionnaire.QuestionnaireResults.Table.TableILS.Global')
    ).toBeInTheDocument()

    expect(graphILS).toMatchSnapshot()
  })
})
