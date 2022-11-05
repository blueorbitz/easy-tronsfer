// ** React Imports

// ** MUI Imports
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

// ** Icons Imports

// ** Custom Components Imports
import ConnectWallet from 'src/views/transfers/ConnectWallet'
import TransferDetail from 'src/views/transfers/TransferDetail'
import ReceiverDetail from 'src/views/transfers/ReceiverDetail'
import TransferSummary from 'src/views/transfers/TransferSummary'
import { TransferContextProvider } from 'src/@core/hooks/useTransferContext'

// ** Styled Component Import

// ** Demo Components Imports

const Transfer = () => {
  return (
    <TransferContextProvider>
      <Container maxWidth="md">
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ConnectWallet />
          </Grid>

          <Grid item xs={12}>
            <TransferDetail />
          </Grid>

          <Grid item xs={12}>
            <ReceiverDetail />
          </Grid>

          <Grid item xs={12}>
            <TransferSummary />
          </Grid>

        </Grid>
      </Container>
    </TransferContextProvider>
  )
}

export default Transfer
