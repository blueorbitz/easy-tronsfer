// ** React Imports
import { useState, useEffect } from 'react'

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

// ** Custom Components Imports
import useTronWeb from 'src/@core/hooks/useTronWeb'

const Transfer = () => {
  const tron = useTronWeb()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (tron.isConnect)
      setStep(1)
    else
      setStep(0)
  }, [tron.isConnect])

  return (
    <TransferContextProvider>
      <Container maxWidth="md">
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ConnectWallet />
          </Grid>

          {
            step >= 1 &&
            <Grid item xs={12}>
              <TransferDetail onNext={() => setStep(2)} />
            </Grid>
          }

          {
            step >= 2 &&
            <Grid item xs={12}>
              <ReceiverDetail onNext={() => setStep(3)} />
            </Grid>
          }

          {
            step >= 3 &&
            <Grid item xs={12}>
              <TransferSummary onNext={() => setStep(1)} />
            </Grid>
          }

        </Grid>
      </Container>
    </TransferContextProvider>
  )
}

export default Transfer
