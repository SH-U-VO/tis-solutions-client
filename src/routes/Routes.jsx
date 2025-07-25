import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Login from '../pages/Authentication/Login'
import Register from '../pages/Authentication/Register'
import CardDetails from '../pages/CardDetails'
import AddServices from '../pages/AddServices'
import MyBookedServices from '../pages/MyBookedServices'
import ServiceProviderDashboard from '../pages/ServiceProviderDashboard'
import PrivateRoute from './PrivateRoute'
import AllMyPostedServices from '../pages/AllMyPostedServices'
import UpdateMyService from '../pages/UpdateMyService'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Register />,
      },
      {
        path: '/service-details/:id',
        element: <CardDetails />,
      },
      {
        path: '/add-service',
         element: (
          <PrivateRoute>
            <AddServices />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-booked-services',
        element: <MyBookedServices />,
      },
      {
        path: '/my-posted-services',
        element: <ServiceProviderDashboard />,
      },
      {
        path: '/all-my-posted-services',
        element: <AllMyPostedServices/>,
      },
      {
        path: '/update-service/:id',
        element: <UpdateMyService />,
      },
    ],
  },
])

export default router
