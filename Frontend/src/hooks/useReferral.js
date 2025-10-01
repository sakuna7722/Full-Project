// import { useParams, useNavigate } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import axios from "../api/axios";  // <-- CHANGE: Configured axios import
// // ... other imports remain same

// function CoursePage() {
//   // ... states same

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         console.log(`[CoursePage] Fetching course for slug: ${slug}`);
//         const token = localStorage.getItem("token");
//         console.log("[CoursePage] Token:", token ? "Token present" : "No token");
//         // <-- CHANGE: Relative URL with configured axios
//         const res = await axios.get(`/courses/slug/${slug}`, {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });
//         // ... rest same (setCourse, logs)
//       } catch (err) {
//         // ... error handling same
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [slug]);

//   // ... rest of component same
// }

// export default CoursePage;