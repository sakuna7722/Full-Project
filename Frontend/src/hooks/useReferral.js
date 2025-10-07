// import { useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom"; // useLocation add for referral
// import Footer from "../components/Footer";
// import api from "../api/axios";
// import { useAuth } from "../contexts/AuthContext"; // Previous se

// function ProductLite() {
//   const [course, setCourse] = useState(null);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { user, loading: authLoading } = useAuth(); // user from context (assume has enrolledCourses or fallback to localStorage)
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Referral handling (same as Purchase.jsx)
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const ref = searchParams.get("ref");
//     if (ref) {
//       localStorage.setItem("ref", ref);
//       localStorage.setItem("referralCode", ref);
//     }
//   }, [location.search]);

//   useEffect(() => {
//     const fetchCourseAndEnrollments = async () => {
//       setLoading(true);
//       try {
//         // Fetch course (same as before, but use /courses/slug/${slug} like Purchase.jsx)
//         const res = await api.get(`/courses/slug/${course.slug}`); // Wait, course.slug nahi mila? Wait, params se lo
//         // Correction: useParams add karo for slug
//         const { slug } = useParams(); // Add this import: import { useParams } from "react-router-dom";
//         const courseRes = await api.get(`/courses/slug/${slug}`);
//         const selectedCourse = courseRes.data;
//         setCourse(selectedCourse);

//         // Enrolled check
//         if (user) {
//           // Prefer from AuthContext user if available
//           if (user.enrolledCourses && user.enrolledCourses.some(c => c.slug === selectedCourse.slug)) {
//             setIsEnrolled(true);
//           } else {
//             // Fallback to localStorage like Courses.jsx
//             const localUser = JSON.parse(localStorage.getItem('user'));
//             if (localUser && localUser.enrolledCourses) {
//               setIsEnrolled(localUser.enrolledCourses.some(c => c.slug === selectedCourse.slug));
//             }
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         // Error handling like Purchase.jsx
//         if (err.response?.status === 404) {
//           // Handle not found
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!authLoading && course) { // Wait, slug from params
//       fetchCourseAndEnrollments();
//     }
//   }, [user, authLoading, location.search]); // Dependencies

//   const handleBuyNow = () => { // Renamed from handleEnroll
//     if (authLoading || loading) return;

//     if (!user) {
//       // Not logged in, set intended and redirect like Courses.jsx
//       localStorage.setItem('intendedCourse', course.slug);
//       navigate('/auth/signup'); // Or /signup
//       return;
//     }

//     if (isEnrolled) {
//       // Already enrolled, go to dashboard/course
//       navigate(`/course/${course.slug}` || '/dashboard'); // Adjust route as per your app
//       return;
//     }

//     // Go to purchase page
//     navigate(`/purchase/${course.slug}`);
//   };

//   // Button render (updated texts)
//   const renderButton = () => {
//     if (authLoading || loading) {
//       return (
//         <button className="px-8 py-4 rounded-xl bg-gray-400 text-white font-bold shadow-lg" disabled>
//           Loading...
//         </button>
//       );
//     }

//     if (!user) {
//       return (
//         <button
//           onClick={handleBuyNow}
//           className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:from-orange-600 hover:to-pink-600 transition cursor-pointer"
//         >
//           Sign Up to Buy
//         </button>
//       );
//     }

//     if (isEnrolled) {
//       return (
//         <button
//           onClick={handleBuyNow}
//           className="px-8 py-4 rounded-xl bg-green-500 text-white font-bold shadow-lg cursor-pointer hover:bg-green-600 transition"
//         >
//           Go to Course →
//         </button>
//       );
//     }

//     return (
//       <button
//         onClick={handleBuyNow}
//         className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:from-orange-600 hover:to-pink-600 transition cursor-pointer"
//       >
//         Buy Now
//       </button>
//     );
//   };

//   // Add useParams import at top
//   const { slug } = useParams(); // For fetching by slug

//   if (loading || !course) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-indigo-50 to-blue-100 py-16 border-b">
//         <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-6">
//           <div className="flex-1 text-center lg:text-left">
//             <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
//               {course.name}
//             </h1>
//             <p className="text-lg text-gray-700 mb-6 max-w-2xl">
//               {/* Your description */}
//               Organic Lead Generation: The best way to build long-term trust, using SEO, content marketing, and community building to attract high-quality leads.Social Media Marketing: Through consistent posting, reels, ads, and engagement, you increase visibility and create a direct connection with your audience.
//             </p>
//             <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
//               {renderButton()}
//               <Link
//                 to="/courses"
//                 className="px-8 py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
//               >
//                 ← Back to Courses
//               </Link>
//             </div>
//           </div>

//           <div className="flex-1">
//             <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
//               <img
//                 src={course.thumbnail || "/images/anmol-duggal.png"}
//                 alt={course.name}
//                 className="w-full h-auto object-cover rounded-2xl"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Price Display (Added like in Purchase/Courses - optional, hero mein) */}
//       <div className="px-6 py-4 bg-white text-center">
//         <p className="text-lg">
//           Price:{' '}
//           {course.discount ? (
//             <>
//               <span className="line-through text-red-500 mr-2">₹{Math.round(course.price).toLocaleString('en-IN')}</span>
//               <span className="text-green-600 font-semibold text-xl">
//                 ₹{Math.round(course.price * (1 - parseFloat(course.discount) / 100)).toLocaleString('en-IN')}
//               </span>
//             </>
//           ) : (
//             <span className="text-green-600 font-semibold text-xl">₹{Math.round(course.price).toLocaleString('en-IN')}</span>
//           )}
//         </p>
//       </div>

//       {/* Rest sections same - Stats, What You Will Learn, Who Is This For, Trust Badges */}
//       {/* ... (copy from your original) ... */}

//       <Footer />
//     </>
//   );
// }

// export default ProductLite;