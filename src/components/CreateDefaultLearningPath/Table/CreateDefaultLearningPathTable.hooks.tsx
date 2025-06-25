import { Dispatch, SetStateAction, useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { handleError } from '@components'
import { DefaultLearningPath } from '@core'
import { postDefaultLearningPath, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

export type useCreateDefaultLearningPathTableProps = {
  setIsSending: Dispatch<SetStateAction<boolean>>
  orderedItems: string[]
  disabledItems: string[]
  setActiveId: (value: SetStateAction<string | null>) => void
  setOrderedItems: Dispatch<SetStateAction<string[]>>
  setDisabledItems: Dispatch<SetStateAction<string[]>>
}

export const useCreateDefaultLearningPathTable = ({
  setIsSending,
  orderedItems,
  disabledItems,
  setActiveId,
  setOrderedItems,
  setDisabledItems
}: useCreateDefaultLearningPathTableProps) => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)
  const clearDefaultLearningPathCache = usePersistedStore((state) => state.clearDefaultLearningPathCache)
  const clearLearningPathElementCache = useStore((state) => state.clearLearningPathElementCache)

  // Toggle disable state of an item
  const handleToggleDisable = useCallback(
    (itemKey: string) => {
      if (disabledItems.includes(itemKey)) {
        setDisabledItems((prev) => prev.filter((key) => key !== itemKey))
      } else {
        setDisabledItems((prev) => [...prev, itemKey])
      }
    },
    [disabledItems, setDisabledItems]
  )

  // Reset an item from the droppable container back to the left.
  const handleResetItem = useCallback(
    (itemKey: string) => {
      setOrderedItems((prev) => prev.filter((key) => key !== itemKey))
    },
    [setOrderedItems]
  )

  const handleRemoveAll = useCallback(() => {
    setOrderedItems([])
    setDisabledItems([])
  }, [setOrderedItems, setDisabledItems])

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id as string)
    },
    [setActiveId]
  )

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      if (!active || !over) return
      const activeIdStr = active.id as string
      if (orderedItems.includes(activeIdStr) && over.id === 'droppable-container') {
        const currentIndex = orderedItems.indexOf(activeIdStr)
        const lastIndex = orderedItems.length - 1
        if (currentIndex !== lastIndex) {
          setOrderedItems(arrayMove(orderedItems, currentIndex, lastIndex))
        }
      }
    },
    [orderedItems, setOrderedItems]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)
      if (!over) return

      const activeIdStr = active.id.toString()
      const overIdStr = over.id.toString()

      if (orderedItems.includes(activeIdStr)) {
        if (overIdStr === 'droppable-container') {
          const oldIndex = orderedItems.indexOf(activeIdStr)
          const newIndex = orderedItems.length - 1
          if (oldIndex !== newIndex) {
            setOrderedItems(arrayMove(orderedItems, oldIndex, newIndex))
          }
        } else if (activeIdStr !== overIdStr && orderedItems.includes(overIdStr)) {
          const oldIndex = orderedItems.indexOf(activeIdStr)
          const newIndex = orderedItems.indexOf(overIdStr)
          setOrderedItems(arrayMove(orderedItems, oldIndex, newIndex))
        }
        return
      }

      if (orderedItems.includes(overIdStr)) {
        const newIndex = orderedItems.indexOf(overIdStr)
        const newOrderedItems = [...orderedItems]
        newOrderedItems.splice(newIndex, 0, activeIdStr)
        setOrderedItems(newOrderedItems)
      } else {
        setOrderedItems([...orderedItems, activeIdStr])
      }
    },
    [orderedItems, setOrderedItems]
  )

  const handleSubmit = useCallback(() => {
    setIsSending(true)
    const orderedItemsData: DefaultLearningPath[] = orderedItems.map((key, index) => ({
      classification: key,
      position: index + 1,
      disabled: disabledItems.includes(key),
      university: 'HS-KE'
    }))
    disabledItems.forEach((key, index) =>
      orderedItemsData.push({
        classification: key,
        position: index + 9000,
        disabled: true,
        university: 'HS-KE'
      })
    )
    return getUser()
      .then((user) => {
        return postDefaultLearningPath({
          userId: user.settings.id,
          userLmsId: user.lms_user_id,
          outputJson: JSON.stringify(orderedItemsData)
        })
          .then(() => {
            clearDefaultLearningPathCache()
            clearLearningPathElementCache()
            setIsSending(false)
          })
          .then(() => {
            addSnackbar({
              message: t('appGlobal.dataSendSuccessful'),
              severity: 'success',
              autoHideDuration: 5000
            })
          })
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'error.postDefaultLearningPath', error, 3000)
      })
  }, [
    setIsSending,
    disabledItems,
    getUser,
    orderedItems,
    addSnackbar,
    t,
    clearDefaultLearningPathCache,
    clearLearningPathElementCache
  ])
  return useMemo(
    () => ({
      handleSubmit,
      handleDragEnd,
      handleDragOver,
      handleToggleDisable,
      handleResetItem,
      handleDragStart,
      handleRemoveAll
    }),
    [
      handleSubmit,
      handleDragEnd,
      handleDragOver,
      handleToggleDisable,
      handleResetItem,
      handleDragStart,
      handleRemoveAll
    ]
  )
}
