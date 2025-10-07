import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [commissionStats, setCommissionStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect to login if no user
  useEffect(() => {
    if (!user && !loading) {
      console.log('🚫 [UserProfile.jsx] No user, redirecting to login', { timestamp: new Date().toISOString() });
      navigate('/auth/login');
    }
  }, [user, loading, navigate]);

  // Fetch user data and commission stats
  useEffect(() => {
    const fetchData = async () => {
      console.time('fetchProfileData');
      console.log('🚀 [UserProfile.jsx] Starting fetchData', { timestamp: new Date().toISOString() });
      setLoading(true);
      setError(null);
      try {
        // Fetch user data if not available
        let userData = user;
        if (!user?.firstName || !user?.email || !user?.affiliateId) {
          console.log('🔄 [UserProfile.jsx] Fetching user data from /auth/me', { timestamp: new Date().toISOString() });
          const userRes = await axios.get('/auth/me');
          userData = userRes.data.user;
          setUser(userData);
          console.log('✅ [UserProfile.jsx] /auth/me response:', { user: userData, timestamp: new Date().toISOString() });
          localStorage.setItem('user', JSON.stringify(userData));
        }

        // Fetch commission stats
        const commissionRes = await axios.get('/referral/metrics');
        console.log('✅ [UserProfile.jsx] Commission response:', {
          commissionMetrics: commissionRes.data,
          timestamp: new Date().toISOString(),
        });

        if (commissionRes.data && commissionRes.data.success) {
          setCommissionStats(commissionRes.data);
        } else {
          setError('Commission data unavailable');
          setCommissionStats({});
        }
      } catch (err) {
        console.error('❌ [UserProfile.jsx] fetchData error:', {
          message: err.message,
          response: err.response?.data,
          timestamp: new Date().toISOString(),
        });
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
        console.timeEnd('fetchProfileData');
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, setUser]);

  const handleUploadProfileImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePicture", file);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put("/auth/profile", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      if (res.data.user?.profilePicture) {
        setProfileImage(res.data.user.profilePicture);
        setUser((prev) => ({ ...prev, profilePicture: res.data.user.profilePicture }));
      }
    } catch (err) {
      setError('Failed to upload profile picture.');
    }
  };

  const handleRemoveProfileImage = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete("/auth/profile-picture", { headers: { Authorization: `Bearer ${token}` } });
      setUser({ ...user, profilePicture: null });
      setProfileImage(null);
    } catch {
      setError('Failed to remove profile picture.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              {/* Profile Image Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={
                      user?.profilePicture ||
                      profileImage ||
                      "https://res.cloudinary.com/dxwtzb6pe/image/upload/v1757262791/oqwu4pod1xfyehprywc4.webp"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                  />
                  <div className="absolute bottom-2 right-2">
                    <label htmlFor="profileImageUpload" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer transition-all duration-200 transform hover:scale-110">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadProfileImage}
                      className="hidden"
                      id="profileImageUpload"
                    />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mt-4">{user?.firstName} {user?.lastName}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                {commissionStats && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    commissionStats.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {commissionStats.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                )}
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === 'profile'
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Information
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('commission')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === 'commission'
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Commission Stats
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === 'security'
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Security
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {/* Profile Tab Content */}
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
                        {user?.firstName || "N/A"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
                        {user?.lastName || "N/A"}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-900">
                        {user?.email || "N/A"}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Affiliate ID</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-mono text-gray-900">
                        {user?.affiliateId || "N/A"}
                      </div>
                    </div>
                  </div>
                  
                  {/* Image Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-4">
                      <label htmlFor="profileImageUpload" className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload New Photo
                      </label>
                      {user?.profilePicture && (
                        <button
                          onClick={handleRemoveProfileImage}
                          className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove Photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Commission Tab Content */}
              {activeTab === 'commission' && commissionStats && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Commission Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 text-sm font-medium">Total Commissions</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">${commissionStats.totalCommissions || 0}</p>
                        </div>
                        <div className="bg-blue-500 p-3 rounded-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 text-sm font-medium">Pending Commissions</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">${commissionStats.pendingCommissions || 0}</p>
                        </div>
                        <div className="bg-green-500 p-3 rounded-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab Content */}
              {activeTab === 'security' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h3>
                  <div className="space-y-6">
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Change Password</h4>
                      <p className="text-gray-600 mb-4">Update your password to keep your account secure</p>
                      <button className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200">
                        Change Password
                      </button>
                    </div>
                    
                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Two-Factor Authentication</h4>
                      <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                      <button className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;