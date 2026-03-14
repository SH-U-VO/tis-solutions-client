import React, { useState, useEffect, useContext } from 'react';
import { Edit, Trash2, MapPin, Clock, Star, DollarSign, Users, Calendar, Tag, FileImage } from 'lucide-react';
import { useMyAxios } from '../hooks/useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Define fetchAllServices outside the component
const fetchAllServices = async (myAxios, email) => {
//   console.log('Fetching services for email:', email); 
  // Meaningful debug log
  try {
    const { data } = await myAxios.get(`/services/${email}`);
    return data;
  } catch (error) {
    console.error('Fetch services error:', {
      message: error.message,
      response: error.response,
      request: error.request,
    });
    toast.error('Failed to fetch services');
    throw error; // Let the caller handle the error if needed
  }
};

const AllMyPostedServices = () => {
  const [services, setServices] = useState([]);
  const myAxios = useMyAxios();
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    if (user?.email) {
    //   console.log('Running useEffect to fetch services...');
       // Meaningful debug log
      fetchAllServices(myAxios, user.email)
        .then(data => setServices(data))
        .catch(() => setServices([])); // Fallback to empty array on error
    }
  }, [myAxios, user?.email]); // Depend only on myAxios and user.email

  // Filter and sort services
  const filteredServices = services
    .filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(service =>
      filterCategory === 'all' || service.category === filterCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price) - parseInt(b.price);
        case 'price-high':
          return parseInt(b.price) - parseInt(a.price);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const categories = ['Consultation Services', 'Household Services','Transportation Services'];

  // Handle service deletion
  const handleDeleteService = async (serviceId) => {
    try {
      await myAxios.delete(`/service/${serviceId}`); // Use myAxios for consistency
      toast.success('Service deleted successfully', {
        duration: 4000,
      });
      setServices(prev => prev.filter(service => service._id !== serviceId));
      setShowDeleteModal(false);
      setServiceToDelete(null);
    } catch (err) {
      console.error('Delete error:', {
        message: err.message,
        response: err.response,
        request: err.request,
      });
      toast.error(err.response?.data?.message || 'Failed to delete service');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Posted Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and monitor all your posted services in one place
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 backdrop-blur-sm bg-opacity-95">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Categories</option>
                {
                categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="newest">Sort by Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Tag className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Popular Services</p>
                <p className="text-2xl font-bold">{services.filter(s => s.isPopular).length}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg. Rating</p>
                <p className="text-2xl font-bold">
                  {(services.length > 0
                    ? services.reduce((sum, s) => sum + s.rating, 0) / services.length
                    : 0
                  ).toFixed(1)}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {service.isPopular && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}
                {service.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    -{service.discount}%
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{service.rating}</span>
                    <span className="text-gray-400">({service.totalReviews})</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{service.availability}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {service.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 2 && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      +{service.features.length - 2} more
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(service.price)}
                    </span>
                    {service.originalPrice && service.originalPrice !== service.price && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(service.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/update-service/${service._id}`}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
                  >
                    <Edit className="w-4 h-4" />
                    Update
                  </Link>
                  <button
                    onClick={() => {
                      setServiceToDelete(service);
                      setShowDeleteModal(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
              <p className="text-gray-600">
                {searchTerm || filterCategory !== 'all'
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't posted any services yet"}
              </p>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && serviceToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Service</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete "{serviceToDelete.title}"? This action cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteService(serviceToDelete._id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMyPostedServices;