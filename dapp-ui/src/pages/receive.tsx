// ** React Imports
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// ** MUI Imports
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

// ** Icons Imports

// ** Custom Components Imports
import ReceiverLogin from 'src/views/transfers/ReceiverLogin'
import VaultBalance from 'src/views/transfers/VaultBalance'
import WithdrawToken from 'src/views/transfers/WithdrawToken'
import { ReceiveContextProvider } from 'src/@core/hooks/useReceiveContext'

// ** Styled Component Import

// ** Demo Components Imports

const Transfer = () => {
  const { data: session } = useSession()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (session)
      setStep(1)
    else
      setStep(0)
  }, [session])

  return (
    <ReceiveContextProvider>
      <Container maxWidth="md">
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ReceiverLogin />
          </Grid>

          {
            step >= 1 &&
            <Grid item xs={12}>
              <VaultBalance onNext={() => setStep(2)}/>
            </Grid>
          }

          {
            step >= 2 &&
            <Grid item xs={12}>
              <WithdrawToken onNext={() => setStep(3)}/>
            </Grid>
          }

        </Grid>
      </Container>
    </ReceiveContextProvider>
  )
}

export default Transfer
