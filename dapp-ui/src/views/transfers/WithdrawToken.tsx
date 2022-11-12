// ** React Imports
import React, { useState } from 'react'
import type { ComponentFlowType } from 'types/app'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

// ** Custom Components Imports
import { useUpdateEffect } from 'usehooks-ts'
import useTronWeb from 'src/@core/hooks/useTronWeb'
import useReceiveContext from 'src/@core/hooks/useReceiveContext'
import {
  getContractConfig,
  withdrawToWallet,
} from 'src/@core/utils/tron-utils'

const ConfirmWithdrawToWalletModal = ({ openState }: any) => {
  const tron = useTronWeb()
  const [open, setOpen] = openState
  const [confirmText, setConfirmText] = useState('')
  const {
    providerId, fetchBalance,
    tokenAddress, setTokenAddress,
    transferAmount, setTransferAmount,
  } = useReceiveContext()

  const isError = !tron.isConnect || confirmText !== tron.address

  const onDonate = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (isError) return

    const owner = getContractConfig().owner
    const amount = window.tronWeb.toSun(50)

    await window.tronWeb.trx.sendTransaction(owner, amount)
    await withdrawToWallet(providerId(), transferAmount, tron.address, tokenAddress)
  }

  const onWithdraw = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (isError) return

    const txid = await withdrawToWallet(providerId(), transferAmount, tron.address, tokenAddress)
    console.log('withdraw txid', txid)

    setTransferAmount(0)
    setTokenAddress('')
    await fetchBalance()

    setOpen(false)
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
          <p>Wallet: <code>{tron.address}</code></p>
          <TextField
            fullWidth
            type='text'
            label='Key in wallet address to confirm'
            helperText={isError ? 'Wallet not connected or mistype!' : ''}
            error={isError}
            value={confirmText}
            onChange={e => setConfirmText(e.target.value)}
          />
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant='h6'>
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
            <Button variant='outlined' onClick={onWithdraw}>
              Withdraw
            </Button>
            <Button variant='contained' onClick={onDonate}>
              Donate & Withdraw
            </Button>
          </Box>
        </Box>

      </Box>
    </Modal>
  )
}

const WithdrawToken = ({ onNext }: ComponentFlowType) => {
  const tron = useTronWeb()
  const {
    providerId, balance,
    tokenAddress, setTokenAddress,
    transferAmount, setTransferAmount,
  } = useReceiveContext()
  const [tokenType, setTokenType] = useState('TRX')
  const isOpenConfirmWithdrawToWallet = useState(false)

  useUpdateEffect(() => {
    const found = balance.find((record: any) => record?.symbol === tokenType)
    setTokenAddress(found.address ?? '')
  }, [tokenType])

  const onWithdrawToWallet = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    
    if (transferAmount > 0)
      isOpenConfirmWithdrawToWallet[1](true)
  }

  return (
    <Card>
      <CardHeader title='Withdraw' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id='token-label'>Token</InputLabel>
                <Select
                  labelId='token-label'
                  value={tokenType}
                  label='Token Type'
                  onChange={e => setTokenType(e.target.value)}
                >
                  {
                    balance.map((o: any) =>
                      <MenuItem key={o.symbol} value={o.symbol}>{o.name}</MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={tokenType === 'TRX' ? 9 : 4}>
              <TextField
                fullWidth
                type='number'
                label='Amount'
                error={transferAmount <= 0}
                helperText={`Amount in ${tokenType}`}
                value={transferAmount}
                onChange={e => setTransferAmount(parseFloat(e.target.value))}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6'>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
                  <Button variant='outlined' onClick={onNext}>
                    Transfer to user
                  </Button>
                  <Button variant='contained' onClick={onWithdrawToWallet}>
                    Withdraw to wallet
                  </Button>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </form>
      </CardContent>

      <ConfirmWithdrawToWalletModal openState={isOpenConfirmWithdrawToWallet} />

    </Card>
  )
}

export default WithdrawToken
