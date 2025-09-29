import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function ReferralDownline() {
  const [downline, setDownline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDownline();
  }, []);

  const fetchDownline = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Fetching referral downline...');
      const res = await api.get('/referral/downline');
      console.log('✅ Downline response:', res.data); // Log raw response for debugging
      if (res.data.success && Array.isArray(res.data.data)) {
        setDownline(res.data.data);
      } else {
        setDownline([]);
        console.warn('⚠️ No valid downline data received:', res.data);
      }
    } catch (err) {
      console.error('❌ Error fetching downline:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load referral downline';
      setError(errorMessage.includes('network') ? 'Network error, please check your connection' : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDownline();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">👥 Referral Downline</h2>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Loading referral downline...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">👥 Referral Downline</h2>
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-red-600 font-medium mb-4">
                <div className="text-lg mb-2">⚠️ Error Loading Downline</div>
                <div className="text-sm">{error}</div>
              </div>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                🔄 Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-3xl font-bold text-gray-800">👥 Referral Downline</h2>
          <div className="flex gap-4">
            <div className="text-sm text-gray-600">
              Total Referrals: <span className="font-semibold text-blue-600">{downline.length}</span>
            </div>
            <button
              onClick={handleRefresh}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {downline.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-yellow-600 font-medium mb-4">
                <div className="text-lg mb-2">📊 No Referrals Yet</div>
                <div className="text-sm">You haven't referred anyone yet. Start sharing your referral link to build your downline!</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">#</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Plan</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Joining Date</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Mobile</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {downline.map((user, i) => (
                  <tr key={user._id || i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{user.name || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-600">{user.email || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {user.plan || 'No Plan'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.mobile || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReferralDownline;