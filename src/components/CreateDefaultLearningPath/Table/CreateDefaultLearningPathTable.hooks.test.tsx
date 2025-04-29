import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { act, renderHook } from '@testing-library/react-hooks'
import { mockServices } from 'jest.setup'
import React from 'react'
import { SnackbarContext } from '@services'
import { useCreateDefaultLearningPathTable } from './CreateDefaultLearningPathTable.hooks'

const setIsSending = jest.fn()
const orderedItems = ['KÜ', 'AN', 'BE']
const disabledItems = ['AN']
const setActiveId = jest.fn()
const setOrderedItems = jest.fn()
const setDisabledItems = jest.fn()
const addSnackbar = jest.fn()

jest.spyOn(React, 'useContext').mockImplementation((context) => {
  if (context === SnackbarContext) {
    return { addSnackbar }
  }
  return {}
})

describe('useCreateDefaultLearningPathTable hook', () => {
  it('handleToggleDisable adds and removes an item correctly', () => {
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    act(() => {
      result.current.handleToggleDisable('KÜ')
    })
    // setDisabledItems is called with an updater function.
    expect(setDisabledItems).toHaveBeenCalledWith(expect.any(Function))
    const addFn = setDisabledItems.mock.calls[0][0]
    expect(addFn([])).toEqual(['KÜ'])

    act(() => {
      result.current.handleToggleDisable('AN')
    })
    const removeFn = setDisabledItems.mock.calls[1][0]
    expect(removeFn(['KÜ'])).toEqual(['KÜ'])
  })

  it('handleResetItem removes the item from orderedItems', () => {
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: ['KÜ', 'AN', 'BE'],
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    act(() => {
      result.current.handleResetItem('AN')
    })
    expect(setOrderedItems).toHaveBeenCalledWith(expect.any(Function))
    const resetFn = setOrderedItems.mock.calls[0][0]
    expect(resetFn(['KÜ', 'AN', 'BE'])).toEqual(['KÜ', 'BE'])
  })

  it('handleRemoveAll clears both orderedItems and disabledItems', () => {
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    act(() => {
      result.current.handleRemoveAll()
    })
    expect(setOrderedItems).toHaveBeenCalledWith([])
    expect(setDisabledItems).toHaveBeenCalledWith([])
  })

  it('handleDragStart sets the active id', () => {
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )
    const dummyDragStart = {
      active: { id: 'KÜ' }
    } as DragStartEvent

    act(() => {
      result.current.handleDragStart(dummyDragStart)
    })
    expect(setActiveId).toHaveBeenCalledWith('KÜ')
  })

  it('handleDragOver moves item to the last position when over droppable-container', () => {
    const initialOrdered = ['KÜ', 'AN', 'BE']
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: initialOrdered,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    const dummyDragOver = {
      active: { id: 'AN' },
      over: { id: 'droppable-container' }
    } as DragOverEvent

    act(() => {
      result.current.handleDragOver(dummyDragOver)
    })
    expect(setOrderedItems).toHaveBeenCalledWith(arrayMove(initialOrdered, 1, 2))
  })

  it('handleDragOver returns if no overId is given', () => {
    const initialOrdered = ['KÜ', 'AN', 'BE']
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: initialOrdered,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    const dummyDragOver = {
      active: { id: 'AN' }
    } as DragOverEvent

    act(() => {
      result.current.handleDragOver(dummyDragOver)
    })
    expect(setOrderedItems).not.toHaveBeenCalled()
  })

  it('handleDragOver returns if no activeId is given', () => {
    const initialOrdered = ['KÜ', 'AN', 'BE']
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: initialOrdered,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    const dummyDragOver = {
      over: { id: 'droppable-container' }
    } as DragOverEvent

    act(() => {
      result.current.handleDragOver(dummyDragOver)
    })
    expect(setOrderedItems).not.toHaveBeenCalled()
  })

  it('handleDragEnd returns if no overId is given', () => {
    const initialOrdered = ['KÜ', 'AN', 'BE']
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: initialOrdered,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    const dummyDragEnd = {
      active: { id: 'AN' }
    } as DragEndEvent

    act(() => {
      result.current.handleDragEnd(dummyDragEnd)
    })

    expect(setOrderedItems).not.toHaveBeenCalled()
  })

  it('handleDragEnd reorders items correctly when active is in orderedItems and over id is another ordered item', () => {
    const initialOrdered = ['KÜ', 'AN', 'BE']
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: initialOrdered,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    const dummyDragEnd = {
      active: { id: 'AN' },
      over: { id: 'BE' }
    } as DragEndEvent

    act(() => {
      result.current.handleDragEnd(dummyDragEnd)
    })

    expect(setOrderedItems).toHaveBeenCalledWith(arrayMove(initialOrdered, 1, 2))
  })

  it('handleDragEnd adds item to droppable-container if drag ends over it', () => {
    const initialOrdered = ['KÜ', 'FO', 'BE']
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: initialOrdered,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    const dummyDragEnd = {
      active: { id: 'FO' },
      over: { id: 'droppable-container' }
    } as DragEndEvent

    act(() => {
      result.current.handleDragEnd(dummyDragEnd)
    })
    expect(setOrderedItems).toHaveBeenCalledWith(arrayMove(initialOrdered, 1, 2))
  })

  it('handleDragEnd adds item to droppable-container if drag ends over an ordered item', () => {
    const initialOrdered = ['KÜ', 'FO', 'BE']
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: initialOrdered,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    const dummyDragEnd = {
      active: { id: 'AN' },
      over: { id: 'FO' }
    } as DragEndEvent

    act(() => {
      result.current.handleDragEnd(dummyDragEnd)
    })
    expect(setOrderedItems).toHaveBeenCalledWith(arrayMove(['KÜ', 'FO', 'AN', 'BE'], 1, 2))
  })

  it('handleDragEnd adds item to droppable-container if drag does not end above overid or droppable-container', () => {
    const initialOrdered = ['KÜ', 'FO', 'BE']
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: initialOrdered,
        disabledItems,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    const dummyDragEnd = {
      active: { id: 'AN' },
      over: { id: 'LZ' }
    } as DragEndEvent

    act(() => {
      result.current.handleDragEnd(dummyDragEnd)
    })
    expect(setOrderedItems).toHaveBeenCalledWith(arrayMove(['KÜ', 'BE', 'FO', 'AN'], 1, 2))
  })

  it('handleSubmit posts default learning path and clears caches', async () => {
    const dummyOrdered = ['KÜ', 'AN']
    const dummyDisabled = ['AN']
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: dummyOrdered,
        disabledItems: dummyDisabled,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(setIsSending).toHaveBeenCalledWith(true)
    expect(mockServices.fetchUser).toHaveBeenCalled()
    expect(mockServices.postDefaultLearningPath).toHaveBeenCalled()
    expect(setIsSending).toHaveBeenCalledWith(false)
    expect(addSnackbar).toHaveBeenCalledWith({
      message: 'appGlobal.dataSendSuccessful',
      severity: 'success',
      autoHideDuration: 5000
    })
  })

  it('handleSubmit catches error', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('fetchUser error')
    })
    const dummyOrdered = ['KÜ', 'AN']
    const dummyDisabled = ['AN']
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems: dummyOrdered,
        disabledItems: dummyDisabled,
        setActiveId,
        setOrderedItems,
        setDisabledItems
      })
    )

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(setIsSending).toHaveBeenCalledWith(true)
    expect(mockServices.fetchUser).toHaveBeenCalled()
    expect(addSnackbar).toHaveBeenCalledWith({
      message: 'error.postDefaultLearningPath',
      severity: 'error',
      autoHideDuration: 3000
    })
  })
})
