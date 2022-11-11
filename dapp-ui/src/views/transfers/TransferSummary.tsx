// ** React Imports
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import type { ComponentFlowType } from 'types/app'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Modal from '@mui/material/Modal'

// ** Custom Components Imports
import useTransferContext from 'src/@core/hooks/useTransferContext'
import useTronWeb from 'src/@core/hooks/useTronWeb'
import { getContractConfig, getProviderId, convertTokenAmount, transferTo } from 'src/@core/utils/tron-utils'

const ReceiptModal = ({ receipt }: any) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (receipt !== '')
      handleOpen()
  }, [receipt])

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Transfer Successful
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          <p>
            Status of the transaction at:
            <Link href={`${getContractConfig().explorer}/#/transaction/${receipt}`}>
              TronScan
            </Link>
          </p>
          TxId: <pre>{receipt}</pre>
        </Typography>
      </Box>
    </Modal>
  )
}

const TransferSummary = ({ onNext }: ComponentFlowType) => {
  const [receipt, setReceipt] = useState('')
  const tron = useTronWeb()
  const {
    tokenAddress,
    transferAmount,
    receiverProvider,
    receiverUserId,
    receiverUsername,
    resetAll,
  } = useTransferContext()

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const providerId = getProviderId(receiverProvider, receiverUserId)
    const _receipt = await transferTo(providerId, transferAmount, tokenAddress)

    resetAll()
    onNext()
    setReceipt(_receipt)
  }

  useEffect(() => {
    tron.trc20.setContractAddress(tokenAddress)
  }, [tokenAddress])

  return (
    <Card>
      <CardHeader title='Summary' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Typography variant='subtitle1'>{`Receiver: [${receiverProvider}] ${receiverUsername}`}</Typography>
        <Typography variant='body2'>
          {`ProviderId: ${receiverUserId}`}
        </Typography>
        <Typography variant='body2'>
          {`From: ${tron.address}`}
        </Typography>
        {
          tokenAddress != null &&
          <Typography variant='body2'>
            {`Token Contract: ${tokenAddress}`}
          </Typography>
        }
        <Typography variant='body2'>
          {`Amount: ${transferAmount} ${tron.trc20.symbol || 'TRX'}`}
        </Typography>
        <Typography variant='body2'>
          {`Meta: { type: ${receiverProvider}, userId: ${receiverUserId}, username: ${receiverUsername} }`}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h6'>
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
            <Button variant='contained' onClick={onSubmit}>Send</Button>
          </Box>
        </Box>
      </CardContent>
      <ReceiptModal receipt={receipt} />
    </Card>
  )
}

export default TransferSummary
