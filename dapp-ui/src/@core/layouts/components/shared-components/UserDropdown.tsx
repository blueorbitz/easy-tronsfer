// ** React Imports
import React, { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import WalletOutline from 'mdi-material-ui/WalletOutline'
import ArchiveCancelOutline from 'mdi-material-ui/ArchiveCancelOutline'

// ** Custom Components Imports
import useTronWeb from 'src/@core/hooks/useTronWeb'
import { shortenText } from 'src/@core/utils/text-format'

// ** Styled Components
const BadgeContentSuccessSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const BadgeContentWarningSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.warning.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const tron = useTronWeb()
  const { data: session } = useSession()

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={tron.isConnect
          ? <BadgeContentSuccessSpan />
          : <BadgeContentWarningSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src='/images/avatars/1.png'
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={tron.isConnect
                ? <BadgeContentSuccessSpan />
                : <BadgeContentWarningSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>Welcome</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {shortenText(tron.address, 18)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        {
          tron.isConnect
            ? <MenuItem sx={{ p: 0 }} disabled>
              <Box sx={styles}>
                <WalletOutline sx={{ marginRight: 2 }} />
                Wallet Connected
              </Box>
            </MenuItem>
            : <MenuItem sx={{ p: 0 }} disabled>
              <Box sx={styles}>
                <ArchiveCancelOutline sx={{ marginRight: 2 }} />
                Wallet Disconnected
              </Box>
            </MenuItem>
        }
        {
          session && <React.Fragment>
            <Divider />
            <MenuItem sx={{ p: 0 }} onClick={() => {
              signOut()
              handleDropdownClose()
            }}>
              <Box sx={styles}>
                <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
                {`Logout ${session.account.provider}`}
              </Box>
            </MenuItem>
          </React.Fragment>
        }
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
