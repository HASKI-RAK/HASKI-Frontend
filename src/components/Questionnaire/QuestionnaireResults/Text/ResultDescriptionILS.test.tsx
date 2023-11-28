import '@testing-library/jest-dom'
import { ResultDescriptionILS } from '@components'
import { ILSDimension } from '../Table/TableILS'
import { render } from '@testing-library/react'

describe('Test ResultDescriptionILS with all Score combinations', () => {
  test('all positive dimensions are balanced', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 3
    }

    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(380, 380 + 'EverythingBalanced'.length)).toBe('EverythingBalanced')
  })

  test('all negative dimensions are balanced', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: -3,
      perception_dimension: 'test',
      perception_value: -3,
      processing_dimension: 'test',
      processing_value: -3,
      understanding_dimension: 'test',
      understanding_value: -3
    }

    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(380, 380 + 'EverythingBalanced'.length)).toBe('EverythingBalanced')
  })

  test('3 dimensions are balanced, 1 Dimension is active & moderate', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 5,
      understanding_dimension: 'test',
      understanding_value: 3
    }

    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(424, 424 + 'Active.moderate'.length)).toBe('Active.moderate')
  })

  test('3 dimensions are balanced, 1 Dimension is active & strong', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 9,
      understanding_dimension: 'test',
      understanding_value: 3
    }

    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(422, 422 + 'Active.strong'.length)).toBe('Active.strong')
  })

  test('3 dimensions are balanced, 1 Dimension is reflective & moderate', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: -5,
      understanding_dimension: 'test',
      understanding_value: 3
    }

    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(432, 432 + 'Reflective.moderate'.length)).toBe('Reflective.moderate')
  })

  test('3 dimensions are balanced, 1 Dimension is reflective & strong', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: -9,
      understanding_dimension: 'test',
      understanding_value: 3
    }

    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(430, 430 + 'Reflective.strong'.length)).toBe('Reflective.strong')
  })

  test('3 dimensions do not matter, 1 Dimension is reflective & balanced', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 5,
      perception_dimension: 'test',
      perception_value: 5,
      processing_dimension: 'test',
      processing_value: -3,
      understanding_dimension: 'test',
      understanding_value: 5
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(2037, 2037 + 'SomethingBalanced.processing'.length)).toBe(
      'SomethingBalanced.processing'
    )
  })

  test('3 dimensions are balanced, 1 Dimension is sensory & moderate', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 5,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 3
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(426, 426 + 'Sensory.moderate'.length)).toBe('Sensory.moderate')
  })

  test('3 dimensions are balanced, 1 Dimension is sensory & strong', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 9,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 3
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(424, 424 + 'Sensory.strong'.length)).toBe('Sensory.strong')
  })

  test('3 dimensions are balanced, 1 Dimension is intuitive & moderate', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: -5,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 3
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(430, 430 + 'Intuitive.moderate'.length)).toBe('Intuitive.moderate')
  })

  test('3 dimensions are balanced, 1 Dimension is intuitive & strong', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: -11,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 3
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(428, 428 + 'Intuitive.strong'.length)).toBe('Intuitive.strong')
  })

  test('3 dimensions do not matter, 1 Dimension is intuitive & balanced', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 5,
      perception_dimension: 'test',
      perception_value: -3,
      processing_dimension: 'test',
      processing_value: 5,
      understanding_dimension: 'test',
      understanding_value: 5
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(2034, 2034 + 'SomethingBalanced.perception'.length)).toBe(
      'SomethingBalanced.perception'
    )
  })

  test('3 dimensions are balanced, 1 Dimension is visual & moderate', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 5,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 3
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(424, 424 + 'Visual.moderate'.length)).toBe('Visual.moderate')
  })

  test('3 dimensions are balanced, 1 Dimension is visual & strong', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 9,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 3
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(422, 422 + 'Visual.strong'.length)).toBe('Visual.strong')
  })

  test('3 dimensions are balanced, 1 Dimension is verbal & moderate', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: -5,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 3
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(424, 424 + 'Verbal.moderate'.length)).toBe('Verbal.moderate')
  })

  test('3 dimensions are balanced, 1 Dimension is verbal & strong', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: -9,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 3
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(422, 422 + 'Verbal.strong'.length)).toBe('Verbal.strong')
  })

  test('3 dimensions do not matter, 1 Dimension is verbal & balanced', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: -3,
      perception_dimension: 'test',
      perception_value: 5,
      processing_dimension: 'test',
      processing_value: 5,
      understanding_dimension: 'test',
      understanding_value: 5
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(2037, 2037 + 'SomethingBalanced.presentation'.length)).toBe(
      'SomethingBalanced.presentation'
    )
  })

  test('3 dimensions are balanced, 1 Dimension is sequential & moderate', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 5
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(432, 432 + 'Sequential.moderate'.length)).toBe('Sequential.moderate')
  })

  test('3 dimensions are balanced, 1 Dimension is sequential & strong', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 9
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(430, 430 + 'Sequential.strong'.length)).toBe('Sequential.strong')
  })

  test('3 dimensions are balanced, 1 Dimension is global & moderate', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: -5
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(424, 424 + 'Global.moderate'.length)).toBe('Global.moderate')
  })

  test('3 dimensions are balanced, 1 Dimension is global & strong', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: -9
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(422, 422 + 'Global.strong'.length)).toBe('Global.strong')
  })

  test('3 dimensions do not matter, 1 Dimension is global & balanced', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 5,
      perception_dimension: 'test',
      perception_value: 5,
      processing_dimension: 'test',
      processing_value: 5,
      understanding_dimension: 'test',
      understanding_value: -3
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(2025, 2025 + 'SomethingBalanced.organisation'.length)).toBe(
      'SomethingBalanced.organisation'
    )
  })

  test('all dimensions moderate positive', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 5,
      perception_dimension: 'test',
      perception_value: 5,
      processing_dimension: 'test',
      processing_value: 5,
      understanding_dimension: 'test',
      understanding_value: 5
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(875, 875 + 'Sensory.moderate'.length)).toBe('Sensory.moderate')
    expect(container.innerHTML.substring(424, 424 + 'Active.moderate'.length)).toBe('Active.moderate')
    expect(container.innerHTML.substring(1325, 1325 + 'Visual.moderate'.length)).toBe('Visual.moderate')
    expect(container.innerHTML.substring(1782, 1782 + 'Sequential.moderate'.length)).toBe('Sequential.moderate')
  })

  test('all dimensions strong positive', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 9,
      perception_dimension: 'test',
      perception_value: 9,
      processing_dimension: 'test',
      processing_value: 9,
      understanding_dimension: 'test',
      understanding_value: 9
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(869, 869 + 'Sensory.strong'.length)).toBe('Sensory.strong')
    expect(container.innerHTML.substring(422, 422 + 'Active.strong'.length)).toBe('Active.strong')
    expect(container.innerHTML.substring(1315, 1315 + 'Visual.strong'.length)).toBe('Visual.strong')
    expect(container.innerHTML.substring(1768, 1768 + 'Sequential.strong'.length)).toBe('Sequential.strong')
  })

  test('all dimensions moderate negative', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: -5,
      perception_dimension: 'test',
      perception_value: -5,
      processing_dimension: 'test',
      processing_value: -5,
      understanding_dimension: 'test',
      understanding_value: -5
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(891, 891 + 'Intuitive.moderate'.length)).toBe('Intuitive.moderate')
    expect(container.innerHTML.substring(432, 432 + 'Reflective.moderate'.length)).toBe('Reflective.moderate')
    expect(container.innerHTML.substring(1343, 1343 + 'Verbal.moderate'.length)).toBe('Verbal.moderate')
    expect(container.innerHTML.substring(1792, 1792 + 'Global.moderate'.length)).toBe('Global.moderate')
  })

  test('all dimensions strong negative', () => {
    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: -9,
      perception_dimension: 'test',
      perception_value: -9,
      processing_dimension: 'test',
      processing_value: -9,
      understanding_dimension: 'test',
      understanding_value: -9
    }
    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => ILSDimension(n, b, c)}
      />
    )

    expect(container.innerHTML.substring(885, 885 + 'Intuitive.strong'.length)).toBe('Intuitive.strong')
    expect(container.innerHTML.substring(430, 430 + 'Reflective.strong'.length)).toBe('Reflective.strong')
    expect(container.innerHTML.substring(1333, 1333 + 'Verbal.strong'.length)).toBe('Verbal.strong')
    expect(container.innerHTML.substring(1778, 1778 + 'Global.strong'.length)).toBe('Global.strong')
  })

  test(' 3 Switch case', () => {
    jest.mock('react-i18next', () => ({
      // this mock makes sure any components using the translate-hook can use it without a warning being shown
      useTranslation: () => {
        return {
          t: (str: string) => {
            if (str === 'components.Questionnaire.QuestionnaireResults.TableILS.balanced') return 'Active.balanced'
            else return str.substring(61, str.length)
          },
          i18n: {
            //changeLanguage: () => new Promise(() => {}),
            getFixedT: () => (str: string) => {
              if (str === 'components.Questionnaire.QuestionnaireResults.TableILS.balanced') return 'balanced'
              else return str.substring(61, str.length)
            }
            // You can include here any property your component may use
          }
        }
      }
    }))

    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 9
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // Modify the mock implementation of fetchILSDimension
    const fetchILSDimension = jest.fn().mockImplementation((dim, score, something) => {
      return 'Active' // Return the desired string directly
    })

    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => fetchILSDimension(1, 1, true)}
      />
    )

    expect(container.innerHTML.substring(854, 854 + 'Part1 '.length)).toBe('Part1 ')
    expect(container.innerHTML.substring(1042, 1042 + 'Part2 '.length)).toBe('Part2 ')
    expect(container.innerHTML.substring(1454, 1454 + 'Part3'.length)).toBe('Part3')
  })

  test('Switch default case', () => {
    jest.mock('react-i18next', () => ({
      // this mock makes sure any components using the translate-hook can use it without a warning being shown
      useTranslation: () => {
        return {
          t: (str: string) => {
            if (str === 'components.Questionnaire.QuestionnaireResults.TableILS.balanced') return 'Active.balanced'
            else return str.substring(61, str.length)
          },
          i18n: {
            //changeLanguage: () => new Promise(() => {}),
            getFixedT: () => (str: string) => {
              if (str === 'components.Questionnaire.QuestionnaireResults.TableILS.balanced') return 'balanced'
              else return str.substring(61, str.length)
            }
            // You can include here any property your component may use
          }
        }
      }
    }))

    const mockILS = {
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 3,
      perception_dimension: 'test',
      perception_value: 3,
      processing_dimension: 'test',
      processing_value: 3,
      understanding_dimension: 'test',
      understanding_value: 9
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // Modify the mock implementation of fetchILSDimension
    const fetchILSDimension = jest.fn().mockImplementation((dim, score, something) => {
      return 'test' // Return the desired string directly
    })

    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => fetchILSDimension(1, 1, true)}
      />
    )

    //Because the switch case is not implemented for the string "test", the default case is used, thats why there are 2 spaces after Part2
    expect(container.innerHTML.substring(1036, 1036 + 'Part2  '.length)).toBe('Part2  ')
  })
})
