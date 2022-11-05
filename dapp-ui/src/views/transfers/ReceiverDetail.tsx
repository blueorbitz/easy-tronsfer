// ** React Imports
import { useEffect, useState } from 'react'
import { getProviders } from 'next-auth/react'

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
import { debounce } from 'src/@core/utils/web-generic'
import useTransferContext from 'src/@core/hooks/useTransferContext'

const ReceiverDetail = () => {
  const [providers, setProviders] = useState<any>();
  const {
    receiverProvider, setReceiverProvider,
    receiverUserId, setReceiverUserId,
  } = useTransferContext();

  const debounceReceiverUserId = debounce(async function (e: React.ChangeEvent<HTMLInputElement>) {
    const userId = e.target.value
    // do something
  });

  const onChangeReceiverUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceReceiverUserId(e)
    setReceiverUserId(e.target.value)
  };

  useEffect(() => {
    (async () => {
      setProviders(await getProviders())
    })()
  }, [])

  return (
    <Card>
      <CardHeader title='Receiver detail' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
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
                helperText='@username is valid'
                value={receiverUserId}
                onChange={onChangeReceiverUserId}
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
