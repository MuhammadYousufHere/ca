import { GrGroup, GrLogout } from 'react-icons/gr'
export const menuItems = [
  {
    name: 'Customers',
    Icon: GrGroup,
    to: '/customers',
  },

  {
    name: 'Log Out',
    Icon: GrLogout,
    color: 'red',
    to: '/',
    rotate: '180',
  },
]
