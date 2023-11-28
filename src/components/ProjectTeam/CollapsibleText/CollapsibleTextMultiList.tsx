import React, { memo } from 'react'
import { CollapsibleTextList } from '@components'

/**
 * @prop content - A record list of several headers and bodies to be grouped.
 * @prop columns - Number of colums to be created.
 * @interface
 */
interface CollapsibleTextMultiListProps {
  content: Record<string, string>
  columns: number
  animate?: boolean
}

/**
 * CollapsibleTextMultiList component.
 *
 * @param props - Props containing the body and header texts for all entries as well as number of columns.
 *
 * @remarks
 * CollapsibleTextMultiList presents a component that displays several columns of stacked lists of CollapsibleText components, seperated by a small gap.
 * Useful e.g. for a bigger amount of small data info cards with optional description (body).
 *
 * @category Components
 */
const CollapsibleTextMultiList: React.FC<CollapsibleTextMultiListProps> = ({ content, columns, animate }) => {
  // for test
  if (!content || typeof content !== 'object') {
    return <div data-testid="CollapsibleTextMultiList"></div>
  }

  columns ??= 1
  // Split the content into an array of columns
  const columnCount = Math.ceil(Object.keys(content).length / columns)
  const columnContent: Record<string, string>[] = Array.from({ length: columns }, (_, i) => {
    const startIndex = i * columnCount
    const endIndex = startIndex + columnCount
    return Object.fromEntries(Object.entries(content).slice(startIndex, endIndex))
  })

  return (
    <div
      style={{ display: 'flex', gap: '16px' }}
      className="CollapsibleTextMultiList"
      data-testid="CollapsibleTextMultiList">
      {columnContent.map((column, index) => (
        <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <CollapsibleTextList
            content={column}
            animate={animate ?? false}
            offset={(columnContent.length + 1) / (index + 1)}
          />
        </div>
      ))}
    </div>
  )
}

export default memo(CollapsibleTextMultiList)
