import React, { memo } from 'react'
import { CollapsibleText } from '@components'

/**
 * @prop content - A record list of several headers and bodies to be grouped.
 * @interface
 */
interface CollapsibleTextListProps {
  content: {header: string, body:[]}[]
  animate?: boolean
  offset?: number
}

/**
 * CollapsibleTextList component.
 *
 * @param props - Props containing the body and header texts for all entries.
 *
 * @remarks
 * CollapsibleTextList presents a component that displays a stacked list of CollapsibleText components, seperated by a small gap.
 *
 * @category Components
 */
const CollapsibleTextList: React.FC<CollapsibleTextListProps> = ({ content, animate, offset = 0 }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      className="CollapsibleTextList"
      data-testid="CollapsibleTextList">
      {content.map((entry, index) => (
        <CollapsibleText
          key={index}
          header={entry.header}
          body={entry.body}
          animate={animate ?? false}
          offset={(offset + 1) * (index + 1)}
        />
      ))}
    </div>
  )
}

export default memo(CollapsibleTextList)
