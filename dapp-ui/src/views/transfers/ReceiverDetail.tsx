// ** React Imports
import type { ComponentFlowType } from 'types/app'

// ** MUI Imports

// ** Custom Components Imports
import ReceiverSearch from './ReceiverSearch'
import useTransferContext from 'src/@core/hooks/useTransferContext'

const ReceiverDetail = ({ onNext }: ComponentFlowType) => {
  const {
    receiverUserId,
  } = useTransferContext();

  const onSubmit = () => {
    if (receiverUserId !== '')
      onNext()
  }

  return (
    <ReceiverSearch onNext={onSubmit} useCustomContext={useTransferContext} nextText='Next' />
  )
}

export default ReceiverDetail
