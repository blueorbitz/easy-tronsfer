import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function useToastError() {
  const [open, setOpen] = React.useState(false)
  const [message, setToast] = React.useState<string | null>(null)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway')
      return

    setOpen(false)
    setToast(null)
  };

  React.useEffect(() => {
    if (message !== '')
      handleClick()

  }, [message])

  const ToastError = () => (
    message !== null
      ? <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Note archived"
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      : null
  )

  return {
    ToastError,
    setToast,
  }
}