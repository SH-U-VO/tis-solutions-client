import React, { useState } from 'react';
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
  FaRegHeart
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {_id, id, title, description, image, rating, totalReviews, price, originalPrice, duration, location, isPopular, features, category, provider, availability, discount } = service || {};
   
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

  return (
    <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 h-full flex flex-col">
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

        Provider Info - Fixed Height
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
        <div className="flex gap-3 mt-auto">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white btn rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
            <FaShoppingCart className="mr-2" />
            Book Now
          </button>
          
          <Link
          to={`/service-details/${_id}`}
          className="btn border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
            <FaEye className="mr-2" />
            View Details
          </Link> 
        </div>
      </div>

      {/* Hover Effect Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default ServiceCard;