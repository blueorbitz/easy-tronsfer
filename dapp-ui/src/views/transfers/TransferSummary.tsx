// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import useTransferContext from 'src/@core/hooks/useTransferContext'
import useTronWeb from 'src/@core/hooks/useTronWeb'

const TransferSummary = () => {
  const tron = useTronWeb()
  const {
    contractAddress,
    transferAmount,
    receiverProvider,
    receiverUserId,
  } = useTransferContext()

  return (
    <Card>
      <CardHeader title='Summary' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Typography variant='subtitle1'>{`Receiver [${receiverProvider}]: ${receiverUserId}`}</Typography>
        <Typography variant='body2'>
          {`From: ${tron.address}`}
        </Typography>
        {
          contractAddress !== '' &&
          <Typography variant='body2'>
            {`Token Contract: ${contractAddress}`}
          </Typography>
        }
        <Typography variant='body2'>
          {`Amount: ${transferAmount} ${tron.trc20.symbol || 'TRX'}`}
        </Typography>
        <Typography variant='body2'>
          {`Meta: { type: ${receiverProvider}, userId: ${receiverUserId} }`}
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
  )
}

export default TransferSummary
