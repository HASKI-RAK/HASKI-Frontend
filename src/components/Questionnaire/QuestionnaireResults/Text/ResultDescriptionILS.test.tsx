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

    expect(container.innerHTML.substring(300, 300 + 'EverythingBalanced'.length)).toBe('EverythingBalanced')
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

    expect(container.innerHTML.substring(300, 300 + 'EverythingBalanced'.length)).toBe('EverythingBalanced')
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

    expect(container.innerHTML.substring(343, 343 + 'Active.moderate'.length)).toBe('Active.moderate')
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

    expect(container.innerHTML.substring(341, 341 + 'Active.strong'.length)).toBe('Active.strong')
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

    expect(container.innerHTML.substring(351, 351 + 'Reflective.moderate'.length)).toBe('Reflective.moderate')
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

    expect(container.innerHTML.substring(349, 349 + 'Reflective.strong'.length)).toBe('Reflective.strong')
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

    expect(container.innerHTML.substring(1594, 1594 + 'SomethingBalanced.processing'.length)).toBe(
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

    expect(container.innerHTML.substring(345, 345 + 'Sensory.moderate'.length)).toBe('Sensory.moderate')
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

    expect(container.innerHTML.substring(343, 343 + 'Sensory.strong'.length)).toBe('Sensory.strong')
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

    expect(container.innerHTML.substring(349, 349 + 'Intuitive.moderate'.length)).toBe('Intuitive.moderate')
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

    expect(container.innerHTML.substring(347, 347 + 'Intuitive.strong'.length)).toBe('Intuitive.strong')
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

    expect(container.innerHTML.substring(1591, 1591 + 'SomethingBalanced.perception'.length)).toBe(
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

    expect(container.innerHTML.substring(343, 343 + 'Visual.moderate'.length)).toBe('Visual.moderate')
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

    expect(container.innerHTML.substring(341, 341 + 'Visual.strong'.length)).toBe('Visual.strong')
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

    expect(container.innerHTML.substring(343, 343 + 'Verbal.moderate'.length)).toBe('Verbal.moderate')
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

    expect(container.innerHTML.substring(341, 341 + 'Verbal.strong'.length)).toBe('Verbal.strong')
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

    expect(container.innerHTML.substring(1594, 1594 + 'SomethingBalanced.presentation'.length)).toBe(
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

    expect(container.innerHTML.substring(351, 351 + 'Sequential.moderate'.length)).toBe('Sequential.moderate')
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

    expect(container.innerHTML.substring(349, 349 + 'Sequential.strong'.length)).toBe('Sequential.strong')
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

    expect(container.innerHTML.substring(343, 343 + 'Global.moderate'.length)).toBe('Global.moderate')
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

    expect(container.innerHTML.substring(341, 341 + 'Global.strong'.length)).toBe('Global.strong')
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

    expect(container.innerHTML.substring(1582, 1582 + 'SomethingBalanced.organisation'.length)).toBe(
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

    expect(container.innerHTML.substring(713, 713 + 'Sensory.moderate'.length)).toBe('Sensory.moderate')
    expect(container.innerHTML.substring(343, 343 + 'Active.moderate'.length)).toBe('Active.moderate')
    expect(container.innerHTML.substring(1082, 1082 + 'Visual.moderate'.length)).toBe('Visual.moderate')
    expect(container.innerHTML.substring(1458, 1458 + 'Sequential.moderate'.length)).toBe('Sequential.moderate')
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

    expect(container.innerHTML.substring(707, 707 + 'Sensory.strong'.length)).toBe('Sensory.strong')
    expect(container.innerHTML.substring(341, 341 + 'Active.strong'.length)).toBe('Active.strong')
    expect(container.innerHTML.substring(1072, 1072 + 'Visual.strong'.length)).toBe('Visual.strong')
    expect(container.innerHTML.substring(1444, 1444 + 'Sequential.strong'.length)).toBe('Sequential.strong')
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

    expect(container.innerHTML.substring(729, 729 + 'Intuitive.moderate'.length)).toBe('Intuitive.moderate')
    expect(container.innerHTML.substring(351, 351 + 'Reflective.moderate'.length)).toBe('Reflective.moderate')
    expect(container.innerHTML.substring(1100, 1100 + 'Verbal.moderate'.length)).toBe('Verbal.moderate')
    expect(container.innerHTML.substring(1468, 1468 + 'Global.moderate'.length)).toBe('Global.moderate')
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

    expect(container.innerHTML.substring(723, 723 + 'Intuitive.strong'.length)).toBe('Intuitive.strong')
    expect(container.innerHTML.substring(349, 349 + 'Reflective.strong'.length)).toBe('Reflective.strong')
    expect(container.innerHTML.substring(1090, 1090 + 'Verbal.strong'.length)).toBe('Verbal.strong')
    expect(container.innerHTML.substring(1454, 1454 + 'Global.strong'.length)).toBe('Global.strong')
  })

  test(' 3 Switch case', () => {
    jest.mock('react-i18next', () => ({
      // this mock makes sure any components using the translate-hook can use it without a warning being shown
      useTranslation: () => {
        return {
          t: (str: string) => {
            if (str === 'components.TableILS.balanced') return 'Active.balanced'
            else return str.substring(20, str.length)
          },
          i18n: {
            //changeLanguage: () => new Promise(() => {}),
            getFixedT: () => (str: string) => {
              if (str === 'components.TableILS.balanced') return 'balanced'
              else return str.substring(20, str.length)
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
    // Modify the mock implementation of getILSDimension
    const getILSDimension = jest.fn().mockImplementation((dim, score, something) => {
      return 'Active' // Return the desired string directly
    })

    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => getILSDimension(1, 1, true)}
      />
    )

    expect(container.innerHTML.substring(693, 693 + 'Part1 '.length)).toBe('Part1 ')
    expect(container.innerHTML.substring(801, 801 + 'Part2 '.length)).toBe('Part2 ')
    expect(container.innerHTML.substring(1053, 1053 + 'Part3'.length)).toBe('Part3')
  })

  test('Switch default case', () => {
    jest.mock('react-i18next', () => ({
      // this mock makes sure any components using the translate-hook can use it without a warning being shown
      useTranslation: () => {
        return {
          t: (str: string) => {
            if (str === 'components.TableILS.balanced') return 'Active.balanced'
            else return str.substring(20, str.length)
          },
          i18n: {
            //changeLanguage: () => new Promise(() => {}),
            getFixedT: () => (str: string) => {
              if (str === 'components.TableILS.balanced') return 'balanced'
              else return str.substring(20, str.length)
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
    // Modify the mock implementation of getILSDimension
    const getILSDimension = jest.fn().mockImplementation((dim, score, something) => {
      return 'test' // Return the desired string directly
    })

    const { container } = render(
      <ResultDescriptionILS
        data={mockILS}
        ILSdim={(n: number, b: number, c?: boolean | undefined) => getILSDimension(1, 1, true)}
      />
    )

    //Because the switch case is not implemented for the string "test", the default case is used, thats why there are 2 spaces after Part2
    expect(container.innerHTML.substring(795, 795 + 'Part2  '.length)).toBe('Part2  ')
  })
})
