import React, { useContext, useEffect, useState } from 'react';
import {
  CheckCircle, Clock, Play, AlertCircle, Eye,
  MapPin, Calendar, DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMyAxios } from '../hooks/useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';

const ServiceProviderDashboard = () => {
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

  const myAxios = useMyAxios()
  const {user} = useContext(AuthContext)
  
  useEffect(() => {
    
  })

  const fetchAllServices = async () => {
    const {data} = await myAxios.get(`/services/${user?.email}`)
    setRequests(data)
  }
 fetchAllServices()

  const [selectedRequest, setSelectedRequest] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'working': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'working': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
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
      rejected: requests.filter(r => r.status === 'rejected').length,
      total: requests.length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <StatsCard label="Total Requests" count={statusCounts.total} color="blue" icon={<AlertCircle className="h-6 w-6 text-blue-600" />} />
          <StatsCard label="Pending" count={statusCounts.pending} color="yellow" icon={<Clock className="h-6 w-6 text-yellow-600" />} />
          <StatsCard label="Working" count={statusCounts.working} color="blue" icon={<Play className="h-6 w-6 text-blue-600" />} />
          <StatsCard label="Completed" count={statusCounts.completed} color="green" icon={<CheckCircle className="h-6 w-6 text-green-600" />} />
          <StatsCard label="Rejected" count={statusCounts.rejected} color="red" icon={<AlertCircle className="h-6 w-6 text-red-600" />} />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Service Requests</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Customer", "Service", "Date & Location", "Price", "Status", "Urgency", "Actions"].map((th, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedRequest(request)}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                        {/* {request.customerName.split(' ').map(n => n[0]).join('')} */}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.customerName}</div>
                        <div className="text-sm text-gray-500">{request.customerEmail}</div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${request.price}
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
                        {request.status === 'pending' && (
                          <>
                            <button onClick={(e) => { e.stopPropagation(); handleStatusChange(request.id, 'working'); }} className="text-green-600 hover:text-green-900 flex items-center">
                              <Play className="h-4 w-4 mr-1" /> Accept
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleStatusChange(request.id, 'rejected'); }} className="text-red-600 hover:text-red-900 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" /> Reject
                            </button>
                          </>
                        )}
                        {request.status === 'working' && (
                          <button onClick={(e) => { e.stopPropagation(); handleStatusChange(request.id, 'completed'); }} className="text-blue-600 hover:text-blue-900 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" /> Complete
                          </button>
                        )}
                        {(request.status === 'completed' || request.status === 'rejected') && (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1 capitalize">{request.status}</span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedRequest && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
                  <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-gray-600">
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Customer Info</h4>
                      <p className="text-sm text-gray-600"><strong>Name:</strong> {selectedRequest.customerName}</p>
                      <p className="text-sm text-gray-600"><strong>Email:</strong> {selectedRequest.customerEmail}</p>
                      <p className="text-sm text-gray-600"><strong>Phone:</strong> {selectedRequest.customerPhone}</p>
                      <p className="text-sm text-gray-600"><strong>Address:</strong> {selectedRequest.customerAddress}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Service Info</h4>
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
                        <>
                          <button onClick={() => { handleStatusChange(selectedRequest.id, 'working'); setSelectedRequest(null); }} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">Accept</button>
                          <button onClick={() => { handleStatusChange(selectedRequest.id, 'rejected'); setSelectedRequest(null); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">Reject</button>
                        </>
                      )}
                      {selectedRequest.status === 'working' && (
                        <>
                          <button onClick={() => { handleStatusChange(selectedRequest.id, 'completed'); setSelectedRequest(null); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">Complete</button>
                          <button onClick={() => { handleStatusChange(selectedRequest.id, 'rejected'); setSelectedRequest(null); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">Reject</button>
                        </>
                      )}
                      {(selectedRequest.status === 'completed' || selectedRequest.status === 'rejected') && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                          {getStatusIcon(selectedRequest.status)}
                          <span className="ml-1 capitalize">{selectedRequest.status}</span>
                        </span>
                      )}
                      <button onClick={() => setSelectedRequest(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">Close</button>
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

const StatsCard = ({ label, count, color, icon }) => (
  <div className={`bg-white rounded-lg shadow-sm p-6 border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
      <div className={`p-3 bg-${color}-100 rounded-full`}>
        {icon}
      </div>
    </div>
  </div>
);

export default ServiceProviderDashboard;