import { useContext, useEffect, useState } from 'react';
import { Star, Heart, Share2, ArrowLeft, ShoppingCart, MapPin, Clock, Award, Users, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import { useLoading } from '../context/LoadingContext';

const CardDetails = () => {
  const { id } = useParams();
  const { setIsLoading } = useLoading();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      console.log(data);
      return data;
    }
  });


  const service = services?.find(service => service._id === id);
  console.log(service)

  useEffect(() => {
    if (!service || !user) return;
    if (service && user) {
      const isAlreadyLiked = service?.wishlist.some(email => email === user?.email);
      setIsWishlisted(isAlreadyLiked);
    }
  }, [service, user]);

  const toggleWishlist = async () => {
    setIsWishlisted(!isWishlisted);

    if (!isWishlisted) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/update-service/${id}`, {
          wishlistEmail: user.email,
          inWishlist: true
        });
        toast.success('Added to Wishlist');
      } catch (err) {
        console.error('Added error:', err);
        toast.error(err.response?.data?.message || 'Failed to Add Wishlist');
      }
    } else {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/update-service/${id}`, {
          wishlistEmail: user.email,
          inWishlist: false
        });
        toast.success('Removed from Wishlist');
      } catch (err) {
        console.error('Removed error:', err);
        toast.error(err.response?.data?.message || 'Failed to Remove Wishlist');
      }
    }


  };

  // Service data based on your structure
  // Note: The 'specifications' array is now part of the 'service' object
  // and will be dynamically rendered.


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
      await axios.put(`${import.meta.env.VITE_API_URL}/update-service/${id}`, myData); // ✅ use myData directly
      toast.success('Service booked successfully');

      toast.dismiss(t.id); // Dismiss FIRST
      setIsLoading(true);   // THEN show spinner
      setTimeout(() => {
        setIsLoading(false);
      }, 1100); // Optional delay

      navigate('/')
    } catch (err) {
      console.error('Update error:', err);
      toast.error(err.response?.data?.message || 'Failed to book service');
    }
  };

  // Submit button toast
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

  const handleShare = () => {
    // Share logic here
    console.log('Shared');
  };

  const renderStars = (rating, interactive = false, size = 'w-4 h-4') => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
              } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && setUserRating(star)}
          />
        ))}
      </div>
    );
  };



  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely amazing sound quality! The noise cancellation works perfectly and the battery life is incredible. Worth every penny!",
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      rating: 4,
      date: "1 week ago",
      comment: "Great headphones overall. The build quality is solid and they're very comfortable for long listening sessions. Only minor complaint is the case could be smaller.",
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      user: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      date: "2 weeks ago",
      comment: "Perfect for my daily commute! The noise cancellation blocks out all the train noise. Setup was super easy and they pair instantly with my phone.",
      helpful: 31,
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <Link
                to='/'
                className="font-medium">Back</Link>
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleWishlist}
                className={`p-2 rounded-full transition-colors ${isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={service?.image}
                alt={service?.title}
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          {/* Service Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {service?.category}
                </span>
                {service?.isPopular && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    Popular
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{service?.title}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {renderStars(service?.rating)}
                  <span className="text-sm text-gray-600 ml-2">
                    {service?.rating} ({service?.totalReviews} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Award className="w-4 h-4" />
                  <span>{service?.provider?.verified ? 'Verified Provider' : 'Provider'}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">৳{service?.price}</span>
                <span className="text-xl text-gray-500 line-through">৳{service?.originalPrice}</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  {service?.discount}% OFF
                </span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{service?.description}</p>

            {/* Service Provider */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Provider</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {/* {service?.provider?.name.charAt(0)} */}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{service?.provider?.name}</h4>
                  <p className="text-sm text-gray-600">{service?.provider?.experience}</p>
                </div>
                {service?.provider?.verified && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">Verified</span>
                  </div>
                )}
              </div>
            </div>

            {/* Service Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Features</h3>
              <ul className="space-y-2">
                {service?.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Duration: {service?.duration}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Location: {service?.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Availability: {service?.availability}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Award className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">30-Day Warranty</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={showBookingToast}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Book Service</span>
              </button>
              <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                Contact Provider
              </button>
            </div>

            {/* Service Info */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Service available in {service?.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Service duration: {service?.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {['overview', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Service Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  {service?.description} Our skilled technicians provide professional repair services with genuine parts and comprehensive warranty coverage.
                  We ensure quality service with quick turnaround times and reliable solutions for all your electronic device needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">What's Included</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Professional diagnosis and assessment</li>
                      <li>• Expert repair service</li>
                      <li>• Genuine replacement parts</li>
                      <li>• 30-day service warranty</li>
                      <li>• Post-service support</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Service Guarantee</h3>
                    <p className="text-gray-600">
                      We provide a 30-day warranty on all repairs with free follow-up service if needed.
                      Our expert technicians ensure quality workmanship and customer satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service?.specifications?.map((spec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg shadow-sm">
                      <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" /> {/* Example icon */}
                      <p className="text-gray-700">
                        {spec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Rating Summary */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{service?.rating}</div>
                      <div className="flex items-center justify-center mt-2">
                        {renderStars(service?.rating)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Based on {service?.totalReviews} reviews
                      </div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-3 mb-1">
                          <span className="text-sm text-gray-600 w-3">{rating}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8 text-right">
                            {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Write Your Review</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Your Rating</label>
                      {renderStars(userRating, true, 'w-6 h-6')}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Your Review</label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        placeholder="Share your experience with this service..."
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Submit Review
                      </button>
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h4 className="font-semibold text-gray-900">{review.user}</h4>
                            {review.verified && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 mb-3">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700 mb-4">{review.comment}</p>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600">
                              <ThumbsUp className="w-4 h-4" />
                              <span>Helpful ({review.helpful})</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600">
                              <MessageCircle className="w-4 h-4" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;


