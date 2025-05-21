import { useCallback, useEffect, useMemo, useState } from 'react'

import { Topic } from '@core'
import { usePersistedStore, useStore } from '@store'

export type TopicCardHookParams = {
  topic?: Topic
  learningElementProgressTopics?: number[]
}

export const useTopicCard = (params: TopicCardHookParams) => {
  const getTeacherAlgorithm = useStore((state) => state.getTeacherLpLeAlgorithm)
  const getStudentAlgorithm = useStore((state) => state.getStudentLpLeAlgorithm)
  const getUser = usePersistedStore((state) => state.getUser)

  const [teacherSelection, setTeacherSelection] = useState<string | undefined>('')
  const [studentSelection, setStudentSelection] = useState<string | undefined>('')

  const [isAlgorithmSettingsModalOpen, setIsAlgorithmSettingsModalOpen] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = useCallback(() => {
    setMenuAnchorEl(null)
  }, [setMenuAnchorEl])

  const handleAlgorithmMenuOpen = useCallback(() => {
    handleCloseMenu()
    setIsAlgorithmSettingsModalOpen(true)
  }, [handleCloseMenu, setIsAlgorithmSettingsModalOpen])

  const handleAlgorithmModalClose = useCallback(() => {
    setIsAlgorithmSettingsModalOpen(false)
  }, [setIsAlgorithmSettingsModalOpen])

  const updateSelection = useCallback(() => {
    getUser().then((user) => {
      getStudentAlgorithm(user.settings.user_id, params.topic?.id)
        .then((res) => {
          setStudentSelection(res.short_name)
        })
        .catch(() => {
          setStudentSelection(undefined)
        })
    })
    getTeacherAlgorithm(params.topic?.id)
      .then((res) => {
        setTeacherSelection(res.short_name)
      })
      .catch(() => {
        setTeacherSelection(undefined)
      })
  }, [getUser, getStudentAlgorithm, getTeacherAlgorithm, params.topic?.id])

  useEffect(() => {
    updateSelection()
  }, [updateSelection])

  return useMemo(
    () => ({
      teacherSelection,
      studentSelection,
      isAlgorithmSettingsModalOpen,
      menuAnchorEl,
      openMenu,
      handleCloseMenu,
      handleAlgorithmMenuOpen,
      handleAlgorithmModalClose,
      updateSelection
    }),
    [
      teacherSelection,
      studentSelection,
      isAlgorithmSettingsModalOpen,
      menuAnchorEl,
      openMenu,
      handleCloseMenu,
      handleAlgorithmMenuOpen,
      handleAlgorithmModalClose,
      updateSelection
    ]
  )
}
