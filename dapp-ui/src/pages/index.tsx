// ** MUI Imports
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'


// ** Icons Imports

// ** Custom Components Imports

// ** Styled Component Import

// ** Demo Components Imports

const Dashboard = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Connected wallet' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <TextField fullWidth label='Name' placeholder='Leonard Carter' disabled={true} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Transfer Amount' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={3}>
                    <FormControl>
                      <InputLabel id="token-label">Token</InputLabel>
                      <Select
                        labelId='token-label'
                        id='token'
                        value={null}
                        label='Token'
                      >
                        <MenuItem value={'TRX'}>TRX</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      type='number'
                      label='Amount'
                      helperText='Amount to transfer (TRX)'
                    />
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Receiver Detail' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={3}>
                    <FormControl>
                      <InputLabel id="token-label">Token</InputLabel>
                      <Select
                        labelId='token-label'
                        id='token'
                        value={null}
                        label='Token'
                      >
                        <MenuItem value={'TRX'}>TRX</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      fullWidth
                      type='text'
                      label='Receiver username'
                      helperText='@username is valid'
                    />
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Summary' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <Typography variant='subtitle1'>Receiver [Twitter]: @username</Typography>
              <Typography variant='body2'>
                From: wallet_address
              </Typography>
              <Typography variant='body2'>
                To: contract_address
              </Typography>
              <Typography variant='body2'>
                Amount: 1 TRX
              </Typography>
              <Typography variant='body2'>
                Meta: Type: Twitter, Username: @username
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6'>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
                  <Button variant='contained'>Send</Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  )
}

export default Dashboard
