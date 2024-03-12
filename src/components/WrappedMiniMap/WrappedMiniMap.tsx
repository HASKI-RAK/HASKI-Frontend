import { MiniMap } from 'reactflow'
import { useTheme } from '@common/hooks'
import { useEffect, useState, useCallback, memo } from 'react'

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
    const scaleoffset = 1
    const scalerange = 0.6
    const translationrange = 2.5
    const translationoffest = 1
    const scaling = scaleoffset + scalerange * Math.tanh(window.innerWidth / theme.breakpoints.values.xl - scaleoffset)
    const translation =
      -translationrange * Math.tanh(window.innerWidth / theme.breakpoints.values.xl - translationoffest)
    return { transform: `scale(${scaling}) translate(${translation}rem, ${translation}rem)` }
  }, [])

  const [minimapSize, setMiniMapSize] = useState(getMapTransform())

  const handleResize = useCallback(() => {
    setMiniMapSize(getMapTransform())
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
