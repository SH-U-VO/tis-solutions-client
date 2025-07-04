import React from 'react';
import logo from '../assets/images/logo.png'; // Assuming your logo path
import CompanyName from '../assets/images/CompanyName.png';
// Make sure you have react-icons installed: npm install react-icons
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-[#1e1c3a] text-gray-300 pt-10'> {/* Darker background, lighter text */}
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8'>
                    {/* Column 1: Company Info & Socials */}
                    <div>
                        <div className='flex items-center mb-4'>
                            <img className='rounded-full w-auto h-10 mr-2' src={logo} alt='TIS Solutions Logo' /> {/* Larger logo */}
                            <span className='text-xl font-semibold text-white'>TIS Group</span> {/* Prominent company name */}
                        </div>
                        <p className='text-sm mb-4'>
                            A brief description of TIS Solutions, what you do, or your motto.
                            (e.g., Your trusted partner in innovative IT solutions.)
                        </p>
                        <div className='flex space-x-4 mt-4'>
                            <a href='#' className='text-gray-400 hover:text-white transition-colors duration-300' aria-label='Facebook'>
                                <FaFacebookF className='w-6 h-6' />
                            </a>
                            <a href='#' className='text-gray-400 hover:text-white transition-colors duration-300' aria-label='Twitter'>
                                <FaTwitter className='w-6 h-6' />
                            </a>
                            <a href='#' className='text-gray-400 hover:text-white transition-colors duration-300' aria-label='LinkedIn'>
                                <FaLinkedinIn className='w-6 h-6' />
                            </a>
                            {/* Add more social icons if needed */}
                        </div>
                    </div>

                    {/* Column 2: Quick Links / Company */}
                    <div>
                        <h3 className='text-white font-semibold mb-4 text-lg'>Company</h3>
                        <ul className='space-y-2'>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>About Us</a></li>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>Our Team</a></li>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>Careers</a></li>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>Contact Us</a></li>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>Case Studies</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h3 className='text-white font-semibold mb-4 text-lg'>Services</h3>
                        <ul className='space-y-2'>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>Consultation Services</a></li>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>Home Repair Services</a></li>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>Lawyers services</a></li>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>IT Electronic Item Repairing Services</a></li>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>Cyber Spiritual activity services (milad, khatna, puja , Bibaho)</a></li>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'> Educational Services</a></li>
                            <li><a href='#' className='hover:text-white transition-colors duration-300'>Beauty and Grooming Services</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Information */}
                    <div>
                        <h3 className='text-white font-semibold mb-4 text-lg'>Get In Touch</h3>
                        <ul className='space-y-3'>
                            <li className='flex items-start'>
                                <FaMapMarkerAlt className='w-5 h-5 mr-3 mt-1 flex-shrink-0' />
                                <span>123 Main Street, Cityville, State, 12345, Country</span>
                            </li>
                            <li className='flex items-center'>
                                <FaEnvelope className='w-5 h-5 mr-3' />
                                <span>info@tissolutions.com</span>
                            </li>
                            <li className='flex items-center'>
                                <FaPhoneAlt className='w-5 h-5 mr-3' />
                                <span>+1 (123) 456-7890</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className='border-gray-700 my-8' /> {/* Darker horizontal line */}

                {/* Bottom Section: Copyright */}
                <div className='flex flex-col sm:flex-row justify-between items-center py-4 text-sm text-gray-400'>
                    <p className='text-center sm:text-left mb-2 sm:mb-0'>
                        &copy; {new Date().getFullYear()} TIS Solutions. All rights reserved.
                    </p>
                    <div className='flex space-x-4'>
                        {/* You can add links here like Terms of Service, Privacy Policy etc. */}
                        <a href='#' className='hover:text-white transition-colors duration-300'>Privacy Policy</a>
                        <a href='#' className='hover:text-white transition-colors duration-300'>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;