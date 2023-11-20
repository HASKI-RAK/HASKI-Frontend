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

    expect(container.innerHTML.substring(300, 300 + 'everythingBalanced'.length)).toBe('everythingBalanced')
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

    expect(container.innerHTML.substring(300, 300 + 'everythingBalanced'.length)).toBe('everythingBalanced')
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

    expect(container.innerHTML.substring(343, 343 + 'active-moderate'.length)).toBe('active-moderate')
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

    expect(container.innerHTML.substring(341, 341 + 'active-strong'.length)).toBe('active-strong')
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

    expect(container.innerHTML.substring(351, 351 + 'reflective-moderate'.length)).toBe('reflective-moderate')
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

    expect(container.innerHTML.substring(349, 349 + 'reflective-strong'.length)).toBe('reflective-strong')
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

    expect(container.innerHTML.substring(1590, 1590 + 'processingBalanced'.length)).toBe('processingBalanced')
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

    expect(container.innerHTML.substring(345, 345 + 'sensory-moderate'.length)).toBe('sensory-moderate')
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

    expect(container.innerHTML.substring(343, 343 + 'sensory-strong'.length)).toBe('sensory-strong')
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

    expect(container.innerHTML.substring(349, 349 + 'intuitive-moderate'.length)).toBe('intuitive-moderate')
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

    expect(container.innerHTML.substring(347, 347 + 'intuitive-strong'.length)).toBe('intuitive-strong')
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

    expect(container.innerHTML.substring(1587, 1587 + 'perceptionBalanced'.length)).toBe('perceptionBalanced')
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

    expect(container.innerHTML.substring(343, 343 + 'visual-moderate'.length)).toBe('visual-moderate')
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

    expect(container.innerHTML.substring(341, 341 + 'visual-strong'.length)).toBe('visual-strong')
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

    expect(container.innerHTML.substring(343, 343 + 'verbal-moderate'.length)).toBe('verbal-moderate')
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

    expect(container.innerHTML.substring(341, 341 + 'verbal-strong'.length)).toBe('verbal-strong')
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

    expect(container.innerHTML.substring(1590, 1590 + 'presentationBalanced'.length)).toBe('presentationBalanced')
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

    expect(container.innerHTML.substring(351, 351 + 'sequential-moderate'.length)).toBe('sequential-moderate')
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

    expect(container.innerHTML.substring(349, 349 + 'sequential-strong'.length)).toBe('sequential-strong')
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

    expect(container.innerHTML.substring(343, 343 + 'global-moderate'.length)).toBe('global-moderate')
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

    expect(container.innerHTML.substring(341, 341 + 'global-strong'.length)).toBe('global-strong')
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

    expect(container.innerHTML.substring(1578, 1578 + 'organisationBalanced'.length)).toBe('organisationBalanced')
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

    expect(container.innerHTML.substring(713, 713 + 'sensory-moderate'.length)).toBe('sensory-moderate')
    expect(container.innerHTML.substring(343, 343 + 'active-moderate'.length)).toBe('active-moderate')
    expect(container.innerHTML.substring(1082, 1082 + 'visual-moderate'.length)).toBe('visual-moderate')
    expect(container.innerHTML.substring(1458, 1458 + 'sequential-moderate'.length)).toBe('sequential-moderate')
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

    expect(container.innerHTML.substring(707, 707 + 'sensory-strong'.length)).toBe('sensory-strong')
    expect(container.innerHTML.substring(341, 341 + 'active-strong'.length)).toBe('active-strong')
    expect(container.innerHTML.substring(1072, 1072 + 'visual-strong'.length)).toBe('visual-strong')
    expect(container.innerHTML.substring(1444, 1444 + 'sequential-strong'.length)).toBe('sequential-strong')
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

    expect(container.innerHTML.substring(729, 729 + 'intuitive-moderate'.length)).toBe('intuitive-moderate')
    expect(container.innerHTML.substring(351, 351 + 'reflective-moderate'.length)).toBe('reflective-moderate')
    expect(container.innerHTML.substring(1100, 1100 + 'verbal-moderate'.length)).toBe('verbal-moderate')
    expect(container.innerHTML.substring(1468, 1468 + 'global-moderate'.length)).toBe('global-moderate')
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

    expect(container.innerHTML.substring(723, 723 + 'intuitive-strong'.length)).toBe('intuitive-strong')
    expect(container.innerHTML.substring(349, 349 + 'reflective-strong'.length)).toBe('reflective-strong')
    expect(container.innerHTML.substring(1090, 1090 + 'verbal-strong'.length)).toBe('verbal-strong')
    expect(container.innerHTML.substring(1454, 1454 + 'global-strong'.length)).toBe('global-strong')
  })

  test(' 3 Switch case', () => {
    jest.mock('react-i18next', () => ({
      // this mock makes sure any components using the translate-hook can use it without a warning being shown
      useTranslation: () => {
        return {
          t: (str: string) => {
            if (str === 'components.TableILS.balanced') return 'active-balanced'
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

    expect(container.innerHTML.substring(693, 693 + '-1 '.length)).toBe('-1 ')
    expect(container.innerHTML.substring(800, 800 + '-2 '.length)).toBe('-2 ')
    expect(container.innerHTML.substring(854, 854 + '-3'.length)).toBe('-3')
  })

  test('Switch default case', () => {
    jest.mock('react-i18next', () => ({
      // this mock makes sure any components using the translate-hook can use it without a warning being shown
      useTranslation: () => {
        return {
          t: (str: string) => {
            if (str === 'components.TableILS.balanced') return 'active-balanced'
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
    expect(container.innerHTML.substring(794, 794 + '-2  '.length)).toBe('-2  ')
  })
})
