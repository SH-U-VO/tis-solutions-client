import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import AuthProvider from './providers/AuthProvider'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { LoadingProvider } from './context/LoadingContext'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoadingProvider>
          <RouterProvider router={router} />
          <Toaster position='top-center' reverseOrder={false} />
        </LoadingProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
