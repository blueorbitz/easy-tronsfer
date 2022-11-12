// ** React Imports
import { useState, useEffect } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports

// ** Custom Components Imports

// ** Styled Component Import

// ** Custom Components Imports
import { getAbout, getContractConfig } from 'src/@core/utils/tron-utils'

const About = () => {
  const config = getContractConfig()
  const [owner, setOwner] = useState<any>({})
  const [contract, setContract] = useState<any>({})

  const donate = async () => {
    const owner = config.owner
    const amount = window.tronWeb.toSun(100)

    try {
      await window.tronWeb.trx.sendTransaction(owner, amount)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      const data = await getAbout()
      console.log(data)
      setOwner(data.owner)
      setContract(data.contract)
    })()
  }, [])

  return (
    <Container maxWidth='md'>
      <Grid container spacing={6}>
        <Typography variant='h4'>About</Typography>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='body1' sx={{ mb: 1 }}>
                <strong>TRONsfer</strong> is the GOTO apps for <strong>people who are new to <i>TRON</i></strong>.
              </Typography>
              <Typography variant='body1' sx={{ mb: 1 }}>
                We support TRX and TRC20 token for you to transfer and pay your friends using their Web3 social alias/provider.
              </Typography>
              <Typography variant='body1' sx={{ mb: 1 }}>
                All you need to do is the intial transfer. You're good to go.
                Simply login using your Web3 account, and you can transfer or withdraw the fund whenever you need.
              </Typography>
              <Typography variant='body1' sx={{ mb: 1 }}>
                Transfer within provider is Free of charge (FOC). The transaction is subsidise by the contract owner,
                and therefore, is imported for us to keep the balance healthy to pay for the transaction GAS fee.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Contract owner balance sheet' titleTypographyProps={{ variant: 'h5' }} />
            <CardContent>
              <Typography variant='body1'>
                To reduce the dependency of using the Wallet, we need a proxy.
                This account is tied to the contract to pay for GAS fee for that purpose.
              </Typography>
              <Typography variant='body1'>
                Sensitive <strong>contract calls</strong> is only for contract owner to call uses this balance for the GAS fee too.
              </Typography>

              <Typography variant='h5' sx={{ mt: 2 }}>
                SUN balance: <code>{owner.balance ?? 0}</code>
              </Typography>
              <Typography variant='body2'>
                We accept <Button onClick={donate} size='small'>donations</Button> to maintain good health in this balance sheet.
              </Typography>

              <Typography variant='body1' sx={{ mt: 2 }}>
                <Link href={`${config.explorer}/#/address/${config.owner}`}>Check explorer</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='TRONsfer contract balance sheet' titleTypographyProps={{ variant: 'h5' }} />
            <CardContent>
              <Typography variant='body1'>
                This balance sheet represent the Vault of fund that are entrusted to facilitate the transfer via provider name.
              </Typography>

              <Typography variant='h5' sx={{ mt: 2 }}>
                SUN balance: <code>{contract.balance ?? 0}</code>
              </Typography>

              <Typography variant='body1' sx={{ mt: 2 }}>
                <Link href={`${config.explorer}/#/contract/${config.contractAddress}`}>Check explorer</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default About
