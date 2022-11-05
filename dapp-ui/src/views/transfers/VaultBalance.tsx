// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// ** Custom Components Imports

function createData(
  token: string,
  tokenAddress: string,
  balance: number,
) {
  return { token, tokenAddress, balance };
}

const rows = [
  createData('TRX', '', 100),
  createData('USDT', 'xxxxxxxxxxxx', 100),
  createData('PWP', 'xxxxxxxxxxxx', 100),
];

const VaultBalance = () => {
  return (
    <Card>
      <CardHeader title='Balance in Vault' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Token</TableCell>
                <TableCell>Token Address</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.token}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.token}
                  </TableCell>
                  <TableCell>{row.tokenAddress}</TableCell>
                  <TableCell align="right">{row.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6'>
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
            <Button variant='contained'>Withdraw</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default VaultBalance
