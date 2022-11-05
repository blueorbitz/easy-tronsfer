// ** React Imports
import { useSession, signIn, signOut } from 'next-auth/react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Components Imports
import { Typography } from '@mui/material'

const ReceiverLogin = () => {
  const { data: session } = useSession()

  return (
    <Card>
      <CardHeader title='Receiver Login' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='body2'>
              Sign in using your preferred provider where you have received the token.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'right' }}>
            {
              session
                ? <Button variant='contained' onClick={() => signOut()} color='error'>Sign Out</Button>
                : <Button variant='contained' onClick={() => signIn(undefined, { callbackUrl: '/receive' })}>Sign In</Button>
            }
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ReceiverLogin
