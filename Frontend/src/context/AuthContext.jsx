//frontend/context/AuthContext.js :
import React, { createContext, useState, useEffect } from 'react';
import instance from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasEnrolledCourses, setHasEnrolledCourses] = useState(false);

  const checkEnrolledCourses = async (token) => {
    try {
      const courseRes = await instance.get('/user/enrolled-courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const enrolledCourses = courseRes.data.enrolledCourses || [];
      setHasEnrolledCourses(enrolledCourses.length > 0);
      console.log('✅ [AuthContext.js] Enrolled courses check:', {
        hasCourses: enrolledCourses.length > 0,
        count: enrolledCourses.length,
        timestamp: new Date().toISOString(),
      });
      return enrolledCourses.length > 0;
    } catch (err) {
      console.error('❌ [AuthContext.js] Error checking enrolled courses:', err.response?.data || err.message);
      setHasEnrolledCourses(false);
      return false;
    }
  };

  // 👈 UPDATED: updateAuthState - Courses check हटाया (helper में shift)
  const updateAuthState = async () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    console.log('🔑 [AuthContext.js] updateAuthState - Token:', token, 'UserData:', userData);

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('✅ [AuthContext.js] Parsed user:', parsedUser);

        setUser(parsedUser);
        setIsLoggedIn(true);
        setIsAdmin(parsedUser.isAdmin === true);

        // 👈 REMOVED: Courses check from here (duplicate avoid)
      } catch (error) {
        console.error('❌ [AuthContext.js] Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
        setHasEnrolledCourses(false);
      }
    } else {
      console.log("🚨 [updateAuthState] No token or user found");
      setUser(null);
      setIsLoggedIn(false);
      setIsAdmin(false);
      setHasEnrolledCourses(false);
    }
  };


  // 👈 UPDATED: useEffect for initial auth check
  useEffect(() => {
    console.log('⏳ [AuthContext.js] Starting initial auth check at:', new Date().toISOString());
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('🔑 [AuthContext.js] Verifying token:', token, 'at:', new Date().toISOString());
        if (token) {
          const res = await instance.get('/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          console.log('📥 [AuthContext.js] Profile response at:', new Date().toISOString(), res.data);
          const userData = res.data;
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          setIsLoggedIn(true);
          setIsAdmin(userData.isAdmin === true);

          // 👈 UPDATED: Courses check via helper
          await checkEnrolledCourses(token);
        } else {
          console.log('🚨 [verifyAuth] No token found');
        }
      } catch (err) {
        console.error('❌ [AuthContext.js] Auth verify failed at:', new Date().toISOString(), err.response?.data || err.message);
        if (err.response?.status === 401) { // 👈 NEW: Token expired? Try refresh
          console.log('🔄 [AuthContext.js] Token expired, attempting refresh...');
          await refreshToken(); // Refresh try करें
        } else {
          if (localStorage.getItem('token')) {
            logout();
          }
        }
      } finally {
        console.log('✅ [AuthContext.js] Auth check complete at:', new Date().toISOString());
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);


  // 👈 UPDATED: login function - await updateAuthState
  const login = async (userData, token) => {
    console.log('🔐 [AuthContext.js] Logging in with:', { userData, token });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));

    // 👈 UPDATED: Courses check via helper
    await checkEnrolledCourses(token);

    // 👈 NEW: Await updateAuthState for proper state sync
    await updateAuthState();
  };

   const logout = () => {
    console.log('🚪 [AuthContext.js] Logging out at:', new Date().toISOString());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setHasEnrolledCourses(false);
  };

  // 👈 UPDATED: refreshToken - Properly implement for expiry handling
  const refreshToken = async () => {
    try {
      console.log('🔄 [AuthContext.js] Attempting token refresh...');
      const response = await instance.post('/auth/refresh', {}, { withCredentials: true }); // Backend refresh endpoint
      const { token: newToken, userData } = response.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
      setIsAdmin(userData.isAdmin === true);

      // 👈 NEW: Courses check after refresh
      await checkEnrolledCourses(newToken);

      console.log('✅ [AuthContext.js] Token refreshed successfully');
    } catch (err) {
      console.error('❌ [AuthContext.js] Refresh failed:', err.response?.data || err.message);
      logout(); // Fail पर logout
    }
  };

 useEffect(() => {
    const interval = setInterval(async () => {
      if (isLoggedIn && user) {
        console.log('⏰ [AuthContext.js] Refreshing token... at:', new Date().toISOString());
        await refreshToken(); 
      }
    }, 15 * 60 * 1000); // 15 min
    return () => clearInterval(interval);
  }, [isLoggedIn, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAdmin,
        loading,
        error,
        setError,
        updateAuthState,
        login,
        logout,
        hasEnrolledCourses,
        refreshToken, // 👈 NEW: Expose if needed elsewhere
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};