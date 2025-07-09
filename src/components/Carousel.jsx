// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

// import required modules
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from 'swiper/modules'
import Slide from './Slide'

import bgimg1 from '../assets/images/carousel1.jpg'
import bgimg2 from '../assets/images/carousel2.jpg'
import bgimg3 from '../assets/images/carousel3.jpg'

export default function Carousel() {
  return (
    <div className='relative overflow-hidden h-screen w-full'>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 z-10 pointer-events-none" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}} />
      </div>

      <div className='h-full w-full relative z-20'>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          speed={1500}
          effect="fade"
          parallax={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: function (index, className) {
              return `<span class="${className} custom-bullet"></span>`
            },
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
          className='mySwiper h-full w-full'
        >
          <SwiperSlide>
            <div className="relative h-full w-full overflow-hidden">
              <img 
                src={bgimg1} 
                alt="Web Development" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-8 max-w-4xl">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 slide-in-left">
                    Get Your Web Development
                  </h1>
                  <p className="text-2xl md:text-3xl mb-8 slide-in-right">
                    Projects Done in minutes
                  </p>
                  <button className="glass-button px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                    Start Your Project
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full w-full overflow-hidden">
              <img 
                src={bgimg2} 
                alt="Graphics Design" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-8 max-w-4xl">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 slide-in-left">
                    Get Your Graphics Design
                  </h1>
                  <p className="text-2xl md:text-3xl mb-8 slide-in-right">
                    Projects Done in minutes
                  </p>
                  <button className="glass-button px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                    Start Designing
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full w-full overflow-hidden">
              <img 
                src={bgimg3} 
                alt="Digital Marketing" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-8 max-w-4xl">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 slide-in-left">
                    Start Your Digital Marketing
                  </h1>
                  <p className="text-2xl md:text-3xl mb-8 slide-in-right">
                    Campaigns up n running
                  </p>
                  <button className="glass-button px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                    Launch Campaign
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-110 group">
          <svg className="w-6 h-6 text-white group-hover:text-purple-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        
        <div className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-110 group">
          <svg className="w-6 h-6 text-white group-hover:text-purple-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Custom CSS for enhanced styling */}
      <style>{`
        .mySwiper {
          height: 100vh !important;
          width: 100vw !important;
        }

        .mySwiper .swiper-pagination {
          bottom: 30px;
          z-index: 50;
        }

        .custom-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.4) !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
          margin: 0 6px !important;
        }

        .custom-bullet:hover {
          background: rgba(255, 255, 255, 0.7) !important;
          transform: scale(1.2) !important;
        }

        .swiper-pagination-bullet-active.custom-bullet {
          background: linear-gradient(45deg, #8b5cf6, #06b6d4) !important;
          transform: scale(1.3) !important;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.5) !important;
        }

        .glass-button {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          color: white !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
          transition: all 0.3s ease !important;
        }

        .glass-button:hover {
          background: rgba(139, 92, 246, 0.3) !important;
          border-color: rgba(139, 92, 246, 0.5) !important;
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.2) !important;
          transform: scale(1.05) translateY(-2px) !important;
        }

        .slide-in-left {
          animation: slideInLeft 1.2s ease-out forwards;
          opacity: 0;
          transform: translateX(-100px);
        }

        .slide-in-right {
          animation: slideInRight 1.2s ease-out 0.3s forwards;
          opacity: 0;
          transform: translateX(100px);
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .swiper-slide-active .slide-in-left {
          animation: slideInLeft 1.2s ease-out forwards;
        }

        .swiper-slide-active .slide-in-right {
          animation: slideInRight 1.2s ease-out 0.3s forwards;
        }

        .swiper-slide:not(.swiper-slide-active) .slide-in-left,
        .swiper-slide:not(.swiper-slide-active) .slide-in-right {
          opacity: 0;
          transform: translateX(-100px);
        }

        .swiper-slide:not(.swiper-slide-active) .slide-in-right {
          transform: translateX(100px);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .custom-prev,
        .custom-next {
          animation: float 3s ease-in-out infinite;
          z-index: 50;
        }

        .custom-next {
          animation-delay: 1.5s;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .slide-in-left,
          .slide-in-right {
            font-size: 2rem;
          }
          
          .custom-prev,
          .custom-next {
            width: 10px;
            height: 10px;
          }
          
          .custom-prev {
            left: 8px;
          }
          
          .custom-next {
            right: 8px;
          }
        }

        @media (max-width: 480px) {
          .slide-in-left {
            font-size: 1.5rem;
          }
          
          .slide-in-right {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  )
}