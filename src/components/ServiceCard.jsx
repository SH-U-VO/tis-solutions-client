import { useContext, useState } from 'react';
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaUsers,
  FaEye,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaTimes
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';
import { useLoading } from '../context/LoadingContext';



const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const { user } = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);


 const handleSubmit = async e => {
  e.preventDefault();
  const form = e.target;
  const phoneNumber = form.phoneNumber.value;
  const preferredDate = form.preferredDate.value;
  const address = form.address.value;
  const urgency = form.urgency.value;

  const myData = {
    consumers: {
      ConsumerEmail: user.email || '',
      ConsumerName: user.displayName || '',
      phoneNumber: phoneNumber || '',
      preferredDate: preferredDate || '',
      address: address || '',
      urgency: urgency || ''
    }
  };

  console.log(myData);

  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/update-service/${_id}`, myData); // ✅ use myData directly
    toast.success('Service booked successfully');
  } catch (err) {
    console.error('Update error:', err);
    toast.error(err.response?.data?.message || 'Failed to book service');
  }
};



  const { _id, title, description, image, rating, totalReviews, price, originalPrice, duration, location, isPopular, category, provider, availability, discount } = service || {};

  // NEW: Custom toast with form
  const showBookingToast = () => {
    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        relative max-w-lg w-full bg-white shadow-2xl rounded-xl overflow-hidden
        pointer-events-auto flex flex-col transform transition-all duration-300 ease-in-out
        ring-1 ring-blue-300 ring-opacity-70 border border-blue-100`}
        >
          {/* Header with gradient and subtle shadow */}
          <div className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-md">
            <h3 className="text-xl font-extrabold flex items-center gap-2">
              {/* A more engaging icon for booking */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A1 1 0 0011.383 2H8.617a1 1 0 00-.707.293L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Book Your Service
            </h3>
            <button
              onClick={() => {
                toast.dismiss(t.id); // Dismiss FIRST
                setIsLoading(true);   // THEN show spinner
                setTimeout(() => {
                  setIsLoading(false);
                }, 1100); // Optional delay
              }}
              className="p-1 rounded-full text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-colors"
              aria-label="Close"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 bg-white space-y-5 flex-grow">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Full Name</label>
                <input
                  type="text"
                  name="ConsumerName"
                  defaultValue={user.displayName || ''}
                  disabled={true}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base
             bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="e.g., +880 1XXXXXXXXX"
                  required
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"

                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Address</label>
                <textarea
                  name="address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  rows="2"
                  placeholder="Your full address for service delivery"
                  required
                />
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Urgency</label>
                <select
                  name="urgency"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              {/* Footer Buttons */}
              <div className="flex border-t border-gray-100 bg-gray-50 rounded-b-xl overflow-hidden items-center">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-base font-semibold
                     hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit 
                </button>
              </div>
            </div>
          </form>



        </div>
      ),
      {
        duration: Infinity, // Toast won't auto-dismiss
        position: "top-center",
      }
    )
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error loading service</h2>
          <p className="text-gray-600">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }



  return (

    <>
      <div
        className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 h-full flex flex-col">
        {/* Card Header with Image - Fixed Height */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {isPopular && (
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                🔥 Popular
              </span>
            )}
            {discount > 0 && (
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-gray-600 text-lg" />
            )}
          </button>

          {/* Category Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/30">
              {category}
            </span>
          </div>
        </div>

        {/* Card Body - Flexible Height */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title and Rating - Fixed Height */}
          <div className="flex items-start justify-between mb-3 min-h-[60px]">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 flex-grow mr-2">
              {title}
            </h3>
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg flex-shrink-0">
              <div className="flex items-center text-sm">
                {renderStars(rating)}
              </div>
              <span className="ml-1 text-sm font-semibold text-gray-700">{rating}</span>
            </div>
          </div>

          {/* Provider Info - Fixed Height */}
          <div className="flex items-center mb-3 min-h-[24px]">
            <div className="flex items-center text-sm text-gray-600">
              <FaShieldAlt className="text-blue-500 mr-1" />
              <span className="font-medium">{provider?.name}</span>
              {provider?.verified && (
                <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>

          {/* Description - Fixed Height with Clamp */}
          <div className="mb-4 min-h-[40px]">
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Key Features - Fixed Height */}
          <div className="grid grid-cols-2 gap-2 mb-4 min-h-[48px]">
            <div className="flex items-center text-sm text-gray-600">
              <FaClock className="text-blue-500 mr-2 flex-shrink-0" />
              <span className="truncate">{duration}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaMapMarkerAlt className="text-red-500 mr-2 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaUsers className="text-green-500 mr-2 flex-shrink-0" />
              <span className="truncate">{totalReviews} reviews</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaShieldAlt className="text-purple-500 mr-2 flex-shrink-0" />
              <span className="truncate">Insured</span>
            </div>
          </div>

          {/* Availability - Fixed Height */}
          <div className="flex items-center mb-4 min-h-[20px]">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              <span className="text-sm text-green-600 font-medium">{availability}</span>
            </div>
          </div>

          {/* Spacer to push content to bottom */}
          <div className="flex-grow"></div>

          {/* Price Section - Fixed Height */}
          <div className="flex items-center justify-between mb-6 min-h-[48px]">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">৳{price?.toLocaleString()}</span>
              {originalPrice > price && (
                <span className="ml-2 text-sm text-gray-500 line-through">৳{originalPrice?.toLocaleString()}</span>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-xs text-green-600 font-medium">Best Price Guaranteed</p>
            </div>
          </div>

          {/* Action Buttons - Fixed Height */}
          <div className="flex gap-3 w-full mt-auto">
            <button
              onClick={showBookingToast} // Updated to show toast form
              className="flex-grow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white btn rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center px-2 py-3 min-w-0"
            >
              <FaShoppingCart className="mr-2" />
              <span className="truncate">Book Now</span>
            </button>

            <Link
              to={`/service-details/${_id}`}
              className="flex-grow btn border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center px-2 py-3 min-w-0"
            >
              <FaEye className="mr-2" />
              <span className="truncate">View Details</span>
            </Link>
          </div>
        </div>

        {/* Hover Effect Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </>
  );
};

export default ServiceCard;