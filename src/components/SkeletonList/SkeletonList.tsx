import React, { memo } from 'react'
import { Skeleton } from '@common/components'

const SkeletonList = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <React.Fragment key={`MenuBar-Topic-Skeleton-${i}`}>
          <Skeleton variant="text" width={'500'} height={55} data-testid={`SkeletonList Element-${i}`} />
          <Skeleton variant="text" width={'70%'} height={20} />
        </React.Fragment>
      ))}
    </>
  )
}

export default memo(SkeletonList)
