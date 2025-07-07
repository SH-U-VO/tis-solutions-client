import React, { useContext, useState } from 'react';
import CompanyName from '../assets/images/CompanyName.png';
// You might need to install react-icons: npm install react-icons
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';


const Navbar = () => {
const { user, logOut } = useContext(AuthContext)
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isServicesOpen, setIsServicesOpen] = useState(false);
const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    console.log(user)
    
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleServicesToggle = () => {
        setIsServicesOpen(!isServicesOpen);
    };

    const handleMobileServicesToggle = () => {
        setIsMobileServicesOpen(!isMobileServicesOpen);
    };

    return (
        <header className='relative z-50'>
            {/* Top Bar - mimicking NANOSOFT's top dark bar */}
            <div className="bg-gradient-to-r from-[#1e1c3a] to-[#2a2654] text-white text-sm py-2 px-4 md:px-8 lg:px-12 hidden md:flex justify-between items-center backdrop-blur-sm">
                {/* Left side: Contact Sales & Questions */}
                <div className="flex items-center space-x-6 w-full justify-between lg:w-auto lg:justify-start">
                    <div className="flex items-center space-x-2 group">
                        <FaPhoneAlt className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                        <span className="group-hover:text-blue-200 transition-colors duration-300">Contact sales</span>
                        <span className="font-semibold">(0712) 819 79 555</span>
                    </div>
                    <div className="flex items-center space-x-2 group">
                        <FaEnvelope className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                        <span className="group-hover:text-blue-200 transition-colors duration-300">Have a questions?</span>
                        <span className="font-semibold">contact@nano.sofi</span>
                    </div>
                </div>

                {/* Right side: Careers, Pricing, Social Icons */}
                <div className="hidden lg:flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        <li><Link to=''  className="hover:text-blue-300 transition-all duration-300 hover:scale-105">Boosting</Link></li>
                        <li><Link to=''  className="hover:text-blue-300 transition-all duration-300 hover:scale-105">Notification</Link></li>
                        <li><Link to=''  className="hover:text-blue-300 transition-all duration-300 hover:scale-105">My Offers</Link></li>
                        <li><Link to=''  className="hover:text-blue-300 transition-all duration-300 hover:scale-105">Our Teams</Link></li>
                        <li><Link to=''  className="hover:text-blue-300 transition-all duration-300 hover:scale-105">Contact Us</Link></li>
                    </ul>
                    <div className="flex space-x-4 ml-6">
                        <Link to=''  className="hover:text-blue-300 transition-all duration-300 hover:scale-125 hover:rotate-12"><FaFacebookF /></Link>
                        <Link to=''  className="hover:text-blue-300 transition-all duration-300 hover:scale-125 hover:-rotate-12"><FaTwitter /></Link>
                        <Link to=''  className="hover:text-blue-300 transition-all duration-300 hover:scale-125 hover:rotate-12"><FaLinkedinIn /></Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar - mimicking NANOSOFT's main white navbar */}
            <div className="navbar bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100 px-4 md:px-8 lg:px-12 py-3 sticky top-0 z-40">
                <div className="navbar-start">
                    {/* Mobile dropdown for the main navigation links */}
                    <div className="relative lg:hidden">
                        <div 
                            role="button" 
                            className="btn btn-ghost hover:bg-blue-50 transition-all duration-300"
                            onClick={handleMobileMenuToggle}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        
                        {/* Mobile Menu with Fancy Animation */}
                        <div className={`absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 ease-out transform ${
                            isMobileMenuOpen 
                                ? 'opacity-100 translate-y-0 scale-100' 
                                : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
                        }`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
                            <ul className="relative z-10 p-4 space-y-2">
                                <li><Link to=''  className="block px-4 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">HOME</Link></li>
                                <li><Link to=''  className="block px-4 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">COMPANY</Link></li>
                                <li><Link to=''  className="block px-4 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">REVIEWS</Link></li>
                                <li className="relative">
                                    <button 
                                        onClick={handleMobileServicesToggle}
                                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    >
                                        <span>OUR SERVICES</span>
                                        <FaChevronDown className={`transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`mt-2 ml-4 space-y-1 transition-all duration-300 ${
                                        isMobileServicesOpen 
                                            ? 'max-h-96 opacity-100' 
                                            : 'max-h-0 opacity-0 overflow-hidden'
                                    }`}>
                                        <Link to='' href='#' className='block px-4 py-2 text-sm rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300'>Household Services</Link>
                                        <Link to='' href='#' className='block px-4 py-2 text-sm rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300'>Consultation Services</Link>
                                        <Link to='' href='#' className='block px-4 py-2 text-sm rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300'>Transportation services</Link>
                                    </div>
                                </li>
                                <li><Link to=''  className="block px-4 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">MY PORTFOLIO</Link></li>
                                <li><Link to=''  className="block px-4 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Company Logo - Adjusted sizing for better fit */}
                    <Link to='' href="/" className="inline-flex items-center h-full max-h-[4rem] group">
                        <img
                            src={CompanyName}
                            alt="TIS Solutions Logo"
                            className="h-10 md:h-12 lg:h-14 w-auto object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                        />
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold text-gray-700">
                        <li><Link to='/'  className="hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group">
                            HOME
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                        </Link></li>
                        <li><Link to='https://www.google.com/maps/place/Khulna+University+of+Engineering+%26+Technology/@22.9005573,89.4997762,17z/data=!3m1!4b1!4m6!3m5!1s0x39ff9bda1d0ff6e5:0x123a926908efcd0c!8m2!3d22.9005524!4d89.5023565!16zL20vMGRfMl9x?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D'  className="hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group">
                            LOCATION
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                        </Link></li>
                        <li><Link to=''  className="hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group">
                            REVIEWS
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                        </Link></li>
                        <li className="relative">
                            <button 
                                onMouseEnter={handleServicesToggle}
                                onMouseLeave={handleServicesToggle}
                                className="hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group flex items-center space-x-1"
                            >
                                <span>OUR SERVICES</span>
                                <FaChevronDown className={`text-xs transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                            </button>
                            
                            {/* Desktop Services Dropdown */}
                            <div 
                                className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 ease-out transform ${
                                    isServicesOpen 
                                        ? 'opacity-100 translate-y-0 scale-100' 
                                        : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
                                }`}
                                onMouseEnter={() => setIsServicesOpen(true)}
                                onMouseLeave={() => setIsServicesOpen(false)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
                                <div className="relative z-10 p-4 space-y-1">
                                    <Link to='' href='#' className='block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg'>Household Services</Link>
                                    <Link to='' href='#' className='block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg'>Consultation Services</Link>
                                    <Link to='' href='#' className='block px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg'>Transportation services</Link>
                                    </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className='navbar-end'>
                    <ul className='menu menu-horizontal px-1'>
                        {!user && (
                            <li>
                                <Link 
                                    to='/login'
                                    className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl transition-all duration-300 hidden md:flex items-center px-6 py-2 rounded-full"
                                >
                                    BOOK SERVICES NOW !
                                </Link>
                            </li>
                        )}
                    </ul>

                    {user && (
                        <div className="relative">
                            <div
                                role='button'
                                className='btn btn-ghost btn-circle avatar hover:scale-110 hover:shadow-lg transition-all duration-300'
                                onClick={handleDropdownToggle}
                            >
                                <div title={user?.displayName} className='w-10 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-blue-400 transition-all duration-300'>
                                    <img
                                        referrerPolicy='no-referrer'
                                        alt='User Profile Photo'
                                        src={user?.photoURL}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            
                            {/* User Dropdown Menu */}
                            <div className={`absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 ease-out transform ${
                                isDropdownOpen 
                                    ? 'opacity-100 translate-y-0 scale-100' 
                                    : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
                            }`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
                                <div className="relative z-10">
                                    {/* User Info Header */}
                                    <div className="p-4 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-200">
                                                <img
                                                    referrerPolicy='no-referrer'
                                                    alt='User Profile Photo'
                                                    src={user?.photoURL}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{user?.displayName}</p>
                                                <p className="text-sm text-gray-500">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Menu Items */}
                                    <div className="p-4 space-y-2">
                                        <Link 
                                            to='/my-booked-services' 
                                            className='flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group' 
                                            onClick={handleDropdownClose}
                                        >
                                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span>My booked services</span>
                                        </Link>
                                        
                                        <Link 
                                            to='/my-posted-services' 
                                            className='flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group'
                                            onClick={handleDropdownClose}
                                        >
                                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span>My Posted Services</span>
                                        </Link>
                                        
                                        <button
                                            onClick={() => {
                                                logOut();
                                                handleDropdownClose();
                                            }}
                                            className='w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group mt-4'
                                        >
                                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay to close dropdowns when clicking outside */}
            {(isDropdownOpen || isMobileMenuOpen) && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
                    onClick={() => {
                        handleDropdownClose();
                        setIsMobileMenuOpen(false);
                    }}
                />
            )}
        </header>
    );
};

export default Navbar;