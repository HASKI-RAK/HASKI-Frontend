import React, { memo } from 'react'
import { Skeleton } from '@common/components'

const SkeletonList = () => {
  const skeletonItems = []
  for (let i = 0; i < 3; i++) {
    skeletonItems.push(
      <React.Fragment key={`MenuBar-Topic-Skeleton-${i}`}>
        <Skeleton variant="text" width={'500'} height={55} data-testid={`SkeletonList Element-${i}`} />
        <Skeleton variant="text" width={'70%'} height={20} />
      </React.Fragment>
    )
  }
  return <>{skeletonItems}</>
}

export default memo(SkeletonList)
