import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useLocation } from 'react-router-dom';

const Support = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [hasEnrolledCourses, setHasEnrolledCourses] = useState(false);
  const [commissionStats, setCommissionStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Log user data on mount
  console.log('📍 [Support.jsx] Current location:', {
    pathname: location.pathname,
    search: location.search,
    state: location.state,
    timestamp: new Date().toISOString(),
  });

  // Redirect check
  useEffect(() => {
    if (!user && !loading) {
      console.log('🚫 [Support.jsx] No user, redirecting to login', { timestamp: new Date().toISOString() });
      navigate('/auth/login');
      return;
    }
  }, [user, loading, navigate]);

  const fetchData = async () => {
    console.time('fetchData');
    console.log('🚀 [Support.jsx] Starting fetchData', { timestamp: new Date().toISOString() });
    setLoading(true);
    setError(null);
    try {
      // Fetch user data if not available
      let userData = user;
      if (!user?.firstName || !user?.email || !user?.affiliateId) {
        console.log('🔄 [Support.jsx] Fetching user data from /auth/me', { timestamp: new Date().toISOString() });
        const userRes = await axios.get('/auth/me');
        userData = userRes.data.user;
        setUser(userData);
        console.log('✅ [Support.jsx] /auth/me response:', { user: userData, timestamp: new Date().toISOString() });
        localStorage.setItem('user', JSON.stringify(userData));
      }
      console.log('👤 [Support.jsx] User before enrolled-courses fetch:', {
        userId: userData?._id,
        email: userData?.email,
        timestamp: new Date().toISOString(),
      });

      const [courseRes, commissionRes] = await Promise.all([
        axios.get('/user/enrolled-courses'),
        axios.get('/referral/metrics'),
      ]);
      console.log('✅ [Support.jsx] API responses:', {
        enrolledCourses: courseRes.data,
        commissionMetrics: commissionRes.data,
        timestamp: new Date().toISOString(),
      });

      const enrolledCourses = courseRes.data.enrolledCourses || [];
      console.log('📚 [Support.jsx] Enrolled courses details:', {
        count: enrolledCourses.length,
        courses: enrolledCourses,
        timestamp: new Date().toISOString(),
      });
      setCourses(enrolledCourses);

      if (enrolledCourses.length === 0) {
        console.log('🚫 [Support.jsx] No enrolled courses detected (even after purchase?), redirecting to home', {
          possibleReasons: 'Purchase may not have enrolled yet, or backend delay/API error',
          timestamp: new Date().toISOString(),
        });
        console.log('🚫 [Support.jsx] No enrolled courses, redirecting to home', { timestamp: new Date().toISOString() });
        setHasEnrolledCourses(false);
        navigate('/');
        return;
      }

      setHasEnrolledCourses(true);

      // Set commission stats
      if (commissionRes.data && commissionRes.data.success) {
        setCommissionStats(commissionRes.data);
      } else {
        setError('Commission data unavailable');
        setCommissionStats({});
      }
    } catch (err) {
      console.error('❌ [Support.jsx] fetchData error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers,
        timestamp: new Date().toISOString(),
      });
      setError('Failed to load data. Redirecting to home...');
      setHasEnrolledCourses(false);
      navigate('/');
    } finally {
      setLoading(false);
      console.timeEnd('fetchData');
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (user) {
      console.log('🔁 [Support.jsx] useEffect triggered for fetchData', {
        userExists: !!user,
        timestamp: new Date().toISOString(),
      });
      fetchData().then(() => {
        if (!isMounted) return;
      });
    }
    return () => { isMounted = false; };
  }, [user]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/auth/login";
    } catch (err) {
      console.error("❌ Error in logout:", err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#f5f7fb] text-[#212529]">
        <span className="text-[#4361ee] text-xl font-semibold animate-pulse">Loading Support...</span>
      </div>
    );

  if (!hasEnrolledCourses) {
    console.log('🛑 [Support.jsx] Rendering no courses message (redirect may have failed)', { timestamp: new Date().toISOString() });
    return (
      <div className="flex justify-center items-center h-screen bg-[#f5f7fb] text-[#212529]">
        <div className="text-center bg-white rounded-[15px] p-6 md:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] mx-4 max-w-md w-full">
          <h2 className="text-2xl font-bold text-[#212529] mb-4">No Courses Enrolled!</h2>
          <p className="text-[#6c757d] mb-6">Purchase a course to access the dashboard.</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-[15px] font-semibold bg-gradient-to-r from-[#4361ee] to-[#3a0ca3] text-white shadow-md hover:shadow-xl hover:-translate-y-[2px] transition-all duration-200"
          >
            Go to Home & Buy Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:w-64 lg:w-72 flex-col fixed inset-y-0 left-0 z-40 bg-gradient-to-b from-[#4361ee] to-[#3a0ca3] text-white">
        <div className="sidebar-header p-5 text-center border-b border-white/10">
          <h2 className="text-xl lg:text-2xl flex items-center justify-center gap-2 font-bold">
            <i className="fas fa-rocket text-[#4cc9f0]"></i>
            <span>AffiliatePro</span>
          </h2>
        </div>

        <div className="sidebar-menu py-5 flex-1 overflow-y-auto">
          {[
            { icon: 'fas fa-home', label: 'Dashboard', path: '/dashboard' },
            { icon: 'fas fa-chart-line', label: 'My Courses', path: '/my-courses' },
            { icon: 'fas fa-wallet', label: 'Commissions', path: '/dashboard/affiliate-account' },
            { icon: 'fas fa-users', label: 'Referrals', path: '/dashboard/referral-downline' },
            { icon: 'fas fa-file-invoice-dollar', label: 'Payouts', path: '/dashboard/payout-settings' },
            { icon: 'fas fa-cog', label: 'Profile', path: '/dashboard/profile' },
            { icon: 'fas fa-question-circle', label: 'Leaderboard', path: '/dashboard/leaderboard' },
            { icon: 'fas fa-headset', label: 'Support', path: '/dashboard/support' },
            { icon: 'fas fa-sign-out-alt', label: 'Log Out', isLogout: true }
          ].map((item, index) => (
            item.isLogout ? (
              <button
                key={index}
                onClick={handleLogout}
                className="menu-item p-3 mx-2 mb-1 flex items-center gap-3 cursor-pointer transition-all duration-200 border-l-4 rounded-r-lg border-transparent hover:bg-white/5 hover:border-white/30"
              >
                <i className={`${item.icon} w-5 text-center text-sm`}></i>
                <span className="text-sm lg:text-base">{item.label}</span>
              </button>
            ) : (
              <Link
                key={index}
                to={item.path}
                className={`menu-item p-3 mx-2 mb-1 flex items-center gap-3 cursor-pointer transition-all duration-200 border-l-4 rounded-r-lg ${location.pathname === item.path
                  ? 'bg-white/10 border-[#4cc9f0] shadow-inner'
                  : 'border-transparent hover:bg-white/5 hover:border-white/30'
                  }`}
              >
                <i className={`${item.icon} w-5 text-center text-sm`}></i>
                <span className="text-sm lg:text-base">{item.label}</span>
              </Link>
            )
          ))}
        </div>

        {/* User section in sidebar */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
            <img
              src={user?.profilePicture || "https://res.cloudinary.com/dxwtzb6pe/image/upload/v1757262791/n9ie1ojb4l3zgw8tq08h.webp"}
              alt={user?.firstName || "User"}
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <div className="flex-1 min-w-0">
              <div className="user-name font-medium text-sm truncate">{user?.firstName || 'User'}</div>
              <div className="user-role text-white/70 text-xs">Premium Affiliate</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 rounded hover:bg-white/10 transition-colors"
              title="Logout"
            >
              <i className="fas fa-sign-out-alt text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          {/* Mobile Sidebar */}
          <div
            className="w-64 h-full bg-gradient-to-b from-[#4361ee] to-[#3a0ca3] text-white transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sidebar-header p-5 text-center border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl flex items-center justify-center gap-2 font-bold">
                <i className="fas fa-rocket text-[#4cc9f0]"></i>
                <span>AffiliatePro</span>
              </h2>
              <button
                className="text-white text-4xl font-bold hover:text-red-400 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="sidebar-menu py-5 flex-1 overflow-y-auto">
              {[
                { icon: 'fas fa-home', label: 'Dashboard', path: '/dashboard' },
                { icon: 'fas fa-chart-line', label: 'My Courses', path: '/my-courses' },
                { icon: 'fas fa-wallet', label: 'Commissions', path: '/dashboard/affiliate-account' },
                { icon: 'fas fa-users', label: 'Referrals', path: '/dashboard/referral-downline' },
                { icon: 'fas fa-file-invoice-dollar', label: 'Payouts', path: '/dashboard/payout-settings' },
                { icon: 'fas fa-cog', label: 'Profile', path: '/dashboard/profile' },
                { icon: 'fas fa-question-circle', label: 'Leaderboard', path: '/dashboard/leaderboard' },
                { icon: 'fas fa-headset', label: 'Support', path: '/dashboard/support' },
                { icon: 'fas fa-sign-out-alt', label: 'Log Out', isLogout: true }
              ].map((item, index) => (
                item.isLogout ? (
                  <button
                    key={index}
                    onClick={handleLogout}
                    className="menu-item p-3 mx-2 mb-1 flex items-center gap-3 cursor-pointer transition-all duration-200 border-l-4 rounded-r-lg border-transparent hover:bg-white/5 hover:border-white/30"
                  >
                    <i className={`${item.icon} w-5 text-center text-sm`}></i>
                    <span className="text-base">{item.label}</span>
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={`menu-item p-3 mx-2 mb-1 flex items-center gap-3 cursor-pointer transition-all duration-200 border-l-4 rounded-r-lg ${location.pathname === item.path
                      ? 'bg-white/10 border-[#4cc9f0] shadow-inner'
                      : 'border-transparent hover:bg-white/5 hover:border-white/30'
                      }`}
                  >
                    <i className={`${item.icon} w-5 text-center text-sm`}></i>
                    <span className="text-base">{item.label}</span>
                  </Link>
                )
              ))}
            </div>

            {/* Mobile user section */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <img
                  src={user?.profilePicture || "https://res.cloudinary.com/dxwtzb6pe/image/upload/v1757262791/n9ie1ojb4l3zgw8tq08h.webp"}
                  alt={user?.firstName || "User"}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
                <div className="flex-1 min-w-0">
                  <div className="user-name font-medium text-sm truncate">{user?.firstName || 'User'}</div>
                  <div className="user-role text-white/70 text-xs">Premium Affiliate</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                  title="Logout"
                >
                  <i className="fas fa-sign-out-alt text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 md:ml-64 lg:ml-72">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm border-b border-gray-100 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 rounded-md bg-gray-100"
              >
                ☰
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Support</h1>
                <p className="text-gray-600 text-sm mt-1">Get help with LeadsArk</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
                <div className="user-avatar w-8 h-8 rounded-full bg-gradient-to-r from-[#4361ee] to-[#7209b7] flex items-center justify-center text-white font-bold text-sm">
                  {user?.firstName?.[0] || 'U'}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-800">{user?.firstName || 'User'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-500 mb-6">Welcome to LeadsArk 2.0</h2>
            <p className="text-gray-600 mb-4">
              Please send email to LeadsArk Support Team from Your Registered Email Address and always mention your USER ID in the email.
            </p>
            <p className="text-gray-600 mb-4">
              LeadsArk Support Team Email Address: <a href="mailto:Support@LeadsArk.Freshdesk.com" className="text-blue-600 hover:underline">Support@LeadsArk.Freshdesk.com</a>
            </p>
            <p className="text-gray-600 font-semibold">
              NOTE: Do not forget to mention your User ID in email to get the faster solution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;