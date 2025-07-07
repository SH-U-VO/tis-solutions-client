/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './LoadingSpinner'
import ServiceCard from './ServiceCard'

const TabCategories = () => {

  
  const [selectedTabIndex, setSelectedTabIndex] = useState(-1)
  
  const {data: services, isLoading} = useQuery({
    queryKey: ['services'], queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/services`)
      return data
    }
  })

  console.log(services)

  const handleTabClick = (index) => {
    if (selectedTabIndex === index) {
      setSelectedTabIndex(-1) // Deselect if clicking the same tab
    } else {
      setSelectedTabIndex(index) // Select the clicked tab
    }
  }

  if (isLoading) return <LoadingSpinner />
  
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <Tabs selectedIndex={selectedTabIndex} onSelect={() => {}}>
        <div className='container px-6 py-16 mx-auto'>
          {/* Header Section with Enhanced Styling */}
          <div className="text-center mb-16">
            <div className="inline-block p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <div className="bg-white rounded-full p-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            
            <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6'>
              Your Personal Assistant
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <p className='text-lg text-gray-600 leading-relaxed'>
                We currently offer three easy-to-choose service categories—
                <span className="font-semibold text-blue-600"> Household Services </span>
                (for home maintenance and cleaning), 
                <span className="font-semibold text-purple-600"> Consultation Services </span>
                (expert advice tailored for you), and 
                <span className="font-semibold text-indigo-600"> Transportation Services </span>
                (safe, reliable rides). Simply pick the one that fits your needs, and we'll take care of the rest!
              </p>
            </div>
          </div>

          {/* Enhanced Tab List */}
          <div className='flex items-center justify-center mb-12'>
            <TabList className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/30 flex flex-row flex-wrap justify-center">
              <Tab 
                onClick={() => handleTabClick(0)}
                className="px-4 sm:px-6 py-4 mx-1 text-sm font-semibold text-gray-700 transition-all duration-300 rounded-xl cursor-pointer hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 react-tabs__tab--selected:bg-gradient-to-r react-tabs__tab--selected:from-blue-500 react-tabs__tab--selected:to-purple-600 react-tabs__tab--selected:text-white react-tabs__tab--selected:shadow-lg react-tabs__tab--selected:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                  <span className="hidden sm:inline">Household Services</span>
                  <span className="sm:hidden">Household</span>
                </div>
              </Tab>
              <Tab 
                onClick={() => handleTabClick(1)}
                className="px-4 sm:px-6 py-4 mx-1 text-sm font-semibold text-gray-700 transition-all duration-300 rounded-xl cursor-pointer hover:bg-purple-50 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 react-tabs__tab--selected:bg-gradient-to-r react-tabs__tab--selected:from-purple-500 react-tabs__tab--selected:to-pink-600 react-tabs__tab--selected:text-white react-tabs__tab--selected:shadow-lg react-tabs__tab--selected:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden sm:inline">Consultation Services</span>
                  <span className="sm:hidden">Consultation</span>
                </div>
              </Tab>
              <Tab 
                onClick={() => handleTabClick(2)}
                className="px-4 sm:px-6 py-4 mx-1 text-sm font-semibold text-gray-700 transition-all duration-300 rounded-xl cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 react-tabs__tab--selected:bg-gradient-to-r react-tabs__tab--selected:from-indigo-500 react-tabs__tab--selected:to-blue-600 react-tabs__tab--selected:text-white react-tabs__tab--selected:shadow-lg react-tabs__tab--selected:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="hidden sm:inline">Transportation Services</span>
                  <span className="sm:hidden">Transportation</span>
                </div>
              </Tab>
            </TabList>
          </div>

          {/* Enhanced Tab Panels */}
          
          {/* Show All Services when no tab is selected */}
          {selectedTabIndex === -1 && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
              <div className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 xl:mt-16 auto-rows-fr'>
                {
                  services?.map((service, index) => (
                    <div 
                      key={service.id}
                      className="transform hover:scale-105 transition-all duration-300 h-full"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <ServiceCard service={service} />
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {/* Household Services Tab Panel */}
          <TabPanel>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
              <div className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 xl:mt-16 auto-rows-fr'>
                {
                  services
                    ?.filter(service => service.category === 'Household Services')
                    .map((service, index) => (
                      <div 
                        key={service.id}
                        className="transform hover:scale-105 transition-all duration-300 h-full"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                      >
                        <ServiceCard service={service} />
                      </div>
                    ))
                }
              </div>
            </div>
          </TabPanel>

          {/* Consultation Services Tab Panel */}
          <TabPanel>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
              <div className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 xl:mt-16 auto-rows-fr'>
                {
                  services
                    ?.filter(service => service.category === 'Consultation')
                    .map((service, index) => (
                      <div 
                        key={service.id}
                        className="transform hover:scale-105 transition-all duration-300 h-full"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                      >
                        <ServiceCard service={service} />
                      </div>
                    ))
                }
              </div>
            </div>
          </TabPanel>

          {/* Transportation Services Tab Panel */}
          <TabPanel>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
              <div className='relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 xl:mt-16 auto-rows-fr'>
                {
                  services
                    ?.filter(service => service.category === 'Transportation')
                    .map((service, index) => (
                      <div 
                        key={service.id}
                        className="transform hover:scale-105 transition-all duration-300 h-full"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                      >
                        <ServiceCard service={service} />
                      </div>
                    ))
                }
              </div>
            </div>
          </TabPanel>
        </div>
      </Tabs>
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom tab styles */
        .react-tabs__tab-list {
          border: none !important;
          margin: 0 !important;
        }
        
        .react-tabs__tab {
          border: none !important;
          background: none !important;
          border-radius: 12px !important;
        }
        
        .react-tabs__tab--selected {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6) !important;
          color: white !important;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3) !important;
          transform: scale(1.05) !important;
        }
        
        .react-tabs__tab:focus {
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important;
        }
        
        .react-tabs__tab-panel {
          outline: none !important;
        }

        /* Line clamp utility for consistent text heights */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default TabCategories