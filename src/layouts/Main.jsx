import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GlobalLoadingOverlay from '../components/GlobalLoadingOverlay'


const Main = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Loading State */}
      <GlobalLoadingOverlay />

      {/* Outlet */}
      <div className='min-h-[calc(100vh-306px)]'>
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Main
