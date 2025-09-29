import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from '../api/axios';

function Signup({ updateAuthState, intendedCourse }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const refFromUrl = searchParams.get('ref') || localStorage.getItem("referralCode") || '';
  const [referredBy, setReferredBy] = useState(refFromUrl);
  const redirect = new URLSearchParams(location.search).get('redirect');
  const intended = redirect || intendedCourse || location.state?.intendedCourse;


  useEffect(() => {
    // CHANGE: Added debug log to verify referral code extraction from URL or localStorage
    console.log('Referral code from URL or localStorage:', refFromUrl);
    if (referredBy) {
      localStorage.setItem("referralCode", referredBy);
    }
  }, [referredBy]);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (password.length < 10 || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) return 'Medium';
    return 'Strong';
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   if (!firstName || !lastName || !email || !state || !password) {
  setError('Please fill in all required fields');
  return;
}


    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (mobile && !validateMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    
    if (passwordStrength === 'Weak') {
      setError('Password is too weak. Use numbers and special characters.');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      console.log("📤 Submitting signup with referral:", referredBy);
      const response = await axios.post('/auth/signup', {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        mobile: mobile || '',
        state,
        password,
        referredBy, // ✅ send the code directly
      });


      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setError(null);
      updateAuthState();
      const redirect = new URLSearchParams(location.search).get('redirect');
      const intended = redirect || intendedCourse || location.state?.intendedCourse;
      if (intended) {
        navigate(intended);
      } else {
        // CHANGE: Updated navigation from '/api/courses' to '/courses' to point to frontend route
        navigate('/courses');
      }
    } catch (err) {
      // CHANGE: Added detailed error logging to debug signup failures (e.g., invalid referral code)
      console.error('Signup error:', err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || 'Signup failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Login/Login.jpeg')" }}

    >
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Sign Up</h1>
        <p className="text-center text-gray-600 mb-6">
          Join and start your journey today!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required className="input" />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required className="input" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="input" />
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="mobile (Optional)" className="input" />
          <select value={state} onChange={(e) => setState(e.target.value)} required className="input">
            <option value="">Select State</option>
            {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} placeholder="Password" required className="input pr-10" />
            <span className="absolute top-3 right-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
            {password && (
              <p className={`text-sm mt-1 ${passwordStrength === 'Weak' ? 'text-red-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* <div className="relative">
            <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="input pr-10" />
            <span className="absolute top-3 right-4 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div> */}

          <input type="text" value={referredBy} onChange={(e) => setReferredBy(e.target.value)} placeholder="Referral Code (Optional)" className="input" />

          <div className="flex gap-2">
            <input type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} />
            <label>I agree to the <Link to="/terms" className="text-blue-500 underline">Terms</Link></label>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-bold">Sign Up</button>
          {/* ✅ Google Sign-in Button */}
          {/* <div className="mt-4">
            <a
              href="http://localhost:5001/auth/google"
              className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition"
            >
              <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </a>
          </div> */}
        </form>
      </div>
    </div >

  );
}

export default Signup;