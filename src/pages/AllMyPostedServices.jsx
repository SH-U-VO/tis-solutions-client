import React, { useState, useEffect, useContext } from 'react';
import { Edit, Trash2, MapPin, Clock, Star, DollarSign, Users, Calendar, Tag, FileImage } from 'lucide-react';
import { useMyAxios } from '../hooks/useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

const AllMyPostedServices = () => {
    // Sample data - replace with your actual data fetching
    const [services, setServices] = useState([])

      const myAxios = useMyAxios()
      const { user } = useContext(AuthContext)
    

      const fetchAllServices = async () => {
        const { data } = await myAxios.get(`/services/${user?.email}`)
       setServices(data)
      }
      fetchAllServices()

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

   
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

    const categories = [...new Set(services.map(service => service.category))];

    const handleDelete = (serviceId) => {
        // Replace with your delete logic
        if (window.confirm('Are you sure you want to delete this service?')) {
            console.log('Delete service:', serviceId);
            setServices(services.filter(service => service._id !== serviceId));
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
                                {categories.map(category => (
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
                                    {(services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1)}
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
                                        onClick={() => handleDelete(service._id)}
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
                                    : "You haven't posted any services yet"
                                }
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllMyPostedServices;