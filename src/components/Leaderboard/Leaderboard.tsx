import { memo, useEffect, useState } from 'react'
import { Grid,
  Table,
  TableBody, TableCell,
  TableHead,
  TableRow,
   Typography
    } from '@common/components'

const Leaderboard = () => {
  return (
    <Grid container direction={'column'}>
      <Typography variant="h6">Global</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map through your data and create TableRow for each item */}
        </TableBody>
      </Table>
      <Typography variant="h6">Topic</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Excercise Attempts</TableCell>
            <TableCell>Time Spent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>1500</TableCell>
          </TableRow>
          {/* Map through your data and create TableRow for each item */}
        </TableBody>
      </Table>
    </Grid>
  )
}

export default memo(Leaderboard)
