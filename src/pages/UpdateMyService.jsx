import { useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X, MapPin, Clock, Star, Award, Camera, Save, Eye } from 'lucide-react';
import { useMyAxios } from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// This is for abed

const UpdateMyService = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const myAxios = useMyAxios();
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewMode, setPreviewMode] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        price: '',
        originalPrice: '',
        duration: '',
        location: '',
        isPopular: false,
        features: [''],
        category: '',
        provider: {
            ProviderEmail: user?.email || '',
            ProviderName: '',
            verified: false,
            experience: ''
        },
        availability: '',
        discount: 0
    });

    const categories = [
        'Household Services',
        'Consultation Services',
        'Transportation Services',
    ];

    const availabilityOptions = [
        'Available Today',
        'Available Tomorrow',
        'Available This Week',
        'Available Next Week',
        'By Appointment Only'
    ];

    useEffect(() => {
        const fetchService = async () => {
            setIsLoading(true);
            try {
                const { data } = await myAxios.get(`${import.meta.env.VITE_API_URL}/service/${id}`);
                
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    image: data.image || '',
                    price: data.price || '',
                    originalPrice: data.originalPrice || '',
                    duration: data.duration || '',
                    location: data.location || '',
                    isPopular: data.isPopular || false,
                    features: data.features?.length ? [...data.features] : [''],
                    category: data.category || '',
                    provider: {
                        ProviderEmail: data.provider?.ProviderEmail || user?.email || '',
                        ProviderName: data.provider?.ProviderName || '',
                        verified: data.provider?.verified || false,
                        experience: data.provider?.experience || ''
                    },
                    availability: data.availability || '',
                    discount: data.discount || 0
                });

                if (data.image) {
                    setImagePreview(data.image);
                }
            } catch (err) {
                console.error('Error fetching service:', err);
                setError(err);
                toast.error('Failed to load service data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchService();
    }, [id, user?.email]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('provider.')) {
            const providerField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                provider: {
                    ...prev.provider,
                    [providerField]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, '']
        }));
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const handleImageChange = (e) => {
        const imageUrl = e.target.value;
        setFormData(prev => ({ ...prev, image: imageUrl }));
        setImagePreview(imageUrl);
    };

    const calculateDiscount = () => {
        if (formData.price && formData.originalPrice) {
            const discount = Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100);
            setFormData(prev => ({ ...prev, discount }));
        }
    };

    const handleSubmit = async () => {
        const filteredFeatures = formData.features.filter(feature => feature.trim() !== '');
        const finalData = {
            ...formData,
            features: filteredFeatures
        };

        // Basic validation
        if (!finalData.title || !finalData.description || !finalData.category || !finalData.price) {
            return toast.error('Please fill all required fields');
        }

        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/update-service/${id}`, finalData);
            toast.success('Service updated successfully');
            navigate('/my-posted-services');
        } catch (err) {
            console.error('Update error:', err);
            toast.error(err.response?.data?.message || 'Failed to update service');
        }
    };

    const ServicePreview = () => (
        <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Service Preview</h3>
                <button
                    onClick={() => setPreviewMode(false)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-4">
                {imagePreview && (
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img src={imagePreview} alt="Service preview" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {formData.category || 'Category'}
                    </span>
                    {formData.isPopular && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                            Popular
                        </span>
                    )}
                </div>

                <h4 className="text-xl font-bold text-gray-900">{formData.title || 'Service Title'}</h4>

                <div className="flex items-center space-x-4">
                    {formData.price && (
                        <>
                            <span className="text-2xl font-bold text-gray-900">৳{formData.price}</span>
                            {formData.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">৳{formData.originalPrice}</span>
                            )}
                            {formData.discount > 0 && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                    {formData.discount}% OFF
                                </span>
                            )}
                        </>
                    )}
                </div>

                {formData.description && (
                    <p className="text-gray-600 text-sm">{formData.description}</p>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm">
                    {formData.duration && (
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{formData.duration}</span>
                        </div>
                    )}
                    {formData.location && (
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{formData.location}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );


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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 relative">
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                        <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
                    </div>

                    <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
                            <Plus className="w-10 h-10 text-white" />
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
                            Update Service
                        </h1>

                        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto font-medium">
                            Update your service listing to attract more customers
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mb-6">
                            <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                <Star className="w-4 h-4 mr-2" />
                                Professional Listing
                            </span>
                            <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                <Award className="w-4 h-4 mr-2" />
                                Verified Provider
                            </span>
                            <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                <MapPin className="w-4 h-4 mr-2" />
                                Local Reach
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                            {/* Basic Information */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <Award className="w-5 h-5 mr-2 text-blue-600" />
                                    Basic Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., TV and Electronic Gadgets Repair"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Describe your service in detail..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                                        <select
                                            name="availability"
                                            value={formData.availability}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Availability</option>
                                            {availabilityOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Duration</label>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., 2-3 hours"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., All Areas, Dhaka"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                name="isPopular"
                                                checked={formData.isPopular}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Mark as Popular Service</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <Star className="w-5 h-5 mr-2 text-green-600" />
                                    Pricing Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Price (৳) *</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            onBlur={calculateDiscount}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="800"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (৳)</label>
                                        <input
                                            type="number"
                                            name="originalPrice"
                                            value={formData.originalPrice}
                                            onChange={handleInputChange}
                                            onBlur={calculateDiscount}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="1200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                                        <input
                                            type="number"
                                            name="discount"
                                            value={formData.discount}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                            placeholder="Auto-calculated"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Service Features */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <Plus className="w-5 h-5 mr-2 text-purple-600" />
                                    Service Features
                                </h2>

                                <div className="space-y-4">
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="e.g., Expert Technicians"
                                            />
                                            {formData.features.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add Feature</span>
                                    </button>
                                </div>
                            </div>

                            {/* Provider Information */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <Award className="w-5 h-5 mr-2 text-orange-600" />
                                    Provider Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Provider Name *</label>
                                        <input
                                            type="text"
                                            name="provider.ProviderName"
                                            value={formData.provider.ProviderName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., TechFix Solutions"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                                        <input
                                            type="text"
                                            name="provider.experience"
                                            value={formData.provider.experience}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g., 8+ years"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                name="provider.verified"
                                                checked={formData.provider.verified}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Verified Provider</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Service Image */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <Camera className="w-5 h-5 mr-2 text-indigo-600" />
                                    Service Image
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleImageChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    {imagePreview && (
                                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>Update Service</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPreviewMode(true)}
                                    className="px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2"
                                >
                                    <Eye className="w-5 h-5" />
                                    <span>Preview</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Tips */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips for Success</h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start space-x-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Use clear, descriptive titles that include your main service</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Add high-quality images to attract more customers</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>List specific features and benefits</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>Set competitive pricing with clear discount offers</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Preview */}
                            {previewMode && <ServicePreview />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateMyService;