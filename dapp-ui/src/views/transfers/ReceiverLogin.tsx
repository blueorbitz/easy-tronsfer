// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Components Imports
import mediumConfig from 'src/configs/mediumConfig'
import { Button, Typography } from '@mui/material'

const ReceiverLogin = () => {
  const [medium, setMedium] = useState('')

  return (
    <Card>
      <CardHeader title='Receiver Login' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <FormControl fullWidth sx={{ mr: 5 }}>
            <InputLabel id='medium-label'>Medium</InputLabel>
            <Select
              labelId='medium-label'
              value={medium}
              label='Medium'
              onChange={e => setMedium(e.target.value)}
            >
              {
                mediumConfig.supportedList
                  .map(o => <MenuItem value={o.value}>{o.label}</MenuItem>)
              }
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'right' }}>
            <Button variant='contained' size='large'>Login</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ReceiverLogin
