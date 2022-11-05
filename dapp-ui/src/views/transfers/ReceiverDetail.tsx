// ** React Imports

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
import mediumConfig from 'src/configs/mediumConfig'
import { debounce } from 'src/@core/utils/web-generic'
import useTransferContext from 'src/@core/hooks/useTransferContext'

const ReceiverDetail = () => {
  const {
    receiverMedium, setReceiverMedium,
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

  return (
    <Card>
      <CardHeader title='Receiver detail' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id='medium-label'>Medium</InputLabel>
                <Select
                  labelId='medium-label'
                  value={receiverMedium}
                  label='Medium'
                  onChange={e => setReceiverMedium(e.target.value)}
                >
                  {
                    mediumConfig.supportedList
                      .map(o => <MenuItem value={o.value}>{o.label}</MenuItem>)
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
