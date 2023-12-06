import { Layout } from '@/components'
import { Customers, NotFound } from '@/pages'
import { Navigate, useRoutes } from 'react-router-dom'
export default function AppRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/customers', element: <Customers /> },
        {
          path: '/',
          element: <Navigate to='/customers?sortby=id&order=asc' />,
        },
      ],
    },
    {
      path: '/404',
      element: <NotFound />,
    },
    {
      path: '*',
      element: (
        <Navigate
          to='/404'
          replace
        />
      ),
    },
  ])
}
export { AppRoutes }
