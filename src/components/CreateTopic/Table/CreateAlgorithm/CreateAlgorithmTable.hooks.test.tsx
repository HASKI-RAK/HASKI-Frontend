import { act, renderHook } from '@testing-library/react-hooks'
import { CreateAlgorithmTableNameProps } from '@components'
import { useCreateAlgorithmTable } from './CreateAlgorithmTable.hooks'

describe('[HASKI-REQ-0041] useCreateAlgorithmTable', () => {
  const mockOnAlgorithmChange = jest.fn()

  const initialAlgorithms: { [key: number]: CreateAlgorithmTableNameProps } = {
    1: { topicName: 'Topic 1', algorithmShortName: 'algo1' },
    2: { topicName: 'Topic 2', algorithmShortName: 'algo2' }
  }

  const setup = (overrides = {}) =>
    renderHook(() =>
      useCreateAlgorithmTable({
        selectedAlgorithms: initialAlgorithms,
        onAlgorithmChange: mockOnAlgorithmChange,
        ...overrides
      })
    )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with the handleAlgorithmChange function', () => {
    const { result } = setup()
    expect(result.current).toHaveProperty('handleAlgorithmChange')
  })

  it('should update the algorithm for a topic and call onAlgorithmChange', () => {
    const { result } = setup()

    act(() => {
      result.current.handleAlgorithmChange(1, 'Topic 1', 'algo3')
    })

    expect(mockOnAlgorithmChange).toHaveBeenCalledWith({
      ...initialAlgorithms,
      1: { topicName: 'Topic 1', algorithmShortName: 'algo3' }
    })
  })

  it('should add a new algorithm entry if the topicId does not exist', () => {
    const { result } = setup()

    act(() => {
      result.current.handleAlgorithmChange(3, 'Topic 3', 'algo4')
    })

    expect(mockOnAlgorithmChange).toHaveBeenCalledWith({
      ...initialAlgorithms,
      3: { topicName: 'Topic 3', algorithmShortName: 'algo4' }
    })
  })

  it('should overwrite existing algorithmShortName for an existing topicId', () => {
    const { result } = setup()

    act(() => {
      result.current.handleAlgorithmChange(2, 'Topic 2', 'algo5')
    })

    expect(mockOnAlgorithmChange).toHaveBeenCalledWith({
      ...initialAlgorithms,
      2: { topicName: 'Topic 2', algorithmShortName: 'algo5' }
    })
  })

  it('should not modify other topics when changing an algorithm', () => {
    const { result } = setup()

    act(() => {
      result.current.handleAlgorithmChange(1, 'Topic 1', 'algo3')
    })

    expect(mockOnAlgorithmChange).toHaveBeenCalledWith({
      1: { topicName: 'Topic 1', algorithmShortName: 'algo3' },
      2: { topicName: 'Topic 2', algorithmShortName: 'algo2' }
    })
  })
})
