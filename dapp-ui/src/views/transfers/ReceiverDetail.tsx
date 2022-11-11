// ** React Imports
import { useEffect, useState } from 'react'
import { getProviders } from 'next-auth/react'
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

// ** Custom Components Imports
import { useDebounce, useUpdateEffect } from 'usehooks-ts'
import useTransferContext from 'src/@core/hooks/useTransferContext'

const ReceiverDetail = ({ onNext }: ComponentFlowType) => {
  const [providers, setProviders] = useState<any>()
  const {
    receiverProvider, setReceiverProvider,
    receiverUserId, setReceiverUserId,
    receiverUsername, setReceiverUsername,
  } = useTransferContext();
  const debouncedReceiverUsername = useDebounce<string>(receiverUsername, 1000)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (receiverUserId !== '')
      onNext()
  }

  const onChangeReceiverUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverUsername(e.target.value)
  };

  useEffect(() => {
    (async () => {
      setProviders(await getProviders())
    })()
  }, [])

  useUpdateEffect(() => {
    if (receiverUsername === '') {
      setReceiverUserId('')
      return
    }

    (async () => {
      try {
        let response: Response|undefined, data: any;
        switch (receiverProvider) {
          case 'github':
            response = await fetch('https://api.github.com/users/' + receiverUsername)
            data = await response.json()
            if (data.id)
              setReceiverUserId(data.id.toString())
            else
              setReceiverUserId('')
            break;
          case 'twitter':
            response = await fetch('/api/twitter/' + receiverUsername)
            data = await response.json()
            setReceiverUserId(data.id ?? '')
            break;
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [debouncedReceiverUsername])

  return (
    <Card>
      <CardHeader title='Receiver detail' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id='provider-label'>Provider</InputLabel>
                <Select
                  labelId='provider-label'
                  value={receiverProvider}
                  label='Provider'
                  onChange={e => setReceiverProvider(e.target.value)}
                >
                  {
                    providers && Object.values(providers)
                      .map((o: any) => <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                type='text'
                label='Receiver username'
                error={receiverUserId === ''}
                helperText={`${receiverUsername || '@username'}'s ID is ${receiverUserId || 'invalid'}`}
                value={receiverUsername}
                onChange={e => setReceiverUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6'>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
                  <Button type='submit' variant='contained'>
                    Next
                  </Button>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ReceiverDetail
