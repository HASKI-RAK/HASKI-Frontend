import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

type GameSidePanelHookProps = {
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

type GameSidePanelHookReturn = {
  collapse: () => void
  expand: () => void
}

export const useGameSidePanel = ({ setExpanded }: GameSidePanelHookProps): GameSidePanelHookReturn => {
  const collapse = useCallback(() => {
    setExpanded(false)
  }, [setExpanded])

  const expand = useCallback(() => {
    setExpanded(true)
  }, [setExpanded])

  return useMemo(() => ({ collapse, expand }), [collapse, expand])
}
