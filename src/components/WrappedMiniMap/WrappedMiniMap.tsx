import { MiniMap } from 'reactflow'
import { useTheme } from '@common/hooks'
import { useEffect, useState, memo } from 'react'

/**
 * WrappedMiniMap component.
 *
 * @remarks
 * WrappedMiniMap adds a resize functionality to the reactflow minimap.
 * It can only be used inside a reactflow component to display a minimap of the flowchart.
 *
 * @category Components
 */
const WrappedMiniMap = () => {
  const theme = useTheme()

// Add oneline comment to explain functionality of function
const getMapTransform = useCallback(() => {
    if (window.innerWidth > 1920) {
      return { transform: 'scale(1.5) translate(-1.5rem, -1.5rem)' }
    }
    if (window.innerWidth > theme.breakpoints.values.xl) {
      return { transform: 'scale(1.2) translate(-1rem, -1rem)' }
    }
    if (window.innerWidth > theme.breakpoints.values.lg) {
      return { transform: 'scale(1) translate(0rem, 0rem)' }
    }
    if (window.innerWidth > theme.breakpoints.values.md) {
      return { transform: 'scale(0.75) translate(1.5rem, 1.5rem)' }
    } else {
      return { transform: 'scale(0.5) translate(6rem, 5rem)' }
    }
  }, [])

  const [minimapSize, setMinimapSize] = useState(getMapTransform())

  const handleResize = useCallback(() => {
    setMinimapSize(getMapTransform())
  }, [setMiniMapSize, getMapTransform])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <MiniMap
      style={minimapSize}
      nodeBorderRadius={2}
      nodeColor={theme.palette.primary.light}
      maskStrokeColor="black"
      maskStrokeWidth={2}
      nodeStrokeColor={theme.palette.primary.main}
      nodeStrokeWidth={5}
    />
  )
}

export default memo(WrappedMiniMap)
