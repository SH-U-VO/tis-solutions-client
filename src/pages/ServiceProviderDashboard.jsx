import React, { useState } from 'react';
import { CheckCircle, Clock, Play, AlertCircle, Eye, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';


const ServiceProviderDashboard = () => {
  // Sample data for service requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+1234567890",
      serviceTitle: "TV and Electronic Gadgets Repair",
      serviceType: "Household Services",
      requestDate: "2024-01-15",
      preferredDate: "2024-01-18",
      location: "Downtown Area",
      price: 800,
      status: "pending",
      description: "My TV screen is flickering and making strange noises. Need urgent repair.",
      customerAddress: "123 Main St, Downtown",
      urgency: "high"
    },
    {
      id: 2,
      customerName: "Sarah Johnson",
      customerEmail: "sarah@example.com",
      customerPhone: "+1234567891",
      serviceTitle: "TV and Electronic Gadgets Repair",
      serviceType: "Household Services",
      requestDate: "2024-01-16",
      preferredDate: "2024-01-19",
      location: "Uptown Area",
      price: 800,
      status: "working",
      description: "Laptop won't turn on. Tried basic troubleshooting but no luck.",
      customerAddress: "456 Oak Ave, Uptown",
      urgency: "medium"
    },
    {
      id: 3,
      customerName: "Mike Wilson",
      customerEmail: "mike@example.com",
      customerPhone: "+1234567892",
      serviceTitle: "TV and Electronic Gadgets Repair",
      serviceType: "Household Services",
      requestDate: "2024-01-14",
      preferredDate: "2024-01-17",
      location: "Suburbs",
      price: 800,
      status: "completed",
      description: "Smartphone screen replacement needed.",
      customerAddress: "789 Pine Rd, Suburbs",
      urgency: "low"
    },
    {
      id: 4,
      customerName: "Emma Davis",
      customerEmail: "emma@example.com",
      customerPhone: "+1234567893",
      serviceTitle: "TV and Electronic Gadgets Repair",
      serviceType: "Household Services",
      requestDate: "2024-01-17",
      preferredDate: "2024-01-20",
      location: "City Center",
      price: 800,
      status: "pending",
      description: "Gaming console overheating issue. Needs immediate attention.",
      customerAddress: "321 Elm St, City Center",
      urgency: "high"
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'working': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'working': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(requests.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
  };

  const getStatusCounts = () => {
    return {
      pending: requests.filter(r => r.status === 'pending').length,
      working: requests.filter(r => r.status === 'working').length,
      completed: requests.filter(r => r.status === 'completed').length,
      total: requests.length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
  <div>
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Provider Dashboard</h1>
    <p className="text-gray-600">Manage your service requests and track their progress</p>
  </div>
  <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
    <Link
      to='/add-service'
      className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow hover:from-purple-600 hover:to-indigo-700 transition"
    >
      ➕ Add New Services
    </Link>
    <button
      onClick={() => alert("Show Previous Works clicked!")}
      className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg shadow hover:from-green-500 hover:to-teal-600 transition"
    >
      🛠️ Show My Previous Works
    </button>
  </div>
</div>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Working</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.working}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Play className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.completed}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Service Requests</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {request.customerName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{request.customerName}</div>
                          <div className="text-sm text-gray-500">{request.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{request.serviceTitle}</div>
                      <div className="text-sm text-gray-500">{request.serviceType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {request.preferredDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {request.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        ${request.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1 capitalize">{request.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                        {request.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(request.id, 'working')}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Accept
                          </button>
                        )}
                        {request.status === 'working' && (
                          <button
                            onClick={() => handleStatusChange(request.id, 'completed')}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Request Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                      <p className="text-sm text-gray-600"><strong>Name:</strong> {selectedRequest.customerName}</p>
                      <p className="text-sm text-gray-600"><strong>Email:</strong> {selectedRequest.customerEmail}</p>
                      <p className="text-sm text-gray-600"><strong>Phone:</strong> {selectedRequest.customerPhone}</p>
                      <p className="text-sm text-gray-600"><strong>Address:</strong> {selectedRequest.customerAddress}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Service Details</h4>
                      <p className="text-sm text-gray-600"><strong>Service:</strong> {selectedRequest.serviceTitle}</p>
                      <p className="text-sm text-gray-600"><strong>Request Date:</strong> {selectedRequest.requestDate}</p>
                      <p className="text-sm text-gray-600"><strong>Preferred Date:</strong> {selectedRequest.preferredDate}</p>
                      <p className="text-sm text-gray-600"><strong>Price:</strong> ${selectedRequest.price}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedRequest.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                        {getStatusIcon(selectedRequest.status)}
                        <span className="ml-1 capitalize">{selectedRequest.status}</span>
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(selectedRequest.urgency)}`}>
                        {selectedRequest.urgency} priority
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {selectedRequest.status === 'pending' && (
                        <button
                          onClick={() => {
                            handleStatusChange(selectedRequest.id, 'working');
                            setSelectedRequest(null);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                          Accept Request
                        </button>
                      )}
                      {selectedRequest.status === 'working' && (
                        <button
                          onClick={() => {
                            handleStatusChange(selectedRequest.id, 'completed');
                            setSelectedRequest(null);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                          Mark as Completed
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedRequest(null)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;