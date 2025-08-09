import { useState } from 'react';
import {
  Clock,
  MapPin,
  Star,
  Trash2,
  Filter,
  Search,
  Eye,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Award,
  X
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const MyBookedServices = () => {
const {data: allServices, isLoading} = useQuery({
    queryKey: ['services'], queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/services`)
      return data
    }
  })

  console.log(allServices)
  console.log(isLoading)

  // Sample data - replace with actual data from your backend
  const [services, setServices] = useState(
    allServices
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Filter services based on search and status
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="w-4 h-4" />,
          text: 'Pending',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'working':
        return {
          icon: <PlayCircle className="w-4 h-4" />,
          text: 'In Progress',
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'completed':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'Completed',
          className: 'bg-green-100 text-green-800 border-green-200'
        };
      default:
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          text: 'Unknown',
          className: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  // Handle service deletion
  const handleDeleteService = (serviceId) => {
    setServices(services.filter(service => service._id !== serviceId));
    setShowDeleteModal(false);
    setServiceToDelete(null);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get service counts by status
  const getServiceCounts = () => {
    return {
      all: services.length,
      pending: services.filter(s => s.status === 'pending').length,
      working: services.filter(s => s.status === 'working').length,
      completed: services.filter(s => s.status === 'completed').length
    };
  };

  const counts = getServiceCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
          </div>

          <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
              <Calendar className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
              My Booked Services
            </h1>

            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto font-medium">
              Track and manage all your service bookings in one place
            </p>

            {/* Status Summary */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50">
                <div className="text-2xl font-bold text-blue-600">{counts.all}</div>
                <div className="text-sm text-gray-600">Total Services</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50">
                <div className="text-2xl font-bold text-yellow-600">{counts.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50">
                <div className="text-2xl font-bold text-blue-600">{counts.working}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/50">
                <div className="text-2xl font-bold text-green-600">{counts.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-3">
              <Filter className="text-gray-500 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="working">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-6">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Services Found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all'
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't booked any services yet"}
              </p>
            </div>
          ) : (
            filteredServices.map((service) => {
              const statusBadge = getStatusBadge(service.status);

              return (
                <div key={service._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Service Image */}
                      <div className="lg:w-64 h-48 lg:h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Service Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                {service.category}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${statusBadge.className}`}>
                                {statusBadge.icon}
                                <span>{statusBadge.text}</span>
                              </span>
                              {service.isPopular && (
                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                  Popular
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedService(service)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setServiceToDelete(service);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Service"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Service Info */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">{service.rating}</span>
                            <span className="text-gray-500">({service.totalReviews})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{service.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>{formatDate(service.bookedDate)}</span>
                          </div>
                        </div>

                        {/* Provider Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">{service.provider.name}</span>
                                {service.provider.verified && (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                              </div>
                              <span className="text-sm text-gray-500">{service.provider.experience}</span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-gray-900">৳{service.price}</span>
                              {service.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">৳{service.originalPrice}</span>
                              )}
                            </div>
                            {service.discount > 0 && (
                              <span className="text-sm text-red-600 font-medium">
                                {service.discount}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Service Details Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Service Details</h2>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {selectedService.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${getStatusBadge(selectedService.status).className}`}>
                      {getStatusBadge(selectedService.status).icon}
                      <span>{getStatusBadge(selectedService.status).text}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">{selectedService.title}</h3>
                  <p className="text-gray-600">{selectedService.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Duration:</strong> {selectedService.duration}</div>
                    <div><strong>Location:</strong> {selectedService.location}</div>
                    <div><strong>Rating:</strong> {selectedService.rating} ({selectedService.totalReviews} reviews)</div>
                    <div><strong>Booked:</strong> {formatDate(selectedService.bookedDate)}</div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{selectedService.provider.name}</span>
                      {selectedService.provider.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">৳{selectedService.price}</div>
                      {selectedService.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">৳{selectedService.originalPrice}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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

export default MyBookedServices;