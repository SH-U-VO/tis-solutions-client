import React from 'react';
import CompanyName from '../assets/images/CompanyName.png';
// You might need to install react-icons: npm install react-icons
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Navbar = () => {
    return (
        <header>
            {/* Top Bar - mimicking NANOSOFT's top dark bar */}
            {/* The main top bar container. It will be hidden on small screens by default (hidden)
                and become a flex container from medium screens (md:flex) upwards.
                justify-between will space out its direct children. */}
            <div className="bg-[#1e1c3a] text-white text-sm py-2 px-4 md:px-8 lg:px-12 hidden md:flex justify-between items-center">

                {/* Left side: Contact Sales & Questions */}
                {/* This div will be a flex container.
                    On small/medium screens (where the right side is hidden), it will take full width (w-full)
                    and its own content (phone/email) will be spaced out using justify-between.
                    On large screens (lg:w-auto), it will revert to auto width and its content will align to the start (lg:justify-start)
                    to allow the right side to appear. */}
                <div className="flex items-center space-x-6 w-full justify-between lg:w-auto lg:justify-start">
                    <div className="flex items-center space-x-2">
                        <FaPhoneAlt className="text-gray-400" />
                        <span>Contact sales</span>
                        <span className="font-semibold">(0712) 819 79 555</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-gray-400" />
                        <span>Have a questions?</span>
                        <span className="font-semibold">contact@nano.sofi</span>
                    </div>
                </div>

                {/* Right side: Careers, Pricing, Social Icons */}
                {/* This div will be hidden on small and medium screens (hidden)
                    and become a flex container only on large screens (lg:flex) and up. */}
                <div className="hidden lg:flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        <li><a href="#" className="hover:text-gray-300">Careers</a></li>
                        <li><a href="#" className="hover:text-gray-300">Pricing</a></li>
                        <li><a href="#" className="hover:text-gray-300">Case Studies</a></li>
                        <li><a href="#" className="hover:text-gray-300">IT Blog</a></li>
                        <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
                    </ul>
                    <div className="flex space-x-4 ml-6">
                        <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
                        <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
                        <a href="#" className="hover:text-gray-300"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            {/* Main Navbar - mimicking NANOSOFT's main white navbar */}
            <div className="navbar bg-base-100 shadow-sm px-4 md:px-8 lg:px-12 py-3"> {/* Added padding for better spacing */}
                <div className="navbar-start">
                    {/* Mobile dropdown for the main navigation links */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost"> {/* Kept btn-ghost for the mobile menu icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {/* Mobile menu items for main nav */}
                            <li><a href="#">HOME</a></li>
                            <li><a href="#">COMPANY</a></li>
                            <li><a href="#">CASE STUDIES</a></li>
                            <li>
                                <details>
                                    <summary>IT SERVICES</summary>
                                    <ul className="p-2">
                                        <li><a>Submenu 1</a></li>
                                        <li><a>Submenu 2</a></li>
                                    </ul>
                                </details>
                            </li>
                            {/* Add other links that are in the topbar for mobile here if needed */}
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Company Logo - Adjusted sizing for better fit */}
                    <a href="/" className="inline-flex items-center h-full max-h-[4rem]"> {/* Max height for the logo container */}
                        <img
                            src={CompanyName}
                            alt="TIS Solutions Logo"
                            className="h-10 md:h-12 lg:h-14 w-auto object-contain max-h-full" // Use larger heights for the image
                        />
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold text-gray-700">
                        <li><a href="#" className="hover:text-blue-600">HOME</a></li>
                        <li><a href="#" className="hover:text-blue-600">LOCATION</a></li>
                        <li><a href="#" className="hover:text-blue-600">REVIEWS</a></li>
                        <li>
                            <details>
                                <summary className="hover:text-blue-600">OUR SERVICES</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <a className="btn btn-primary bg-[#007bff] text-white border-none hover:bg-[#0056b3] hidden md:flex items-center px-4 py-2 rounded-md">
                        BOOK SERVICES NOW !
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Navbar;