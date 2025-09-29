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

  const updateAuthState = async () => { // 👈 Made async to handle course check
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
        } catch (err) {
          console.error('❌ [AuthContext.js] Error checking enrolled courses:', err.response?.data || err.message);
          setHasEnrolledCourses(false);
        }

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
          const userData = res.data; // 👈 Adjusted: API returns user directly
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          setIsLoggedIn(true);
          setIsAdmin(userData.isAdmin === true);

          // 👈 NEW: Check enrolled courses on initial auth
          try {
            const courseRes = await instance.get('/user/enrolled-courses', {
              headers: { Authorization: `Bearer ${token}` },
            });
            const enrolledCourses = courseRes.data.enrolledCourses || [];
            setHasEnrolledCourses(enrolledCourses.length > 0);
            console.log('✅ [AuthContext.js] Initial enrolled courses check:', {
              hasCourses: enrolledCourses.length > 0,
              count: enrolledCourses.length,
              timestamp: new Date().toISOString(),
            });
          } catch (err) {
            console.error('❌ [AuthContext.js] Error checking enrolled courses:', err.response?.data || err.message);
            setHasEnrolledCourses(false);
          }
        } else {
          console.log('🚨 [verifyAuth] No token found');
        }
      } catch (err) {
        console.error('❌ [AuthContext.js] Auth verify failed at:', new Date().toISOString(), err.response?.data || err.message);
        if (localStorage.getItem('token')) {
          logout();
        }
      } finally {
        console.log('✅ [AuthContext.js] Auth check complete at:', new Date().toISOString());
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);


  const login = async (userData, token) => { // 👈 Made async
    console.log('🔐 [AuthContext.js] Logging in with:', { userData, token });
    localStorage.setItem('token', token); // 👈 Removed duplicate set
    localStorage.setItem('user', JSON.stringify(userData));

    // 👈 NEW: Check enrolled courses during login
    try {
      const courseRes = await instance.get('/user/enrolled-courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const enrolledCourses = courseRes.data.enrolledCourses || [];
      setHasEnrolledCourses(enrolledCourses.length > 0);
      console.log('✅ [AuthContext.js] Login enrolled courses check:', {
        hasCourses: enrolledCourses.length > 0,
        count: enrolledCourses.length,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error('❌ [AuthContext.js] Error checking enrolled courses during login:', err.response?.data || err.message);
      setHasEnrolledCourses(false);
    }

    updateAuthState();
  };

  const logout = () => {
    console.log('🚪 [AuthContext.js] Logging out at:', new Date().toISOString());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setHasEnrolledCourses(false); // 👈 NEW: Reset on logout
  };

  // Optional: agar refresh endpoint hai tab rakho
  const refreshToken = async () => {
    try {
      const response = await instance.post('/auth/refresh');
      const { token, userData } = response.data;
      login(userData, token);
    } catch (err) {
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoggedIn) {
        console.log('⏰ [AuthContext.js] Refresh token check skipped (endpoint not implemented) at:', new Date().toISOString());
      }
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};