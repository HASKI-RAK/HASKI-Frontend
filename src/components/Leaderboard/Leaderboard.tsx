import { memo, useEffect, useState } from 'react'
import { Button,
  Grid,
  Table,
  TableBody, TableCell,
  TableHead,
  TableRow,
   Typography
    } from '@common/components'

const Leaderboard = () => {
  return (
    <Grid container direction={'column'}>
      <Typography variant="h6">Topic Leaderboard</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Excercise Attempts</TableCell>
            <TableCell>Time Spent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ height: '0.5rem' }}>
            <TableCell>1</TableCell>
            <TableCell>10</TableCell>
            <TableCell>{'1:30'}</TableCell>
          </TableRow>
          <TableRow sx={{ height: '0.5rem' }}>
            <TableCell>2</TableCell>
            <TableCell>8</TableCell>
            <TableCell>{'2:00'}</TableCell>
          </TableRow>
          <TableRow sx={{ height: '0.5rem' }}>
            <TableCell>3</TableCell>
            <TableCell>7</TableCell>
            <TableCell>{'1:00'}</TableCell>
          </TableRow>
          {/* Map through your data and create TableRow for each item */}
        </TableBody>
      </Table>
      <Button variant="text" size="small" sx={{ mt: '0.5rem' }}>
        More Leaderboards
      </Button>
    </Grid>
  )
}

export default memo(Leaderboard)
