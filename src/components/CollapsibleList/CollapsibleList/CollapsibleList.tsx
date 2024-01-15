import { Typewriter, CollapsibleListEntry, CollapsibleListEntryContentProps } from '@components'
import { useCallback, useEffect, useRef, useState, memo } from 'react'
import { Grid } from '@common/components'
import { useViewport } from '@services'

/**
 * @prop content - List of collapsible elements consisting of a header and a body.
 * @prop header - Title to be displayed above the content.
 * @interface
 */
type CollapsibleListProps = {
  content?: CollapsibleListEntryContentProps[]
  header?: string
}

/**
 * CollapsibleList component.
 *
 * @param props - Props containing a header and an array of entries.
 *
 * @remarks
 * CollapsibleList represents a component that displays {@link CollapsibleListEntry} components in a column, seperated by a small gap.
 * It can be used as a standalone component on a page.
 *
 * @category Components
 */
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
    <div ref={ref} data-testid="collapsibleList">
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
