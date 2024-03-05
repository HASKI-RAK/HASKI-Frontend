import { MiniMap } from 'reactflow'
import { MiniMapProps } from '@reactflow/minimap/dist/esm/types'
import { useTheme } from '@common/hooks'
import { useEffect, useState, memo } from 'react'

const WrappedMiniMap: React.FC<MiniMapProps> = () => {
  const theme = useTheme()

  const getMapTransform = () => {
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
  }

  const [minimapSize, setMinimapSize] = useState(getMapTransform())

  const handleResize = () => {
    setMinimapSize(getMapTransform())
  }

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
      maskStrokeColor="#000000"
      maskStrokeWidth={2}
      nodeStrokeColor={'#f57f17'}
      nodeStrokeWidth={5}
      data-testid="wrapped-minimap"
    />
  )
}

export default memo(WrappedMiniMap)
