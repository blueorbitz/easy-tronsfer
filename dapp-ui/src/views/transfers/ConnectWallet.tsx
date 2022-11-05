// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import useTronWeb from 'src/@core/hooks/useTronWeb'

const ConnectWallet = () => {
  const tron = useTronWeb()
  return (
    <Card>
      <CardHeader title='Connect wallet' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <TextField fullWidth required disabled
          value={tron.address}
          error={!tron.isConnect}
          helperText={tron.isConnect ? '' : 'Connect your TRON wallet to begin'}
          placeholder='xxxxxxxxxxxxxx'
        />
      </CardContent>
    </Card>
  )
}

export default ConnectWallet
