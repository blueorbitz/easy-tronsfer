// ** React Imports

// ** MUI Imports
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

// ** Icons Imports

// ** Custom Components Imports
import ReceiverLogin from 'src/views/transfers/ReceiverLogin'
import VaultBalance from 'src/views/transfers/VaultBalance'
import WithdrawToken from 'src/views/transfers/WithdrawToken'
import { ReceiveContextProvider } from 'src/@core/hooks/useReceiveContenxt'

// ** Styled Component Import

// ** Demo Components Imports

const Transfer = () => {
  return (
    <ReceiveContextProvider>
      <Container maxWidth="md">
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ReceiverLogin />
          </Grid>

          <Grid item xs={12}>
            <VaultBalance />
          </Grid>

          <Grid item xs={12}>
            <WithdrawToken />
          </Grid>

        </Grid>
      </Container>
    </ReceiveContextProvider>
  )
}

export default Transfer
