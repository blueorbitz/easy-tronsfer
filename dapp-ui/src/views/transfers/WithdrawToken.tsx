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
import useTronWeb from 'src/@core/hooks/useTronWeb'

const WithdrawToken = () => {
  const tron = useTronWeb()
  const [tokenType, setTokenType] = useState('TRX')

  return (
    <Card>
      <CardHeader title='Withdraw token' titleTypographyProps={{ variant: 'h6' }} />
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
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={tokenType === 'TRX' ? 9 : 4}>
              <TextField
                fullWidth
                type='number'
                label='Amount'
                helperText={`Amount in ${tron.trc20.symbol || 'TRX'}`}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6'>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
                  <Button variant='outlined'>
                    Transfer to user
                  </Button>
                  <Button variant='contained'>
                    Withdraw to wallet
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

export default WithdrawToken