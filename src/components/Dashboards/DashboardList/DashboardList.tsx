import { memo, ReactNode } from 'react'
import { Box, Divider, MenuList } from '@common/components'
import { DashboardListItem, DashboardListItemProps } from '@components'

type DashboardListProps = {
  header?: ReactNode
  rows?: DashboardListItemProps[]
}

const DashboardList = ({ header, rows }: DashboardListProps) => {
  return (
    <MenuList sx={{ width: '100%', p: 0 }}>
      {header && (
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
          {header}
        </Box>
      )}
      <Divider />
      {rows?.map((row) => (
        <DashboardListItem key={row.id} {...row} />
      ))}
    </MenuList>
  )
}

export default memo(DashboardList)
