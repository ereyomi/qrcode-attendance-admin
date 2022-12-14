// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// import ImageFilterCenterFocusWeak from 'mdi-material-ui/ImageFilterCenterFocusWeak'

import AccountGroup from 'mdi-material-ui/AccountGroup'

import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Students',
      icon: AccountGroup,
      path: '/'
    },
    {
      title: 'Lecturers',
      icon: AccountGroup,
      path: '/lectures'
    },

    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/styleguide/dashboad'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/styleguide/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/styleguide/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/styleguide/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/styleguide/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/styleguide/typography'
    },
    {
      title: 'Icons',
      path: '/styleguide/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/styleguide/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/styleguide/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/styleguide/form-layouts'
    }
  ]
}

export default navigation
