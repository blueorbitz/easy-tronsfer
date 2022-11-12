// ** React Imports
import React, { useState } from 'react'
import type { ComponentFlowType } from 'types/app'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

// ** Custom Components Imports
import {
  getContractConfig,
  getProviderId,
  transferToProvider,
} from 'src/@core/utils/tron-utils'

// ** Custom Components Imports
import ReceiverSearch from './ReceiverSearch'
import useReceiveContext from 'src/@core/hooks/useReceiveContext'

const ConfirmTransferModal = ({ openState, onNext }: any) => {
  const [open, setOpen] = openState
  const [confirmText, setConfirmText] = useState('')
  const {
    providerId, fetchBalance,
    receiverProvider,
    receiverUserId,
    receiverUsername,
    transferAmount,
    tokenAddress,
  } = useReceiveContext()

  const isError = confirmText !== receiverUserId

  const send = async () => {
    const txid = await transferToProvider(providerId(), getProviderId(receiverProvider, receiverUserId), transferAmount, tokenAddress)
    console.log('transfer txid', txid)
    
    setOpen(false)
    onNext()

    await fetchBalance()
  }

  const onDonate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (isError) return

    const owner = getContractConfig().owner
    const amount = window.tronWeb.toSun(50)

    await window.tronWeb.trx.sendTransaction(owner, amount)
    await send()
  }

  const onSend = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (isError) return
    await send()
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Confirm action
        </Typography>

        <Typography variant='subtitle2' sx={{ mt: 2 }}>
          by donating 50 TRX to the owner account, it helps to sustain the GAS Fee new joiner to use the app for FREE.
        </Typography>

        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          <p>Provider: <code>{receiverProvider}</code></p>
          <p>Username: <code>{receiverUsername}</code></p>
          <p>ReceiverUserId: <code>{receiverUserId}</code></p>
          <TextField
            fullWidth
            type='text'
            label='Key in ReceiverUserId to confirm'
            error={isError}
            value={confirmText}
            onChange={e => setConfirmText(e.target.value)}
          />
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant='h6'>
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
            <Button variant='outlined' onClick={onSend}>
              Send
            </Button>
            <Button variant='contained' onClick={onDonate}>
              Donate & Send
            </Button>
          </Box>
        </Box>

      </Box>
    </Modal>
  )
}

const TransferToProvider = ({ onNext }: ComponentFlowType) => {
  const isOpenModal = useState(false)
  const {
    receiverProvider,
    receiverUserId,
    transferAmount,
  } = useReceiveContext()

  const onSubmit = () => {
    if (transferAmount > 0 && receiverProvider !== '' && receiverUserId !== '')
      isOpenModal[1](true)
  }

  return (
    <React.Fragment>
      <ReceiverSearch onNext={onSubmit} useCustomContext={useReceiveContext} nextText='Send' />
      <ConfirmTransferModal openState={isOpenModal} onNext={onNext} />
    </React.Fragment>
  )
}

export default TransferToProvider
