import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import ErrorPage from '../pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     index: true,
    //     element: <Home />,
    //   },
    //   {
    //     path: '/jobs',
    //     element: <AllJobs />,
    //   },
    //   {
    //     path: '/login',
    //     element: <Login />,
    //   },
    //   {
    //     path: '/registration',
    //     element: <Register />,
    //   },
    //   {
    //     path: '/job/:id',
    //     element: (
    //       <PrivateRoute>
    //         <JobDetails />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: '/update/:id',
    //     element: (
    //       <PrivateRoute>
    //         <UpdateJob />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: '/add-job',
    //     element: (
    //       <PrivateRoute>
    //         <AddJob />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: '/my-bids',
    //     element: (
    //       <PrivateRoute>
    //         <MyBids />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: '/my-posted-jobs',
    //     element: (
    //       <PrivateRoute>
    //         <MyPostedJobs />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: '/bid-requests',
    //     element: (
    //       <PrivateRoute>
    //         <BidRequests />
    //       </PrivateRoute>
    //     ),
    //   },
    // ],
  },
])

export default router
