// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import { useDebounce, useUpdateEffect } from 'usehooks-ts'
import useTronWeb from 'src/@core/hooks/useTronWeb'
import useTransferContext from 'src/@core/hooks/useTransferContext'

const TransferDetail = () => {
  const tron = useTronWeb()
  const [tokenType, setTokenType] = useState('TRX')
  const {
    tokenAddress, setTokenAddress,
    transferAmount, setTransferAmount,
  } = useTransferContext()
  const debounceTokenAddress = useDebounce<string>(tokenAddress, 1000)

  useUpdateEffect(() => {
    (async () => {
      const tokenDetails = await tron.trc20.setContractAddress(tokenAddress)
      console.log(tokenDetails)
    })()
  }, [debounceTokenAddress])

  return (
    <Card>
      <CardHeader title='Transfer detail' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id='token-label'>Token</InputLabel>
                <Select
                  labelId='token-label'
                  value={tokenType}
                  label='Token Type'
                  onChange={e => setTokenType(e.target.value)}
                >
                  <MenuItem value={'TRX'}>TRX</MenuItem>
                  <MenuItem value={'TRC20'}>TRC20</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {
              tokenType !== 'TRX' &&
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  type='text'
                  label='Contract Address'
                  value={tokenAddress}
                  onChange={e => setTokenAddress(e.target.value)}
                />
                {
                  tron.trc20.error === '' || tokenAddress === ''
                    ? null
                    : <Typography sx={{ color: 'error.main' }}>{tron.trc20.error}</Typography>
                }
              </Grid>
            }
            <Grid item xs={12} md={tokenType === 'TRX' ? 9 : 4}>
              <TextField
                fullWidth
                type='number'
                label='Amount'
                helperText={`Amount in ${tron.trc20.symbol || 'TRX'}`}
                value={transferAmount}
                onChange={e => setTransferAmount(parseFloat(e.target.value))}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6'>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
                  <Button type='submit' variant='contained'>
                    Next
                  </Button>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default TransferDetail
