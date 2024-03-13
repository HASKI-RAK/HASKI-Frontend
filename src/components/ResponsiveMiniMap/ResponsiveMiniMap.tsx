import { MiniMap } from 'reactflow'
import { useTheme } from '@common/hooks'
import { useEffect, useState, useCallback, memo } from 'react'

/**
 * ResponsiveMiniMap component.
 *
 * @remarks
 * ResponsiveMiniMap adds a resize functionality to the reactflow minimap.
 * It can only be used inside a reactflow component to display a minimap of the flowchart.
 *
 * @category Components
 */
const ResponsiveMiniMap = () => {
  const theme = useTheme()

  // Calculates the scaling and translation of the MiniMap according to the window size using a tanh function.
  const getMapTransform = useCallback(() => {
    const scaleOffset = 1
    const scaleRange = 0.6
    const translationRange = 2.5
    const translationOffset = 1
    const scaling = scaleOffset + scaleRange * Math.tanh(window.innerWidth / theme.breakpoints.values.xl - scaleOffset)
    const translation =
      -translationRange * Math.tanh(window.innerWidth / theme.breakpoints.values.xl - translationOffset)
    return { transform: `scale(${scaling}) translate(${translation}rem, ${translation}rem)` }
  }, [])

  const [miniMapSize, setMiniMapSize] = useState(getMapTransform())

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
      style={miniMapSize}
      nodeBorderRadius={2}
      nodeColor={theme.palette.primary.light}
      maskStrokeColor="black"
      maskStrokeWidth={2}
      nodeStrokeColor={theme.palette.primary.main}
      nodeStrokeWidth={5}
      pannable={true}
    />
  )
}

export default memo(ResponsiveMiniMap)
