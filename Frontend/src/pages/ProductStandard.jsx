// frontend/src/pages/ProductStandard.jsx
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import api from "../api/axios";

function ProductStandard() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get("/courses");
        const selectedCourse =
          res.data.find((c) => c.slug === "standard") || res.data[0];
        setCourse(selectedCourse);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-100 py-16 border-b">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-6">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              {course ? course.name : "Loading..."}
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl">
              Master digital marketing, content creation, social media growth,
              email automation, and essential online business skills in one
              power-packed program.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/courses"
                className="px-8 py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                ← Back to Courses
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src={course?.thumbnail || "/images/anmol-duggal.png"}
                alt={course?.name || "Trainer"}
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-8 text-center">
          {[
            { icon: "/coursesImg/course_icon.png", label: "15 Courses" },
            { icon: "/coursesImg/hours_icon.png", label: "80+ Hours" },
            { icon: "/coursesImg/students_icon.png", label: "10K+ Students" },
            { icon: "/coursesImg/certificate_icon.png", label: "Certificate" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center min-w-[140px] text-gray-700"
            >
              <img src={stat.icon} alt={stat.label} className="w-12 h-12 mb-2" />
              <p className="font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Sections */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              What You Will Learn
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          {/* Only 20 Points */}
          <div className="grid md:grid-cols-2 gap-10">

            {/* Section 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Digital Marketing Foundation
              </h3>
              <ul className="space-y-3">
                {[
                  "Digital Marketing Basics",
                  "Content Marketing Strategy",
                  "Organic Lead Generation",
                  "SEO Fundamentals",
                  "Facebook Group Promotion",
                  "Brand Creation Essentials",
                  "Landing Page Basics",
                  "WhatsApp Marketing Essentials",
                  "Audience Targeting Basics",
                  "Google My Business Optimization",
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-3 mt-1">✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Bonus Skill Courses
              </h3>
              <ul className="space-y-3">
                {[
                  "YouTube SEO",
                  "Email Marketing Automation",
                  "Instagram Growth Strategy",
                  "Reels Editing Basics",
                  "Canva Graphic Design",
                  "Affiliate Marketing Basics",
                  "YouTube Quick Start",
                  "Copywriting Essentials",
                  "Social Media Content Planning",
                  "Basic Video Editing Workflow",
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-3 mt-1">✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="px-6 py-20 bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
            Who Is This Course For?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Students building digital skills",
              "Working professionals exploring online career options",
              "Entrepreneurs growing their online presence",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-md transition"
              >
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-6 py-16 bg-white border-t">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-10">
            {[
              "✅ Lifetime Access",
              "✅ Certificate of Completion",
              "✅ 7 Days Refund Policy",
            ].map((badge, idx) => (
              <div
                key={idx}
                className="text-lg font-semibold text-gray-700 flex items-center"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductStandard;
