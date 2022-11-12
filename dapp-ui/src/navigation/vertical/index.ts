// ** Icon imports
import SendOutline from 'mdi-material-ui/SendOutline'
import InboxOutline from 'mdi-material-ui/InboxOutline'
import MagnifyPlusOutline from 'mdi-material-ui/MagnifyPlusOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Transfer',
      icon: SendOutline,
      path: '/'
    },
    {
      title: 'Receive',
      icon: InboxOutline,
      path: '/receive'
    },
    {
      title: 'About',
      icon: MagnifyPlusOutline,
      path: '/about'
    },
  ]
}

export default navigation
