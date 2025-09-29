// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api from '../api/axios';

// function Courses({ isLoggedIn }) {
//   const [courses, setCourses] = useState([]);
//   const [enrolledCourseSlugs, setEnrolledCourseSlugs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await api.get('/courses');
//         setCourses(res.data);
//         console.log('Fetched courses data:', res.data); // Detailed debug
//       } catch (err) {
//         console.error('Error fetching courses:', err);
//       }
//     };
//     fetchCourses();

//     if (isLoggedIn) {
//       const user = JSON.parse(localStorage.getItem('user'));
//       if (user && user.enrolledCourses) {
//         setEnrolledCourseSlugs(user.enrolledCourses.map((c) => c.slug));
//       }
//     }
//   }, [isLoggedIn]);

//   const handleBuyNow = (courseSlug) => {
//     if (!isLoggedIn) {
//       localStorage.setItem('intendedCourse', courseSlug);
//       navigate('/auth/signup');
//     } else {
//       navigate(`/api/purchase/${courseSlug}`);
//     }
//   };

//   return (
//     <section style={{ padding: '64px 16px', backgroundColor: '#f9fafb', textAlign: 'center' }}>
//       <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '40px' }}>
//         Our Courses
//       </h2>

//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//           gap: '32px',
//           maxWidth: '1280px',
//           margin: '0 auto',
//         }}
//       >
//         {courses.map((course, index) => (
//           <motion.div
//             key={index}
//             style={{
//               backgroundColor: 'white',
//               padding: '24px',
//               borderRadius: '8px',
//               boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
//             }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <img
//               src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course+Image'}
//               alt={`${course.name} course image`}
//               onError={(e) =>
//                 (e.target.src = 'https://via.placeholder.com/300x200?text=Course+Image')
//               }
//               style={{
//                 width: '100%',
//                 height: '192px',
//                 objectFit: 'cover',
//                 borderRadius: '8px 8px 0 0',
//                 marginBottom: '16px',
//               }}
//             />
//             <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
//               {course.category}
//             </h3>
//             <p style={{ color: '#4b5563', fontSize: '1rem', fontWeight: '500', marginBottom: '8px' }}>
//               {course.name}
//             </p>
//             <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '16px' }}>
//               {course.discount ? (
//                 <>
//                   <span style={{ textDecoration: 'line-through', color: '#ef4444', marginRight: '8px' }}>
//                     ₹{Math.round(course.price || 0)}
//                   </span>
//                   <span style={{ color: '#10b981', fontWeight: '600' }}>
//                     ₹{Math.round((course.price || 0) * (1 - (course.discount || 0) / 100))}
//                   </span>
//                 </>
//               ) : (
//                 <span>₹{Math.round(course.price || 0)}</span>
//               )}
//             </p>

//             <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
//               <Link
//                 to={`/courses/${course.slug}`}
//                 style={{
//                   backgroundColor: '#e5e7eb',
//                   color: '#1f2937',
//                   padding: '12px 24px',
//                   borderRadius: '6px',
//                   fontWeight: '600',
//                   fontSize: '1rem',
//                   textDecoration: 'none',
//                 }}
//               >
//                 PRODUCT DETAILS
//               </Link>
//               {enrolledCourseSlugs.includes(course.slug) ? (
//                 <button
//                   disabled
//                   style={{
//                     backgroundColor: '#bdbdbd',
//                     color: 'white',
//                     padding: '12px 24px',
//                     borderRadius: '6px',
//                     fontWeight: '600',
//                     fontSize: '1rem',
//                     border: 'none',
//                     cursor: 'not-allowed',
//                   }}
//                 >
//                   Already Purchased
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handleBuyNow(course.slug)}
//                   style={{
//                     backgroundColor: '#f97316',
//                     color: 'white',
//                     padding: '12px 24px',
//                     borderRadius: '6px',
//                     fontWeight: '600',
//                     fontSize: '1rem',
//                     border: 'none',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   BUY NOW
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Courses;