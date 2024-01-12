import { Typewriter, CollapsibleListEntry, CollapsibleListEntryContentProps } from '@components'
import { useCallback, useEffect, useRef, useState, memo } from 'react'
import { Grid } from '@common/components'
import { useViewport } from '@services'

type CollapsibleListProps = {
  content?: CollapsibleListEntryContentProps[]
  header?: string
}

const CollapsibleList = (props: CollapsibleListProps) => {
  // State
  const [startAnimation, setStartAnimation] = useState(false)

  // Hook
  const { isInViewport } = useViewport()

  // Ref
  const ref = useRef<HTMLDivElement>(null)

  //Logic
  const handleScroll = useCallback(() => {
    if (isInViewport(ref)) {
      setStartAnimation(true)
    }
  }, [isInViewport, ref, setStartAnimation])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div ref={ref}>
      <Typewriter variant="h3" align="center" sx={{ marginBottom: '4rem' }} startAnimation={startAnimation} delay={50}>
        {props.header}
      </Typewriter>
      <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {props.content?.map((entry, index) => (
          <CollapsibleListEntry key={entry.header} startAnimation={startAnimation} delay={index * 75} {...entry} />
        ))}
      </Grid>
    </div>
  )
}

export default memo(CollapsibleList)
