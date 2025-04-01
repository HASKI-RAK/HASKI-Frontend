// useCreateDefaultLearningPathTable.test.ts
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { act, renderHook } from '@testing-library/react-hooks'
import { mockServices } from 'jest.setup'
import React from 'react'
import { SnackbarContext } from '@services'
import { useCreateDefaultLearningPathTable } from './CreateDefaultLearningPathTable.hooks'

describe('useCreateDefaultLearningPathTable hook', () => {
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

  it('handleToggleDisable adds and removes an item correctly', () => {
    const { result } = renderHook(() =>
      useCreateDefaultLearningPathTable({
        setIsSending,
        orderedItems,
        disabledItems: [],
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
      result.current.handleToggleDisable('KÜ')
    })
    const removeFn = setDisabledItems.mock.calls[1][0]
    expect(removeFn(['KÜ'])).toEqual(['KÜ', 'KÜ'])
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
    // For initialOrdered, 'B' at index 1 should be moved to index 2.
    expect(setOrderedItems).toHaveBeenCalledWith(arrayMove(initialOrdered, 1, 2))
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
    // 'B' (index 1) moved to where 'C' is (index 2)
    expect(setOrderedItems).toHaveBeenCalledWith(arrayMove(initialOrdered, 1, 2))
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
})
